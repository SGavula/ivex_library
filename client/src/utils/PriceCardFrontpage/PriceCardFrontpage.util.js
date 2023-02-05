import React, { useState } from 'react';
import Button from '../Button/Button.util';
import { useHistory } from 'react-router-dom';

const PriceCardFrontpage = ({ title, subtitle, price, sign, points, text, buttonText}) => {

    const [ isMore, setIsMore ] = useState(false); 
    const [ width, setWidth ] = useState(window.innerWidth);
    const history = useHistory();

    window.addEventListener("resize", () => setWidth(window.innerWidth));

    const handleClickRegister = () => {
        history.push("/register");
    }

    return (
        <div className="card text-center price-card-frontpage">
            <div className="card-body">
                <h5 className="card-title text-bold text-title">{title}</h5>
                {
                    isMore === false ? (
                        <p className="text-medium">{subtitle}</p>
                    ) : null
                }
                    {
                    isMore === false ? (
                        <div className="price-wrapper">
                            <h6> 
                                <span className="price-number text-bold">{price}</span>
                                <span className="text-small text-medium">{sign}</span>
                            </h6>
                            <p>{text}</p>
                        </div>
                    ) : (
                        <div className="points-wrapper">
                            {/* Points */}
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
                    )
                }
                <span onClick={handleClickRegister} className="register-btn">
                    <Button color="yellow" text={buttonText} style="medium" />
                </span>
            </div>
            <div className="price-wave">
                <img src="/img/wave-gray.svg" alt="wave"/>
                {
                    isMore === false ? (
                        <span className="more" onClick={() => setIsMore(true)}>More</span>
                    ) : (
                        <span className="more" onClick={() => setIsMore(false)}>Back</span>
                    )
                }
            </div>
        </div>
    )
}

export default PriceCardFrontpage;
