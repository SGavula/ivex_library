import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import ReactGA from 'react-ga';
import ReactPixel from 'react-facebook-pixel';

import SectionI from './SectionIScript/SectionIScript';
import AdminScriptsPage from './Admin/AdminScriptPage.com';

/* Utils */
import Button from '../../utils/Button/Button.util';
import ScriptsCarousel from '../../utils/ScriptsCarousel/ScriptsCarousel.util';
import { prefix_url } from './../../helpers/requests/requests';
import Spinner from '../../utils/Spinner/Spinner.util';

// Helpers

const ScriptsPage = ({
	getScript = (f) => f,
	saveUserScriptData = (f) => f,
	isInFavorites = (f) => f,
	removeFromFavorites = (f) => f,
	editScriptInfo = (f) => f,
	getAllPublishers = (f) => f,
	getAnalyticsForScript = (f) => f,
	deleteScript = (f) => f,
	authData
}) => {
	const history = useHistory();
	const [ scriptInfo, setScriptInfo ] = useState();
	const [ admin, setAdmin ] = useState(false);
	const [ stateHistory, setStateHistory ] = useState(useHistory());
	const [ isFavorite, setIsFavorite ] = useState(false);
	const [ mainScriptButtonText, setMainScriptButtonText ] = useState(
		'Try for free'
	);
	const [ userState, setUserState ] = useState();
	const [ showSimilarScript, setShowSimilarScripts ] = useState(true);
	const id = useParams().id;

	function redirect(id, stateHistory) {
		history.push(`/script/${id}/false`);
		setStateHistory({ ...stateHistory }); // <--- here
	}

	useEffect(
		() => {
			window.scrollTo({
				top: 0,
				left: 0,
				behavior: 'instant'
			});
		},
		[ history.location ]
	);

	useEffect(
		() => {
			if (scriptInfo) {
				ReactGA.pageview(
					`/script/${scriptInfo._id}`,
					`${scriptInfo.name}`
				);
				ReactPixel.pageView();
			}
		},
		[ scriptInfo ]
	);

	useEffect(
		async () => {
			console.log('running effect');
			const response = await getScript(id);
			setScriptInfo(response.data.data);

			if (authData.isLoggedIn) {
				// show similar scripts
				if (
					authData.user.user_type == 'ADMIN' ||
					authData.user.user_type == 'PUBLISHER'
				) {
					setShowSimilarScripts(false);
					setUserState(false);
				}
				// set admin
				if (authData.user.user_type == 'ADMIN') {
					setAdmin(true);
					setMainScriptButtonText('Read');
					setUserState(true);
				}
			} else {
				setUserState(false);
			}

			if (
				authData.isLoggedIn == true &&
				authData.user.user_type == 'USER'
			) {
				if (authData.user.user_state === 'freemium') {
					if (scriptInfo) {
						if (scriptInfo.free === true) {
							setMainScriptButtonText('Read');
						} else {
							setMainScriptButtonText('Upgrade subscription');
						}
					}
				} else {
					setMainScriptButtonText('Read');
				}
				// Save script to last user if he is logged in
				const values1 = {
					user_id: authData.user.user_id,
					script_id: id,
					reqtype: 2
				};
				try {
					saveUserScriptData({ ...values1 });
				} catch (error) {
					console.log(error);
				}

				// Check if script is in favorites
				const values2 = {
					user_id: authData.user.user_id,
					script_id: id
				};
				try {
					const result = await isInFavorites({ ...values2 });
					setIsFavorite(result.data.data);
					console.log('In getting the state', isFavorite);
				} catch (error) {
					console.log(error);
				}

				if (authData.user.user_state === 'freemium') {
					setUserState(false);
				} else {
					setUserState(true);
				}
			} else {
				console.log('user is not logged in');
			}
		},
		[ stateHistory, isFavorite, authData, history.location ]
	);

	const mainScriptButtonRedirect = () => {
		if (authData.isLoggedIn) {
			if (authData.user.user_state === 'freemium') {
				if (scriptInfo.free === true) {
					history.push(`/viewer/${id}/false`);
				} else {
					null;
				}
			} else {
				history.push(`/viewer/${id}/false`);
			}
		} else {
			history.push('/register');
		}
	};

	function addOrRemoveToFavorites() {
		if (authData.isLoggedIn == true) {
			if (!isFavorite) {
				const values = {
					user_id: authData.user.user_id,
					script_id: id,
					reqtype: 1
				};
				console.log('Saving to favorites');
				saveUserScriptData({ ...values });
			} else {
				const values = {
					user_id: authData.user.user_id,
					script_id: id
				};
				removeFromFavorites({ ...values });
			}

			setIsFavorite(!isFavorite);
		} else {
			console.log('not logged in');
		}
	}

	function redirectToCategory() {
		history.push(`/category/${scriptInfo.category}`);
	}

	// function changeScriptInfoByAdmin (data)

	useEffect(
		() => {
			if (scriptInfo) {
				document.title = `IVEX Library - ${scriptInfo.name}`;
			}
		},
		[ scriptInfo ]
	);

	return (
		<div>
			{userState == undefined ? (
				<div className="spinner-wrapper">
					<Spinner />
				</div>
			) : (
				<div className="scriptspage">
					{userState == false ? (
						<div className="scriptspage-sectionI">
							<SectionI authData={authData} />
						</div>
					) : (
						''
					)}
					<div className="scriptspage-main">
						{userState == false ? (
							/* Wave */
							<div className="wave">
								<div className="wave-down position-relative d-flex align-items-center">
									<img
										src="/img/wave-down-gray.svg"
										alt="wave"
									/>
									<span
										className="text-small text-bold text-odkaz pointer hide-btn"
										onClick={(e) => setUserState(true)}
									>
										Hide
									</span>
								</div>
							</div>
						) : (
							''
						)}
						<div className="px-0 pt-5">
							<div className="container-lg row pt-5 pb-5 mb-5">
								<div className="col-12 col-lg-4 px-0">
									{/* Image and Button */}
									<div className="main-image pb-3">
										<img
											src={`${prefix_url}/${scriptInfo.image}`}
										/>
										{/*<img
											src={URL.createObjectURL(scriptInfo.image)}
										/>*/}
										{authData.isLoggedIn ? (
											<div
												className="favorite"
												onClick={addOrRemoveToFavorites}
											>
												<img
													src={
														isFavorite ? (
															'/img/star_full.svg'
														) : (
															'/img/star.svg'
														)
													}
													alt="star"
												/>
												<div className="white" />
											</div>
										) : (
											''
										)}
									</div>
									<div
										onClick={mainScriptButtonRedirect}
										className="btn"
									>
										{authData.user.user_state ===
										'freemium' ? scriptInfo.free ===
										false ? (
											<Link to="/profile?edit=true">
												<Button
													color="yellow"
													text="Upgrade subscription"
													style="large"
												/>
											</Link>
										) : (
											<Button
												color="yellow"
												text="Show e-book"
												style="large"
											/>
										) : (
											<Button
												color="yellow"
												text={mainScriptButtonText}
												style="large"
											/>
										)}
									</div>
								</div>

								{/* Decription of script */}
								<div className="col-12 col-lg-8 px-0 space">
									<div className="script-credentials">
										<div className="tags row mx-0">
											<p
												className="tag text-center my-0 text-10"
												onClick={redirectToCategory}
											>
												{scriptInfo.category}
											</p>
										</div>
										<h1 className="title text-title text-32 text-bold my-0 pb-3 pt-4">
											{scriptInfo.name}
										</h1>
										<p className="title-info text-small my-0 text-medium">
											{scriptInfo.author[0]}
										</p>
										<p className="title-info text-small my-0 text-medium">
											{scriptInfo.year}
										</p>
									</div>
									<div className="about-script pt-4 pb-5">
										<h3 className="text-small text-bold">
											About e-book
										</h3>
										<p className="paragraph text-small text-medium">
											{scriptInfo.info}
										</p>
									</div>
									<div className="script-info">
										<p className="text-bold text-small">
											Informations
										</p>
										<div className="d-flex">
											<div>
												{
													scriptInfo.author ? (
														<p className="info-tag text-bold text-small">
															Author/s:
														</p>
													) : null
												}
												{
													scriptInfo.year ? (
														<p className="info-tag text-bold text-small">
															Year:
														</p>
													) : null
												}
												{
													scriptInfo.isbn ? (
														<p className="info-tag text-bold text-small">
															ISBN:
														</p>
													) : null
												}
												{
													scriptInfo.lang ? (
														<p className="info-tag text-bold text-small">
															Language:
														</p>
													) : null
												}
												{
													scriptInfo.city ? (
														<p className="info-tag text-bold text-small">
															City:
														</p>
													) : null
												}
												{
													scriptInfo.publishing ? (
														<p className="info-tag text-bold text-small">
															Publishing:
														</p>
													) : null
												}
												{
													scriptInfo.licence ? (
														<p className="info-tag text-bold text-small">
															License:
														</p>
													) : null
												}
											</div>
											<div className="px-4">
												{
													scriptInfo.author ? (
														<p className="info-text text-small text-medium">
															{scriptInfo.author.join(
																', '
															)}
														</p>
													) : null
												}
												{
													scriptInfo.year ? (
														<p className="info-text text-small text-medium">
															{scriptInfo.year}
														</p>
													) : null
												}
												{
													scriptInfo.isbn ? (
														<p className="info-text text-small text-medium">
															{scriptInfo.isbn}
														</p>
													) : null
												}
												{
													scriptInfo.lang ? (
														<p className="info-text text-small text-medium">
															{scriptInfo.lang}
														</p>
													) : null
												}
												{scriptInfo.city ? (
													<p className="info-text text-small text-medium">
														{scriptInfo.city}
													</p>
												) : null}
												{
													scriptInfo.publishing ? (
														<p className="info-text text-small text-medium">
															<a
																href={
																	scriptInfo.publishing_link
																}
															>
																{scriptInfo.publishing}
															</a>
														</p>
													) : null
												}
												{
													scriptInfo.licence ? (
														<p className="info-text text-small text-medium">
															<a
																href={
																	scriptInfo.licence_link
																}
															>
																{scriptInfo.licence}
															</a>
														</p>
													) : null
												}
											</div>
										</div>
									</div>
								</div>
							</div>
							{showSimilarScript ? (
								<div className="similar-scripts">
									<ScriptsCarousel
										title={`You might be interested`}
										id={id}
										tag={scriptInfo.category}
										limit={10}
										redirect={(e) =>
											redirect(e, stateHistory)}
										stateHistory={stateHistory}
										authData={authData}
									/>
								</div>
							) : null}
						</div>
					</div>
					{admin ? (
						<AdminScriptsPage
							scriptInfo={scriptInfo}
							getAllPublishers={(e) => getAllPublishers(e)}
							setScriptInfo={(e) => setScriptInfo(e)}
							editScriptInfo={(e) => editScriptInfo(e)}
							getAnalyticsForScript={(e) =>
								getAnalyticsForScript(e)}
							deleteScript={(e) => deleteScript(e)}
						/>
					) : null}
				</div>
			)}
		</div>
	);
};

export default ScriptsPage;
