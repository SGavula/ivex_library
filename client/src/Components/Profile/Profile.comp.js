import React, { useEffect, useState } from "react";

/* Utils */
import UserProfile from "./UserProfile/UserProfile.comp";
import AdminProfile from "./AdminProfile/AdminProfile.comp";
import PublisherProfile from "./PublisherProfile/PublisherProfile.comp";

const Profile = ({
  uploadScript = (f) => f,
  getUserInfo = (f) => f,
  getScriptsByIds = (f) => f,
  saveUserInfo = (f) => f,
  editUserPassword = (f) => f,
  getAllUsers = (f) => f,
  getAdmin = (f) => f,
  editAdmin = (f) => f,
  createPublisher = (f) => f,
  getAllPublishers = (f) => f,
  getPublisher = (f) => f,
  getAdminLibrary = (f) => f,
  logout = (f) => f,
  editPublisherData = (f) => f,
  requestScriptChange = (f) => f,
  getPublisherPayData = (f) => f,
  getPublisherViews = (f) => f,
  getPublisherPayGraphData = (f) => f,
  getAnalyticsForScript = (f) => f,
  getAdminTotalPayments = (f) => f,
  getAdminTotalViews = (f) => f,
  getAdminTotalProfit = (f) => f,
  cancelSubscription = (f) => f,
  renewSubscription = (f) => f,
  changeSubscription = (f) => f,
  authData,
}) => {
  const [readyToRender, setReadyToRender] = useState(false);
  const [userType, setUserType] = useState(0);

  useEffect(() => {
    if (authData.isLoggedIn) {
      setReadyToRender(true);
      if (authData.user.user_type == "ADMIN") setUserType(1);
      else if (authData.user.user_type == "PUBLISHER") setUserType(2);
      else setUserType(0);
    }
  }, [authData]);

  useEffect(() => {
    document.title = "IVEX Library - Profile";
  }, [history.location]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, []);

  return (
    <div className="profile">
      {readyToRender ? (
        <div>
          {userType == 0 ? (
            <UserProfile
              renewSubscription={(e) => renewSubscription(e)}
              getUserInfo={(e) => getUserInfo(e)}
              getScriptsByIds={(e) => getScriptsByIds(e)}
              saveUserInfo={(e) => saveUserInfo(e)}
              editUserPassword={(e) => editUserPassword(e)}
              logout={(e) => logout(e)}
              cancelSubscription={(e) => cancelSubscription(e)}
              changeSubscription={(e) => changeSubscription(e)}
              authData={authData}
            />
          ) : null}
          {userType == 1 ? (
            <AdminProfile
              getAdminLibrary={(e) => getAdminLibrary(e)}
              getAllPublishers={(e) => getAllPublishers(e)}
              createPublisher={(e) => createPublisher(e)}
              editAdmin={(e) => editAdmin(e)}
              getAdmin={(e) => getAdmin(e)}
              uploadScript={(e) => uploadScript(e)}
              getAllUsers={(e) => getAllUsers(e)}
              logout={(e) => logout(e)}
              getAdminTotalPayments={(e) => getAdminTotalPayments(e)}
              getAdminTotalViews={(e) => getAdminTotalViews(e)}
              getAdminTotalProfit={(e) => getAdminTotalProfit(e)}
              getPublisherPayGraphData={(e) => getPublisherPayGraphData(e)}
              authData={authData}
            />
          ) : null}
          {userType == 2 ? (
            <PublisherProfile
              getPublisher={(e) => getPublisher(e)}
              getScriptsByIds={(e) => getScriptsByIds(e)}
              uploadScript={(e) => uploadScript(e)}
              editPublisherData={(e) => editPublisherData(e)}
              requestScriptChange={(e) => requestScriptChange(e)}
              getPublisherPayData={(e) => getPublisherPayData(e)}
              getPublisherViews={(e) => getPublisherViews(e)}
              getPublisherPayGraphData={(e) => getPublisherPayGraphData(e)}
              getAnalyticsForScript={(e) => getAnalyticsForScript(e)}
              authData={authData}
            />
          ) : null}
        </div>
      ) : null}
    </div>
  );
};

export default Profile;
