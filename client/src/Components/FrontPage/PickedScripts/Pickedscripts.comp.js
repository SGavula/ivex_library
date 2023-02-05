import React, { Component, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

/* Utils */
import ScriptCard from '../../../utils/ScriptCard/scriptcard.util';
import Heading from '../../../utils/Heading/Heading.util';
import { default_request_config, get_request } from '../../../helpers';
import { useHistory } from 'react-router';
let path = 'http://localhost:8000/api/';

const PickedScripts = ({ authData }) => {
	const history = useHistory();

	const settings = {
		dots: true,
		slidesToShow: 5,
		slidesToScroll: 5,
		arrows: false,
		infinite: true,
		speed: 500,
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

	const [ pickedScripts, setPickedScripts ] = useState([]);

	useEffect(async () => {
		let scripts = await get_request(
			`/script/picked`,
			default_request_config
		);
		setPickedScripts(scripts.data.data);
	}, []);

	function redirect(id) {
		history.push(`/script/${id}`);
	}

	return (
		<div className="pickedScripts-frontpage">
			<div className="container-lg px-0 space">
				<div className="heading-wrapper">
					<Heading
						type=""
						title="The most reading"
						subtitle="e-titles"
					/>
					<div className="more">
						<Link to="/library">Find more</Link>
					</div>
				</div>
				<div className="scripts">
					{!pickedScripts.length ? (
						<h1>No scripts yet</h1>
					) : (
						<Slider {...settings}>
							{pickedScripts.map((script, index) => (
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
							))}
						</Slider>
					)}
				</div>
			</div>
			{ /* Wave */ }
			<div className="wave">
				<div className="wave-down">
					<img src="/img/wave-up.svg" alt="wave" />
				</div>
			</div>
		</div>
	);
};

export default PickedScripts;
