import React, { useState } from 'react';
import Button from '../Button/Button.util';
import { useHistory } from 'react-router-dom';

const PriceCard = ({ title, subtitle, price, points, text, sign, wave, type, buttonText, buttonColor, handleClickMembership }) => {

    const [width, setWidth] = useState(window.innerWidth);
    const history = useHistory();

    window.addEventListener("resize", () => setWidth(window.innerWidth));

    const handleClickRegister = () => {
        history.push("/register");
    }

    return (
        <div className={type === "profile" ?"card text-center price-card profile-price-card mx-0" :  "card text-center price-card mx-0"}>
            <div className="price-wave">
                {wave === true ?
                    <img src="/img/price_wave.svg" alt="wave"/>
                : null
                }
            </div>
            <div className="card-body">
                {
                    title === "Mesačné" ? (
                        type != "profile" ? (
                            <div className="discount">
                                <p className="discount-number"><span>66</span>%</p>
                                <p>kick off discount</p>
                            </div>
                        ) : null
                    ) : null
                }

                {
                    title === "Mesačné" ? (
                        type != "profile" ? (
                            <div className="normal-price">
                                <div className="cross"></div>
                                9<span>€</span>
                            </div>
                        ) : null
                    ) : null
                }
                <h5 className="card-title text-bold text-title">{title}</h5>
                <p className="mb-2 text-normal text-small text-medium">{subtitle}</p>
                <h6 className="pt-4"> <span className="price-number text-bold">{price}</span> <span className="text-small text-medium">{sign}</span> </h6>
                {/* Points */}
                <div className="points-wrapper">
                    {
                        points ? (
                            title === "Freemium" ? (
                                points.map((point, key) => 
                                    <div className={key >= 1 ? "point opacity" : "point"} id={key} key={key}>
                                        <div className="point-dash"></div>
                                        <p>{point}</p>
                                    </div>
                                )
                            ) : (
                                points.map((point, key) => 
                                    <div className="point" id={key} key={key}>
                                        <div className="point-dash"></div>
                                        <p>{point}</p>
                                    </div>
                                ) 
                            )
                        ) : null
                    }
                </div>
                <span onClick={handleClickMembership}>
                    <Button color={buttonColor} text={buttonText} style="medium" />
                </span> 
            </div>
        </div>
    )
}

export default PriceCard;
