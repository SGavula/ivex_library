import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
/* Utils */
import ScriptCard from '../../../utils/ScriptCard/scriptcard.util';

const ProfileCarouselDefault = ({
	title,
	exampleText
}) => {

	const [ scripts, setScripts ] = useState([]);

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
				breakpoint: 1400,
				settings: {
					slidesToShow: 4,
					slidesToScroll: 4
				}
			},
			{
				breakpoint: 1200,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 3
				}
			},
			{
				breakpoint: 768,
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
			for (let i = 0; i < 5; i++) {
				setScripts((scripts) => [
					...scripts,
					{ index: i, _id:"example", name: exampleText, image: '/img/empty_script.png' }
				]);
			}
		},
		[]
	);
		
	return (
		<div className="p-carousel d-flex flex-column justify-content-center">
			<div className="container-lg px-0">
				<h5 className="text-title section-title">{title}</h5>
				<div className="scripts">
					<Slider {...settings}>
						{scripts.length ? (
							scripts.map((script, index) => (
								<ScriptCard
									key={index}
									id={script._id}
									title={script.name}
									image={script.image}
									redirect={(e) => redirect(e)}
									authData="asdfasdf"
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

export default ProfileCarouselDefault;
