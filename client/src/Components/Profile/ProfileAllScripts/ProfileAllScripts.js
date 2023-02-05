import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

/* Utils */
import Heading from '../../../utils/Heading/Heading.util';
import ScriptCard from '../../../utils/ScriptCard/scriptcard.util';
import Spinner from '../../../utils/Spinner/Spinner.util';

const ProfileAllScripts = ({
	getPublisher = (f) => f,
	getScriptsByIds = (f) => f,
	authData
}) => {
	const [ scripts, setScripts ] = useState();
	const [ publisherName, setPublisherName ] = useState();

	const publisher_id = useParams().id;

	useEffect(() => {
		window.scrollTo({
			top: 0,
			left: 0,
			behavior: 'instant'
		});
	}, []);

	// Intitial data get
	useEffect(
		async () => {
			try {
				if (authData.isLoggedIn && publisher_id) {
					const req = await getPublisher(publisher_id);
					setPublisherName(req.data.data.name);

					if (req.data.status == 200) {
						const gettedScriptsRequest = await getScriptsByIds({
							script_ids: req.data.data.scripts
						});

						if (gettedScriptsRequest.data.status == 200) {
							setScripts(gettedScriptsRequest.data.data);

							setSelectTitle(
								gettedScriptsRequest.data.data[0].name
							);
						}
					}
				}
			} catch (error) {
				console.log(error);
			}
		},
		[ authData, publisher_id ]
	);
		
	return (
		<div className="library-category">
			<div className="container-lg px-0">
				<div className="heading">
					<Heading
						title={authData.user.user_type === "ADMIN" ?  `Books published` : "Books you have published"}
						subtitle={authData.user.user_type === "ADMIN" ?  `by ${publisherName}` : "all the books in one place"}
					/>
				</div>
				<div className="scripts">
					{
						scripts ? (
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
						)
					}
				</div>
			</div>
		</div>
	);
};

export default ProfileAllScripts;
