import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";

import Heading from "../../../utils/Heading/Heading.util";

const SectionIII = ({ authData }) => {
  const history = useHistory();
  const [selected, setSelected] = useState(null);

  const handleClick = () => {
    history.push("/register");
  };

  useEffect(() => {
    const object = document.querySelector("#object-III");
    object.classList.add("fade");
  }, []);

  const data = [
    {
      question: "Created by students for students",
      answer:
        "The idea came from 2 co-founders, who were feeling the pain of buying books for their uni studies. There was no unique datawarehouse and ebooks were very expensive.",
    },
    {
      question: "Connecting worldwide publishers",
      answer:
        "We are trying to create interconnected ecosystem, where you can get various sources of information from a publishing houses. We are aiming to provide you the access to the knowledge in the most comfortable way.",
    },
    {
      question: "What are we planning next?",
      answer:
        "We are working on new features like Notes taking, Discussion options or text to speech button. Stay tunned for the upcomming period!",
    },
  ];

  const toggle = (i) => {
    if (selected === i) {
      return setSelected(null);
    }

    setSelected(i);
  };

  return (
    <div className="section_III">
      <div className="container-lg px-0 row mx-auto space">
        <div className="col-12 col-md-6 px-0">
          <Heading type="" title="You may be asking" subtitle="FAQ" />
          <div className="accordion">
            {data.map((item, index) => (
              <div className="accordion-wrapper" key={index}>
                <div
                  className="accordion-heading"
                  onClick={() => toggle(index)}
                >
                  <h5>{item.question}</h5>
                  <img
                    className={selected === index ? "img-rotate" : ""}
                    src="/icons/arrow-accordion.svg"
                    alt="Arrow Accordion"
                  />
                </div>
                <p className={selected === index ? "content show" : "content"}>
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="right-site col-12 col-md-6 d-flex justify-content-center justify-content-md-end px-0 pt-5 py-md-0 align-items-start">
          <div className="animate">
            <object
              type="image/svg+xml"
              data="/animations/bg_blue.svg"
            ></object>
            <object
              type="image/svg+xml"
              data="/animations/landing-students.svg"
              id="object-III"
            ></object>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionIII;
