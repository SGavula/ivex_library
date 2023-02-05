import React, { useState, useEffect, useReducer } from 'react';
import { useHistory } from 'react-router-dom';

/* Utils */
import Heading from '../../../../utils/Heading/Heading.util';
import ProfileCard from '../../../../utils/ProfileCard/ProfileCard.util';
import ProfileCarousel from '../../ProfileCarousel/ProfileCarousel.comp';
import Button from '../../../../utils/Button/Button.util';
import {
	validateEditProfile,
	validateChangeUserPassword
} from '../../../../helpers/validators/userforms.validator';
import SuccesAlert from '../../../../utils/Alerts/SuccessAlert/SuccessAlert.util';
import ErrorAlert from '../../../../utils/Alerts/ErrorAlert/ErrorAlert.util';
import { useParams } from 'react-router';
import {
	validateEditPublisherCredentials,
	validatePublisherEditPassword
} from '../../../../helpers/validators/publisherform.validator';
import LineChart from '../../../../utils/LineChart/LineChart';
import Tag from '../../../../utils/Tags/Tag.util';
import Spinner from '../../../../utils/Spinner/Spinner.util';
import Modal from 'react-bootstrap/Modal';

//Import chart
import { Line } from 'react-chartjs-2';

const AdminPublisherProfile = ({
	getPublisher = (f) => f,
	editPublisherData = (f) => f,
	getScriptsByIds = (f) => f,
	getPublisherPayData = (f) => f,
	getPublisherViews = (f) => f,
	getPublisherPayGraphData = (f) => f,
	getAnalyticsForScript = (f) => f,
	deletePublisher = (f) => f,
	authData,
}) => {
	const [ pageState, setPageState ] = useState(1);
	const [ stateHistory, setStateHistory ] = useState(useHistory());
	const [ user, setUser ] = useState({});
	const [ passwordCredentials, setPasswordCredentials ] = useState({
		password: '',
		password2: ''
	});
	const [ graphData, setGraphData ] = useState(false);
	const [ scripts, setScripts ] = useState(false);
	const [ showSuccessAlert, setShowSuccessAlert ] = useState(false);
	const [ showErrorAlert, setShowErrorAlert ] = useState(false);
	const [ pay, setPay ] = useState('');
	const [ views, setViews ] = useState('');
	const [ errors, setErrors ] = useState({});
	const [ scriptGraphData, setScriptGraphData ] = useState(false);
	const [ selectedScriptId, setSelectedScriptId ] = useState();
	const [ graphClicker, setGraphClicker ] = useState(true);
	const [ selectTitle, setSelectTitle ] = useState('');
	const [ showModal, setShowModal ] = useState(false);
	const [ showModalDelete, setShowModalDelete ] = useState(false);

	const handleCancel = () => {
		setShowModal(false);
		setShowModalDelete(false);
	};

	useEffect(
		() => {
			window.scrollTo({
				top: 0,
				left: 0,
				behavior: 'instant'
			});
		},
		[ pageState ]
	);

	const publisher_id = useParams().id;

	// Intitial data get
	useEffect(
		async () => {
			try {
				if (authData.isLoggedIn && publisher_id) {
					const req = await getPublisher(publisher_id);

					if (req.data.status == 200) {
						setUser(req.data.data);
						const gettedScriptsRequest = await getScriptsByIds({
							script_ids: req.data.data.scripts
						});

						if (gettedScriptsRequest.data.status == 200) {
							setScripts(gettedScriptsRequest.data.data);

							setSelectTitle(
								gettedScriptsRequest.data.data[0].name
							);
						}
						const pay_graph_request = await getPublisherPayGraphData(
							{
								publisher_id: publisher_id
							}
						);
						if (pay_graph_request.data.status == 200) {
							setGraphData(pay_graph_request.data.data);
						}
						setSelectedScriptId(req.data.data.scripts[0]);
					}

					// Pay
					const payRequest = await getPublisherPayData({
						publisher_id: publisher_id,
						month: new Date().getMonth()
					});
					if (payRequest.data.status == 200) {
						setPay(payRequest.data.data);
					}

					const viewsRequest = await getPublisherViews({
						publisher_id: publisher_id,
						month: new Date().getMonth()
					});
					if (viewsRequest.data.status == 200) {
						setViews(viewsRequest.data.data);
					}
				}
			} catch (error) {
				console.log(error);
				setShowErrorAlert(true);
			}
		},
		[ authData, publisher_id ]
	);

	const savePublisherInfo = async () => {
		setShowModal(false);
		const validation = validateEditPublisherCredentials(user);
		if (!validation) {
			try {
				const req = await editPublisherData({
					...user,
					id: publisher_id
				});
				if (req.data.status == 200) {
					setPageState(1);
					setShowSuccessAlert(true);
				} else {
					setShowErrorAlert(true);
				}
			} catch (error) {
				console.log(error);
				setShowErrorAlert(true);
			}
		} else {
			console.log(validation);
			setErrors(validation);
		}
	};

	const updatePassword = async () => {
		setShowModal(false);
		const validationResult = validatePublisherEditPassword(
			passwordCredentials
		);
		if (!validationResult) {
			try {
				const response = await editPublisherData({
					...passwordCredentials,
					id: user._id
				});
				if (response.data.status == 200) {
					setShowSuccessAlert(true);
					setPageState(1);
				} else {
					setShowErrorAlert(true);
				}
			} catch (error) {
				if (error) {
					setShowErrorAlert(true);
				}
			}
		} else {
			console.log(validationResult);
			setErrors(validationResult);
		}
	};

	useEffect(
		async () => {
			try {
				if (user._id) {
					const graph_request = await getAnalyticsForScript({
						script_id: selectedScriptId,
						publisher_id: user._id
					});
					if (graph_request && graph_request.data.data) {
						setScriptGraphData(graph_request.data.data.reverse());
					}
				}
			} catch (error) {
				console.log(error);
			}
		},
		[ selectedScriptId, user ]
	);

	const handleClick = (e) => {
		const select_arrow = document.querySelector('#select-arrow-publisher');
		const options_container = document.querySelector(
			'#options-container-publisher'
		);

		console.log('Target value', e.target.value);
		console.log('Script id', selectedScriptId);
		setSelectedScriptId(e.target.value);

		select_arrow.classList.toggle('active-img');
		options_container.classList.toggle('active');
		setSelectTitle(e.target.id);
		if (e.target.value !== selectedScriptId) {
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

	const history = useHistory();
	function redirect(id) {
		id !== 'example'
			? history.push(`/script/${id}`)
			: history.push(`/library`);

		// setStateHistory({ ...stateHistory }); // <--- here
	}

	const deletePublisherReq = async () => {
		await deletePublisher({ publisher_id: publisher_id });
		setShowModalDelete(false);
		history.push('/admin/get-all-users');
	};

	useEffect(
		() => {
			console.log(scripts);
		},
		[ scripts ]
	);

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

	return (
		<div className="admin-publisher-profile">
			<SuccesAlert
				text="Profile was changed successfully."
				btnText="Close"
				show={showSuccessAlert}
				setShow={(e) => setShowSuccessAlert(e)}
			/>
			<ErrorAlert
				text="An error occurred while changing the data."
				btnText="Close"
				setShow={(e) => setShowErrorAlert(e)}
				show={showErrorAlert}
			/>
			<Modal
				show={showModal}
				onHide={handleCancel}
				backdrop="static"
				keyboard={false}
				dialogClassName="custom-modal"
			>
				<Modal.Header>
					<Modal.Title>Do you want to save this changes??</Modal.Title>
				</Modal.Header>
				<Modal.Footer>
					<span
						onClick={
							pageState == 2 ? savePublisherInfo : updatePassword
						}
					>
						<Button color="agree" text="Ano" />
					</span>
					<span onClick={handleCancel}>
						<Button color="cancel" text="Nie" />
					</span>
				</Modal.Footer>
			</Modal>
			<Modal
				show={showModalDelete}
				onHide={handleCancel}
				backdrop="static"
				keyboard={false}
				dialogClassName="custom-modal"
			>
				<Modal.Header>
					<Modal.Title>
						Do you want to delete this user?
					</Modal.Title>
				</Modal.Header>
				<Modal.Footer>
					<span onClick={deletePublisherReq}>
						<Button color="cancel" text="Ano" />
					</span>
					<span onClick={handleCancel}>
						<Button color="agree" text="Nie" />
					</span>
				</Modal.Footer>
			</Modal>
			<div>
				<div className="bc-grey admin-publisher-profile-wrapper">
					<div className="container-lg px-0 space">
						<div className="d-flex flex-column flex-lg-row align-items-start justify-content-between">
							<div className="pb-5 text-start admin-publisher-profile-heading ">
								<Heading
									type=""
									title={
										pageState == 1 ? (
											'Administration'
										) : pageState == 2 ? (
											'Edit profile'
										) : (
											'Change password'
										)
									}
									subtitle="of publisher"
								/>
								{pageState == 2 ? (
									<div className="change-page">
										<span
											className="text-small text-odkaz pointer change-page"
											onClick={() => {
												setPageState(3);
											}}
										>
											Change password
										</span>
									</div>
								) : pageState == 3 ? (
									<div className="change-page">
										<span
											className="text-small text-odkaz pointer change-page"
											onClick={() => {
												setPageState(1);
											}}
										>
											Back to publisher profile
										</span>
									</div>
								) : null}

								{pageState == 1 ? (
									<div>
										<div className="publishers-infos">
											{user ? (
												<div>
													<div className="row publisher-info">
														<span className="col-12 col-sm-6 text-normal text-small text-bold">
															Name
														</span>
														<span className="col-12 col-sm-6 text-normal text-small text-medium">
															{user.name}
														</span>
													</div>

													<div className="row publisher-info">
														<span className="col-12 col-sm-6 text-normal text-small text-bold">
															Email
														</span>
														<span className="col-12 col-sm-6 text-normal text-small text-medium">
															{user.email}
														</span>
													</div>

													<div className="row publisher-info">
														<span className="col-12 col-sm-6 text-normal text-small text-bold">
															ID
														</span>
														<span className="col-12 col-sm-6 text-normal text-small text-medium">
															{user._id}
														</span>
													</div>
												</div>
											) : null}
											<span
												className="text-small text-odkaz pointer text-start"
												onClick={() => setPageState(2)}
											>
												Edit profile
											</span>
										</div>
									</div>
								) : pageState == 2 ? (
									<div className="publisher-admin-profile-form">
										{user ? (
											<div>
												<form
													action=""
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
															type="text"
															value={user.name}
															onChange={(e) =>
																setUser(
																	(user) => ({
																		...user,
																		name:
																			e
																				.target
																				.value
																	})
																)}
														/>
														{/* Error messages */}
														{errors.name ? (
															<span className="error-message">
																{errors.name}
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
															type="email"
															value={user.email}
															onChange={(e) =>
																setUser(
																	(user) => ({
																		...user,
																		email:
																			e
																				.target
																				.value
																	})
																)}
														/>
														{/* Error messages */}
														{errors.email ? (
															<span className="error-message">
																{errors.email}
															</span>
														) : (
															''
														)}
													</div>
													<div className="d-flex flex-column flex-sm-row justify-content-between">
														<span
															onClick={(e) =>
																setShowModal(
																	true
																)}
														>
															<Button
																text={'Save'}
																color={'yellow'}
															/>
														</span>
														<span
															className="text-small text-odkaz pointer pt-2"
															onClick={() =>
																setPageState(1)}
														>
															Cancel profile edit
														</span>
													</div>
												</form>
											</div>
										) : null}
									</div>
								) : (
									<div className="admin-publisher-profile-change-password">
										{user ? (
											<div>
												<form
													action=""
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
																passwordCredentials.password
															}
															onChange={(e) =>
																setPasswordCredentials(
																	(data) => ({
																		...data,
																		password:
																			e
																				.target
																				.value
																	})
																)}
															placeholder=""
														/>
														{/* Error Message */}
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
																passwordCredentials.password2
															}
															onChange={(e) =>
																setPasswordCredentials(
																	(data) => ({
																		...data,
																		password2:
																			e
																				.target
																				.value
																	})
																)}
															placeholder=""
														/>
														{/* Error Message */}
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
														onClick={(e) =>
															setShowModal(true)}
													>
														<Button
															color={'yellow'}
															text={'Submit'}
														/>
													</span>
												</form>
											</div>
										) : null}
									</div>
								)}
							</div>
							<div className="d-flex flex-column align-items-center">
								<div className="admin-publisher-profile-cards">
									<ProfileCard
										icon="/img/euro.svg"
										title="Revenues"
										price={pay}
										time="for this month"
										className={
											pageState == 1 ? '' : 'opacity'
										}
										priceIcon={true}
									/>

									<ProfileCard
										icon="/img/eye.svg"
										title="Views"
										price={views}
										time="whole period"
										className={
											pageState == 1 ? '' : 'opacity'
										}
									/>
								</div>
								{pageState == 2 ? (
									<span
										className="cancel-publisher"
										onClick={(e) =>
											setShowModalDelete(true)}
									>
										<Button
											className="cancel"
											text="Delete user"
										/>
									</span>
								) : null}
							</div>
						</div>
					</div>
				</div>
			</div>
			{/* Main */}
			<div className="admin-publisher-profile-main">
				<div className="wave">
					<div className="wave-down">
						<img src="/img/wave-down-gray.svg" alt="wave" />
					</div>
				</div>

				{/* Analytics - Graph */}
				{pageState == 1 ? (
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
								onClick={() => setGraphClicker(true)}
							>
								<Tag text="Rewards summary" />
							</span>
							<span
								className={
									graphClicker == false ? 'tags-grey' : ''
								}
								onClick={() => setGraphClicker(false)}
							>
								<Tag text="Ebooks summary" />
							</span>
						</div>
						{graphClicker == true ? graphData == false ? (
							<Spinner />
						) : (
							<div className="rewards">
								<h1 className="text-title text-32 text-bold my-0">
									Rewards summary
								</h1>
								<div className="chart-wrapper">
									<div className="chart">
										<Line data={data} options={options} />
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
											Select ebook
										</label>
										<div className="select-box-wrapper">
											<div className="select-box">
												<div className="select-box">
													<div
														className="selected"
														onClick={toggle}
													>
														<span>
															{selectTitle}
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
														{scripts.map((item) => (
															<div
																className="option"
																key={item._id}
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
																	{item.name}
																</label>
															</div>
														))}
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

				{/* Carousel */}
				<div
					className={
						pageState == 1 ? (
							'py-160'
						) : pageState == 2 ? (
							'py-160 pt-0'
						) : (
							'py-0'
						)
					}
				>
					{scripts ? (
						<ProfileCarousel
							title={'E-books of publihser'}
							getted_scripts={scripts}
							authData={authData}
							stateHistory={stateHistory}
							redirect={(e) => redirect(e)}
							type={"publisher"}
							publisher_id={publisher_id}
						/>
					) : null}
				</div>
			</div>
		</div>
	);
};

export default AdminPublisherProfile;
