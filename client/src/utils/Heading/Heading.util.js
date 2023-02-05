import React, { useState } from 'react'

const Heading = ({ type, title, subtitle, text }) => {

    return (
        <div className="heading">
            {
                type == "text" ? 
                <div>
                    <h1 className="text-title text-large text-bold">{title}</h1>
                    <p className="text-title text-medium">{subtitle}</p>
                    <div className="line"></div>
                    <p className="text-medium text">{text}</p>
                </div> 
                :
                <div>
                    <h1 className="text-title text-large text-bold">{title}</h1>
                    <p className="text-title text-medium">{subtitle}</p>
                    <div className="line"></div>
                </div>
            }
        </div>
    )
}

export default Heading;
