import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';

import Heading from '../../../utils/Heading/Heading.util';
import Button from '../../../utils/Button/Button.util';
import FrontpageCard from '../../../utils/FrontpageCard/FrontpageCard.util';

const SectionII = ({ authData }) => {

    const [ width, setWidth ] = useState(window.innerWidth);
	window.addEventListener('resize', () => setWidth(window.innerWidth));

    const history = useHistory();

    const handleClick = () => {
        history.push("/register");
    }

    useEffect(() => {
        if( width > 768 ) {
            const object = document.querySelector("#object-II");
            object.classList.add("fade");
        }
	}, [width]);

    return (
        <div className="section_II">

            <div className="container-lg px-0 row mx-auto space">
                {
                    width > 767 ? (
                        <div className="right-side col-12 col-md-6 d-flex justify-content-center justify-content-md-start px-0 pt-5 py-md-0 align-items-center">
                                <div className="animate">
                                    <object type="image/svg+xml" data="/animations/bg_blue.svg"></object>
                                    <object type="image/svg+xml" data="/animations/landing-jednoduche.svg" id="object-II"></object>
                                </div>
                        </div>
                    ): (
                        null
                    )
                }
                <div className="col-12 col-md-6 px-0">
                    <Heading type="text" title="Simple" subtitle="subscription for all the books" text="You don't need to visit libraries, book shops, or seach the titles online anymore. Grant the access to all e-titles and read for the price of single title." />
                    {
                        authData.isLoggedIn ? (
                            null
                        ) : (
                            <span onClick={handleClick}>
                                <Button text="Start" color="yellow" style="small" />
                            </span>
                        )
                    }
                </div>
                
                <div className="frontpagecard-row">
                    <FrontpageCard img="/icons/unlimited-storage.svg" title="Unlimitted access" text="for more than 20 000 e-books and 350 categories" />
                    <FrontpageCard img="/icons/punctuality.svg" title="Save your time" text="highlight, make notes and mark your favourites titles" />
                    <FrontpageCard img="/icons/books.svg" title="Specialised titles" text="provided by worldwide publishers and universities" />
                    <FrontpageCard img="/icons/student.svg" title="Read anytime" text="and from anywhere on your smartphone, tablet, computer" />
                </div>
            </div>

            <div className="wave">
                <div className="wave-down wave-up">
                    <img src="/img/wave-down-gray.svg" alt="wave" />
                </div>
            </div>
            
        </div>
    )
}

export default SectionII;
