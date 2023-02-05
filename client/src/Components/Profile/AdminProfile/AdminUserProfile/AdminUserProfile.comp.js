import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import ProfileCarousel from '../../ProfileCarousel/ProfileCarousel.comp';
import ProfileCarouselDefault from '../../ProfileCarousel/ProfileCarouselDefault.comp';
/* Utils */
import Heading from '../../../../utils/Heading/Heading.util';
import SubscriptionCard from '../../../../utils/SubscriptionCard/SubscriptionCard.util';
import Button from '../../../../utils/Button/Button.util';
import {
	validateEditProfile,
	validateChangeUserPassword
} from '../../../../helpers/validators/userforms.validator';
import SuccesAlert from '../../../../utils/Alerts/SuccessAlert/SuccessAlert.util';
import ErrorAlert from '../../../../utils/Alerts/ErrorAlert/ErrorAlert.util';
import { useParams } from 'react-router';
import Modal from 'react-bootstrap/Modal';

const AdminUserProfile = ({
	getUserInfo = (f) => f,
	getScriptsByIds = (f) => f,
	saveUserInfo = (f) => f,
	editUserPassword = (f) => f,
	deleteUser = (f) => f,
	authData
}) => {
	const [ pageState, setPageState ] = useState(1);
	const [ user, setUser ] = useState(false);
	const [ stateHistory, setStateHistory ] = useState(useHistory());
	const [ last_scripts, setLastScripts ] = useState([]);
	const [ favorite_scripts, setFavoriteScripts ] = useState([]);
	const [ dateEnding, setDateEnding ] = useState();
	const [ errors, setErrors ] = useState({});
	const [ showSuccessAlert, setShowSuccessAlert ] = useState(false);
	const [ showErrorAlert, setShowErrorAlert ] = useState(false);
	const [ passwordCredentials, setPasswordCredentials ] = useState({
		password: '',
		password2: ''
	});
	const [ showModal, setShowModal ] = useState(false);
	const [ showModalDelete, setShowModalDelete ] = useState(false);
	const history = useHistory();

	const user_id = useParams().id;

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

	// Ensure rerender on errors changes
	useEffect(
		() => {
			console.log('errors changed');
		},
		[ errors ]
	);

	// Fetch initial data on render
	useEffect(
		async () => {
			if (
				user_id !== undefined &&
				authData.user.token &&
				authData.user.refresh
			) {
				try {
					const req = await getUserInfo({ user_id });
					if (req.data.status == 200) {
						setUser(req.data.data);
						const lastOpenedScripts = await getScriptsByIds({
							script_ids: req.data.data.last_scripts
						});
						console.log(lastOpenedScripts.data.data);
						setLastScripts(lastOpenedScripts.data.data);

						const favoriteScriptsRequest = await getScriptsByIds({
							script_ids: req.data.data.favorite_scripts
						});
						setFavoriteScripts(favoriteScriptsRequest.data.data);
						let date = {
							day: new Date(
								req.data.data.subscription_ending
							).getDate(),
							month:
								new Date(
									req.data.data.subscription_ending
								).getMonth() + 1,
							year: new Date(
								req.data.data.subscription_ending
							).getFullYear()
						};
						setDateEnding(date);
					}
				} catch (error) {
					console.log(error);
				}
			}
		},
		[ user_id, authData ]
	);

	const handleCancel = () => {
		setShowModal(false);
		setShowModalDelete(false);
	};

	function redirect(id, stateHistory) {
		id != 'example'
			? history.push(`/script/${id}`)
			: history.push(`/library`);

		setStateHistory({ ...stateHistory }); // <--- here
	}

	async function saveUserProfile() {
		setShowModal(false);

		// Validation
		const errorsFromValidation = validateEditProfile(user);
		if (!errorsFromValidation) {
			try {
				const res = await saveUserInfo({ ...user });
				if (res.data.status == 200) {
					setShowSuccessAlert(true);
					setPageState(1);
				} else {
					setShowErrorAlert(true);
				}
			} catch (error) {
				setShowErrorAlert(true);
			}
		} else {
			console.log(errorsFromValidation);
			setErrors(errorsFromValidation);
		}
	}

	async function saveUserPassword() {
		setShowModal(false);
		const validationErrors = validateChangeUserPassword(
			passwordCredentials
		);
		if (!validationErrors) {
			try {
				const res = await editUserPassword({
					user_id: user._id,
					password: passwordCredentials.password
				});
				if (res.data.status == 200) {
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
			console.log(validationErrors);
			setErrors(validationErrors);
		}
	}

	const deleteUserReq = async () => {
		await deleteUser({ user_id: user._id });
		setShowModalDelete(false);
		history.push('/admin/get-all-users');
	};

	return (
		<div className="admin-user-profile">
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
					<Modal.Title>Do you want to save this changes?</Modal.Title>
				</Modal.Header>
				<Modal.Footer>
					<span
						onClick={
							pageState == 2 ? saveUserProfile : saveUserPassword
						}
					>
						<Button color="agree" text="Yes" />
					</span>
					<span onClick={handleCancel}>
						<Button color="cancel" text="No" />
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
					<span onClick={deleteUserReq}>
						<Button color="cancel" text="Yes" />
					</span>
					<span onClick={handleCancel}>
						<Button color="agree" text="No" />
					</span>
				</Modal.Footer>
			</Modal>
			<div>
				<div className="bc-grey admin-user-profile-wrapper">
					<div className="container-lg px-0 space">
						<div className="d-flex flex-column flex-lg-row align-items-start justify-content-between">
							<div className="pb-5 text-start admin-user-profile-heading">
								<Heading
									type="text"
									title={
										pageState == 1 ? (
											'Administration'
										) : pageState == 2 ? (
											'Edit profile'
										) : (
											'Change password'
										)
									}
									subtitle="of student"
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
											Back to student profile
										</span>
									</div>
								) : null}

								{pageState == 1 ? (
									<div>
										{user ? (
											<div className="user-infos">
												{console.log(user)}
												<div className="row user-info">
													<span className="col-12 col-sm-6 text-normal text-small text-bold">
														First Name
													</span>
													<span className="col-12 col-sm-6 text-normal text-small text-medium">
														{user.first_name}
													</span>
												</div>
												<div className="row user-info">
													<span className="col-12 col-sm-6 text-normal text-small text-bold">
														Last Name
													</span>
													<span className="col-12 col-sm-6 text-normal text-small text-medium">
														{user.last_name}
													</span>
												</div>

												<div className="row user-info">
													<span className="col-12 col-sm-6 text-normal text-small text-bold">
														Email
													</span>
													<span className="col-12 col-sm-6 text-normal text-small text-medium">
														{user.email}
													</span>
												</div>

												<div className="row user-info">
													<span className="col-12 col-sm-6 text-normal text-small text-bold">
														University
													</span>
													<span className="col-12 col-sm-6 text-normal text-small text-medium">
														{user.university}
													</span>
												</div>

												<div className="row user-info">
													<span className="col-12 col-sm-6 text-normal text-small text-bold">
														Faculty
													</span>
													<span className="col-12 col-sm-6 text-normal text-small text-medium">
														{user.faculty}
													</span>
												</div>

												<div className="row user-info">
													<span className="col-12 col-sm-6 text-normal text-small text-bold">
														Year
													</span>
													<span className="col-12 col-sm-6 text-normal text-small text-medium">
														{user.year}
													</span>
												</div>

												<div className="row user-info">
													<span className="col-12 col-sm-6 text-normal text-small text-bold text-start">
														Registration
													</span>
													<span className="col-12 col-sm-6 text-normal text-small text-medium text-start">
														24. 7. 2021
													</span>
												</div>

												<div className="row user-info">
													<span className="col-12 col-sm-6 text-normal text-small text-bold text-start">
														Free trial
													</span>
													<span className="col-12 col-sm-6 text-normal text-small text-medium text-start">
														{!user.paid ? (
															'Yes'
														) : (
															'No'
														)}
													</span>
												</div>

												<span
													className="text-small text-odkaz pointer text-start"
													onClick={() =>
														setPageState(2)}
												>
													Edit profile
												</span>
											</div>
										) : null}
									</div>
								) : pageState == 2 && user ? (
									<div className="user-admin-profile-form">
										<form
											action=""
											onSubmit={(e) => e.preventDefault()}
										>
											<div className="form-group">
												<label
													className="text-normal text-small"
													htmlFor="name"
												>
													First Name
												</label>
												<input
													className="form-control"
													id="name"
													type="text"
													onChange={(e) =>
														setUser((user) => ({
															...user,
															first_name:
																e.target.value
														}))}
													value={user.first_name}
												/>
												{/* Error messages */}
												{errors.first_name ? (
													<span className="error-message">
														{errors.first_name}
													</span>
												) : (
													''
												)}
											</div>
											<div className="form-group">
												<label
													className="text-normal text-small"
													htmlFor="lastname"
												>
													Last Name
												</label>

												<input
													className="form-control"
													id="lastname"
													type="text"
													value={user.last_name}
													onChange={(e) =>
														setUser((user) => ({
															...user,
															last_name:
																e.target.value
														}))}
												/>
												{/* Error messages */}
												{errors.last_name ? (
													<span className="error-message">
														{errors.last_name}
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
														setUser((user) => ({
															...user,
															email:
																e.target.value
														}))}
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
											<div className="form-group">
												<label
													className="text-normal text-small"
													htmlFor="school"
												>
													University
												</label>
												<input
													className="form-control"
													id="school"
													type="text"
													value={user.university}
													onChange={(e) =>
														setUser((user) => ({
															...user,
															university:
																e.target.value
														}))}
												/>
												{/* Error messages */}
											</div>
											<div className="form-group">
												<label
													className="text-normal text-small"
													htmlFor="faculty"
												>
													Faculty
												</label>
												<input
													className="form-control"
													id="faculty"
													type="text"
													value={user.faculty}
													onChange={(e) =>
														setUser((user) => ({
															...user,
															faculty:
																e.target.value
														}))}
												/>
												{/* Error messages */}
											</div>
											<div className="form-group">
												<label
													className="text-normal text-small"
													htmlFor="year"
												>
													Year
												</label>
												<input
													className="form-control"
													id="year"
													type="number"
													value={user.year}
													onChange={(e) =>
														setUser((user) => ({
															...user,
															year: e.target.value
														}))}
												/>
												{/* Error messages */}
												{errors.year ? (
													<span className="error-message">
														{errors.yaer}
													</span>
												) : (
													''
												)}
											</div>
											<div className="d-flex flex-column flex-sm-row justify-content-between">
												<span
													onClick={(e) =>
														setShowModal(true)}
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
								) : (
									<div className="admin-user-profile-change-password">
										{user ? (
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
														New password
													</label>
													<input
														className="form-control"
														id="password1"
														type="password"
														placeholder=""
														value={
															passwordCredentials.password
														}
														onChange={(e) =>
															setPasswordCredentials(
																(data) => ({
																	...data,
																	password:
																		e.target
																			.value
																})
															)}
													/>
													{/* Error Message */}
													{errors.password1 ? (
														<span className="error-message">
															{errors.password1}
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
														placeholder=""
														value={
															passwordCredentials.password2
														}
														onChange={(e) =>
															setPasswordCredentials(
																(data) => ({
																	...data,
																	password2:
																		e.target
																			.value
																})
															)}
													/>
													{/* Error Message */}
													{errors.password2 ? (
														<span className="error-message">
															{errors.password2}
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
										) : null}
									</div>
								)}
							</div>
							<div className="d-flex flex-column align-items-center">
								<div
									className={pageState == 1 ? '' : 'opacity'}
								>
									{dateEnding ? (
										<SubscriptionCard
											type="monthly"
											dateDay={dateEnding.day}
											dateMonth={dateEnding.month}
											dateYear={dateEnding.year}
										/>
									) : null}
								</div>
								{pageState == 2 ? (
									<span
										className="cancel-user"
										onClick={() => setShowModalDelete(true)}
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

				{/* Main */}
				<div className="admin-user-profile-main space">
					<div className="wave">
						<div className="wave-down">
							<img src="/img/wave-down-gray.svg" alt="wave" />
						</div>
					</div>
					{pageState == 1 ? (
						<div>
							<div className="profile-last-scripts">
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
										title="Recently read"
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
								) : (
									<ProfileCarouselDefault
										title="Favourite titles"
										exampleText="Add another e-book"
									/>
								)}
							</div>
						</div>
					) : (
						''
					)}
				</div>
			</div>
		</div>
	);
};

export default AdminUserProfile;
