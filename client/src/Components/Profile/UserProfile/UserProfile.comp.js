import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

/* Profile User Part */
import ChangeInfo from "../UserProfile/UserProfileParts/_changeInfo.comp";
import ChangePassword from "../UserProfile/UserProfileParts/_changePassword.comp";
import UserCarousels from "../UserProfile/UserProfileParts/_userCarousels.comp";

/* Utils */
import Spinner from "../../../utils/Spinner/Spinner.util";
import Heading from "../../../utils/Heading/Heading.util";
import SubscriptionCard from "../../../utils/SubscriptionCard/SubscriptionCard.util";
import SuccessAlert from "../../../utils/Alerts/SuccessAlert/SuccessAlert.util";
import ErrorAlert from "../../../utils/Alerts/ErrorAlert/ErrorAlert.util";

const UserProfile = ({
  getUserInfo = (f) => f,
  getScriptsByIds = (f) => f,
  saveUserInfo = (f) => f,
  editUserPassword = (f) => f,
  cancelSubscription = (f) => f,
  renewSubscription = (f) => f,
  changeSubscription = (f) => f,
  authData,
}) => {
  //* pageState:
  //* 1 => Zobrazenie profilu
  //* 2 => Editacia zakladnych info
  //* 3 => Editacia hesla
  //? 4 => Zmena predplatneho
  const [pageState, setPageState] = useState(1);
  const [user, setUser] = useState();
  //* infoChangeStatus
  //* 1 => User havent tried to change anything yet
  //* 2 => User sucesfully changed info
  //* 3 => User tried to change something with error
  const [infoChangeStatus, setInfoChangeStatus] = useState(1);
  const [gotData, setGotData] = useState(false);
  const [userCredentials, setUserCredentials] = useState({});
  const [dateEnding, setDateEnding] = useState();
  const [showAlert, setShowAlert] = useState(false);
  const { search } = useLocation();
  const [changePassword, setChangePassword] = useState(false);
  const [subscription_type, setSububscriptionType] = useState("mesačné");

  /* Width of Window */
  const [width, setWidth] = useState(window.innerWidth);
  window.addEventListener("resize", () => setWidth(window.innerWidth));

  /* Presmerovanie na edit profile */
  useEffect(() => {
    const searchParams = new URLSearchParams(search);
    const edit = searchParams.get("edit");
    if (edit === "true") {
      setPageState(2);
    }
  }, []);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
    console.log(authData);
  }, [pageState]);

  useEffect(async () => {
    /* Checkne ci je user prihlasený */
    if (authData.isLoggedIn) {
      try {
        const result = await getUserInfo({
          user_id: authData.user.user_id,
        });

        setUser(result.data.data);
        setUserCredentials(result.data.data);

        const favoriteScriptsRequest = await getScriptsByIds({
          script_ids: result.data.data.favorite_scripts,
        });
        console.log(result.data.data.favorite_scripts);
        setFavoriteScripts(favoriteScriptsRequest.data.data);
        if (authData.user.user_state !== "freemium") {
          let date = {
            day: new Date(result.data.data.subscription_ending).getDate(),
            month:
              new Date(result.data.data.subscription_ending).getMonth() + 1,
            year: new Date(result.data.data.subscription_ending).getFullYear(),
          };
          setDateEnding(date);
        } else {
          setDateEnding({ day: "∞", month: "", year: "" });
        }
      } catch (error) {
        console.log(error);
      }

      if (
        authData.user.user_state == "free-trial" ||
        authData.user.user_state == "free-trail"
      ) {
        setSububscriptionType("Free trail");
      } else if (
        authData.user.user_state == "subscribed" &&
        authData.user.subscription_type == 1
      ) {
        setSububscriptionType("Monthly");
      } else if (
        authData.user.user_state == "subscribed" &&
        authData.user.subscription_type == 2
      ) {
        setSububscriptionType("Semester");
      } else {
        setSububscriptionType("Freemium");
      }
    }
  }, [gotData]);

  useEffect(() => {
    setGotData(true);
  }, [authData]);

  /* Successful Change of User Informations */
  const saveUserInformationSuccess = () => {
    setInfoChangeStatus(1);
    setInfoChangeStatus(2);
    setPageState(1);
    setChangePassword(false);
    setShowAlert(true);
  };

  /* Failure Change of User Informations */
  const saveUserInformationError = () => {
    setInfoChangeStatus(1);
    setInfoChangeStatus(3);
    setChangePassword(false);
    setShowAlert(true);
  };

  /* Back to Profile */
  const backToProfile = () => {
    setPageState(1);
  };

  /* Successful Change of User Password */
  const saveUserPasswordSuccess = () => {
    setInfoChangeStatus(1);
    setInfoChangeStatus(2);
    setChangePassword(true);
    setPageState(1);
    setShowAlert(true);
  };

  /* Failure Change of User Password */
  const saveUserPasswordError = () => {
    setInfoChangeStatus(1);
    setInfoChangeStatus(3);
    setChangePassword(true);
    setShowAlert(true);
  };

  return (
    <div className="profile">
      {user ? (
        <div>
          <div
            className={
              pageState == 1
                ? "upper-profile bc-grey padding-y"
                : "upper-profile bc-grey padding-top"
            }
          >
            <div className="container-lg px-0 space">
              <div className="d-flex flex-column flex-md-row align-items-center justify-content-between">
                <div className="pb-5 text-center text-md-start">
                  <Heading
                    type="text"
                    title={pageState == 1 ? "Welcome," : "Edit profile,"}
                    subtitle={
                      pageState == 1
                        ? user.first_name
                        : pageState == 2
                        ? "tune your information"
                        : "Change your password"
                    }
                    text={pageState == 1 ? user.email : ""}
                  />
                  <span className="text-small text-odkaz pointer">
                    {pageState == 1 ? (
                      <div>
                        <span onClick={() => setPageState(2)}>
                          Edit profile
                        </span>
                      </div>
                    ) : pageState == 2 ? (
                      <span
                        onClick={() => {
                          setPageState(3), setInfoChangeStatus(1);
                        }}
                      >
                        Change your password
                      </span>
                    ) : pageState == 3 ? (
                      <span onClick={() => setPageState(1)}>
                        Back to profile
                      </span>
                    ) : (
                      ""
                    )}
                  </span>

                  {/* Info update state */}
                  <div>
                    {infoChangeStatus == 1 ? (
                      ""
                    ) : infoChangeStatus == 2 ? (
                      <div>
                        <SuccessAlert
                          text={
                            changePassword === true
                              ? "Your password has been changed successfully."
                              : "Your personal data have been changed successfully."
                          }
                          btnText="Close"
                          show={showAlert}
                          setShow={(e) => setShowAlert(e)}
                        />
                      </div>
                    ) : (
                      <ErrorAlert
                        text={
                          changePassword === true
                            ? "An error occurred while changing your password."
                            : "An error occurred while changing your data."
                        }
                        btnText="Close"
                        show={showAlert}
                        setShow={(e) => setShowAlert(e)}
                      />
                    )}
                  </div>
                </div>
                <div className="mx-auto mx-md-0 pe-3">
                  {dateEnding ? (
                    <SubscriptionCard
                      type={subscription_type}
                      dateDay={dateEnding.day}
                      dateMonth={dateEnding.month}
                      dateYear={dateEnding.year}
                    />
                  ) : null}
                </div>
              </div>
            </div>
          </div>

          {/* Scripts Carousels */}
          {pageState == 1 ? (
            <UserCarousels
              getUserInfo={(e) => getUserInfo(e)}
              getScriptsByIds={(e) => getScriptsByIds(e)}
              authData={authData}
            />
          ) : (
            ""
          )}

          {/* Change Profile Informations */}
          {pageState == 2 ? (
            <ChangeInfo
              saveUserInfo={(e) => saveUserInfo(e)}
              backToProfile={backToProfile}
              saveUserInformationSuccess={saveUserInformationSuccess}
              saveUserInformationError={saveUserInformationError}
              cancelSubscription={(e) => cancelSubscription(e)}
              changeSubscription={(e) => changeSubscription(e)}
              renewSubscription={(e) => renewSubscription(e)}
              user={user}
              userCredentialsChangeInfo={userCredentials}
              authData={authData}
            />
          ) : (
            ""
          )}

          {/* Change Password - tu či nemajú by´t údaje úspešne zmenené*/}
          {pageState == 3 ? (
            <ChangePassword
              editUserPassword={(e) => editUserPassword(e)}
              saveUserPasswordSuccess={saveUserPasswordSuccess}
              saveUserPasswordError={saveUserPasswordError}
              user={user}
            />
          ) : (
            ""
          )}
        </div>
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default UserProfile;
