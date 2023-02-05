import React, { useEffect, useState } from 'react';
import { Link, useHistory } from "react-router-dom";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
/* Utils */
import ScriptCard from '../../../utils/ScriptCard/scriptcard.util';
import Tag from "../../../utils/Tags/Tag.util";

const ProfileCarousel = ({
	title,
	getted_scripts,
	redirect = (f) => f,
	stateHistory,
	authData,
	exampleText,
	type,
	publisher_id
}) => {
	const [ scripts, setScripts ] = useState([]);
	const history = useHistory();

	let scriptNum = 0;

	const settings = {
		dots: true,
		arrows: false,
		infinite: true,
		speed: 500,
		slidesToShow: 5,
		slidesToScroll: 5,
		autoplay: false,
		autoplaySpeed: 4000,
		pauseOnHover: true,
		responsive: [
			{
				breakpoint: 1440,
				settings: {
					slidesToShow: 4,
					slidesToScroll: 4
				}
			},
			{
				breakpoint: 1100,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 3
				}
			},
			{
				breakpoint: 800,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2
				}
			},
			{
				breakpoint: 600,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1
				}
			}
		]
	};

	useEffect(
		() => {
			//Buď su nejáké alebo žiadne
			if(getted_scripts.length) {
				setScripts(getted_scripts.slice(0, 50));
			}else {
				for (let i = 0; i < 5; i++) {
					setScripts((scripts) => [
						...scripts,
						{ index: i, _id:"example", name: exampleText, image: '/img/empty_script.png' }
					]);
				}
			}
		},
		[]
	);

		
	if(scripts.length) {
		scriptNum = 5 - scripts.length;
	}else {
		scriptNum = 5;
	}

	
	
	useEffect(
		() => {
			if (scriptNum < 5) {
				for (let i = 0; i < scriptNum; i++) {
					setScripts((scripts) => [
						...scripts,
						{ index: i, _id:"example", name: exampleText, image: '/img/empty_script.png' }
					]);
				}
			}
		},
		[ scripts ]
	);
	
	const handleClickPublisher = (id) => {
		history.push(`/profile/all-scripts/${id}`);
	};
	

	return (
		<div className="p-carousel d-flex flex-column justify-content-center">
			<div className="container-lg px-0">
				<div className="heading">
					<h5 className="text-title section-title">{title}</h5>
					{
						type === "publisher" ? (
							<span onClick={(e) => handleClickPublisher(publisher_id)}>
								<Tag text="Show all e-books" />
							</span>
						) : (
							null
						)
					}
				</div>
				<div className="scripts">
					<Slider {...settings}>
						{scripts.length ? (
							scripts.map((script, index) => (
								<ScriptCard
									key={index}
									id={script._id}
									title={script.name}
									author={script.author}
									year={script.year}
									image={script.image}
									redirect={(e) => redirect(e)}
									authData={authData}
								/>
							))
						) : (
							<h1>No scripts yet</h1>
						)}
					</Slider>
				</div>
			</div>
		</div>
	);
};

export default ProfileCarousel;
