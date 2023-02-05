import React, { useState } from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const [width, setWidth] = useState(window.innerWidth);
  window.addEventListener("resize", () => setWidth(window.innerWidth));

  return (
    <div className="footer">
      <div className="text">
        <div className="pt-5 pt-md-3 pb-2">
          <img className="logo" src="/img/logo1.png" alt="Logo" />
        </div>

        <div className="pt-4 pb-3 basic-info">
          <ul className="row g-0 list-unstyled w-100 my-0">
            <li className="">
              <Link
                to="/vop"
                className="text-white-hover text-decoration-none text-small"
              >
                T&C
              </Link>
            </li>
            <li className="">
              <Link
                to="/gdpr"
                className="text-white-hover text-decoration-none text-small"
              >
                GDPR
              </Link>
            </li>
            <li className="">
              <Link
                to="/library"
                className="text-white-hover text-decoration-none text-small"
              >
                Library
              </Link>
            </li>
            <li className="">
              <Link
                to="/contact"
                className="text-white-hover text-decoration-none text-small"
              >
                Contact
              </Link>
            </li>
            <li className="">
              <a
                href="/#cennik"
                className="text-white-hover text-decoration-none text-small"
              >
                Pricing
              </a>
            </li>
            <li className="">
              <Link
                to="/faq"
                className="text-white-hover text-decoration-none text-small"
              >
                FAQ
              </Link>
            </li>
            {/*<li className="">
							<Link
								to="/gdpr"
								className="text-white-hover text-decoration-none text-small"
							>
								Vízia
							</Link>
						</li> */}
          </ul>
        </div>
      </div>

      {/* Wave Down Footer */}
      <div className="wave-footer">
        <img src="/img/wave-down.svg" alt="wave" />
      </div>
    </div>
  );
};

export default Footer;
