import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import ReactPixel from 'react-facebook-pixel';

/* Utils */
import Heading from '../../utils/Heading/Heading.util';
import {
	get_request,
	default_request_config
} from '../../helpers/requests/requests';

import ScriptCard from '../../utils/ScriptCard/scriptcard.util';
import Spinner from '../../utils/Spinner/Spinner.util';

const LibraryCategoryComponent = ({ authData }) => {
	const [ renderReady, setRenderReady ] = useState(false);
	const [ scripts, setScripts ] = useState([]);
	const [ stateHistory, setStateHistory ] = useState(useHistory());
	const history = useHistory();
	const category = useParams().name;
	const category_name = category.charAt(0).toUpperCase() + category.slice(1);

	useEffect(async () => {
		const res = await get_request(`/script/${category}/1000`, {
			...default_request_config
		});
		setScripts(res.data.data);
		console.log(res.data.data);
	}, []);

	useEffect(
		() => {
			setRenderReady(true);
		},
		[ scripts ]
	);

	useEffect(
		() => {
			if (category) {
				document.title = `IVEX Library - ${category}`;
			}
		},
		[ history.location, category ]
	);

	function redirect(id, stateHistory) {
		history.push(`/script/${id}`);
		setStateHistory({ ...stateHistory }); // <--- here
	}

	useEffect(() => {
		window.scrollTo({
			top: 0,
			left: 0,
			behavior: 'instant'
		});
		ReactPixel.pageView();
	}, []);

	return (
		<div className="library-category">
			<div className="container-lg px-0">
				<div className="heading">
					<Heading
						title={category_name}
						subtitle="Knihy na jednom mieste"
					/>
				</div>
				{/* row g-0 mx-auto justify-content-center justify-content-xl-start */}
				<div className="scripts">
					{renderReady ? (
						<div className="scripts-grid">
							{scripts.map((script, index) => {
								return (
									<ScriptCard
										className="pb-5 px-0 mx-3"
										id={script._id}
										key={index}
										title={script.name}
										year={script.year}
										author={script.author}
										image={script.image}
										authData={authData}
										redirect={(e) => redirect(e)}
									/>
								);
							})}
						</div>
					) : (
						<Spinner />
					)}
				</div>
			</div>
		</div>
	);
};

export default LibraryCategoryComponent;
