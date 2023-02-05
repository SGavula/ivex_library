import React, { useState, useEffect } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import { useLastLocation } from "react-router-last-location";
import moment from "moment";

{
  /* Navbar & Footer */
}
import Navbar from "./utils/Navbars/Navbar.util";
import Footer from "./utils/Footer/Footer.util";

import FrontPage from "./Components/FrontPage/FrontPage";
import PdfViewer from "./Components/PdfViewer/PdfViewer";
import Login from "./Components/Login/Login";
import GDRP from "./Components/FooterComps/GDPR/GDPR";
import VOP from "./Components/FooterComps/VOP/VOP";
import FAQ from "./Components/FooterComps/FAQ/FAQ";
import Contact from "./Components/FooterComps/Contact/Contact";
import Thanks from "./Components/Thanks/Thanks";

import {
  default_request_config,
  post_request,
  get_request,
  get_request_blob,
  get_request_scraper,
  put_request,
  delete_request,
  multipart_request_config,
} from "./helpers";

import ReactGA from "react-ga";
import ReactPixel from "react-facebook-pixel";

import "./css/main.min.css";
import ScriptsPage from "./Components/ScriptsPage/Scriptspage.comp";
import ScrapedScriptsPage from "./Components/ScrapedScript/ScrapedScriptPage.com";
import Library from "./Components/Library/Library.comp";
import LibraryCategoryComponent from "./Components/Library/LibraryCategoryComponent";
import Profile from "./Components/Profile/Profile.comp";
import ProfileAllScripts from "./Components/Profile/ProfileAllScripts/ProfileAllScripts";
import Registration from "./Components/Registration/Registration.comp";
import ForgottenPassword from "./Components/ForgottenPassword/ForgottenPassword";
import EmailVerification from "./Components/VerificationEmail/EmailVerification.comp";
import ChangePassword from "./Components/ChangePassword/ChangePassword";
import EditAdminProfileComponent from "./Components/Profile/AdminProfile/EditAdminProfile/EditAdminProfile.comp";
import CreatePublisher from "./Components/Profile/AdminProfile/CreatePublisher/CreatePublisher.comp";
import CreateScript from "./Components/Profile/AdminProfile/CreateScript/CreateScript";
import AdminUserTable from "./Components/Profile/AdminProfile/AdminUserTable/AdminUserTable.comp";
import AdminScriptsTable from "./Components/Profile/AdminProfile/AdminScriptsTable/AdminScriptsTable.comp";
import AdminScraperScriptsTable from "./Components/Profile/AdminProfile/AdminScraperScriptsTable/AdminScraperScriptsTable.comp";
import AdminCategoriesTable from "./Components/Profile/AdminProfile/AdminCategoriesTable/AdminCategoriesTable.comp";
import UnsubscribeFromEmails from "./Components/UnsubscribeFromEmails/UnsubscribeFromEmails.comp";
import CookieBannerComp from "./Components/CookieBanner/cookiebanner";
import AdminCreateUser from "./Components/AdminCreateUser/AdminCreateUser.comp";
import AdminUserProfile from "./Components/Profile/AdminProfile/AdminUserProfile/AdminUserProfile.comp";
import AdminPublisherProfile from "./Components/Profile/AdminProfile/AdminPublisherProfile/AdminPublisherProfile.comp";
import Page404 from "./Components/Page404/Page404.comp";
import PaymentStatus from "./Components/Registration/RegPaymentStatus";
import "./config.js";

