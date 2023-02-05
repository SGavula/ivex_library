import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';

import Heading from '../../../utils/Heading/Heading.util';
import Button from '../../../utils/Button/Button.util';

const SectionI = ({ authData }) => {

    const history = useHistory();

    const handleClick = () => {
        history.push("/register");
    }

    useEffect(() => {
		const object = document.querySelector("#object");
		object.classList.add("fade")
	}, []);


    return (
        <div className="section_I_script">
            <div className="container-lg px-0 row mx-auto space">
                <div className="col-12 col-md-6 px-0 d-flex flex-column justify-content-center align-items-start">
                    <Heading type="text" title="Access" subtitle="all the books in the library."/>
                    <div className="pt-3 pt-md-5">
                        {
                            authData.user.user_state === "freemium" ? (
                                <Link to="/profile?edit=true">
                                    <Button text="Upgrade subscription" color="yellow" style="medium"/>
                                </Link>
                            ) : (
                                <span onClick={handleClick}>
                                    <Button text="Try it now" color="yellow" style="medium"/>
                                </span>
                            )
                        }
                    </div>
                </div>
                <div className="right-site col-12 col-md-6 d-flex justify-content-center justify-content-md-end px-0 pt-5 py-md-0">
                    <div className="animate">
                        <object type="image/svg+xml" data="/animations/bg_white.svg"></object>
                        <object type="image/svg+xml" data="/animations/spristupni.svg" id="object"></object>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SectionI;
