import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
/* Utils */
import ScriptCard from '../ScriptCard/scriptcard.util';
import { get_request, default_request_config } from '../../helpers';
import Spinner from '../../utils/Spinner/Spinner.util';
import { useHistory } from 'react-router';

const ScriptsCarousel = ({
	itemsToLoad,
	title,
	id,
	tag,
	limit,
	redirect = (f) => f,
	stateHistory,
	authData,
	type,
	library_redirect = (f) => f
}) => {
	const history = useHistory();
	const settings = {
		dots: true,
		arrows: false,
		infinite: true,
		speed: 500,
		slidesToShow: 5,
		slidesToScroll: 5,
		autoplay: false,
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
	const [ scripts, setScripts ] = useState();

	let scriptNum = 0;

	const getScriptsForCarousel = async (tag, limit) => {
		const res = await get_request(`/script/${tag}/${limit}`, {
			...default_request_config
		});
		return res;
	};
	useEffect(
		async () => {
			const response = await getScriptsForCarousel(tag, limit);
			const resultScripts = response.data.data.filter(
				(script) => script._id !== id
			);
			if (resultScripts.length) {
				setScripts(resultScripts);
			} else {
				// TODO: FIX THIS
				// for (let i = 0; i < 5; i++) {
				// 	setScripts((resultScripts) => [
				// 		...resultScripts,
				// 		{
				// 			index: i,
				// 			_id: 'example',
				// 			name: '',
				// 			image: '/img/empty_script.png'
				// 		}
				// 	]);
				// }
			}
		},
		[ stateHistory ]
	);

	useEffect(
		() => {
			if (scripts) {
				if (scripts.length) {
					scriptNum = 5 - scripts.length;
				} else {
					scriptNum = 5;
				}

				if (scriptNum < 5) {
					for (let i = 0; i < scriptNum; i++) {
						setScripts((scripts) => [
							...scripts,
							{
								index: i,
								_id: 'example',
								name: '',
								image: '/img/empty_script.png'
							}
						]);
					}
				}
			}
		},
		[ scripts ]
	);

	function category_name_click() {
		if (type == 'library') {
			library_redirect(title.toLowerCase(), history);
		}
	}

	return (
		<div className="pickedScripts d-flex flex-column justify-content-center">
			<div className="container-lg px-0">
				<h5
					className="text-title section-title d-inline-block pointer"
					onClick={category_name_click}
				>
					{title}
				</h5>
				<div className="scripts">
					<Slider {...settings}>
						{scripts ? (
							scripts.map((script, index) => (
								<ScriptCard
									free={script.free}
									itemsToLoad={itemsToLoad}
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
							<Spinner />
						)}
					</Slider>
				</div>
			</div>
		</div>
	);
};

export default ScriptsCarousel;