function App() {
  const history = useHistory();
  const lastLocation = useLastLocation();
  const [authState, setAuthState] = useState({
    isLoggedIn: false,
    user: {},
  });
  const [publisherScripts, setPublisherScripts] = useState();
  const [scraperSuccessfulAlert, setScraperSuccessfulAlert] = useState(false);

  // Site map generator

  useEffect(() => {
    if (history.location.pathname == "/") {
      document.title = "IVEX Library - Online library";
    }
  }, [history.location]);

  useEffect(() => {
    let storageAuthState = JSON.parse(localStorage.getItem("authState"));
    if (
      storageAuthState !== null &&
      moment.duration(moment().diff(storageAuthState.time)).asHours() < 24
    ) {
      setAuthState(storageAuthState);
    } else {
      if (!window.location.pathname.includes("registration")) {
        setAuthState({ isLoggedIn: false, user: {} });
        localStorage["authState"] = JSON.stringify({
          isLoggedIn: false,
          user: {},
        });
      }
    }

    const options = {
      autoConfig: true,
      debug: true, // Disable in prod
    };

    // initialize React GA with user info
    if (storageAuthState && storageAuthState.isLoggedIn) {
      ReactGA.initialize("UA-199505032-1", {
        debug: false, // Disable in prod
        gaOptions: {
          userId: storageAuthState.user.user_id,
        },
      });

      // FB Pixel with user data
      const advancedMatching = {
        email: storageAuthState.user.email,
        fn: storageAuthState.user.first_name,
        ln: storageAuthState.user.last_name,
        id: storageAuthState.user.user_id,
      };
      ReactPixel.init("854313398851032", advancedMatching, options);
    } else {
      // Initialize React GA without user
      ReactGA.initialize("UA-000000-01", {
        debug: false,
      });
      ReactPixel.init("854313398851032", {}, options);
    }
  }, []);

  // ** Logout
  const logout = () => {
    console.log("Logging out");
    setAuthState({ isLoggedIn: false, user: {} });
    localStorage["authState"] = JSON.stringify({
      isLoggedIn: false,
      user: {},
    });
    history.push("/login");
  };

  const false_logout = () => {
    console.log("Fake logging out");
    setAuthState({ isLoggedIn: false, user: {} });
    localStorage["authState"] = JSON.stringify({
      isLoggedIn: false,
      user: {},
    });
  };

  // ** Login requests
  const login = async (values) => {
    const result = await post_request(
      "/auth/login",
      values,
      default_request_config
    )
      .then(({ data }) => {
        console.log(data);
        syncTokens({ ...data.data, email: values.email });
        console.log(lastLocation);
        if (
          lastLocation == null ||
          lastLocation.pathname.includes("/login") ||
          lastLocation.pathname.includes("/register") ||
          lastLocation.pathname.includes("/thank-you") ||
          lastLocation.pathname.includes("/forgotten-password") ||
          lastLocation.pathname.includes("/change-password")
        ) {
          history.push("/library");
        } else {
          history.push(lastLocation.pathname);
        }

        return data;
      })
      .catch(({ response }) => {
        return response;
      });

    return result;
  };
  // var promise = navigator.clipboard.read();
  // const permission = navigator.permissions.query({ name: 'clipboardWrite' });
  /** TO DISABLE SCREEN CAPTURE **/
  // document.addEventListener('keyup', (e) => {
  // 	if (e.key == 'PrintScreen') {
  // 		navigator.clipboard.writeText('');
  // 		// alert('Screenshots disabled!');
  // 	}
  // });

  /** TO DISABLE PRINTS WHIT CTRL+P **/
  document.addEventListener("keydown", (e) => {
    if (e.ctrlKey && e.key == "p") {
      // alert('This section is not allowed to print or export to PDF');
      // e.cancelBubble = true;
      e.preventDefault();
      e.stopImmediatePropagation();
    }
  });

  const syncTokens = async (values) => {
    if (
      values.token !== undefined &&
      values.refresh !== undefined &&
      values.token !== "undefined" &&
      values.refresh !== "undefined"
    ) {
      let authData = {
        isLoggedIn: true,
        user: { ...authState.user, ...values },
      };
      setAuthState(authData);
      localStorage["authState"] = JSON.stringify({
        ...authData,
        time: moment().format(),
      });
    }
  };

  // ** Scripts page request
  const getScript = async (id) => {
    const script = await get_request(`/script/${id}`, {
      ...default_request_config,
    });

    return script;
  };

  // ** Library requests
  const getScriptsByIds = async ({ script_ids }) => {
    const scripts = await post_request(
      "/script/byIds",
      {
        scripts: script_ids,
      },
      { ...default_request_config }
    );
    return scripts;
  };

  const saveUserScriptData = async (values) => {
    const userscriptdata = await put_request(
      `/user/${values.user_id}/scriptdata`,
      {
        reqtype: values.reqtype,
        script_id: values.script_id,
      },
      {
        ...default_request_config,
        headers: {
          ...default_request_config.headers,
          "x-token": authState.user.token,
          "x-refresh-token": authState.user.refresh,
        },
      }
    )
      .then((res) => {
        syncTokens({
          token: res.headers["x-token"],
          refresh: res.headers["x-refresh-token"],
        });
        return res;
      })
      .catch(({ response }) => {
        // set_allow_requests(true);
        if (response !== undefined && response.data !== undefined) {
          if (response.data.status === 401) {
            false_logout();
          } else {
            syncTokens({
              token: response.headers["x-token"],
              refresh: response.headers["x-refresh-token"],
            });
          }
        } else {
          return false;
        }
      });

    return userscriptdata;
  };

  const isInFavorites = async (values) => {
    const userscriptdata = await get_request(
      `/user/${values.user_id}/script/${values.script_id}/favorites`,
      {
        ...default_request_config,
        headers: {
          ...default_request_config.headers,
          "x-token": authState.user.token,
          "x-refresh-token": authState.user.refresh,
        },
      }
    )
      .then((res) => {
        syncTokens({
          token: res.headers["x-token"],
          refresh: res.headers["x-refresh-token"],
        });
        return res;
      })
      .catch(({ response }) => {
        // set_allow_requests(true);
        if (response !== undefined && response.data !== undefined) {
          if (response.data.status === 401) {
            false_logout();
          } else {
            syncTokens({
              token: response.headers["x-token"],
              refresh: response.headers["x-refresh-token"],
            });
          }
        } else {
          console.log(response);
          return false;
        }
      });

    return userscriptdata;
  };

  const removeFromFavorites = async (values) => {
    const userscriptdata = await delete_request(
      `/user/${values.user_id}/script/${values.script_id}/favorites`,
      {
        ...default_request_config,
        headers: {
          ...default_request_config.headers,
          "x-token": authState.user.token,
          "x-refresh-token": authState.user.refresh,
        },
      }
    )
      .then((res) => {
        syncTokens({
          token: res.headers["x-token"],
          refresh: res.headers["x-refresh-token"],
        });
        return res;
      })
      .catch(({ response }) => {
        // set_allow_requests(true);
        if (response !== undefined && response.data !== undefined) {
          if (response.data.status === 401) {
            false_logout();
          } else {
            syncTokens({
              token: response.headers["x-token"],
              refresh: response.headers["x-refresh-token"],
            });
          }
        } else {
          console.log(response);
          return false;
        }
      });

    return userscriptdata;
  };

  // Profile requests
  const getUserInfo = async ({ user_id }) => {
    const result = await get_request(`/user/${user_id}`, {
      ...default_request_config,
      headers: {
        ...default_request_config.headers,
        "x-token": authState.user.token,
        "x-refresh-token": authState.user.refresh,
      },
    })
      .then((res) => {
        syncTokens({
          token: res.headers["x-token"],
          refresh: res.headers["x-refresh-token"],
        });
        return res;
      })
      .catch(({ response }) => {
        // set_allow_requests(true);
        if (response !== undefined && response.data !== undefined) {
          if (response.data.status === 401) {
            logout();
          } else {
            syncTokens({
              token: response.headers["x-token"],
              refresh: response.headers["x-refresh-token"],
            });
          }
        } else {
          console.log(response);
          return false;
        }
      });

    return result;
  };

  // Profile requests
  const saveUserInfo = async (user) => {
    const result = await put_request(
      `/user/${user._id}`,
      {
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        year: user.year,
        university: user.university,
        faculty: user.faculty,
      },
      {
        ...default_request_config,
        headers: {
          ...default_request_config.headers,
          "x-token": authState.user.token,
          "x-refresh-token": authState.user.refresh,
        },
      }
    )
      .then((res) => {
        syncTokens({
          token: res.headers["x-token"],
          refresh: res.headers["x-refresh-token"],
        });
        return res;
      })
      .catch(({ response }) => {
        // set_allow_requests(true);
        if (response !== undefined && response.data !== undefined) {
          if (response.data.status === 401) {
            logout();
          } else {
            syncTokens({
              token: response.headers["x-token"],
              refresh: response.headers["x-refresh-token"],
            });
          }
        } else {
          console.log(response);
          return false;
        }
      });

    return result;
  };

  // Profile requests
  const editScriptInfo = async ({ ...data }) => {
    console.log("Data in App: ", data);
    const formData = new FormData();
    formData.append("name", data.data.name);
    formData.append("author", JSON.stringify(data.data.author));
    formData.append("keywords", JSON.stringify(data.data.keywords));
    formData.append("category", data.data.category.toLowerCase());
    formData.append("year", data.data.year);
    formData.append("info", data.data.info);
    formData.append("isbn", data.data.isbn);
    formData.append("publishing", data.data.publishing);
    formData.append("published", data.data.published);
    formData.append("free", data.data.free);
    formData.append("city", data.data.city);
    formData.append("publisher", data.data.publisher);
    formData.append("lang", data.data.lang);
    formData.append("publishing_link", data.data.publishing_link);
    formData.append("licence", data.data.licence);
    formData.append("licence_link", data.data.licence_link);
    if (Object.keys(data.file).length !== 0) {
      formData.append("files", data.file.image);
    }
    if (data.data.free == false) {
      formData.append("pricing", data.data.pricing);
    }

    const result = await put_request(`/script/${data.data._id}`, formData, {
      ...multipart_request_config,
      headers: {
        ...default_request_config.headers,
        "x-token": authState.user.token,
        "x-refresh-token": authState.user.refresh,
      },
    })
      .then((res) => {
        syncTokens({
          token: res.headers["x-token"],
          refresh: res.headers["x-refresh-token"],
        });
        return res.data;
      })
      .catch(({ response }) => {
        // set_allow_requests(true);
        if (response !== undefined && response.data !== undefined) {
          if (response.data.status === 401) {
            logout();
          } else {
            syncTokens({
              token: response.headers["x-token"],
              refresh: response.headers["x-refresh-token"],
            });
          }
          return response;
        } else {
          console.log(response);
          return false;
        }
      });
    return result;
  };

  const uploadScriptScraper = async (data) => {
    const image = new File([data.file.image], "image.jpeg", {
      type: data.file.image.type,
    });

    const pdf = new File([data.file.pdf], "book.pdf", {
      type: data.file.pdf.type,
    });

    const formData = new FormData();
    formData.append("files", image);
    formData.append("files", pdf);
    formData.append("name", data.data.name);
    formData.append("author", JSON.stringify(data.data.author));
    formData.append("keywords", JSON.stringify(data.data.keywords));
    formData.append("category", data.data.category.toLowerCase());
    formData.append("year", parseInt(data.data.date_published.substring(0, 4)));
    formData.append("info", data.data.description);
    formData.append("isbn", data.data.isbn);
    formData.append("publishing", data.data.publishing);
    formData.append("published", true);
    formData.append("free", true);
    formData.append("city", data.data.location);
    /* iC_Owoq */
    formData.append("publisher", "0tV96HP");
    formData.append("lang", data.data.language);
    formData.append("publishing_link", data.data.publishing_url);
    formData.append("licence", data.data.license);
    formData.append("licence_link", data.data.license_url);

    const result = await post_request(`/script/scraper`, formData, {
      ...multipart_request_config,
      headers: {
        "x-token": authState.user.token,
        "x-refresh-token": authState.user.refresh,
      },
    })
      .then((res) => {
        syncTokens({
          token: res.headers["x-token"],
          refresh: res.headers["x-refresh-token"],
        });
        return res;
      })
      .catch(({ response }) => {
        // set_allow_requests(true);
        if (response !== undefined && response.data !== undefined) {
          if (response.data.status === 401) {
            console.log("res 401");
            logout();
          } else {
            syncTokens({
              token: response.headers["x-token"],
              refresh: response.headers["x-refresh-token"],
            });
          }
          return response;
        } else {
          console.log(response);
          return response;
        }
      });

    return result;
  };

  const editUserPassword = async ({ user_id, password }) => {
    const result = await put_request(
      `/user/${user_id}/password`,
      {
        password: password,
      },
      {
        ...default_request_config,
        headers: {
          ...default_request_config.headers,
          "x-token": authState.user.token,
          "x-refresh-token": authState.user.refresh,
        },
      }
    )
      .then((res) => {
        syncTokens({
          token: res.headers["x-token"],
          refresh: res.headers["x-refresh-token"],
        });
        return res;
      })
      .catch(({ response }) => {
        // set_allow_requests(true);
        if (response !== undefined && response.data !== undefined) {
          if (response.data.status === 401) {
            console.log("res 401");
            logout();
          } else {
            syncTokens({
              token: response.headers["x-token"],
              refresh: response.headers["x-refresh-token"],
            });
          }
        } else {
          console.log(response);
          return false;
        }
      });

    return result;
  };

  const getScriptPdf = async (id) => {
    const scriptFile = await get_request_blob(`/script/pdf/${id}`, {
      ...multipart_request_config,
      headers: {
        ...default_request_config.headers,
        "x-token": authState.user.token,
        "x-refresh-token": authState.user.refresh,
      },
    })
      .then((res) => {
        syncTokens({
          token: res.headers["x-token"],
          refresh: res.headers["x-refresh-token"],
        });
        return res.data;
      })
      .catch(({ response }) => {
        console.log(response);
        // set_allow_requests(true);
        if (response !== undefined && response.data !== undefined) {
          if (response.data.status === 401 || response.status == 401) {
            console.log("res 401");
            logout();
          } else {
            syncTokens({
              token: response.headers["x-token"],
              refresh: response.headers["x-refresh-token"],
            });
          }
        } else {
          console.log(response);
          return false;
        }
      });
    return scriptFile;
  };

  const uploadScript = async ({ ...data }) => {
    const authors = data.authors;
    const keywords = data.keywords;
    console.log(data.authors);
    console.log(data.keywords);
    const formData = new FormData();
    formData.append("files", data.files.image);
    formData.append("files", data.files.pdf);
    formData.append("name", data.data.title);
    formData.append("year", data.data.year);
    formData.append("isbn", data.data.isbn);
    formData.append("info", data.data.info);
    formData.append("publisher", data.data.publisher);
    formData.append("lang", data.data.lang);
    formData.append("free", data.data.free);
    formData.append("city", data.data.city);
    formData.append("publishing", data.data.publishing);
    formData.append("author", JSON.stringify(authors));
    formData.append("category", data.data.category.toLowerCase());
    formData.append("keywords", JSON.stringify(keywords));
    formData.append("published", data.data.published);
    formData.append("publishing_link", data.data.publishing_link);
    formData.append("licence", data.data.licence);
    formData.append("licence_link", data.data.licence_link);

    // Check if book is free, if not, set pricing
    if (data.data.free !== true) {
      formData.append("pricing", data.data.pricing);
    }

    // Check if publisher is sending the request for script creation
    if (data.data.publisher_request == true) {
      formData.append("publisher_request", true);
    }

    console.log(formData.values("author"));
    const result = await post_request(`/script`, formData, {
      ...multipart_request_config,
      headers: {
        ...default_request_config.headers,
        "x-token": authState.user.token,
        "x-refresh-token": authState.user.refresh,
      },
    })
      .then((res) => {
        syncTokens({
          token: res.headers["x-token"],
          refresh: res.headers["x-refresh-token"],
        });
        return res;
      })
      .catch(({ response }) => {
        console.log(response);
        // set_allow_requests(true);
        if (response !== undefined && response.data !== undefined) {
          if (response.data.status === 401) {
            console.log("res 401");
            logout();
          } else {
            syncTokens({
              token: response.headers["x-token"],
              refresh: response.headers["x-refresh-token"],
            });
          }
          return response;
        } else {
          console.log(response);
          return response;
        }
      });
    console.log("Result in App upload script: ", result);
    return result;
  };

  const getScrapedScriptPdf = async (id) => {
    const scriptFile = await get_request_scraper(`/api/pdf/${id}`, {
      headers: { auth: "6oLjT4ua5VwcIlHc7EJF" },
      responseType: "blob",
    })
      .then((res) => {
        syncTokens({
          token: res.headers["x-token"],
          refresh: res.headers["x-refresh-token"],
        });
        return res.data;
      })
      .catch(({ response }) => {
        console.log(response);
        // set_allow_requests(true);
        if (response !== undefined && response.data !== undefined) {
          if (response.data.status === 401 || response.status == 401) {
            console.log("res 401");
            logout();
          } else {
            syncTokens({
              token: response.headers["x-token"],
              refresh: response.headers["x-refresh-token"],
            });
          }
        } else {
          console.log(response);
          return false;
        }
      });
    return scriptFile;
  };

  const getAllUsers = async () => {
    const result = await get_request(`/admin/users`, {
      ...default_request_config,
      headers: {
        ...default_request_config.headers,
        "x-token": authState.user.token,
        "x-refresh-token": authState.user.refresh,
      },
    })
      .then((res) => {
        syncTokens({
          token: res.headers["x-token"],
          refresh: res.headers["x-refresh-token"],
        });
        return res;
      })
      .catch(({ response }) => {
        // set_allow_requests(true);
        if (response !== undefined && response.data !== undefined) {
          if (response.data.status === 401) {
            console.log("res 401");
            logout();
          } else {
            syncTokens({
              token: response.headers["x-token"],
              refresh: response.headers["x-refresh-token"],
            });
          }
        } else {
          console.log(response);
          return false;
        }
      });

    return result;
  };

  const getAdmin = async (id) => {
    const result = await get_request(`/admin/${id}`, {
      ...default_request_config,
      headers: {
        ...default_request_config.headers,
        "x-token": authState.user.token,
        "x-refresh-token": authState.user.refresh,
      },
    })
      .then((res) => {
        console.log(res);
        syncTokens({
          token: res.headers["x-token"],
          refresh: res.headers["x-refresh-token"],
        });
        return res;
      })
      .catch(({ response }) => {
        // set_allow_requests(true);
        if (response !== undefined && response.data !== undefined) {
          if (response.data.status === 401) {
            logout();
          } else {
            syncTokens({
              token: response.headers["x-token"],
              refresh: response.headers["x-refresh-token"],
            });
          }
        } else {
          console.log(response);
          return response;
        }
        return response;
      });

    return result;
  };

  const editAdmin = async (data) => {
    console.log(data);
    const result = await put_request(
      `/admin/${data._id}`,
      { ...data },
      {
        ...default_request_config,
        headers: {
          ...default_request_config.headers,
          "x-token": authState.user.token,
          "x-refresh-token": authState.user.refresh,
        },
      }
    )
      .then((res) => {
        syncTokens({
          token: res.headers["x-token"],
          refresh: res.headers["x-refresh-token"],
        });
        return res;
      })
      .catch(({ response }) => {
        // set_allow_requests(true);
        if (response !== undefined && response.data !== undefined) {
          if (response.data.status === 401) {
            logout();
          } else {
            syncTokens({
              token: response.headers["x-token"],
              refresh: response.headers["x-refresh-token"],
            });
          }
        } else {
          console.log(response);
          return false;
        }
      });

    return result;
  };

  const createPublisher = async (data) => {
    console.log(data);
    const result = await post_request(
      `/publisher/`,
      { ...data },
      {
        ...default_request_config,
        headers: {
          ...default_request_config.headers,
          "x-token": authState.user.token,
          "x-refresh-token": authState.user.refresh,
        },
      }
    )
      .then((res) => {
        syncTokens({
          token: res.headers["x-token"],
          refresh: res.headers["x-refresh-token"],
        });
        return res;
      })
      .catch(({ response }) => {
        // set_allow_requests(true);
        if (response !== undefined && response.data !== undefined) {
          if (response.data.status === 401) {
            logout();
          } else {
            syncTokens({
              token: response.headers["x-token"],
              refresh: response.headers["x-refresh-token"],
            });
          }
        } else {
          console.log(response);
          return responses;
        }
        return response;
      });

    return result;
  };

  const createAdmin = async (data) => {
    const result = await post_request(
      `/admin/`,
      { ...data },
      {
        ...default_request_config,
        headers: {
          ...default_request_config.headers,
          "x-token": authState.user.token,
          "x-refresh-token": authState.user.refresh,
        },
      }
    )
      .then((res) => {
        syncTokens({
          token: res.headers["x-token"],
          refresh: res.headers["x-refresh-token"],
        });
        return res;
      })
      .catch(({ response }) => {
        // set_allow_requests(true);
        if (response !== undefined && response.data !== undefined) {
          if (response.data.status === 401) {
            logout();
          } else {
            syncTokens({
              token: response.headers["x-token"],
              refresh: response.headers["x-refresh-token"],
            });
          }
        } else {
          console.log(response);
          return responses;
        }
        return response;
      });

    return result;
  };

  const generateUser = async (data) => {
    const result = await post_request(
      `/admin/user`,
      { ...data },
      {
        ...default_request_config,
        headers: {
          ...default_request_config.headers,
          "x-token": authState.user.token,
          "x-refresh-token": authState.user.refresh,
        },
      }
    )
      .then((res) => {
        syncTokens({
          token: res.headers["x-token"],
          refresh: res.headers["x-refresh-token"],
        });
        return res;
      })
      .catch(({ response }) => {
        // set_allow_requests(true);
        if (response !== undefined && response.data !== undefined) {
          if (response.data.status === 401) {
            logout();
          } else {
            syncTokens({
              token: response.headers["x-token"],
              refresh: response.headers["x-refresh-token"],
            });
          }
        } else {
          console.log(response);
          return responses;
        }
        return response;
      });

    return result;
  };

  const getAllPublishers = async () => {
    const result = await get_request(`/publisher/`, {
      ...default_request_config,
      headers: {
        ...default_request_config.headers,
        "x-token": authState.user.token,
        "x-refresh-token": authState.user.refresh,
      },
    })
      .then((res) => {
        syncTokens({
          token: res.headers["x-token"],
          refresh: res.headers["x-refresh-token"],
        });
        return res;
      })
      .catch(({ response }) => {
        // set_allow_requests(true);
        if (response !== undefined && response.data !== undefined) {
          if (response.data.status === 401) {
            logout();
          } else {
            syncTokens({
              token: response.headers["x-token"],
              refresh: response.headers["x-refresh-token"],
            });
          }
        } else {
          console.log(response);
          return false;
        }
      });

    return result;
  };

  const getPublisher = async (id) => {
    const result = await get_request(`/publisher/${id}`, {
      ...default_request_config,
      headers: {
        ...default_request_config.headers,
        "x-token": authState.user.token,
        "x-refresh-token": authState.user.refresh,
      },
    })
      .then((res) => {
        syncTokens({
          token: res.headers["x-token"],
          refresh: res.headers["x-refresh-token"],
        });
        return res;
      })
      .catch(({ response }) => {
        // set_allow_requests(true);
        if (response !== undefined && response.data !== undefined) {
          if (response.data.status === 401) {
            logout();
          } else {
            syncTokens({
              token: response.headers["x-token"],
              refresh: response.headers["x-refresh-token"],
            });
          }
        } else {
          console.log(response);
          return false;
        }
      });

    return result;
  };

  // ** Viewer HG
  async function saveHighlightRequest({ ...data }) {
    console.log(data);
    return await post_request(
      `/highlight/script/${data.script_id}`,
      {
        user_id: authState.user.user_id,
        page: data.page,
        textLayer: data.textLayer,
      },
      {
        ...default_request_config,
        headers: {
          ...default_request_config.headers,
          "x-token": authState.user.token,
          "x-refresh-token": authState.user.refresh,
        },
      }
    )
      .then((res) => {
        syncTokens({
          token: res.headers["x-token"],
          refresh: res.headers["x-refresh-token"],
        });
        return res.data;
      })
      .catch(({ response }) => {
        console.log(response);
        // set_allow_requests(true);
        if (response !== undefined && response.data !== undefined) {
          if (response.data.status === 401) {
            logout();
          } else {
            syncTokens({
              token: response.headers["x-token"],
              refresh: response.headers["x-refresh-token"],
            });
          }
        } else {
          console.log(response);
          return false;
        }
      });
  }

  async function getHighlights({ ...data }) {
    const response = await get_request(
      `/highlight/script/${data.script_id}/user/${data.user_id}/`,
      {
        ...default_request_config,
        headers: {
          ...default_request_config.headers,
          "x-token": authState.user.token,
          "x-refresh-token": authState.user.refresh,
        },
      }
    )
      .then((res) => {
        syncTokens({
          token: res.headers["x-token"],
          refresh: res.headers["x-refresh-token"],
        });
        return res.data;
      })
      .catch(({ response }) => {
        // set_allow_requests(true);
        if (response !== undefined && response.data !== undefined) {
          if (response.data.status === 401) {
            logout();
          } else {
            syncTokens({
              token: response.headers["x-token"],
              refresh: response.headers["x-refresh-token"],
            });
          }
        } else {
          console.log(response);
          return false;
        }
      });
    return response;
  }

  async function getPdfPageNumber({ ...data }) {
    const response = await get_request(
      `/highlight/script/${data.script_id}/user/${authState.user.user_id}/config`,
      {
        ...default_request_config,
        headers: {
          ...default_request_config.headers,
          "x-token": authState.user.token,
          "x-refresh-token": authState.user.refresh,
        },
      }
    )
      .then((res) => {
        syncTokens({
          token: res.headers["x-token"],
          refresh: res.headers["x-refresh-token"],
        });
        return res.data;
      })
      .catch(({ response }) => {
        // set_allow_requests(true);
        if (response !== undefined && response.data !== undefined) {
          if (response.data.status === 401) {
            logout();
          } else {
            syncTokens({
              token: response.headers["x-token"],
              refresh: response.headers["x-refresh-token"],
            });
          }
        } else {
          console.log(response);
          return false;
        }
      });
    return response;
  }

  async function savePdfPageNumber({ ...data }) {
    return await post_request(
      `/highlight/script/${data.script_id}/user/${authState.user.user_id}/config`,
      {
        page: data.page,
        dark_mode: data.darkMode,
        info: data.isInfo,
      },
      {
        ...default_request_config,
        headers: {
          ...default_request_config.headers,
          "x-token": authState.user.token,
          "x-refresh-token": authState.user.refresh,
        },
      }
    )
      .then((res) => {
        syncTokens({
          token: res.headers["x-token"],
          refresh: res.headers["x-refresh-token"],
        });
        return res.data;
      })
      .catch(({ response }) => {
        // set_allow_requests(true);
        if (response !== undefined && response.data !== undefined) {
          if (response.data.status === 401) {
            logout();
          } else {
            syncTokens({
              token: response.headers["x-token"],
              refresh: response.headers["x-refresh-token"],
            });
          }
        } else {
          console.log(response);
          return false;
        }
      });
  }

  async function savePdfDarkMode({ ...data }) {
    return await post_request(
      `/highlight/script/${data.script_id}/user/${authState.user.user_id}/config`,
      {
        page: data.page,
        dark_mode: !data.darkMode,
      },
      {
        ...default_request_config,
        headers: {
          ...default_request_config.headers,
          "x-token": authState.user.token,
          "x-refresh-token": authState.user.refresh,
        },
      }
    )
      .then((res) => {
        syncTokens({
          token: res.headers["x-token"],
          refresh: res.headers["x-refresh-token"],
        });
        return res;
      })
      .catch(({ response }) => {
        // set_allow_requests(true);
        if (response !== undefined && response.data !== undefined) {
          if (response.data.status === 401) {
            logout();
          } else {
            syncTokens({
              token: response.headers["x-token"],
              refresh: response.headers["x-refresh-token"],
            });
          }
        } else {
          console.log(response);
          return false;
        }
      });
  }

  async function getAdminLibrary() {
    const response = await get_request(`/library/admin`, {
      ...default_request_config,
      headers: {
        ...default_request_config.headers,
        "x-token": authState.user.token,
        "x-refresh-token": authState.user.refresh,
      },
    })
      .then((res) => {
        syncTokens({
          token: res.headers["x-token"],
          refresh: res.headers["x-refresh-token"],
        });
        return res;
      })
      .catch(({ response }) => {
        // set_allow_requests(true);
        if (response !== undefined && response.data !== undefined) {
          if (response.data.status === 401) {
            logout();
          } else {
            syncTokens({
              token: response.headers["x-token"],
              refresh: response.headers["x-refresh-token"],
            });
          }
        } else {
          console.log(response);
          return false;
        }
      });

    return response;
  }
  // * End of Viewer HG

  async function editPublisherData({ ...values }) {
    const response = await put_request(
      `/publisher/${values.id}`,
      { ...values },
      {
        ...default_request_config,
        headers: {
          ...default_request_config.headers,
          "x-token": authState.user.token,
          "x-refresh-token": authState.user.refresh,
        },
      }
    )
      .then((res) => {
        syncTokens({
          token: res.headers["x-token"],
          refresh: res.headers["x-refresh-token"],
        });
        return res;
      })
      .catch(({ response }) => {
        // set_allow_requests(true);
        if (response !== undefined && response.data !== undefined) {
          if (response.data.status === 401) {
            logout();
          } else {
            syncTokens({
              token: response.headers["x-token"],
              refresh: response.headers["x-refresh-token"],
            });
          }
        } else {
          console.log(response);
          return false;
        }
      });

    return response;
  }

  async function requestScriptChange({ ...values }) {
    console.log(values);
    const response = await post_request(
      `/publisher/${values.id}/script-change`,
      {
        message: values.message,
        script_id: values.script_id,
      },
      {
        ...default_request_config,
        headers: {
          ...default_request_config.headers,
          "x-token": authState.user.token,
          "x-refresh-token": authState.user.refresh,
        },
      }
    )
      .then((res) => {
        syncTokens({
          token: res.headers["x-token"],
          refresh: res.headers["x-refresh-token"],
        });
        return res;
      })
      .catch(({ response }) => {
        // set_allow_requests(true);
        if (response !== undefined && response.data !== undefined) {
          if (response.data.status === 401) {
            logout();
          } else {
            syncTokens({
              token: response.headers["x-token"],
              refresh: response.headers["x-refresh-token"],
            });
          }
        } else {
          console.log(response);
          return false;
        }
      });

    return response;
  }
  // Analytics
  async function getAnalyticsForScript({ ...values }) {
    const response = await get_request(
      `/analytics/publisher/${values.publisher_id}/script/${values.script_id}`,
      {
        ...default_request_config,
        headers: {
          ...default_request_config.headers,
          "x-token": authState.user.token,
          "x-refresh-token": authState.user.refresh,
        },
      }
    )
      .then((res) => {
        syncTokens({
          token: res.headers["x-token"],
          refresh: res.headers["x-refresh-token"],
        });
        return res;
      })
      .catch(({ response }) => {
        // set_allow_requests(true);
        if (response !== undefined && response.data !== undefined) {
          if (response.data.status === 401) {
            logout();
          } else {
            syncTokens({
              token: response.headers["x-token"],
              refresh: response.headers["x-refresh-token"],
            });
          }
        } else {
          console.log(response);
          return false;
        }
      });

    return response;
  }
  async function getPublisherPayData({ ...values }) {
    const response = await get_request(
      `/analytics/publisher/${values.publisher_id}/month/${values.month}/pay`,
      {
        ...default_request_config,
        headers: {
          ...default_request_config.headers,
          "x-token": authState.user.token,
          "x-refresh-token": authState.user.refresh,
        },
      }
    )
      .then((res) => {
        syncTokens({
          token: res.headers["x-token"],
          refresh: res.headers["x-refresh-token"],
        });
        return res;
      })
      .catch(({ response }) => {
        // set_allow_requests(true);
        if (response !== undefined && response.data !== undefined) {
          if (response.data.status === 401) {
            logout();
          } else {
            syncTokens({
              token: response.headers["x-token"],
              refresh: response.headers["x-refresh-token"],
            });
          }
        } else {
          console.log(response);
          return false;
        }
      });

    return response;
  }
  async function getPublisherViews({ ...values }) {
    const response = await get_request(
      `/analytics/publisher/${values.publisher_id}/views`,
      {
        ...default_request_config,
        headers: {
          ...default_request_config.headers,
          "x-token": authState.user.token,
          "x-refresh-token": authState.user.refresh,
        },
      }
    )
      .then((res) => {
        syncTokens({
          token: res.headers["x-token"],
          refresh: res.headers["x-refresh-token"],
        });
        return res;
      })
      .catch(({ response }) => {
        // set_allow_requests(true);
        if (response !== undefined && response.data !== undefined) {
          if (response.data.status === 401) {
            logout();
          } else {
            syncTokens({
              token: response.headers["x-token"],
              refresh: response.headers["x-refresh-token"],
            });
          }
        } else {
          console.log(response);
          return false;
        }
      });

    return response;
  }
  async function getPublisherPayGraphData({ ...values }) {
    const response = await get_request(
      `/analytics/publisher/${values.publisher_id}/months/pay`,
      {
        ...default_request_config,
        headers: {
          ...default_request_config.headers,
          "x-token": authState.user.token,
          "x-refresh-token": authState.user.refresh,
        },
      }
    )
      .then((res) => {
        syncTokens({
          token: res.headers["x-token"],
          refresh: res.headers["x-refresh-token"],
        });
        return res;
      })
      .catch(({ response }) => {
        // set_allow_requests(true);
        if (response !== undefined && response.data !== undefined) {
          if (response.data.status === 401) {
            logout();
          } else {
            syncTokens({
              token: response.headers["x-token"],
              refresh: response.headers["x-refresh-token"],
            });
          }
        } else {
          console.log(response);
          return false;
        }
      });

    return response;
  }

  async function getAdminTotalViews({ ...values }) {
    const response = await get_request(
      `/analytics/admin/views/${values.type}`,
      {
        ...default_request_config,
        headers: {
          ...default_request_config.headers,
          "x-token": authState.user.token,
          "x-refresh-token": authState.user.refresh,
        },
      }
    )
      .then((res) => {
        syncTokens({
          token: res.headers["x-token"],
          refresh: res.headers["x-refresh-token"],
        });
        //console.log(res);
        return res;
      })
      .catch(({ response }) => {
        // set_allow_requests(true);
        if (response !== undefined && response.data !== undefined) {
          if (response.data.status === 401) {
            logout();
          } else {
            syncTokens({
              token: response.headers["x-token"],
              refresh: response.headers["x-refresh-token"],
            });
          }
        } else {
          console.log(response);
          return false;
        }
      });

    return response;
  }

  async function getAdminTotalProfit({ ...values }) {
    const response = await get_request(
      `/analytics/admin/profits/${values.type}`,
      {
        ...default_request_config,
        headers: {
          ...default_request_config.headers,
          "x-token": authState.user.token,
          "x-refresh-token": authState.user.refresh,
        },
      }
    )
      .then((res) => {
        syncTokens({
          token: res.headers["x-token"],
          refresh: res.headers["x-refresh-token"],
        });
        return res;
      })
      .catch(({ response }) => {
        // set_allow_requests(true);
        if (response !== undefined && response.data !== undefined) {
          if (response.data.status === 401) {
            logout();
          } else {
            syncTokens({
              token: response.headers["x-token"],
              refresh: response.headers["x-refresh-token"],
            });
          }
        } else {
          console.log(response);
          return false;
        }
      });

    return response;
  }

  async function getAdminTotalPayments({ ...values }) {
    const response = await get_request(
      `/analytics/admin/payments/${values.type}`,
      {
        ...default_request_config,
        headers: {
          ...default_request_config.headers,
          "x-token": authState.user.token,
          "x-refresh-token": authState.user.refresh,
        },
      }
    )
      .then((res) => {
        syncTokens({
          token: res.headers["x-token"],
          refresh: res.headers["x-refresh-token"],
        });
        return res;
      })
      .catch(({ response }) => {
        // set_allow_requests(true);
        if (response !== undefined && response.data !== undefined) {
          if (response.data.status === 401) {
            logout();
          } else {
            syncTokens({
              token: response.headers["x-token"],
              refresh: response.headers["x-refresh-token"],
            });
          }
        } else {
          console.log(response);
          return false;
        }
      });

    return response;
  }

  async function postScriptAnalyticsData({ ...values }) {
    const response = await post_request(
      `/analytics/`,
      {
        script_id: values.script_id,
        user_id: values.user_id,
        pages: values.page,
        full_pages: values.full_page,
      },
      {
        ...default_request_config,
        headers: {
          ...default_request_config.headers,
          "x-token": authState.user.token,
          "x-refresh-token": authState.user.refresh,
        },
      }
    )
      .then((res) => {
        syncTokens({
          token: res.headers["x-token"],
          refresh: res.headers["x-refresh-token"],
        });
        return res;
      })
      .catch(({ response }) => {
        // set_allow_requests(true);
        if (response !== undefined && response.data !== undefined) {
          if (response.data.status === 401) {
            logout();
          } else {
            syncTokens({
              token: response.headers["x-token"],
              refresh: response.headers["x-refresh-token"],
            });
          }
        } else {
          console.log(response);
          return false;
        }
      });

    return response;
  }
  async function postScriptAnalyticsOpen({ ...values }) {
    const response = await post_request(
      `/analytics/script/${values.script_id}`,
      {
        publisher_id: values.publisher_id,
      },
      {
        ...default_request_config,
        headers: {
          ...default_request_config.headers,
          "x-token": authState.user.token,
          "x-refresh-token": authState.user.refresh,
        },
      }
    )
      .then((res) => {
        syncTokens({
          token: res.headers["x-token"],
          refresh: res.headers["x-refresh-token"],
        });
        return res;
      })
      .catch(({ response }) => {
        // set_allow_requests(true);
        if (response !== undefined && response.data !== undefined) {
          if (response.data.status === 401) {
            logout();
          } else {
            syncTokens({
              token: response.headers["x-token"],
              refresh: response.headers["x-refresh-token"],
            });
          }
        } else {
          console.log(response);
          return false;
        }
      });

    return response;
  }

  async function deleteScript({ ...values }) {
    const response = await delete_request(`/script/${values.script_id}`, {
      ...default_request_config,
      headers: {
        ...default_request_config.headers,
        "x-token": authState.user.token,
        "x-refresh-token": authState.user.refresh,
      },
    })
      .then((res) => {
        syncTokens({
          token: res.headers["x-token"],
          refresh: res.headers["x-refresh-token"],
        });
        return res;
      })
      .catch(({ response }) => {
        // set_allow_requests(true);
        if (response !== undefined && response.data !== undefined) {
          if (response.data.status === 401) {
            logout();
          } else {
            syncTokens({
              token: response.headers["x-token"],
              refresh: response.headers["x-refresh-token"],
            });
          }
        } else {
          console.log(response);
          return false;
        }
      });

    return response;
  }
  async function deleteUser({ ...values }) {
    const response = await delete_request(`/user/${values.user_id}`, {
      ...default_request_config,
      headers: {
        ...default_request_config.headers,
        "x-token": authState.user.token,
        "x-refresh-token": authState.user.refresh,
      },
    })
      .then((res) => {
        syncTokens({
          token: res.headers["x-token"],
          refresh: res.headers["x-refresh-token"],
        });
        return res;
      })
      .catch(({ response }) => {
        // set_allow_requests(true);
        if (response !== undefined && response.data !== undefined) {
          if (response.data.status === 401) {
            logout();
          } else {
            syncTokens({
              token: response.headers["x-token"],
              refresh: response.headers["x-refresh-token"],
            });
          }
        } else {
          console.log(response);
          return false;
        }
      });

    return response;
  }

  async function deletePublisher({ ...values }) {
    const response = await delete_request(`/publisher/${values.publisher_id}`, {
      ...default_request_config,
      headers: {
        ...default_request_config.headers,
        "x-token": authState.user.token,
        "x-refresh-token": authState.user.refresh,
      },
    })
      .then((res) => {
        syncTokens({
          token: res.headers["x-token"],
          refresh: res.headers["x-refresh-token"],
        });
        return res;
      })
      .catch(({ response }) => {
        // set_allow_requests(true);
        if (response !== undefined && response.data !== undefined) {
          if (response.data.status === 401) {
            logout();
          } else {
            syncTokens({
              token: response.headers["x-token"],
              refresh: response.headers["x-refresh-token"],
            });
          }
        } else {
          console.log(response);
          return false;
        }
      });

    return response;
  }

  async function getCategories() {
    const response = await get_request(`/categories`, {
      ...default_request_config,
      headers: {
        ...default_request_config.headers,
        "x-token": authState.user.token,
        "x-refresh-token": authState.user.refresh,
      },
    })
      .then((res) => {
        syncTokens({
          token: res.headers["x-token"],
          refresh: res.headers["x-refresh-token"],
        });
        return res;
      })
      .catch(({ response }) => {
        // set_allow_requests(true);
        if (response !== undefined && response.data !== undefined) {
          if (response.data.status === 401) {
            logout();
          } else {
            syncTokens({
              token: response.headers["x-token"],
              refresh: response.headers["x-refresh-token"],
            });
          }
        } else {
          console.log(response);
          return false;
        }
      });

    return response;
  }

  async function editCategory(values) {
    console.log(values);
    const response = await put_request(
      `/categories/${values.id}`,
      {
        name: values.name,
      },
      {
        ...default_request_config,
        headers: {
          ...default_request_config.headers,
          "x-token": authState.user.token,
          "x-refresh-token": authState.user.refresh,
        },
      }
    )
      .then((res) => {
        syncTokens({
          token: res.headers["x-token"],
          refresh: res.headers["x-refresh-token"],
        });
        return res;
      })
      .catch(({ response }) => {
        // set_allow_requests(true);
        if (response !== undefined && response.data !== undefined) {
          if (response.data.status === 401) {
            logout();
          } else {
            syncTokens({
              token: response.headers["x-token"],
              refresh: response.headers["x-refresh-token"],
            });
          }
        } else {
          console.log(response);
          return false;
        }
      });

    return response;
  }

  async function deleteCategory(values) {
    console.log(values);
    const response = await delete_request(`/categories/${values.id}`, {
      ...default_request_config,
      headers: {
        ...default_request_config.headers,
        "x-token": authState.user.token,
        "x-refresh-token": authState.user.refresh,
      },
    })
      .then((res) => {
        syncTokens({
          token: res.headers["x-token"],
          refresh: res.headers["x-refresh-token"],
        });
        return res;
      })
      .catch(({ response }) => {
        // set_allow_requests(true);
        if (response !== undefined && response.data !== undefined) {
          if (response.data.status === 401) {
            logout();
          } else {
            syncTokens({
              token: response.headers["x-token"],
              refresh: response.headers["x-refresh-token"],
            });
          }
        } else {
          console.log(response);
          return false;
        }
      });

    return response;
  }

  async function cancelSubscription(values) {
    console.log(values);
    const response = await delete_request(`/subscription/delete/${values.id}`, {
      ...default_request_config,
      headers: {
        ...default_request_config.headers,
        "x-token": authState.user.token,
        "x-refresh-token": authState.user.refresh,
      },
    })
      .then((res) => {
        syncTokens({
          token: res.headers["x-token"],
          refresh: res.headers["x-refresh-token"],
        });
        return res;
      })
      .catch(({ response }) => {
        // set_allow_requests(true);
        if (response !== undefined && response.data !== undefined) {
          if (response.data.status === 401) {
            logout();
          } else {
            syncTokens({
              token: response.headers["x-token"],
              refresh: response.headers["x-refresh-token"],
            });
          }
        } else {
          console.log(response);
          return false;
        }
      });

    return response;
  }

  async function renewSubscription(values) {
    const response = await put_request(
      `/subscription/renew/${values.id}`,
      {},
      {
        ...default_request_config,
        headers: {
          ...default_request_config.headers,
          "x-token": authState.user.token,
          "x-refresh-token": authState.user.refresh,
        },
      }
    )
      .then((res) => {
        syncTokens({
          token: res.headers["x-token"],
          refresh: res.headers["x-refresh-token"],
        });
        return res;
      })
      .catch(({ response }) => {
        // set_allow_requests(true);
        if (response !== undefined && response.data !== undefined) {
          if (response.data.status === 401) {
            logout();
          } else {
            syncTokens({
              token: response.headers["x-token"],
              refresh: response.headers["x-refresh-token"],
            });
          }
        } else {
          console.log(response);
          return false;
        }
      });

    return response;
  }

  async function changeSubscription(values) {
    const response = await put_request(
      `/subscription/change/${values.id}`,
      {
        new_sub: values.new_sub,
      },
      {
        ...default_request_config,
        headers: {
          ...default_request_config.headers,
          "x-token": authState.user.token,
          "x-refresh-token": authState.user.refresh,
        },
      }
    )
      .then((res) => {
        syncTokens({
          token: res.headers["x-token"],
          refresh: res.headers["x-refresh-token"],
        });
        return res;
      })
      .catch(({ response }) => {
        // set_allow_requests(true);
        if (response !== undefined && response.data !== undefined) {
          if (response.data.status === 401) {
            logout();
          } else {
            syncTokens({
              token: response.headers["x-token"],
              refresh: response.headers["x-refresh-token"],
            });
          }
        } else {
          console.log(response);
          return false;
        }
      });

    return response;
  }

  return (
    <div className="App">
      <CookieBannerComp />
      <Navbar authData={authState} logout={(e) => logout(e)} />
      <div className="content">
        <Switch>
          <Route exact path="/viewer/:id/:scraper">
            <PdfViewer
              logout={(e) => logout(e)}
              getScriptPdf={(e) => getScriptPdf(e)}
              getScrapedScriptPdf={(e) => getScrapedScriptPdf(e)}
              saveHighlightRequest={(e) => saveHighlightRequest(e)}
              getHighlights={(e) => getHighlights(e)}
              getPdfPageNumber={(e) => getPdfPageNumber(e)}
              savePdfPageNumber={(e) => savePdfPageNumber(e)}
              savePdfDarkMode={(e) => savePdfDarkMode(e)}
              getScript={(e) => getScript(e)}
              postScriptAnalyticsOpen={(e) => postScriptAnalyticsOpen(e)}
              postScriptAnalyticsData={(e) => postScriptAnalyticsData(e)}
              authData={authState}
            />
          </Route>
          <Route path="/login">
            <Login submit={(e) => login(e)} />
          </Route>
          <Route exact path="/">
            <FrontPage authData={authState} />
          </Route>
          <Route path="/script/:id">
            <ScriptsPage
              getAllPublishers={(e) => getAllPublishers(e)}
              getScript={(e) => getScript(e)}
              saveUserScriptData={(e) => saveUserScriptData(e)}
              isInFavorites={(e) => isInFavorites(e)}
              removeFromFavorites={(e) => removeFromFavorites(e)}
              editScriptInfo={(e) => editScriptInfo(e)}
              getAnalyticsForScript={(e) => getAnalyticsForScript(e)}
              deleteScript={(e) => deleteScript(e)}
              authData={authState}
            />
          </Route>
          <Route path="/scraped-script/:id">
            <ScrapedScriptsPage
              uploadScriptScraper={(e) => uploadScriptScraper(e)}
              setAlert={setScraperSuccessfulAlert}
            />
          </Route>
          <Route path="/library">
            <Library authData={authState} />
          </Route>
          <Route path="/category/:name">
            <LibraryCategoryComponent authData={authState} />
          </Route>
          <Route exact path="/profile">
            <Profile
              renewSubscription={(e) => renewSubscription(e)}
              changeSubscription={(e) => changeSubscription(e)}
              cancelSubscription={(e) => cancelSubscription(e)}
              getAdminLibrary={(e) => getAdminLibrary(e)}
              getPublisher={(e) => getPublisher(e)}
              getAllPublishers={(e) => getAllPublishers(e)}
              createPublisher={(e) => createPublisher(e)}
              uploadScript={(e) => uploadScript(e)}
              saveUserInfo={(e) => saveUserInfo(e)}
              getUserInfo={(e) => getUserInfo(e)}
              getScriptsByIds={(e) => getScriptsByIds(e)}
              editUserPassword={(e) => editUserPassword(e)}
              getAllUsers={(e) => getAllUsers(e)}
              getAdmin={(e) => getAdmin(e)}
              editAdmin={(e) => editAdmin(e)}
              logout={(e) => logout(e)}
              editPublisherData={(e) => editPublisherData(e)}
              requestScriptChange={(e) => requestScriptChange(e)}
              getPublisherPayData={(e) => getPublisherPayData(e)}
              getPublisherViews={(e) => getPublisherViews(e)}
              getPublisherPayGraphData={(e) => getPublisherPayGraphData(e)}
              getAnalyticsForScript={(e) => getAnalyticsForScript(e)}
              authData={authState}
              getAdminTotalPayments={(e) => getAdminTotalPayments(e)}
              getAdminTotalViews={(e) => getAdminTotalViews(e)}
              getAdminTotalProfit={(e) => getAdminTotalProfit(e)}
            />
          </Route>
          <Route path="/profile/all-scripts/:id">
            <ProfileAllScripts
              getPublisher={(e) => getPublisher(e)}
              getScriptsByIds={(e) => getScriptsByIds(e)}
              authData={authState}
            />
          </Route>
          <Route path="/admin/edit-profile">
            <EditAdminProfileComponent
              getAdmin={(e) => getAdmin(e)}
              editAdmin={(e) => editAdmin(e)}
              authData={authState}
              logout={(e) => logout(e)}
            />
          </Route>
          <Route path="/admin/create-user">
            <AdminCreateUser
              createAdmin={(e) => createAdmin(e)}
              createPublisher={(e) => createPublisher(e)}
              generateUser={(e) => generateUser(e)}
            />
          </Route>
          <Route path="/admin/create-script">
            <CreateScript
              uploadScript={(e) => uploadScript(e)}
              getAllPublishers={(e) => getAllPublishers(e)}
              authData={authState}
            />
          </Route>
          <Route path="/admin/get-all-users">
            <AdminUserTable
              getAllUsers={(e) => getAllUsers(e)}
              getAllPublishers={(e) => getAllPublishers(e)}
              authData={authState}
            />
          </Route>
          <Route path="/admin/user/:id">
            <AdminUserProfile
              getUserInfo={(e) => getUserInfo(e)}
              getScriptsByIds={(e) => getScriptsByIds(e)}
              saveUserInfo={(e) => saveUserInfo(e)}
              editUserPassword={(e) => editUserPassword(e)}
              deleteUser={(e) => deleteUser(e)}
              authData={authState}
            />
          </Route>
          <Route path="/admin/publisher/:id">
            <AdminPublisherProfile
              getPublisher={(e) => getPublisher(e)}
              editPublisherData={(e) => editPublisherData(e)}
              getPublisherPayData={(e) => getPublisherPayData(e)}
              getPublisherViews={(e) => getPublisherViews(e)}
              getPublisherPayGraphData={(e) => getPublisherPayGraphData(e)}
              getAnalyticsForScript={(e) => getAnalyticsForScript(e)}
              getScriptsByIds={(e) => getScriptsByIds(e)}
              deletePublisher={(e) => deletePublisher(e)}
              authData={authState}
            />
          </Route>
          <Route path="/admin/get-all-scripts">
            <AdminScriptsTable
              getAdminLibrary={(e) => getAdminLibrary(e)}
              authData={authState}
            />
          </Route>
          <Route path="/scraper">
            <AdminScraperScriptsTable
              getScrapedScripts={(e) => getScrapedScripts(e)}
              setAlert={setScraperSuccessfulAlert}
              alert={scraperSuccessfulAlert}
              authData={authState}
            />
          </Route>

          {/**AdminCategoriesTable */}
          <Route path="/admin/admin-categories">
            <AdminCategoriesTable
              getCategories={(e) => getCategories(e)}
              editCategory={(e) => editCategory(e)}
              deleteCategory={(e) => deleteCategory(e)}
              authData={authState}
            />
          </Route>
          <Route path="/register">
            <Registration />
          </Route>
          <Route path="/gdpr">
            <GDRP />
          </Route>
          <Route path="/vop">
            <VOP />
          </Route>
          <Route path="/thank-you">
            <Thanks />
          </Route>
          <Route path="/forgotten-password">
            <ForgottenPassword />
          </Route>
          <Route path="/verification/:token">
            <EmailVerification />
          </Route>
          <Route path="/change-password/:token">
            <ChangePassword />
          </Route>
          <Route path="/faq">
            <FAQ />
          </Route>
          <Route path="/contact">
            <Contact />
          </Route>
          <Route path="/unsubscribe/:token">
            <UnsubscribeFromEmails />
          </Route>
          <Route path="*">
            <Page404 />
          </Route>
        </Switch>
      </div>
      {history.location.pathname.includes("viewer") ? null : <Footer />}
    </div>
  );
}

export default App;
