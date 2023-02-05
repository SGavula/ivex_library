import React, { useEffect, useState } from "react";
import { validateLogin } from "../../helpers/validators/userforms.validator";
import { useHistory } from "react-router";
import ReactGA from "react-ga";
import ReactPixel from "react-facebook-pixel";

/* Utils */
import Button from "../../utils/Button/Button.util";
import ErrorAlert from "../../utils/Alerts/ErrorAlert/ErrorAlert.util";

const Login = ({ submit = (f) => f }) => {
  const history = useHistory();
  const [showAlert, setShowAlert] = useState(false);

  // Requests
  const [login_credentials, set_login_credentials] = useState({
    email: "",
    password: "",
  });
  const [errorMessages, setErrorMessages] = useState({});
  const [errorLogin, setErrorLogin] = useState();

  useEffect(() => {
    document.title = "IVEX Library - Login";
  }, [history.location]);

  useEffect(() => {
    ReactGA.pageview("/login");
    ReactPixel.pageView();
  }, []);

  async function validate(e) {
    e.preventDefault();
    // Validation
    const errorsFromValidator = validateLogin(login_credentials);
    console.log(errorsFromValidator);
    if (!errorsFromValidator) {
      const result = await submit({ ...login_credentials });
      console.log("result: ", result);

      if (result) {
        if (result.data.message == "Email address not confirmed") {
          // setErrorLogin(0);
          setShowAlert(true);
          setErrorLogin(1);
        } else if (result.data.status == 400) {
          console.log("Im hre");
          // setErrorLogin(0);
          setErrorLogin(2);
          setShowAlert(true);
        }
      } else {
        setErrorLogin(3);
        setShowAlert(true);
      }
    } else {
      setErrorMessages(errorsFromValidator);
    }
  }

  /* Redirect */
  const handleClick = () => {
    history.push("/register");
  };

  /* Redirect */
  const handleClickForPas = () => {
    history.push("/forgotten-password");
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
    const object = document.querySelector("#object");
    object.classList.add("fade");
  }, []);

  return (
    <div className="login-sec" onSubmit={(e) => validate(e)}>
      {showAlert ? (
        <ErrorAlert
          title={errorLogin == 3 ? "Oops, something went wrong" : ""}
          text={
            errorLogin == 1
              ? "Unconfirmed email."
              : errorLogin == 2
              ? "Incorrect password."
              : "Please, try it later."
          }
          btnText="Close"
          show={showAlert}
          setShow={(e) => setShowAlert(e)}
        />
      ) : null}
      {errorLogin == 1 ? (
        <ErrorAlert
          text="Unconfirmed email."
          btnText="Close"
          show={showAlert}
          setShow={(e) => setShowAlert(e)}
        />
      ) : errorLogin == 2 ? (
        <ErrorAlert
          text="Incorrect password"
          btnText="Close"
          show={showAlert}
          setShow={(e) => setShowAlert(e)}
        />
      ) : (
        ""
      )}
      <div className="container-lg px-0 row mx-auto login-main space">
        {/* Left */}
        <div className="col-12 col-md-6 px-0 login-left">
          <h3 className="text-title text-32 text-bold pb-4 m-0">Login</h3>
          <form>
            <div className="form-group">
              <label
                className="text-normal text-small"
                htmlFor="exampleInputEmail1"
              >
                E-mail
              </label>
              <input
                className="form-control"
                type="email"
                id="exampleInputEmail1"
                placeholder="meno@ivexlibrary.sk"
                value={login_credentials.email}
                onChange={(e) => {
                  set_login_credentials({
                    ...login_credentials,
                    email: e.target.value,
                  });
                }}
              />
              {/* Validator message */}
              {errorMessages.email ? (
                <span className="error-message">{errorMessages.email}</span>
              ) : (
                ""
              )}
              {/*<small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> Keď bude zlý email*/}
            </div>
            <div className="form-group">
              <label
                className="text-normal text-small"
                htmlFor="exampleInputPassword1"
              >
                Password
              </label>
              <input
                className="form-control"
                type="password"
                id="exampleInputPassword1"
                placeholder="**********"
                value={login_credentials.password}
                onChange={(e) => {
                  set_login_credentials({
                    ...login_credentials,
                    password: e.target.value,
                  });
                }}
              />
              {errorMessages.password ? (
                <span className="error-message">{errorMessages.password}</span>
              ) : (
                ""
              )}
              <div className="text-end">
                <small
                  id="emailHelp"
                  className="form-text pointer mt-3 for-pas"
                  onClick={handleClickForPas}
                >
                  Forgotten password?
                </small>
              </div>
            </div>
            {/*<div class="form-check">
								<input type="checkbox" class="form-check-input" id="exampleCheck1" />
								<label class="form-check-label" for="exampleCheck1">Check me out</label>
								</div>*/}
            <div className="d-flex flex-row justify-content-between login-buttons">
              <div className="d-inline-block">
                <Button type="submit" text="Login" color="yellow" />
              </div>
              <div className="register-btn" onClick={handleClick}>
                <Button type="submit" text="Register" color="white" />
              </div>
            </div>
          </form>
        </div>

        {/* Right */}
        <div className="col-12 col-md-6 d-flex justify-content-center justify-content-md-end px-0 pt-5 py-md-0 align-items-center img">
          <div className="animate">
            <object type="image/svg+xml" data="/animations/bg_white.svg" />
            <object
              type="image/svg+xml"
              data="/animations/login.svg"
              id="object"
            />
          </div>
        </div>
      </div>
      <div className="login-white">
        {/* Wave */}
        <div className="wave">
          <div className="wave-down">
            <img src="/img/wave-down-gray.svg" alt="wave" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
