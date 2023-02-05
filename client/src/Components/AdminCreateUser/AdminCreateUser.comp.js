import React, { useState, useEffect } from 'react';

/* Utils */
import Button from '../../utils/Button/Button.util';
import Radio from '../../utils/Button/Radio.util';
import SuccesAlert from '../../utils/Alerts/SuccessAlert/SuccessAlert.util';
import ErrorAlert from '../../utils/Alerts/ErrorAlert/ErrorAlert.util';
import {
	validateCreateAdmin,
	validateCreatePublisher,
	validateCreateUser
} from '../../helpers/validators/adminforms.validator';

const AdminCreateUser = ({
	createAdmin = (f) => f,
	createPublisher = (f) => f,
	generateUser = (f) => f
}) => {
	const [ type, setType ] = useState(1);
	const [ user, setUser ] = useState({});

	const [ showSuccessAlert, setShowSuccessAlert ] = useState(false);
	const [ showErrorAlert, setShowErrorAlert ] = useState(false);

	// TODO: Add error messages to inputs
	const [ errors, setErrors ] = useState({});

	async function handleSubmit() {
		if (type == 1) {
			try {
				const validation = validateCreateUser({
					first_name: user.first_name,
					last_name: user.last_name,
					email: user.email
				});
				if (!validation) {
					const res = await generateUser({
						first_name: user.first_name,
						last_name: user.last_name,
						email: user.email
					});
					if (res.data.status == 200) {
						setShowSuccessAlert(true);
						resetCredentials();
					} else {
						setShowErrorAlert(true);
					}
				} else {
					console.log(validation);
					setErrors(validation);
				}
			} catch (error) {
				setShowErrorAlert(true);
			}
		} else if (type == 2) {
			try {
				const validation = validateCreatePublisher({
					name: user.name,
					email: user.email
				});
				if (!validation) {
					const res = await createPublisher({
						name: user.name,
						email: user.email
					});
					if (res.data.status == 200) {
						setShowSuccessAlert(true);
						resetCredentials();
					} else {
						setShowErrorAlert(true);
					}
				} else {
					console.log(validation);
					setErrors(validation);
				}
			} catch (error) {
				setShowErrorAlert(true);
			}
		} else if (type == 3) {
			const validation = validateCreateAdmin({
				first_name: user.first_name,
				last_name: user.last_name,
				email: user.email
			});
			try {
				if (!validation) {
					const res = await createAdmin({
						first_name: user.first_name,
						last_name: user.last_name,
						email: user.email
					});
					if (res.data.status == 200) {
						setShowSuccessAlert(true);
						resetCredentials();
					} else {
						setShowErrorAlert(true);
					}
				} else {
					console.log(validation);
					setErrors(validation);
				}
			} catch (error) {
				setShowErrorAlert(true);
			}
		}
	}

	function resetCredentials() {
		setErrors({});
		setUser({
			first_name: '',
			last_name: '',
			name: '',
			email: ''
		});
	}

	useEffect(
		() => {
			resetCredentials();
		},
		[ type ]
	);

	return (
		<div className="new-user">
			<SuccesAlert
				title="Request was sent successfully!"
				btnText="Close"
				show={showSuccessAlert}
				setShow={(e) => setShowSuccessAlert(e)}
			/>
			<ErrorAlert
				text={`An error occurred while creating new ${type == 1
					? 'user'
					: type == 2
						? 'publisher'
						: 'admin'}`}
				btnText="Close"
				setShow={(e) => setShowErrorAlert(e)}
				show={showErrorAlert}
			/>
			<div className="new-user-wrapper">
				<div className="container-lg px-0 space">
					<h3 className="text-title text-32 text-bold pb-3">
						New {' '}
						{type == 1 ? (
							'user'
						) : type == 2 ? (
							'publisher'
						) : (
							'admin'
						)}
					</h3>

					{/* Form */}
					<form onSubmit={(e) => e.preventDefault()}>
						<div className="new-user-select">
							<div className="form-group">
								<span className="text-normal text-small text-medium">
									I am
								</span>
								<div className="d-flex align-items-center position-relative custom-radio">
									<input
										type="radio"
										id="type1"
										name="type"
										checked={type == 1 ? 'checked' : null}
									/>
									<label
										className="text-odkaz text-small text-medium"
										htmlFor="type1"
										onClick={() => setType(1)}
									>
										Student
									</label>
								</div>
								<div className="d-flex align-items-center position-relative custom-radio">
									<input
										type="radio"
										id="type2"
										name="type"
									/>
									<label
										className="text-odkaz text-small text-medium"
										htmlFor="type2"
										onClick={() => setType(2)}
									>
										Publisher
									</label>
								</div>
								<div className="d-flex align-items-center position-relative custom-radio">
									<input
										type="radio"
										id="type3"
										name="type"
									/>
									<label
										className="text-odkaz text-small text-medium"
										htmlFor="type3"
										onClick={() => setType(3)}
									>
										Admin
									</label>
								</div>
								{/* Error messages */}
							</div>
						</div>

						<div className="col-12 col-md-4 px-0 mx-0">
							{/* First Name */}
							<div className="form-group">
								<label
									className="text-normal text-small"
									htmlFor="name"
								>
									{type == 2 ? 'Name' : 'First name'}
								</label>
								<input
									className="form-control"
									type="text"
									id="name"
									placeholder="František"
									value={user.first_name || user.name}
									onChange={(e) => {
										let obj;
										if (type == 2) {
											obj = {
												name: e.target.value
											};
										} else {
											obj = {
												first_name: e.target.value
											};
										}
										setUser((user) => ({
											...user,
											...obj
										}));
									}}
								/>
								{errors.first_name ? (
									<span className="error-message">
										{errors.first_name}
									</span>
								) : (
									''
								)}
								{errors.name ? (
									<span className="error-message">
										{errors.name}
									</span>
								) : (
									''
								)}
							</div>

							{/*  */}
							{type == 2 ? null : (
								<div className="form-group">
									<label
										className="text-normal text-small"
										htmlFor="lstname"
									>
										Last name
									</label>
									<input
										className="form-control"
										type="text"
										id="lstname"
										value={user.last_name}
										placeholder="Umpalumpovičič"
										onChange={(e) =>
											setUser((user) => ({
												...user,
												last_name: e.target.value
											}))}
									/>
									{errors.last_name ? (
										<span className="error-message">
											{errors.last_name}
										</span>
									) : (
										''
									)}
								</div>
							)}

							<div className="form-group">
								<label
									className="text-normal text-small"
									htmlFor="exampleInputEmail1"
								>
									Email
								</label>
								<input
									className="form-control"
									type="email"
									id="exampleInputEmail1"
									value={user.email}
									placeholder="Email"
									onChange={(e) =>
										setUser((user) => ({
											...user,
											email: e.target.value
										}))}
								/>
								{/* Validator message */}
									{errors.email ? (
										<span className="error-message">
											{errors.email}
										</span>
									) : (
										''
									)}
							</div>
							<div
								className="d-inline-block"
								onClick={handleSubmit}
							>
								<Button
									type="submit"
									text="Create"
									color="yellow"
								/>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default AdminCreateUser;
