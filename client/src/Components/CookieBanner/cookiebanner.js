import React from "react";
import CookieConsent from "react-cookie-consent";

const CookieBannerComp = () => {
  return (
    <div className="cookie">
      <CookieConsent
        location="bottom"
        buttonText="Accept All"
        cookieName="cookie-consent"
        enableDeclineButton={true}
        contentClasses={"cookie-content"}
        style={{
          background: "#2D406A",
          margin: 0,
          padding: "16px 40px",
          alignItems: "center",
        }}
        buttonStyle={{
          backgroundcolor: "#FFC50F",
          color: "#2D406A",
          fontSize: "16px",
          fontWeight: "700",
          borderRadius: "30px",
          width: "123px",
          height: "40px",
          margin: "0",
        }}
        buttonClasses={"accept-btn"}
        expires={150}
        debug={false}
        declineButtonText={"Decline All"}
        declineButtonStyle={{
          backgroundColor: "transparent",
          fontSize: "16px",
          fontWeight: "700",
          borderRadius: "30px",
          width: "123px",
          height: "40px",
          margin: "0 0 0 40px",
          color: "#EB5757",
          border: "2px solid #EB5757",
        }}
        declineButtonClasses={"decline-btn"}
        flipButtons={true}
        buttonWrapperClasses={"button-wrapper"}
      >
        We use cookies to provide the best experience on our websites. If you
        continue to use this site, we will assume that you are satisfied with
        it.
      </CookieConsent>
    </div>
  );
};

export default CookieBannerComp;
