import React, { useState } from 'react';
import Button from '../Button/Button.util';
import { useHistory } from 'react-router-dom';

const FrontpageCard = ({ img, title, text }) => {

    return (
        <div className="frontpage-card">
            <img src={img} alt="Frontpage Card Icon" />
            <div className="line"></div>
            <h5>{title}</h5>
            <p>{text}</p>
        </div>
    )
}

export default FrontpageCard;
