import React, { useEffect, useState } from 'react';

/* Utils */
import Button from '../../../../utils/Button/Button.util';
import PriceCard from '../../../../utils/PriceCard/PriceCard.util';
import Modal from 'react-bootstrap/Modal';

/* Validators */
import {
	validateEditProfile
} from '../../../../helpers/validators/userforms.validator';

const ChangeInfo = ({
	saveUserInfo = (f) => f,
	backToProfile,
	saveUserInformationSuccess,
	saveUserInformationError,
	cancelSubscription = (f) => f,
	changeSubscription = (f) => f,
	renewSubscription = (f) => f,
	user,
	userCredentialsChangeInfo,
	authData
}) => {

	/* Change Informations Logic Use States */
	const [ errorMessages, setErrorMessages ] = useState({});
	const [ userCredentials, setUserCredentials ] = useState(userCredentialsChangeInfo);
	const [ active, setActive ] = useState(1);

	/* Change Subscription Type Logic Use States */
	const [ showModal, setShowModal ] = useState(false);
	const [ subscription_type, setSububscriptionType ] = useState('mesačné');
	const [ buttonId, setButtonId ] = useState(0);
	const [ newSubType, setNewSubType ] = useState(0);

	/* Set Width */
	const [ width, setWidth ] = useState(window.innerWidth);
	window.addEventListener('resize', () => setWidth(window.innerWidth));


	/* Modal Logic */
	const handleCancel = () => setShowModal(false);
	const handleConfirm = async () => {
		setShowModal(false);

		if (buttonId == 0 && authData.user.user_state !== 'awaiting-cancel') {
			cancelSub();
		} else if (
			buttonId == 0 &&
			authData.user.user_state == 'awaiting-cancel'
		) {
			renewSub();
		} else if (buttonId == 1 && newSubType !== 0) {
			const req = await changeSubscription({
				id: user._id,
				new_sub: newSubType
			});
		} else {
			setShowModal(false);
		}
		/* Send to server */
	};

	async function cancelSub() {
		if (authData.isLoggedIn && user) {
			const req = await cancelSubscription({ id: user._id });
			console.log(req);
		}
	}

	async function renewSub() {
		if (authData.isLoggedIn && user) {
			const req = await renewSubscription({ id: user._id });
		}
	}

	const buttonIdFunction = () => {
		setButtonId(priceCardInfo.id);
		setShowModal(true);
	};

	/* Responsive Payment Cards Logic */
	const [ priceCardInfo, setPriceCardInfo ] = useState({
		id: 1,
		title: 'Monthly',
		subtitle: 'cancel anytime',
		price: '5',
		sign: '€',
		text: 'monthly payment',
		buttonText: 'Choose',
		buttonColor: 'yellow'
	});

	const [ responsiveTitle, setResponsiveTitle ] = useState({
		mesiac: 'Monthly',
		semester: 'Sem...',
		rok: 'Free...'
	});

	/* Saving Informations */
	async function saveUserInformation() {
		// Validation
		const errorsFromValidation = validateEditProfile(userCredentials);
		if (!errorsFromValidation) {
			try {
				const res = await saveUserInfo({ ...userCredentials });
				if (res.data.status == 200) {
					saveUserInformationSuccess();
				} else {
					saveUserInformationError();
				}
			} catch (error) {
				console.log(error);
			}
		} else {
			setErrorMessages(errorsFromValidation);
		}
	}

	return (
		<div className="form-profile-edit">
			{/* Modal For Membership and Cancel */}
			<Modal
				show={showModal}
				onHide={handleCancel}
				backdrop="static"
				keyboard={false}
				dialogClassName="custom-modal"
			>
				<Modal.Header>
					<Modal.Title>
						{buttonId == 0 &&
						authData.user.user_state == 'awaiting-cancel' ? (
							"Do you want to renew your subscription?"
						) : buttonId == 0 &&
						authData.user.user_state == 'subscribed' ? (
							'Do you want to cancel your substription?'
						) : (
							'Do you want to change your substription?'
						)}
					</Modal.Title>
				</Modal.Header>
				<Modal.Footer>
					<span onClick={handleConfirm}>
						<Button color="cancel" text="Yes" />
					</span>
					<span onClick={handleCancel}>
						<Button color="agree" text="No" />
					</span>
				</Modal.Footer>
			</Modal>
			
			{/* Change informations form */}
			{
				user ? (
					<div className="bc-grey">
						<div className="container-lg px-0 space row mx-0">
							<div className="col-12 col-md-6 py-5 pt-md-0 px-0">
								<form
									action=""
									onSubmit={(e) => e.preventDefault()}
								>
									<div className="form-group">
										{/* Name */}
										<label
											className="text-normal text-small"
											htmlFor="name"
										>
											First Name
										</label>
										<input
											className={errorMessages.first_name ? "form-control input-error" : "form-control"}
											id="name"
											type="text"
											defaultValue={
												user.first_name
											}
											onChange={async (e) => {
												setUserCredentials(
													(user) => ({
														...user,
														first_name:
															e.target
																.value
													})
												);
											}}
										/>
										{errorMessages.first_name ? (
											<span className="error-message">
												{
													errorMessages.first_name
												}
											</span>
										) : (
											''
										)}
									</div>

									{/* Last Name */}
									<div className="form-group">
										<label
											className="text-normal text-small"
											htmlFor="lastname"
										>
											Last Name
										</label>

										<input
											className={errorMessages.last_name ? "form-control input-error" : "form-control"}
											id="lastname"
											type="text"
											defaultValue={
												user.last_name
											}
											onChange={async (e) => {
												setUserCredentials(
													(user) => ({
														...user,
														last_name:
															e.target
																.value
													})
												);
											}}
										/>
										{errorMessages.last_name ? (
											<span className="error-message">
												{
													errorMessages.last_name
												}
											</span>
										) : (
											''
										)}
									</div>

									{/* Email */}
									<div className="form-group">
										<label
											className="text-normal text-small"
											htmlFor="email"
										>
											Email
										</label>
										<input
											className={errorMessages.email ? "form-control input-error" : "form-control"}
											id="email"
											type="email"
											defaultValue={user.email}
											onChange={async (e) => {
												setUserCredentials(
													(user) => ({
														...user,
														email:
															e.target
																.value
													})
												);
											}}
										/>
										{errorMessages.email ? (
											<span className="error-message">
												{errorMessages.email}
											</span>
										) : (
											''
										)}
										<span className="text-small text-odkaz mt-3">
											*After changing your email you will have to log in again
										</span>
									</div>

									{/* School */}
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
											defaultValue={
												user.university
											}
											onChange={async (e) => {
												setUserCredentials(
													(user) => ({
														...user,
														university:
															e.target
																.value
													})
												);
											}}
										/>
									</div>

									{/* Faculty */}
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
											defaultValue={user.faculty}
											onChange={async (e) => {
												setUserCredentials(
													(user) => ({
														...user,
														faculty:
															e.target
																.value
													})
												);
											}}
										/>
									</div>

									{/* Year */}
									<div className="form-group">
										<label
											className="text-normal text-small"
											htmlFor="year"
										>
											Year
										</label>
										<input
											className={errorMessages.year ? "form-control input-error" : "form-control"}
											id="year"
											type="text"
											defaultValue={user.year}
											onChange={async (e) => {
												setUserCredentials(
													(user) => ({
														...user,
														year:
															e.target
																.value
													})
												);
											}}
										/>
										{errorMessages.year ? (
											<span className="error-message">
												{errorMessages.year}
											</span>
										) : (
											''
										)}
									</div>
									<div className="d-flex flex-column flex-sm-row justify-content-between">
										<div
											onClick={
												saveUserInformation
											}
										>
											<Button
												text={'Save'}
												color={'yellow'}
											/>
										</div>
										<span
											className="text-small text-odkaz pointer pt-2"
											onClick={backToProfile}
										>
											Cancel profile edit
										</span>
									</div>
								</form>
							</div>

							{/* Payments Cards */}
							<div className="col-12 col-md-6 d-flex flex-column align-items-center align-items-md-end user-profile-price-card px-0">
								{width < 768 ? (
									<div className="col-12">
										<div className="labels mx-auto d-flex">
											<div
												className={
													active == 1 ? (
														'label active'
													) : (
														'label'
													)
												}
												onClick={() => {
													setPriceCardInfo({
														id: 1,
														title:
															'Monthly',
														subtitle:
															'cancel anytime',
														price: '5',
														sign: '€',
														text:
															'monthly payment',
														buttonText:
															'Choose',
														buttonColor:
															'yellow'
													});
													setResponsiveTitle({
														mesiac:
															'Monthly',
														semester:
															'Sem...',
														rok: 'Free...'
													});
													setActive(1);
												}}
											>
												{responsiveTitle.mesiac}
											</div>
											<div
												className={
													active == 2 ? (
														'label mx-2 active'
													) : (
														'label mx-2'
													)
												}
												onClick={() => {
													setPriceCardInfo({
														id: 2,
														title:
															'Semester',
														subtitle:
															'6-month subscription',
														price: '4,50',
														sign: '€',
														text:
															'payment of 48 € semestrally',
														buttonText:
															'Choose',
														buttonColor:
															'yellow'
													});
													setResponsiveTitle({
														mesiac:
															'Mon...',
														semester:
															'Semester',
														rok: 'Free...'
													});
													setActive(2);
												}}
											>
												{responsiveTitle.semester}
											</div>
											<div
												className={
													active == 3 ? (
														'label active'
													) : (
														'label'
													)
												}
												onClick={() => {
													setPriceCardInfo({
														id: 3,
														title:
															'Freemium',
														subtitle:
															'Free access',
														price: '0',
														sign: '€',
														text: '',
														buttonText:
															'Choose',
														buttonColor:
															'yellow'
													});
													setResponsiveTitle({
														mesiac:
															'Mon...',
														semester:
															'Sem...',
														rok: 'Freemium'
													});
													setActive(3);
												}}
											>
												{responsiveTitle.rok}
											</div>
										</div>
										<div className="d-flex justify-content-center">
											<PriceCard
												title={
													priceCardInfo.title
												}
												subtitle={
													priceCardInfo.subtitle
												}
												price={
													priceCardInfo.price
												}
												sign={
													priceCardInfo.sign
												}
												text={
													priceCardInfo.text
												}
												type="profile"
												wave="false"
												buttonText={'Choose'}
												buttonColor={'yellow'}
												handleClickMembership={
													buttonIdFunction
												}
											/>
										</div>
									</div>
								) : (
									<div>
										{authData.user.subscription_type == 1 ? (
											<div className="user-card">
												<PriceCard
													title="Semester"
													subtitle="6-month subscription"
													price="8"
													sign="€"
													text="payment of 48 € semestrally"
													wave={true}
													type="profile"
													buttonText={
														'Choose'
													}
													buttonColor={
														'yellow'
													}
													handleClickMembership={() => (
														setButtonId(1),
														setNewSubType(
															2
														),
														setShowModal(
															true
														)
													)}
												/>
											</div>
										) : null}
										{authData.user.subscription_type == 2 ? (
											<div className="user-card">
												<PriceCard
													title="Monthly"
													subtitle="cancel anytime"
													price="9"
													sign="€"
													text="monthly payment"
													wave={true}
													type="profile"
													buttonText={
														'Choose'
													}
													buttonColor={
														'yellow'
													}
													handleClickMembership={() => (
														setButtonId(1),
														setNewSubType(
															1
														),
														setShowModal(
															true
														)
													)}
												/>
											</div>
										) : null}
										{authData.user.subscription_type == 3 ? (
											<div className="user-card">
												<PriceCard
													title="Monthly"
													subtitle="cancel anytime"
													price="9"
													sign="€"
													text="monthly payment"
													wave={true}
													type="profile"
													buttonText={
														'Choose'
													}
													buttonColor={
														'yellow'
													}
													handleClickMembership={() => (
														setButtonId(1),
														setNewSubType(
															1
														),
														setShowModal(
															true
														)
													)}
												/>
											</div>
										) : null}
										{authData.user.subscription_type == 3 ? (
											<div className="user-card">
												<PriceCard
													title="Semester"
													subtitle="6-month subscription"
													price="8"
													sign="€"
													text="payment of 48 € semestrally"
													wave={true}
													type="profile"
													buttonText={
														'Choose'
													}
													buttonColor={
														'yellow'
													}
													handleClickMembership={() => (
														setButtonId(1),
														setNewSubType(
															2
														),
														setShowModal(
															true
														)
													)}
												/>
											</div>
										) : null}
										{authData.user.user_state !== 'freemium' ? (
											<div className="user-card">
												<PriceCard
													title="Freemium"
													subtitle="Free access"
													price="0"
													sign="€"
													text=""
													wave={true}
													type="profile"
													buttonText={
														'Choose'
													}
													buttonColor={
														'yellow'
													}
													handleClickMembership={() => (
														setButtonId(2),
														setNewSubType(
															3
														),
														setShowModal(
															true
														)
													)}
												/>
											</div>
										) : null}
									</div>
								)}
								<div className="cancel-membership">
									<span
										onClick={() => (
											setButtonId(0),
											setShowModal(true)
										)}
									>
										<Button
											text={
												authData &&
												authData.user
													.user_state ==
													'awaiting-cancel' ? (
													'Renew subscription'
												) : (
													'Cancel subscription'
												)
											}
											className="cancel white"
										/>
									</span>
								</div>
							</div>
						</div>
					</div>
				) : null
			}

			<div className="change-info-white position-relative">
				{/* Wave */}
				<div className="wave">
					<div className="wave-down">
						<img
							src="/img/wave-down-gray.svg"
							alt="wave"
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ChangeInfo;
