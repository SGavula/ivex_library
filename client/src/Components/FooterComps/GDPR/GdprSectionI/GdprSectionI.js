import React, { useState, useEffect } from 'react';

import Heading from '../../../../utils/Heading/Heading.util';

const GdprSectionI = () => {

    useEffect(() => {
		const object = document.querySelector("#object");
		object.classList.add("fade")
	}, []);

    return (
        <div className="gdpr_section_I">
            <div className="container-lg px-0 row mx-auto space">
                <div className="col-12 col-md-6 px-0 d-flex align-items-center">
                    <Heading type="" title="GDPR" subtitle="how we secure your privacy" />
                </div>
                <div className="right-side col-12 col-md-6 d-flex justify-content-center justify-content-md-end px-0 pt-5 py-md-0">
                    <div className="animate">
                        <object type="image/svg+xml" data="/animations/bg_white.svg"></object>
                        <object type="image/svg+xml" data="/animations/GDPR-VOP.svg" id="object"></object>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GdprSectionI;
