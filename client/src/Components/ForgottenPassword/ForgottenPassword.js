import React, { useState, useEffect } from "react";

/* Utils */
import Button from "../../utils/Button/Button.util";
import {
  post_request,
  default_request_config,
} from "../../helpers/requests/requests";
import SuccesAlert from "../../utils/Alerts/SuccessAlert/SuccessAlert.util";
import ErrorAlert from "../../utils/Alerts/ErrorAlert/ErrorAlert.util";
import { useHistory } from "react-router-dom";

const ForgottenPassword = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const sendRequest = async () => {
    try {
      const res = await post_request(
        `/user/forgotten-password`,
        {
          email: email,
        },
        default_request_config
      );

      if (res.data.status == 200) {
        setShowSuccessAlert(true);
      } else {
        setShowErrorAlert(true);
      }
    } catch (error) {
      if (error) {
        setShowErrorAlert(true);
      }
    }
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

  useEffect(() => {
    document.title = "IVEX Library - Forgotten password";
  }, [history.location]);

  return (
    <div className="forgotten-password">
      <SuccesAlert
        title="Požiadavka úspešné odoslaná!"
        text="In the next few minutes you will receive an email with a link to reset your password. Don't forget to check the spam folder."
        btnText="Close"
        show={showSuccessAlert}
        setShow={(e) => setShowSuccessAlert(e)}
      />
      <ErrorAlert
        text="An error occurred while changing the data."
        btnText="Close"
        setShow={(e) => setShowErrorAlert(e)}
        show={showErrorAlert}
      />
      <div className="container-lg px-0 row mx-auto f-password-main space">
        {/* Left */}
        <div className="col-12 col-md-6 px-0 login-left">
          <div className="col-12 col-lg-10">
            <h3 className="text-title text-32 text-bold pb-4">
              Forgotten password?
            </h3>
            <div className="text-small text-normal pb-5 text text-medium">
              Doesn't matter. Please, write down your e-mail, that you used for
              registration and we will send you link to recover your password.
            </div>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="form-group pb-4">
                <label
                  className="text-normal text-small pb-2"
                  htmlFor="exampleInputEmail1"
                >
                  E-mail
                </label>
                <input
                  className="form-control"
                  type="email"
                  id="exampleInputEmail1"
                  placeholder="meno@ivexlibrary.sk"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
                {/* Validator message */}
                {/*errorMessages.email ? <span className="error-message">{errorMessages.email}</span> : ''*/}
                {/*<small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> Keď bude zlý email*/}
              </div>
              {/*<div class="form-check">
									<input type="checkbox" class="form-check-input" id="exampleCheck1" />
									<label class="form-check-label" for="exampleCheck1">Check me out</label>
									</div>*/}
              <span onClick={sendRequest}>
                <Button
                  type="submit"
                  text="Send"
                  color="yellow"
                  style="login"
                />
              </span>
            </form>
          </div>
        </div>

        {/* Right */}
        <div className="col-12 col-md-6 d-flex justify-content-center justify-content-md-end px-0 pt-5 py-md-0 align-items-center img">
          <div className="animate">
            <object type="image/svg+xml" data="/animations/bg_white.svg" />
            <object
              type="image/svg+xml"
              data="/animations/forgot-password.svg"
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

export default ForgottenPassword;
