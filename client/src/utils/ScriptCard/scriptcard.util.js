import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import Button from '../Button/Button.util';
import { prefix_url } from './../../helpers/requests/requests';
import { Link } from "react-router-dom";

/* Lazy Loading */
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const ScriptCard = ({
	free,
	itemsToLoad,
	title,
	author,
	year,
	image,
	id,
	redirect = (f) => f,
	authData,
	className
}) => {
	const [ activeBtn, setActiveBtn ] = useState(false);
	const [ isLoggedIn, setIsLoggedIn ] = useState(false);
	const [ scriptOpacity, setScriptOpacity ] = useState(false);
	let history = useHistory();

	useEffect(
		() => {
			setIsLoggedIn(authData.isLoggedIn);
			if(authData.isLoggedIn === true && authData.user.user_type === "USER" && authData.user.user_state === "freemium") {
				if(free === false) {
					setScriptOpacity(true);
				}
			}
		},
		[ authData ]
	);

	const handleRedirect = () => {
		let y = window.scrollY;
		sessionStorage.setItem('yPosition', y);
		sessionStorage.setItem('itemPosition', itemsToLoad);
		history.push(`/script/${id}`);
	}


	return (
		<div className={`scriptcard ${className}`}>
			<div
				className="image"
				onMouseEnter={() => setActiveBtn(true)}
				onMouseLeave={() => setActiveBtn(false)}
			>
				<div className={ scriptOpacity === true ? "opacity" : "" }>
					<LazyLoadImage
						className={id == 'example' ? 'img-example' : ''}
						effect="blur"
						src={
							id == 'example' ? `${image}` : `${prefix_url}/${image}`
						}
						height={336}
						width={224}
						placeholderSrc={"/img/empty_script.png"}
					/>
				</div>
				{
					id === "example" ? (
						null
					) : (
						<div onClick={handleRedirect}>
							<Button
								text={scriptOpacity === true ? "Locked book" : isLoggedIn ? 'Show' : 'Try it'}
								className={activeBtn == true ? 'active' : null}
								color="yellow"
								style="script-btn"
							/>
						</div>
					)
					/*<Link to={`/script/${id}`}>
					</Link>*/
				}
			</div>
			<div className="content">
				<h5 className="title">{
					title.length > 32 ? (
						title.substr(0, 32) + "..."
					) : (
						title
					)
				}</h5>
				<p className="text">{author && author.length ? (
					author[0].length > 21 ? (
						author[0].substr(0, 21) + "..."
					) : (
						author[0]
					)
				) : null}</p> 
				<p className="text">{year}</p>
			</div>
		</div>
	);
};

export default ScriptCard;
