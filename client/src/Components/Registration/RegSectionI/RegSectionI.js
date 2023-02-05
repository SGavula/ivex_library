import React, { useState, useEffect } from 'react';

import Heading from '../../../utils/Heading/Heading.util';

const RegSectionI = ({
    scrollToForm
}) => {

    useEffect(() => {
		const object = document.querySelector("#object");
		object.classList.add("fade")
	}, []);

    return (
        <div className="reg-section_I">
            <div className="container-lg px-0 row mx-auto space">
                <div className="col-12 col-md-6 px-0 d-flex align-items-center">
                    <Heading type="text" title="You are one step away" subtitle="to your private library" text="Acccess all the books, that you need for your studies or preferencies."/>
                </div>
                <div className="right-side col-12 col-md-6 d-flex justify-content-center justify-content-md-end px-0 pt-5 py-md-0">
                    <div className="animate">
                        <object type="image/svg+xml" data="/animations/bg_white.svg"></object>
                        <object type="image/svg+xml" data="/animations/reg-nadseni.svg" id="object"></object>
                    </div>
                </div>
            </div>
            <div className="scroll-to-registration-wrapper">
                <div className="scroll-to-registration" onClick={scrollToForm}>
                    <img src="/icons/arrow-down.svg" alt="Arrow Down" />
                </div>
            </div>
        </div>
    )
}

export default RegSectionI;
