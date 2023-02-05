import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import Button from "../Button/Button.util";
import SearchButton from "../Button/SearchButton.util";
import Searchbar from "../Searchbar/Searchbar.util";
import * as ReactBootStrap from "react-bootstrap";
import * as ReactScroll from "react-scroll";
import ReactGA from "react-ga";
import { useDebounce } from "use-debounce";

import {
  default_request_config,
  post_request,
} from "../../helpers/requests/requests";
import { prefix_url } from "../../helpers/requests/requests";

//Keď pri vyhľadavaní kniknem mimo okna, ktoré vyskočím keď chcem niečo vyhľadať
let useClickOutside = (handler) => {
  let domNode = useRef();

  useEffect(() => {
    let maybeHandler = (e) => {
      if (domNode.current != undefined) {
        if (!domNode.current.contains(e.target)) {
          handler();
        }
      }
    };

    document.addEventListener("mousedown", maybeHandler);

    return () => {
      document.removeEventListener("mousedown", maybeHandler);
    };
  });

  return domNode;
};

const Navbar = ({ type, authData, logout = (f) => f }) => {
  const [width, setWidth] = useState(window.innerWidth);
  window.addEventListener("resize", () => setWidth(window.innerWidth));
  const [loginState, setLoginState] = useState(authData);
  const [expanded, setExpanded] = useState(false);
  const [category, setCategory] = useState("");
  const [searchState, setSearchState] = useState(false);
  const [results, setResults] = useState([]);
  const [searchPhrase, setSearchPhrase] = useState("");
  const [stoppedTypingText] = useDebounce(searchPhrase, 500);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setLoginState(authData);
  }, [authData]);

  useEffect(() => {
    serachForScripts();
    if (searchPhrase == "") {
      setSearchState(false);
    }
  }, [stoppedTypingText]);

  async function serachForScripts() {
    setSearchState(true);
    setLoading(true);
    if (searchPhrase.length > 3) {
      const results = await post_request(
        `/script/search`,
        {
          searchphrase: searchPhrase.toString(),
        },
        default_request_config
      );
      if (results.data.data.length > 0) {
        console.log(results.data.data);
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

  const handleChange = (e) => {
    setResults(null);
    setMessage("");
    setSearchPhrase(e.target.value);
  };

  let domNode = useClickOutside(() => {
    setIsOpen(false);
  });

  return (
    <div>
      {loginState.isLoggedIn ? (
        <div>
          <ReactBootStrap.Navbar
            className="justify-content-between"
            variant="dark"
            bg="light"
            expand="lg"
            fixed="top"
            expanded={expanded}
          >
            <ReactBootStrap.Navbar.Brand>
              <Link
                to="/"
                className="navbar-brand mx-0 ps-0 d-flex"
                onClick={() => setExpanded(false)}
              >
                <img className="logo" src="/img/logo1.png" alt="Logo" />
              </Link>
            </ReactBootStrap.Navbar.Brand>
            {width >= 992 ? (
              <div className="nav-search d-flex justify-content-center">
                <input
                  type="text"
                  className={"searchbar"}
                  placeholder={"Find e-books"}
                  onChange={handleChange}
                  onClick={() => setIsOpen(true)}
                />
                {isOpen === true ? (
                  searchPhrase === "" ? null : message || results ? (
                    <div ref={domNode} className="search-results">
                      {message === "" ? null : (
                        <p className="search-message text-small text-normal text-medium">
                          {message}
                        </p>
                      )}

                      {results ? (
                        <div className="search-result-wrapper">
                          {results.map((item) => (
                            <div className="search-result">
                              <img src={`${prefix_url}/${item.image}`} />
                              <div className="result-text">
                                <p className="text-small text-odkaz text-bold m-0">
                                  {item.name}
                                </p>
                                <p className="text-small text-normal text-medium m-0">
                                  {item.author[0]}
                                </p>
                                <p className="text-small text-normal text-medium m-0">
                                  {item.year}
                                </p>
                                <Link
                                  to={`/script/${item._id}`}
                                  onClick={() => setIsOpen(false)}
                                >
                                  Open e-book
                                </Link>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  ) : null
                ) : null}
              </div>
            ) : null}
            <ReactBootStrap.Navbar.Toggle
              aria-controls="basic-navbar-nav"
              onClick={() => setExpanded(expanded ? false : "expanded")}
            >
              {" "}
              <i className="fas fa-bars" />{" "}
            </ReactBootStrap.Navbar.Toggle>
            <ReactBootStrap.Navbar.Collapse
              id="basic-navbar-nav"
              className="justify-content-end log-in-nav"
            >
              <ReactBootStrap.Nav className="justify-content-end">
                {width < 992 ? (
                  <div className="text-center search-bar">
                    <input
                      type="text"
                      className={"searchbar"}
                      placeholder={"Vyhľadávať knihy"}
                      onChange={handleChange}
                      onClick={() => setIsOpen(true)}
                    />
                    {isOpen === true ? (
                      searchPhrase === "" ? null : message || results ? (
                        <div ref={domNode} className="search-results">
                          {message === "" ? null : (
                            <p className="search-message text-small text-normal text-medium">
                              {message}
                            </p>
                          )}

                          {results ? (
                            <div className="search-result-wrapper">
                              {results.map((item) => (
                                <div className="search-result">
                                  <img src={`${prefix_url}/${item.image}`} />
                                  <div className="result-text">
                                    <p className="text-small text-odkaz text-bold m-0">
                                      {item.name}
                                    </p>
                                    <p className="text-small text-normal text-medium m-0">
                                      {item.author[0]}
                                    </p>
                                    <p className="text-small text-normal text-medium m-0">
                                      {item.year}
                                    </p>
                                    <Link
                                      to={`/script/${item._id}`}
                                      onClick={() => setIsOpen(false)}
                                    >
                                      Prejsť na script
                                    </Link>
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : null}
                        </div>
                      ) : null
                    ) : null}
                  </div>
                ) : null}
                <ReactBootStrap.Nav.Link>
                  <Link
                    onClick={() => setExpanded(false)}
                    to="/library"
                    className="nav-item nav-link text-end mr-1 text-medium"
                  >
                    Discover
                  </Link>
                </ReactBootStrap.Nav.Link>
                <ReactBootStrap.Nav.Link>
                  <Link
                    onClick={() => {
                      logout();
                      setExpanded(false);
                    }}
                    className="nav-item nav-link text-end mr-1 text-medium"
                  >
                    Log out
                  </Link>
                </ReactBootStrap.Nav.Link>
                <ReactBootStrap.Nav.Link className="text-end">
                  <Link to="/profile" onClick={() => setExpanded(false)}>
                    {width < 992 ? (
                      <Button
                        type="oval-left"
                        color={"yellow"}
                        text={authData.user.name}
                      />
                    ) : (
                      <Button color={"yellow"} text={authData.user.name} />
                    )}
                  </Link>
                </ReactBootStrap.Nav.Link>
              </ReactBootStrap.Nav>
            </ReactBootStrap.Navbar.Collapse>
          </ReactBootStrap.Navbar>
        </div>
      ) : (
        <div>
          <ReactBootStrap.Navbar
            className="justify-content-between"
            variant="dark"
            bg="light"
            expand="lg"
            fixed="top"
            expanded={expanded}
          >
            <ReactBootStrap.Navbar.Brand>
              <Link
                to="/"
                className="navbar-brand mx-0 ps-0 d-flex"
                onClick={() => setExpanded(false)}
              >
                <img className="logo" src="/img/logo1.png" alt="Logo" />
              </Link>
            </ReactBootStrap.Navbar.Brand>
            <ReactBootStrap.Navbar.Toggle
              aria-controls="basic-navbar-nav"
              onClick={() => setExpanded(expanded ? false : "expanded")}
            >
              {" "}
              <i className="fas fa-bars" />{" "}
            </ReactBootStrap.Navbar.Toggle>
            <ReactBootStrap.Navbar.Collapse
              id="basic-navbar-nav"
              className="justify-content-end"
            >
              <ReactBootStrap.Nav className="w-100 justify-content-end">
                <ReactBootStrap.Nav.Link href="/#cennik">
                  <a
                    onClick={() => setExpanded(false)}
                    className="nav-item nav-link text-end mr-1 text-medium"
                  >
                    Pricing
                  </a>
                </ReactBootStrap.Nav.Link>
                <ReactBootStrap.Nav.Link>
                  <Link
                    onClick={() => setExpanded(false)}
                    to="/library"
                    className="nav-item nav-link text-end mr-1 text-medium"
                  >
                    Discover
                  </Link>
                </ReactBootStrap.Nav.Link>
                <ReactBootStrap.Nav.Link>
                  <Link
                    onClick={() => setExpanded(false)}
                    to="/login"
                    className="nav-item nav-link text-end mr-1 text-medium"
                  >
                    Login
                  </Link>
                </ReactBootStrap.Nav.Link>
                <ReactBootStrap.Nav.Link className="text-end">
                  <Link to="/register" onClick={() => setExpanded(false)}>
                    {width < 992 ? (
                      <Button
                        type="oval-left"
                        color={"yellow"}
                        text={"Try it now"}
                      />
                    ) : (
                      <Button color={"yellow"} text={"Try it now"} />
                    )}
                  </Link>
                </ReactBootStrap.Nav.Link>
              </ReactBootStrap.Nav>
            </ReactBootStrap.Navbar.Collapse>
          </ReactBootStrap.Navbar>
        </div>
      )}
    </div>
  );
};

export default Navbar;
