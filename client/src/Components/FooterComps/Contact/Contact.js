import React, { useEffect, useState, useRef } from "react";
import { validateSendContactForm } from "../../../helpers/validators/userforms.validator";

/* Utils */
import Button from "../../../utils/Button/Button.util";
import Heading from "../../../utils/Heading/Heading.util";
const Recaptcha = require("react-recaptcha");
import {
  post_request,
  default_request_config,
} from "../../../helpers/requests/requests";

import ContactSectionI from "./ContactSectionI/ContactSectionI";

import SuccesAlert from "../../../utils/Alerts/SuccessAlert/SuccessAlert.util";
import ErrorAlert from "../../../utils/Alerts/ErrorAlert/ErrorAlert.util";

const Contact = () => {
  const [message, setMessage] = useState({});
  const [errors, setErrors] = useState({});
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, []);

  const recaptchaInputRef = useRef({});

  async function sendEmail() {
    // Validation\
    if (verified) {
      const validation = validateSendContactForm(message);
      if (!validation) {
        try {
          const req = await post_request(
            "/contact",
            message,
            default_request_config
          );
          if (req.data.status == 200) {
            // Reset form and display success alert
            setMessage({
              name: "",
              email: "",
              message: "",
            });
            resetRecaptcha();
            setShowSuccessAlert(true);
          } else {
            setShowErrorAlert(true);
          }
        } catch (error) {
          console.log(error);
          setShowErrorAlert(true);
        }
      } else {
        console.log(validation);
        setErrors(validation);
      }
    } else {
      setErrors((errors) => ({
        ...errors,
        verification: "Musíte vyplniť pole ReCaptcha",
      }));
    }
  }

  useEffect(() => {
    console.log("errors changed");
  }, [errors]);

  const verifyCallback = () => {
    setVerified(true);
  };

  const expiredCallback = () => {
    setVerified(false);
  };

  const resetRecaptcha = () => {
    recaptchaInputRef.current.reset();
  };

  return (
    <div className="contact">
      {/* Section I */}
      <ContactSectionI />
      <SuccesAlert
        text="Thank you for your message. We will answer you as soon as possible."
        btnText="Close"
        show={showSuccessAlert}
        setShow={(e) => setShowSuccessAlert(e)}
      />
      <ErrorAlert
        text="An unexpected error occurred while sending the request. Please, try it later"
        btnText="Close"
        setShow={(e) => setShowErrorAlert(e)}
        show={showErrorAlert}
      />

      {/* Form */}
      <div>
        {/* Wave */}
        <div className="wave">
          <div className="wave-down">
            <img src="/img/wave-down-gray.svg" alt="wave" />
          </div>
        </div>
        <div className="contact-form">
          <div className="container-lg space px-0">
            <div className="col-12 col-md-6 px-0 login-left">
              <h3 className="text-title text-32 text-bold pb-4 m-0">
                Contact us
              </h3>
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="form-group">
                  <label
                    className="text-normal text-small"
                    htmlFor="contact-name"
                  >
                    Name
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    id="contact-name"
                    value={message.name}
                    placeholder="František"
                    onChange={(e) =>
                      setMessage((message) => ({
                        ...message,
                        name: e.target.value,
                      }))
                    }
                  />
                  {/* Error messages */}
                  {errors.name ? (
                    <span className="error-message">{errors.name}</span>
                  ) : (
                    ""
                  )}
                </div>
                <div className="form-group">
                  <label
                    className="text-normal text-small"
                    htmlFor="contact-email"
                  >
                    E-mail
                  </label>
                  <input
                    className="form-control"
                    type="email"
                    id="contact-email"
                    value={message.email}
                    placeholder="František@Umpalumpičovič.sk"
                    onChange={(e) =>
                      setMessage((message) => ({
                        ...message,
                        email: e.target.value,
                      }))
                    }
                  />
                  {/* Error messages */}
                  {errors.email ? (
                    <span className="error-message">{errors.email}</span>
                  ) : (
                    ""
                  )}
                </div>

                <div className="form-group">
                  <label
                    className="text-normal text-small pb-2"
                    htmlFor="about"
                  >
                    Message
                  </label>
                  <textarea
                    className="form-control"
                    id="about"
                    cols="30"
                    rows="10"
                    value={message.message}
                    placeholder="Could you please describe us how can we help you?"
                    onChange={(e) =>
                      setMessage((message) => ({
                        ...message,
                        message: e.target.value,
                      }))
                    }
                  />
                  {errors.message ? (
                    <span className="error-message">{errors.message}</span>
                  ) : (
                    ""
                  )}
                </div>

                <Recaptcha
                  ref={recaptchaInputRef}
                  sitekey={"6Lc9w8IbAAAAAAd0sV-as5kXBDKDChGPipdZFpKU"}
                  verifyCallback={verifyCallback}
                  expiredCallback={expiredCallback}
                />
                {errors.verification ? (
                  <span className="error-message">{errors.verification}</span>
                ) : (
                  ""
                )}
                <div className="submit-contact-button">
                  <div className="d-inline-block" onClick={sendEmail}>
                    <Button type="submit" text="Send" color="yellow" />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        {/* Wave */}
        <div className="wave justify-content-start">
          <div className="wave-down wave-up">
            <img src="/img/wave-down-gray.svg" alt="wave" />
          </div>
        </div>
      </div>

      {/* Founders */}
      <div className="founders bc-grey">
        <div className="container-lg px-0 space">
          <div className="founders-wrapper row">
            <div className="founder col-12 col-lg-6">
              <Heading
                type="text"
                title="Ivan Fratrič"
                subtitle="Co-founder"
                text="ivan.fratric@ivexlibrary.sk"
              />
              <img src="/img/ivan_fratric.svg" alt="Co-founder Ivan Frantič" />
            </div>

            <div className="founder col-12 col-lg-6">
              <Heading
                type="text"
                title="Alexander Světlík"
                subtitle="Co-founder"
                text="alexander.svetlik@ivexlibrary.sk"
              />
              <img
                src="/img/alexadner_svetlik.svg"
                alt="Co-founder Alexander Světlík"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Firemné údaje */}
      <div>
        {/* Wave */}
        <div className="wave">
          <div className="wave-down">
            <img src="/img/wave-down-gray.svg" alt="wave" />
          </div>
        </div>

        <div className="info">
          <div className="container-lg space px-0">
            <Heading
              type=""
              title="Company details"
              subtitle="XXXXXXXXXXXXXXXXXXXX"
            />

            {/* Adresa */}
            <div className="info-container">
              <h3 className="text-title text-32 text-bold m-0">Address</h3>
              <p className="text-small text-medium">XXXXXXXXXXXXXXXXXXXX</p>
            </div>

            {/* IČO */}
            <div className="info-container">
              <h3 className="text-title text-32 text-bold m-0">ID</h3>
              <p className="text-small text-medium">XXXXXXXXXXXXXXXXXXXX</p>
            </div>

            {/* DIČ */}
            <div className="info-container">
              <h3 className="text-title text-32 text-bold m-0">VAT</h3>
              <p className="text-small text-medium">XXXXXXXXXXXXXXXXXXXX</p>
            </div>

            {/* Číslo účtu */}
            <div className="info-container">
              <h3 className="text-title text-32 text-bold m-0">
                Bank account:
              </h3>
              <p className="text-small text-medium">XXXXXXXXXXXXXXXXXXXX</p>
            </div>

            {/* Email */}
            <div className="info-container">
              <h3 className="text-title text-32 text-bold m-0">Email</h3>
              <p className="text-small text-medium">
                {/* sales@ivexlibrary.sk */}
                XXXXXXXXXXXXXXXXXXXX
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
