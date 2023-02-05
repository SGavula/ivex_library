import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

/* Utils */
import ProfileCarousel from '../../ProfileCarousel/ProfileCarousel.comp';
import ProfileCarouselDefault from '../../ProfileCarousel/ProfileCarouselDefault.comp';

const userCarousels = ({
	getUserInfo = (f) => f,
	getScriptsByIds = (f) => f,
	authData
}) => {

	// Use State Hooks
	const [ gotData, setGotData ] = useState(false);
	const [ last_scripts, setLastScripts ] = useState([]);
	const [ stateHistory, setStateHistory ] = useState(useHistory());
	const [ favorite_scripts, setFavoriteScripts ] = useState([]);

	// Use History state
	const history = useHistory();

	//Wait for authData
	useEffect(
		() => {
			setGotData(true);
		},
		[ authData ]
	);
	
	/* Get Scripts logic */
	useEffect(
		async () => {
			/* Checkne ci je user prihlasený */
			if (authData.isLoggedIn) {
				try {
					const result = await getUserInfo({
						user_id: authData.user.user_id
					});
					//setUser(result.data.data);
					//setUserCredentials(result.data.data);
					const lastOpenedScripts = await getScriptsByIds({
						script_ids: result.data.data.last_scripts
					});

					setLastScripts(lastOpenedScripts.data.data);

					const favoriteScriptsRequest = await getScriptsByIds({
						script_ids: result.data.data.favorite_scripts
					});
					setFavoriteScripts(favoriteScriptsRequest.data.data);
				} catch (error) {
					console.log(error);
				}
			}
		},
		[ gotData ]
	);

	/* Redirect to script page */
	function redirect(id, stateHistory) {
		id != 'example'
			? history.push(`/script/${id}`)
			: history.push(`/library`);

		setStateHistory({ ...stateHistory }); // <--- here
	}

	return (
		<div className="scripts-carousel space position-relative">
			{/* Wave */}
			<div className="wave">
				<div className="wave-down">
					<img
						src="/img/wave-down-gray.svg"
						alt="wave"
					/>
				</div>
			</div>
			<div className="profile-last-scripts pt-5">
				{last_scripts.length ? (
					<ProfileCarousel
						getted_scripts={last_scripts}
						stateHistory={stateHistory}
						authData={authData}
						title={'Recently read'}
						redirect={(e) => redirect(e)}
						exampleText="Recently read"
					/>
				) : (
					<ProfileCarouselDefault
						title="The last e-books you read"
						exampleText="Recently read"
					/>
				)}
			</div>
			<div className="profile-favorite-scripts py-5">
				{favorite_scripts.length ? (
					<ProfileCarousel
						getted_scripts={favorite_scripts}
						stateHistory={stateHistory}
						authData={authData}
						title={'Favourite titles'}
						redirect={(e) => redirect(e)}
						slength={last_scripts.length}
						exampleText="Add another e-book"
					/>
				) : null}
			</div>
		</div>
	);
};

export default userCarousels;
