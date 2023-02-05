import React, { useEffect, useState, useRef } from "react";
import { useHistory } from "react-router";
import { default_request_config, post_request } from "../../helpers";
import { validateCreateUser } from "../../helpers/validators/userforms.validator";
import ReactGA from "react-ga";
import ReactPixel from "react-facebook-pixel";
import { Elements, PaymentElement } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useStripe, useElements } from "@stripe/react-stripe-js";

/* Parts of Registration */
import RegSectionI from "./RegSectionI/RegSectionI";
import Membership from "./MembershipReg/MembershipReg";

/* Utils */
import Button from "../../utils/Button/Button.util";
import Footer from "../../utils/Footer/Footer.util";
import ErrorAlert from "../../utils/Alerts/ErrorAlert/ErrorAlert.util";
import Spinner from "../../utils/Spinner/Spinner.util";
import { Link } from "react-router-dom";

// const stripePromise = loadStripe(
// 	'pk_test_51JrpruDz7YsaI1yHUvLNeCLbZzJQUs6hbGvRkoNXbN0xFwqXIOSdPSu6kkf3f9ckudYgUgtPaWccGQNvKq6Y29K400CSXZ3YL7'
// );
const stripePromise = loadStripe(
  "pk_live_51JrpruDz7YsaI1yHQB9y962XBBtWxvLPG7FRVMsLDVkaY5hdkqi9xCkZq9KpuskWjsiqsFGTQoEEPF7G8rTBCSOA00eaF7AK5x"
);

