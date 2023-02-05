import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import ProfileCarousel from '../ProfileCarousel/ProfileCarousel.comp';
import Heading from '../../../utils/Heading/Heading.util';
import Button from '../../../utils/Button/Button.util';
import ProfileCard from '../../../utils/ProfileCard/ProfileCard.util';
import CreateScriptPublisher from './CreateScriptPublisher/CreateScriptPublisher';
import ChangeScriptPublisher from './ChangeScriptPublisher/ChangeScriptPublisher';
import SuccesAlert from '../../../utils/Alerts/SuccessAlert/SuccessAlert.util';
import ErrorAlert from '../../../utils/Alerts/ErrorAlert/ErrorAlert.util';
import Spinner from '../../../utils/Spinner/Spinner.util';
import {
	validateEditPublisherCredentials,
	validatePublisherEditPassword
} from '../../../helpers/validators/publisherform.validator';
import LineChart from '../../../utils/LineChart/LineChart';
import Tag from '../../../utils/Tags/Tag.util';
//Import chart
import { Line } from 'react-chartjs-2';
import * as ReactScroll  from 'react-scroll'

const PublisherProfile = ({
	getPublisher = (f) => f,
	getScriptsByIds = (f) => f,
	uploadScript = (f) => f,
	editPublisherData = (f) => f,
	requestScriptChange = (f) => f,
	getPublisherPayData = (f) => f,
	getPublisherViews = (f) => f,
	getPublisherPayGraphData = (f) => f,
	getAnalyticsForScript = (f) => f,
	authData
}) => {
	const [ stateHistory, setStateHistory ] = useState(useHistory());
	const [ info, setInfo ] = useState({});
	const [ scripts, setScripts ] = useState();
	const [ errors, setErrors ] = useState({});
	const [ page, setPage ] = useState(1);
	const [ changedData, setChangeData ] = useState({});
	const [ infoChangeStatus, setInfoChangeStatus ] = useState(1);
	const [ infoChangeStatusPassword, setInfoChangeStatusPassword ] = useState(
		1
	);
	const [ passwords, setPasswords ] = useState({
		password: '',
		password2: ''
	});
	const [ showSuccessAlert, setShowSuccessAlert ] = useState(false);
	const [ showErrorAlert, setShowErrorAlert ] = useState(false);
	const [ pay, setPay ] = useState();
	const [ views, setViews ] = useState();
	const [ graphData, setGraphData ] = useState(false);
	const [ scriptGraphData, setScriptGraphData ] = useState(false);
	const [ selectedScriptId, setSelectedScriptId ] = useState();
	const [ graphClicker, setGraphClicker ] = useState(true);
	const [ selectTitle, setSelectTitle ] = useState('');

	const data = {
		labels: [
			'JAN',
			'FEB',
			'MAR',
			'APR',
			'MAY',
			'JUNE',
			'JULY',
			'AUG',
			'SEP',
			'OCT',
			'NOV',
			'DEC'
		],
		backgroundColor: 'rgb(0, 0, 0)',
		datasets: [
			{
				label: 'Odmena',
				data: graphData,
				fill: false,
				backgroundColor: 'rgb(255, 197, 15)',
				borderColor: 'rgb(96, 147, 211)',
				borderWidth: 1,
				pointBorderColor: 'rgb(255, 197, 15)'
			}
		]
	};

	const options = {
		responsive: true,
		plugins: {
			legend: {
				display: false
			},
			tooltip: {
				backgroundColor: '#EFF4FB',
				titleColor: '#6093D3',
				bodyColor: '#6093D3',
				padding: {
					x: 16,
					y: 10
				},
				displayColors: false
			}
		},
		transitions: {
			show: {
				animations: {
					x: {
						from: 500
					},
					y: {
						from: 1000
					}
				}
			},
			hide: {
				animations: {
					x: {
						to: 500
					},
					y: {
						to: 1000
					}
				}
			}
		},
		scales: {
			x: {
				grid: {
					color: 'rgb(239, 244, 251)'
				},
				ticks: {
					color: 'rgb(45, 64, 106)',
					font: {
						size: 12,
						family: 'Montserrat',
						weight: 500
					}
				}
			},
			yAxes: {
				ticks: {
					color: 'rgb(45, 64, 106)',
					font: {
						size: 12,
						family: 'Montserrat',
						weight: 500
					}
				},
				grid: {
					display: false
				}
			}
		}
	};

	useEffect(
		() => {
			window.scrollTo({
				top: 0,
				left: 0,
				behavior: 'instant'
			});
		},
		[ page ]
	);

	useEffect(async () => {
		const publisher = await getPublisher(authData.user.user_id);
		if (publisher) {
			setInfo(publisher.data.data);
			const pay_request = await getPublisherPayData({
				publisher_id: publisher.data.data._id,
				month: new Date().getMonth()
			});
			if (pay_request.data.data) {
				setPay(pay_request.data.data);
			}
			const views_request = await getPublisherViews({
				publisher_id: publisher.data.data._id
			});
			if (views_request.data.data) {
				setViews(views_request.data.data);
			}
			const pay_graph_request = await getPublisherPayGraphData({
				publisher_id: publisher.data.data._id
			});
			if (pay_graph_request.data.data) {
				setGraphData(pay_graph_request.data.data);
			}
			setSelectedScriptId(publisher.data.data.scripts[0]);
		} else {
			setErrors({ main: 'There is an error' });
		}
	}, []);

	useEffect(
		async () => {
			if (info.scripts) {
				const gettedScriptsRequest = await getScriptsByIds({
					script_ids: info.scripts
				});

				if(gettedScriptsRequest.data.data.length > 50) {
					setScripts(gettedScriptsRequest.data.data.slice(0, 50));
				}else {
					setScripts(gettedScriptsRequest.data.data);
				}

				setSelectTitle(gettedScriptsRequest.data.data[0].name);
			}
			setChangeData({
				name: info.name,
				email: info.email
			});
		},
		[ info ]
	);

	function redirect(id) {
		id ? stateHistory.push(`/script/${id}`) : history.push(`/library`);

		// setStateHistory({ ...stateHistory }); // <--- here
	}

	async function updateCredentials() {
		const validationResult = validateEditPublisherCredentials(changedData);
		if (!validationResult) {
			try {
				const response = await editPublisherData({
					...changedData,
					id: info._id
				});
				console.log(response);
				if (response.data.status == 200) {
					setShowSuccessAlert(true);
				}
			} catch (error) {
				if (error) {
					setShowErrorAlert(true);
				}
			}
		} else {
			setErrors(validationResult);
		}
	}

	async function updatePassword() {
		const validationResult = validatePublisherEditPassword(passwords);
		if (!validationResult) {
			try {
				const response = await editPublisherData({
					...passwords,
					id: info._id
				});
				if (response.data.status == 200) {
					setShowSuccessAlert(true);
				} else {
					setShowErrorAlert(true);
				}
			} catch (error) {
				if (error) {
					setShowErrorAlert(true);
				}
			}
		} else {
			setErrors(validationResult);
		}
	}

	useEffect(
		async () => {
			if (info) {
				const graph_request = await getAnalyticsForScript({
					script_id: selectedScriptId,
					publisher_id: info._id
				});
				if (graph_request && graph_request.data.data) {
					setScriptGraphData(graph_request.data.data.reverse());
				}
			}
		},
		[ selectedScriptId, info ]
	);

	const handleClick = (e) => {
		const select_arrow = document.querySelector('#select-arrow-publisher');
		const options_container = document.querySelector(
			'#options-container-publisher'
		);

		setSelectedScriptId(e.target.value);
		select_arrow.classList.toggle('active-img');
		options_container.classList.toggle('active');
		setSelectTitle(e.target.id);
		if(e.target.value !== selectedScriptId) {
			setScriptGraphData([ 0, 0, 0 ]);
		}
	};

	const toggle = () => {
		const select_arrow = document.querySelector('#select-arrow-publisher');
		const options_container = document.querySelector(
			'#options-container-publisher'
		);

		select_arrow.classList.toggle('active-img');
		options_container.classList.toggle('active');
	};

	return (
		<div className="publisher-profile">
			{infoChangeStatus == 1 ? (
				''
			) : infoChangeStatus == 2 ? (
				<div>
					<SuccessAlert
						text="Your personal data have been changed successfully."
						btnText="Close"
					/>
				</div>
			) : (
				<ErrorAlert
					text="An error occurred while changing your data."
					btnText="Close"
				/>
			)}

			{infoChangeStatusPassword == 1 ? (
				''
			) : infoChangeStatusPassword == 2 ? (
				<div>
					<SuccessAlert
						text="Your password has been changed successfully."
						btnText="Close"
					/>
				</div>
			) : (
				<ErrorAlert
					text="An error occurred while changing your data."
					btnText="Close"
				/>
			)}
			{info ? (
				<div>
					<SuccesAlert
						title={'Your personal data have been changed successfully.'}
						text={''}
						btnText={'Close'}
						show={showSuccessAlert}
						setShow={setShowSuccessAlert}
					/>
					<ErrorAlert
						title={'Oops, something went wrong.'}
						text={'Please, try it later.'}
						btnText={'Close'}
						show={showErrorAlert}
						setShow={setShowErrorAlert}
					/>
					{/* Heading */}
					<div className="bc-grey padding-y">
						<div className="container-lg px-0 space">
							<div className="d-flex flex-column flex-md-row  align-items-center align-items-md-start justify-content-between">
								<div className="pb-5 text-center text-md-start col-12 col-md-6">
									<Heading
										type={page == 1 ? 'text' : ''}
										title={
											page == 1 ? (
												'Welcome,'
											) : (
												'Edit profile,'
											)
										}
										subtitle={
											page == 1 ? (
												info.name
											) : (
												'Update your informations'
											)
										}
										text={info.email}
									/>
									<div>
										{page == 1 ? (
											<div>
												<span className="text-small text-odkaz">
													<div className="pointer">
														<span
															onClick={() =>
																setPage(2)}
														>
															Edit profile
														</span>
													</div>
												</span>
												<div className="upload-script-btn">
												<ReactScroll.Link
													to="upload-script"
												>
													<Button
														color="yellow"
														text="Upload e-books"
													/>
												</ReactScroll.Link>
												</div>
											</div>
										) : page == 2 ? (
											<div className="pt-4">
												<span
													className="text-small text-odkaz pointer"
													onClick={() => setPage(1)}
												>
													Back to profile
												</span>
												<div className="change-publisher-info text-start">
													<form
														onSubmit={(e) =>
															e.preventDefault()}
													>
														<div className="form-group">
															<label
																className="text-normal text-small"
																htmlFor="name"
															>
																Name
															</label>
															<input
																className="form-control"
																id="name"
																placeholder="Vydaveťeľstvo XYZ"
																value={
																	changedData.name
																}
																onChange={(e) =>
																	setChangeData(
																		(
																			data
																		) => ({
																			...data,
																			name:
																				e
																					.target
																					.value
																		})
																	)}
															/>
															{errors.name ? (
																<span className="error-message">
																	{
																		errors.name
																	}
																</span>
															) : (
																''
															)}
														</div>

														<div className="form-group">
															<label
																className="text-normal text-small"
																htmlFor="email"
															>
																Email
															</label>
															<input
																className="form-control"
																id="email"
																placeholder="František@Umpalumpičovič.sk"
																value={
																	changedData.email
																}
																onChange={(e) =>
																	setChangeData(
																		(
																			data
																		) => ({
																			...data,
																			email:
																				e
																					.target
																					.value
																		})
																	)}
																type="email"
															/>
															{errors.email ? (
																<span className="error-message">
																	{
																		errors.email
																	}
																</span>
															) : (
																''
															)}
														</div>

														<div className="d-flex justify-content-between align-items-center">
															<span
																className="pe-3"
																onClick={
																	updateCredentials
																}
															>
																<Button
																	color="yellow"
																	text="Save"
																/>
															</span>
															<span
																className="text-small text-odkaz pointer"
																onClick={() =>
																	setPage(3)}
															>
																Change your password
															</span>
														</div>
													</form>
												</div>
											</div>
										) : (
											<div className="pt-4">
												<span
													className="text-small text-odkaz pointer"
													onClick={() => setPage(1)}
												>
													Back to profile
												</span>
												<div className="change-publisher-info text-start">
													<form
														onSubmit={(e) =>
															e.preventDefault()}
													>
														<div className="form-group">
															<label
																className="text-normal text-small"
																htmlFor="password1"
															>
																Password
															</label>
															<input
																className="form-control"
																id="password1"
																type="password"
																value={
																	passwords.password
																}
																onChange={(e) =>
																	setPasswords(
																		(
																			data
																		) => ({
																			...data,
																			password:
																				e
																					.target
																					.value
																		})
																	)}
																placeholder="**********"
															/>
															{errors.password ? (
																<span className="error-message">
																	{
																		errors.password
																	}
																</span>
															) : (
																''
															)}
														</div>

														<div className="form-group">
															<label
																className="text-normal text-small"
																htmlFor="password2"
															>
																Password confirmation
															</label>
															<input
																className="form-control"
																id="password2"
																type="password"
																value={
																	passwords.password2
																}
																onChange={(e) =>
																	setPasswords(
																		(
																			data
																		) => ({
																			...data,
																			password2:
																				e
																					.target
																					.value
																		})
																	)}
																placeholder="**********"
															/>
															{errors.password2 ? (
																<span className="error-message">
																	{
																		errors.password2
																	}
																</span>
															) : (
																''
															)}
														</div>

														<span
															className="pe-3"
															onClick={
																updatePassword
															}
														>
															<Button
																color="yellow"
																text="Submit"
															/>
														</span>
													</form>
												</div>
											</div>
										)}
									</div>
								</div>

								<div className="d-flex flex-column flex-xl-row justify-content-between align-items-center">
									<ProfileCard
										icon="/img/euro.svg"
										title="Revenues"
										price={pay}
										time="for this month"
										className={
											page == 1 ? (
												'mb-5 mb-xl-0 me-0 me-xl-5'
											) : (
												'mb-5 mb-xl-0 me-0 me-xl-5 opacity'
											)
										}
										priceIcon={true}
									/>
									<ProfileCard
										icon="/img/eye.svg"
										title="Views"
										price={views}
										time="for this year"
										className={page == 1 ? '' : 'opacity'}
									/>
								</div>
							</div>
						</div>
					</div>

					{/* Main Content */}
					<div className="publisher-profile-main position-relative">
						{/* Wave */}
						<div className="wave">
							<div className="wave-down">
								<img src="/img/wave-down-gray.svg" alt="wave" />
							</div>
						</div>
						<div className="px-0 space py-160">
							{/* Analytics */}
							{page == 1 ? (
								<div className="container-lg">
									<div className="graph-clicker">
										<span
											className={
												graphClicker == true ? (
													'tags-grey me-2'
												) : (
													'me-2'
												)
											}
											onClick={() =>
												setGraphClicker(true)}
										>
											<Tag text="Rewards summary" />
										</span>
										<span
											className={
												graphClicker == false ? (
													'tags-grey'
												) : (
													''
												)
											}
											onClick={() =>
												setGraphClicker(false)}
										>
											<Tag text="Ebooks summary" />
										</span>
									</div>
									{graphClicker == true ? graphData ==
									false ? (
										<Spinner />
									) : (
										<div className="rewards">
											<h1 className="text-title text-32 text-bold my-0">
												Rewards summary
											</h1>
											<div className="chart-wrapper">
												<div className="chart">
													<Line
														data={data}
														options={options}
													/>
												</div>
											</div>
										</div>
									) : scriptGraphData == false ? (
										<Spinner />
									) : (
										<div>
											<div className="scripts-select-box">
												<div className="">
													<label
														className="text-normal text-small"
														htmlFor="script"
													>
														Select your ebook
													</label>
													<div className="select-box-wrapper">
														<div className="select-box">
															<div className="select-box">
																<div
																	className="selected"
																	onClick={
																		toggle
																	}
																>
																	<span>
																		{
																			selectTitle
																		}
																	</span>
																	<span>
																		<img
																			id="select-arrow-publisher"
																			src="/icons/select-arrow.svg"
																			alt="Select icon"
																		/>
																	</span>
																</div>
																<div
																	id="options-container-publisher"
																	className="options-container"
																>
																	{scripts.map(
																		(
																			item
																		) => (
																			<div
																				className="option"
																				key={
																					item._id
																				}
																			>
																				<input
																					className="radio"
																					type="radio"
																					id={
																						item.name
																					}
																					name="name"
																					value={
																						item._id
																					}
																					onClick={
																						handleClick
																					}
																				/>
																				<label
																					htmlFor={
																						item.name
																					}
																				>
																					{
																						item.name
																					}
																				</label>
																			</div>
																		)
																	)}
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
											<LineChart
												chartData={scriptGraphData}
												title="Reading summary of your ebooks"
											/>
										</div>
									)}
								</div>
							) : null}

							{/* Uploated Scripts */}
							<div
								className={
									page == 1 ? (
										'py-160'
									) : page == 2 ? (
										'py-160 pt-0'
									) : (
										'py-0'
									)
								}
							>
								{scripts ? (
									<ProfileCarousel
										title={'Your uploaded e-books'}
										getted_scripts={scripts}
										authData={authData}
										stateHistory={stateHistory}
										redirect={(e) => redirect(e)}
										type="publisher"
										publisher_id={authData.user.user_id}
									/>
								) : null}
							</div>

							{/* Upload Scripts */}
							{page == 1 ? (
								<CreateScriptPublisher
									info={info}
									uploadScript={(e) => uploadScript(e)}
								/>
							) : page == 2 ? (
								<ChangeScriptPublisher
									requestScriptChange={(e) =>
										requestScriptChange(e)}
									info={info}
								/>
							) : null}
						</div>
					</div>
				</div>
			) : (
				<Spinner />
			)}
		</div>
	);
};

export default PublisherProfile;
