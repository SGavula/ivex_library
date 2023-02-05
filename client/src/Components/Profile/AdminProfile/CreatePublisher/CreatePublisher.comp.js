import React, { useState } from 'react';
import { useHistory } from 'react-router';
import {
	validateCreateAdmin,
	validateCreatePublisher
} from '../../../../helpers/validators/adminforms.validator';
import Button from '../../../../utils/Button/Button.util';
import SuccesAlert from '../../../../utils/Alerts/SuccessAlert/SuccessAlert.util';
import ErrorAlert from '../../../../utils/Alerts/ErrorAlert/ErrorAlert.util';

const CreatePublisher = ({
	createPublisher = (f) => f,
	createAdmin = (f) => f
}) => {
	const [ credentials, setCredentials ] = useState({});
	const [ errors, setErrors ] = useState({});
	const [ showErrorAlert, setShowErrorAlert ] = useState(false);
	const [ showSuccessAlert, setShowSuccessAlert ] = useState(false);
	const [ resErrors, setResErrors ] = useState(0);
	const history = useHistory();
	async function submit() {
		// Validation
		const validationResults = validateCreatePublisher({ ...credentials });
		// Request
		if (!validationResults) {
			try {
				const request = await createPublisher({ ...credentials });
				if (request.data.status == 200) {
					// history.push('/profile');
					setCredentials({ email: '' });
					setShowSuccessAlert(true);
				} else {
					setShowErrorAlert(true);
				}
			} catch (error) {
				setShowErrorAlert(true);
			}
		} else {
			setErrors(validationResults);
		}
	}

	async function submitAdmin() {
		console.log(credentials);
		// Validation
		const validationResults = validateCreateAdmin({ ...credentials });
		// Request
		if (!validationResults) {
			try {
				const request = await createAdmin({ ...credentials });
				if (request.data.status == 200) {
					// history.push('/profile');
					setCredentials({ email: '' });
					setShowSuccessAlert(true);
				} else {
					setShowErrorAlert(true);
				}
			} catch (error) {
				if (error.response) {
					if (
						error.response.status == 400 &&
						error.response.data.message ==
							'User with this email already exists'
					) {
						setShowAlert(true);
						setResErrors(409);
					} else {
						setShowErrorAlert(true);
					}
				}
			}
		} else {
			setErrors(validationResults);
		}
	}

	return (
		<div className="admin-create-publisher">
			<SuccesAlert
				title={'Užívateľ úspešne vytvorený'}
				text={''}
				btnText={'Zatvoriť'}
				show={showSuccessAlert}
				setShow={(e) => setShowSuccessAlert(e)}
			/>
			<ErrorAlert
				title={
					resErrors == 409 ? (
						'Tento email je už zaregistrovaný'
					) : (
						'Niekde nastala chyba'
					)
				}
				text={
					resErrors == 409 ? (
						'Tento email je už zaregistrovaný'
					) : (
						'Skúste to znova neskôr'
					)
				}
				btnText={'Zatvoriť'}
				show={showErrorAlert}
				setShow={(e) => setShowErrorAlert(e)}
			/>
			<div className="container-lg px-0 space pt-5">
				<h1 className="text-title text-32 text-bold my-0">
					Vytvoriť publikujúceho
				</h1>
				<form onSubmit={(e) => e.preventDefault()}>
					<div className="form-group pb-4">
						<label
							className="text-normal text-small pb-2"
							htmlFor="email"
						>
							Email
						</label>
						<input
							className="form-control"
							id="email"
							placeholder="František@Umpalumpičovič.sk"
							type="email"
							value={credentials.email}
							onChange={(e) =>
								setCredentials((data) => ({
									...data,
									email: e.target.value
								}))}
						/>
					</div>
					<div className="form-group pb-4">
						<label
							className="text-normal text-small pb-2"
							htmlFor="title"
						>
							Názov
						</label>
						<input
							className="form-control"
							id="title"
							type="text"
							placeholder={'IVEX Publishing'}
							value={credentials.name}
							onChange={(e) =>
								setCredentials((data) => ({
									...data,
									name: e.target.value
								}))}
						/>
					</div>
					<span onClick={submit}>
						<Button color="yellow" text="Odoslat" />
					</span>
				</form>
			</div>
			<div className="container-lg px-0 space pt-5">
				<h1 className="text-title text-32 text-bold my-0">
					Vytvoriť administrátora
				</h1>
				<form onSubmit={(e) => e.preventDefault()}>
					<div className="form-group pb-4">
						<label
							className="text-normal text-small pb-2"
							htmlFor="email"
						>
							Email
						</label>
						<input
							className="form-control"
							id="email"
							placeholder="František@Umpalumpičovič.sk"
							type="email"
							value={credentials.email}
							onChange={(e) =>
								setCredentials((data) => ({
									...data,
									email: e.target.value
								}))}
						/>
					</div>
					<span onClick={submitAdmin}>
						<Button color="yellow" text="Odoslat" />
					</span>
				</form>
			</div>
		</div>
	);
};

export default CreatePublisher;
