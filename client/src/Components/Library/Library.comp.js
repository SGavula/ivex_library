import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDebounce } from "use-debounce";
import ReactGA from "react-ga";
import ReactPixel from "react-facebook-pixel";

//Libraries
import InfiniteScroll from "react-infinite-scroll-component";

/* Utils */
import {
  get_request,
  default_request_config,
  post_request,
} from "../../helpers/requests/requests";

import ScriptsCarousel from "../../utils/ScriptsCarousel/ScriptsCarousel.util";
import Heading from "../../utils/Heading/Heading.util";
import SearchButton from "../../utils/Button/SearchButton.util";
import ScriptCard from "../../utils/ScriptCard/scriptcard.util";
import Spinner from "../../utils/Spinner/Spinner.util";

const Library = ({ authData }) => {
  const [renderReady, setRenderReady] = useState(false);
  const [category, setCategory] = useState("");
  const [readyToRenderResults, setReadyToRenderResults] = useState(false);
  const [categories, setCategories] = useState([]);
  const [stateHistory, setStateHistory] = useState(useHistory());
  const [searchState, setSearchState] = useState(false);
  const [results, setResults] = useState([]);
  const [searchPhrase, setSearchPhrase] = useState("");
  const [stoppedTypingText] = useDebounce(searchPhrase, 1000);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [itemsToLoad, setItemsToLoad] = useState();
  const [itemsToLoadFinish, setItemsToLoadFinish] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const history = useHistory();

  useEffect(async () => {
    let main = [];
    let categories = await get_request(
      "/script/categories",
      default_request_config
    );
    categories.data.data.forEach((category) => {
      main.push(category.category_name);
    });
    setCategories(main);
  }, []);

  useEffect(() => {
    setRenderReady(true);
  }, [categories]);

  const scrollToItem = () => {
    let yPosition = sessionStorage.getItem("yPosition");
    window.scrollTo({
      top: yPosition,
      left: 0,
      behavior: "instant",
    });
    sessionStorage.removeItem("yPosition");
    sessionStorage.removeItem("itemPosition");
    setItemsToLoadFinish(true);
  };

  useEffect(() => {
    if (history.action === "POP") {
      let itemPosition = sessionStorage.getItem("itemPosition");

      if (itemPosition) {
        setItemsToLoad(itemPosition);
        setTimeout(scrollToItem, 1000);
      } else {
        setItemsToLoad(3);
        setItemsToLoadFinish(true);
      }
    } else {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "instant",
      });
      setItemsToLoad(3);
      setItemsToLoadFinish(true);
    }
  }, []);

  useEffect(() => {
    ReactGA.pageview("/library", "Knižnica");
    ReactPixel.pageView();
  }, []);

  useEffect(() => {
    document.title = "IVEX Library - Online library";
  }, [history.location]);

  function redirect(id, stateHistory) {
    history.push(`/script/${id}`);
    setStateHistory({ ...stateHistory }); // <--- here
  }

  function library_redirect(category, stateHistory) {
    history.push(`/category/${category}`);
    setStateHistory({ ...stateHistory }); // <--- here
    ReactGA.event({
      category: "Library",
      event: "User clicked on category name",
      value: category,
    });
  }

  async function serachForScripts() {
    setSearchState(true);
    setLoading(true);
    if (stoppedTypingText.length > 3) {
      const results = await post_request(
        `/script/search`,
        {
          searchphrase: stoppedTypingText.toString(),
        },
        default_request_config
      );
      if (results.data.data.length > 0) {
        setResults(results.data.data);
        // setLoading(true);
        const categories = results.data.data.map((script) => script.category);
        var counts = {};
        categories.forEach(function (x) {
          counts[x] = (counts[x] || 0) + 1;
        });
        const cat = Object.keys(counts).reduce((a, b) =>
          counts[a] > counts[b] ? a : b
        );
        if (cat) {
          setCategory(cat);
        }
        ReactGA.event({
          category: "Search",
          action: "Succesfull search",
          label: "User entered search word, and got results",
          value: searchPhrase,
        });
      } else {
        ReactGA.event({
          category: "Search",
          action: "Unsuccessful search",
          label: "User entered search word, but no search results were found",
          value: searchPhrase,
        });
        setMessage("No results");
        setLoading(false);
        console.log("no results");
      }
    }
  }

  useEffect(() => {
    serachForScripts();
    if (searchPhrase == "") {
      setSearchState(false);
    }
  }, [stoppedTypingText]);

  useEffect(() => {
    setReadyToRenderResults(true);
  }, [results]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, []);

  //Infinite Scrolling
  const fetchData = () => {
    if (categories.length) {
      if (itemsToLoad >= categories.length) {
        setHasMore(false);
        return;
      }
    }

    setItemsToLoad((prev) => prev + 1);
  };

  return (
    <div className="library">
      {itemsToLoadFinish === false ? (
        <div className="spinner-wrapper">
          <Spinner />
        </div>
      ) : null}
      <div className="px-0 main-lib space">
        <div className="container-lg px-0">
          <div className="heading-lib">
            <Heading
              title="Library"
              subtitle="all the books e-books in one place"
            />
          </div>
          <div className="searchBar-lib pb-5 d-flex">
            <input
              className="form-control"
              placeholder="Search titles..."
              onChange={(e) => setSearchPhrase(e.target.value)}
              autoFocus
            />
            <SearchButton />
          </div>
        </div>
        {!searchState ? (
          <div className="scripts-lib">
            {renderReady ? (
              <InfiniteScroll
                dataLength={itemsToLoad}
                next={fetchData}
                hasMore={hasMore}
                loader={<Spinner />}
              >
                {categories.slice(0, itemsToLoad).map((category) => {
                  {
                    /* Transform category to upper case */
                  }
                  const category_name =
                    category.charAt(0).toUpperCase() + category.slice(1);
                  return (
                    <ScriptsCarousel
                      key={category}
                      itemsToLoad={itemsToLoad}
                      title={category_name}
                      tag={category}
                      limit={15}
                      stateHistory={stateHistory}
                      redirect={(e) => redirect(e)}
                      authData={authData}
                      type={"library"}
                      library_redirect={(e) => library_redirect(e)}
                    />
                  );
                })}
              </InfiniteScroll>
            ) : (
              <div className="spinner-wrapper">
                <Spinner />
              </div>
            )}
          </div>
        ) : (
          <div>
            {readyToRenderResults ? (
              <div className="row g-0 justify-content-center">
                {results.map((script, index) => (
                  <ScriptCard
                    className="pb-5 px-0 mx-3"
                    key={index}
                    id={script._id}
                    title={script.name}
                    author={script.author}
                    year={script.year}
                    image={script.image}
                    redirect={(e) => redirect(e)}
                    authData={authData}
                  />
                ))}
                {category ? (
                  <div className="mt-5 pt-5">
                    <ScriptsCarousel
                      title={`You might be interested`}
                      tag={category}
                      limit={15}
                      stateHistory={stateHistory}
                      redirect={(e) => redirect(e)}
                      authData={authData}
                    />
                  </div>
                ) : (
                  <div className="spinner-wrapper">
                    <Spinner />
                  </div>
                )}
              </div>
            ) : (
              <div>
                {loading ? (
                  <div className="spinner-wrapper">
                    <Spinner />
                  </div>
                ) : (
                  { message }
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Library;