const Registration = () => {
  const [user_credentials, set_user_credentials] = useState({});
  const [errorMessages, setErrorMessages] = useState({});
  const [resErrors, setResErrors] = useState(0);
  const [showAlert, setShowAlert] = useState(false);
  const [pageState, setPageState] = useState(1);
  const [buttonId, setButtonId] = useState(0);
  const [options, setOptions] = useState();
  const [voucher, setVoucher] = useState(false);

  const history = useHistory();
  const formRef = useRef(null);
  const membershipRef = useRef(null);

  /* Width of Window */
  const [width, setWidth] = useState(window.innerWidth);
  window.addEventListener("resize", () => setWidth(window.innerWidth));

  useEffect(() => {
    document.title = "IVEX Library - Registration";
  }, [history.location]);

  useEffect(() => {
    ReactGA.pageview("/register", "Registrácia");
    ReactPixel.pageView();
  }, []);

  useEffect(() => {
    set_user_credentials((data) => ({ ...data, sub_type: buttonId }));
  }, [buttonId]);

  async function submit() {
    setPageState(3);
    // loading = true
    // Validation
    const validation = validateCreateUser(user_credentials);
    if (!validation) {
      console.log("Creating user");
      try {
        const res = await post_request(
          "/user",
          user_credentials,
          default_request_config
        );
        if (res.status == 200 && res.data.data !== "freemium") {
          console.log(res.data.data);
          setOptions({
            appearance: {
              theme: "stripe",
              variables: {
                colorBackground: "#ffffff",
                padding: "6px 12px",
                spacingGridRow: "40px",
                colorPrimary: "#6093D3",
                boxShadow: "none",
                borderRadius: "10px",
                colorTextPlaceholder: "#6093D3",
                fontSizeBase: "16px",
                fontFamily: "Montserrat, sans-serif",
                fontLineHeight: "20px",
                colorDanger: "#EB5757",
              },
            },
            clientSecret: res.data.data.payment.clientSecret,
          });
          // loading = false
          setPageState(2);

          ReactGA.event({
            category: "Registration",
            action: "Successfully registered",
          });
          ReactPixel.trackCustom("Registration");
        } else {
          ReactGA.event({
            category: "Registration",
            action: "Successfully registered",
          });
          ReactPixel.trackCustom("Registration");
          history.push("/thank-you");
        }
      } catch (error) {
        console.log("Error: ", error);
        setPageState(1);
        if (error.response) {
          if (
            error.response.status == 400 &&
            error.response.data.message == "User with this email already exists"
          ) {
            setErrorMessages((message) => ({
              ...message,
              first_name: "",
              last_name: "",
              email: "Tento email sa už používa, zvoľte prosím nový email",
              password1: "",
              password2: "",
            }));
            setResErrors(409);
            ReactGA.event({
              category: "Registration",
              action: "User failed register",
              label: "Email already exists",
            });
            formRef.current.scrollIntoView({
              block: "center",
            });
          }
        } else {
          console.log("Im in else ");
          setShowAlert(true);
          setResErrors(400);
        }
      }
    } else {
      setPageState(1);
      ReactGA.event({
        category: "Registration",
        action: "User failed register",
        label:
          "User has entered atleast one wrong or insufficent value, and was shown error message.",
      });
      setErrorMessages(validation);

      if (validation.sub) {
        setShowAlert(true);
      } else {
        formRef.current.scrollIntoView({
          block: "center",
        });
      }
    }
  }

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
    if (pageState == 1) {
      const object = document.querySelector("#object-II");
      object.classList.add("fade");
    }
  }, []);

  /* Scroll Logic */
  const scrollToForm = () => {
    formRef.current.scrollIntoView({
      block: "center",
    });
  };

  const scrollToMembership = () => {
    membershipRef.current.scrollIntoView({
      block: "start",
    });
  };

  return (
    <div className="registration">
      {resErrors || errorMessages.sub ? (
        <span>
          <ErrorAlert
            show={showAlert}
            setShow={(e) => setShowAlert(e)}
            title={
              resErrors == 409
                ? ""
                : errorMessages.sub
                ? ""
                : "Oops, something went wrong"
            }
            text={
              errorMessages.sub
                ? "Please, select a subscription type"
                : "Please, try it later"
            }
            btnText="Close"
          />
        </span>
      ) : null}
      {/* First Section */}
      <RegSectionI scrollToForm={scrollToForm} />

      {/* Registration Form Section */}
      {pageState == 1 ? (
        <div>
          <div className="reg-form">
            {/* Wave */}
            <div className="wave">
              <div className="wave-down">
                <img src="/img/wave-down-gray.svg" alt="wave" />
              </div>
            </div>
            <div className="container-lg px-0 space">
              <div className="row g-0">
                <div className="col-12 col-md-4" ref={formRef}>
                  <h3 className="text-title pb-4">Basic information</h3>
                  <form action="" onSubmit={(e) => e.preventDefault()}>
                    <div className="form-group">
                      <label className="text-normal text-small" htmlFor="name">
                        First name
                      </label>
                      <input
                        className={
                          errorMessages.first_name
                            ? "form-control input-error"
                            : "form-control"
                        }
                        id="name"
                        type="text"
                        placeholder="First name"
                        data-testid="firstname"
                        value={user_credentials.first_name}
                        onChange={(e) => {
                          set_user_credentials((user) => ({
                            ...user,
                            first_name: e.target.value,
                          }));
                        }}
                      />
                      {errorMessages.first_name ? (
                        <span className="error-message">
                          {errorMessages.first_name}
                        </span>
                      ) : (
                        ""
                      )}
                    </div>

                    <div className="form-group">
                      <label
                        className="text-normal text-small"
                        htmlFor="lastname"
                      >
                        Last name
                      </label>
                      <input
                        className={
                          errorMessages.last_name
                            ? "form-control input-error"
                            : "form-control"
                        }
                        id="lastname"
                        type="text"
                        placeholder="Last name"
                        data-testid="lastname"
                        value={user_credentials.last_name}
                        onChange={(e) => {
                          set_user_credentials((user) => ({
                            ...user,
                            last_name: e.target.value,
                          }));
                        }}
                      />
                      {errorMessages.last_name ? (
                        <span className="error-message">
                          {errorMessages.last_name}
                        </span>
                      ) : (
                        ""
                      )}
                    </div>

                    <div className="form-group">
                      <label className="text-normal text-small" htmlFor="email">
                        Email
                      </label>
                      <input
                        className={
                          errorMessages.email
                            ? "form-control input-error"
                            : "form-control"
                        }
                        id="email"
                        type="text"
                        placeholder="meno@ivexlibrary.sk"
                        data-testid="email"
                        value={user_credentials.email}
                        onChange={(e) => {
                          set_user_credentials((user) => ({
                            ...user,
                            email: e.target.value,
                          }));
                        }}
                      />
                      {errorMessages.data ? (
                        <span className="error-message">
                          {errorMessages.data}
                        </span>
                      ) : (
                        ""
                      )}
                      {errorMessages.email ? (
                        <span className="error-message">
                          {errorMessages.email}
                        </span>
                      ) : (
                        ""
                      )}
                    </div>

                    <div className="form-group">
                      <label
                        className="text-normal text-small"
                        htmlFor="password1"
                      >
                        Password
                      </label>
                      <input
                        className={
                          errorMessages.password1 || errorMessages.password2
                            ? "form-control input-error"
                            : "form-control"
                        }
                        id="password1"
                        type="password"
                        placeholder="**********"
                        data-testid="password"
                        value={user_credentials.password}
                        onChange={(e) => {
                          set_user_credentials((user) => ({
                            ...user,
                            password: e.target.value,
                          }));
                        }}
                      />
                      {errorMessages.password1 ? (
                        <span className="error-message">
                          {errorMessages.password1}
                        </span>
                      ) : (
                        ""
                      )}
                    </div>

                    <div className="form-group">
                      <label
                        className="text-normal text-small"
                        htmlFor="password2"
                      >
                        Password confirmation
                      </label>
                      <input
                        className={
                          errorMessages.password1 || errorMessages.password2
                            ? "form-control input-error"
                            : "form-control"
                        }
                        id="password2"
                        type="password"
                        placeholder="**********"
                        data-testid="verification_password"
                        value={user_credentials.password2}
                        onChange={(e) => {
                          set_user_credentials((user) => ({
                            ...user,
                            password2: e.target.value,
                          }));
                        }}
                      />
                      {errorMessages.password2 ? (
                        <span className="error-message">
                          {errorMessages.password2}
                        </span>
                      ) : (
                        ""
                      )}
                    </div>
                  </form>
                </div>

                {width <= 767 ? (
                  <div className="scroll-to-membership-wrapper">
                    <div
                      className="scroll-to-membership"
                      onClick={scrollToMembership}
                    >
                      <img src="/icons/arrow-down.svg" alt="Arrow Down" />
                    </div>
                  </div>
                ) : null}

                <div className="col-12 col-md-8 d-flex justify-content-center justify-content-md-end align-items-center pt-5">
                  <div className="animate">
                    <object
                      type="image/svg+xml"
                      data="/animations/bg_blue.svg"
                    />
                    <object
                      type="image/svg+xml"
                      data="/animations/reg-info.svg"
                      id="object-II"
                      className="fade"
                    />
                  </div>
                </div>

                {width > 767 ? (
                  <div className="scroll-to-membership-wrapper">
                    <div
                      className="scroll-to-membership"
                      onClick={scrollToMembership}
                    >
                      <img src="/icons/arrow-down.svg" alt="Arrow Down" />
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
          <div className="wave-reg">
            <div className="wave-up">
              <img src="/img/wave-down-gray.svg" alt="wave" />
            </div>
          </div>

          <div ref={membershipRef}>
            <Membership
              title="Choose your plan,"
              subtitle="first 7 days are free"
              setButtonId={(e) => setButtonId(e)}
              buttonId={buttonId}
            />

            <div className="container-lg px-0 space">
              <div className="form-group voucher-wrapper">
                <div
                  className="voucher-checkbox"
                  onClick={() => setVoucher(!voucher)}
                >
                  <div className="checkbox">
                    {voucher ? (
                      <div>
                        <div className="line"></div>
                        <div className="line"></div>
                      </div>
                    ) : null}
                  </div>
                  <p>I have voucher</p>
                </div>
                {voucher ? (
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Your voucher"
                  />
                ) : null}
              </div>
              <div className="register-btn-wrapper">
                <label
                  className="text-normal text-small form-check-label"
                  htmlFor="vop"
                >
                  By pressing the "Register" button, you agree with the
                  <Link
                    target="_blank"
                    to="/vop"
                    className="text-small form-check-label text-decoration-none"
                  >
                    {" "}
                    terms and conditions agreement
                  </Link>{" "}
                  and the{" "}
                  <Link
                    target="_blank"
                    to="/gdpr"
                    className="text-small form-check-label text-decoration-none"
                  >
                    GDPR
                  </Link>
                  .
                </label>
                <div className="register-btn">
                  <span onClick={submit}>
                    <Button color="yellow" text="Complete registration" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
      {/* Wave */}

      {options && pageState == 2 ? (
        <div>
          <Elements stripe={stripePromise} options={options}>
            <RegFormStripe />
          </Elements>
        </div>
      ) : null}

      {pageState == 3 ? (
        <div>
          {/* Wave */}
          <div className="wave">
            <div className="wave-down">
              <img src="/img/wave-down-gray.svg" alt="wave" />
            </div>
          </div>
          <div className="spinner-wrapper">
            <Spinner />
          </div>
        </div>
      ) : null}

      <div className="white" />
    </div>
  );
};

const RegFormStripe = () => {
  const stripe = useStripe();
  const elements = useElements();
  const history = useHistory();

  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const { error, setupIntent } = await stripe.confirmSetup({
      //`Elements` instance that was used to create the Payment Element
      elements,
      redirect: "if_required",
      confirmParams: {},
    });

    // TODO: Set up loading and error and success messages, pageState new...
    console.log(error, setupIntent);

    if (error) {
      // This point will only be reached if there is an immediate error when
      // confirming the payment. Show error to your customer (e.g., payment
      // details incomplete)
      setErrorMessage(error.message);
    } else {
      if (setupIntent.status == "succeeded") {
        history.push("/thank-you");
      }
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
  };

  return (
    <div>
      {/* Wave */}
      <div className="wave">
        <div className="wave-down">
          <img src="/img/wave-down-gray.svg" alt="wave" />
        </div>
      </div>
      <div className="container-lg px-0 space">
        <form className="payment-form" onSubmit={handleSubmit}>
          <PaymentElement />
          <button disabled={!stripe}>Potvrdiť</button>
          {/* Show error message to your customers */}
          {errorMessage && <div className="error-message">{errorMessage}</div>}
        </form>
      </div>
    </div>
  );
};

export default Registration;
