import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

/* Utils */
import Button from '../../../../utils/Button/Button.util';

/* Validators */
import {
	validateChangeUserPassword,
} from '../../../../helpers/validators/userforms.validator';

const ChangePassword = ({
	editUserPassword = (f) => f,
	saveUserPasswordSuccess,
	saveUserPasswordError,
	user,
}) => {
	/* Change Password Use State */
	const [ passwordCredentials, setPasswordCredentials ] = useState({
		password: '',
		password2: ''
	});
	const [ errorMessages, setErrorMessages ] = useState({});

	/* Change Password Logic */
	async function saveUserPassword() {
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
					saveUserPasswordSuccess();
				} else {
					saveUserPasswordError();
				}
			} catch (error) {
				console.log(error);
			}
		} else {
			setErrorMessages(validationErrors);
		}
	}

	return (
		<div className="profile-password-change">
			<div className="profile-wrapper bc-grey">
				<div className="container-lg px-0 space">
					<div className="row g-0">
						<div className="col-12 col-md-6 d-flex flex-column justify-content-center py-5 pt-md-0">
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
										className={errorMessages.password1 ? "form-control input-error" : "form-control"}
										id="password1"
										type="password"
										placeholder="**********"
										onChange={(e) => {
											setPasswordCredentials(
												(
													passwordCredentials
												) => ({
													...passwordCredentials,
													password:
														e.target
															.value
												})
											);
										}}
									/>
									{errorMessages.password1 ? (
										<span className="error-message">
											{
												errorMessages.password1
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
										className={errorMessages.password2 ? "form-control input-error" : "form-control"}
										id="password2"
										type="password"
										placeholder="**********"
										onChange={(e) => {
											setPasswordCredentials(
												(
													passwordCredentials
												) => ({
													...passwordCredentials,
													password2:
														e.target
															.value
												})
											);
										}}
									/>
									{errorMessages.password2 ? (
										<span className="error-message">
											{
												errorMessages.password2
											}
										</span>
									) : (
										''
									)}
								</div>
								<div
									onClick={saveUserPassword}
								>
									<Button
										color={'yellow'}
										text={'Submit'}
									/>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
			<div className="profile-white position-relative">
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

export default ChangePassword;
