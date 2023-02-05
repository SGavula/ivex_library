import React, { useEffect, useState } from 'react';

/* Utils */
import Button from '../../utils/Button/Button.util';
import { useHistory, useParams } from 'react-router';
import { default_request_config, post_request } from '../../helpers';

const ChangePassword = () => {
	const history = useHistory();
	const [ passwords, setPassword ] = useState({
		password: '',
		password2: ''
	});
	const token = useParams().token;
	const changePassword = async () => {
		const res = await post_request(
			`/user/password-reset-by-token`,
			{
				token: token,
				password: passwords.password
			},
			default_request_config
		);

		if (res.data.status == 200) {
			history.push('/login');
		} else {
			console.log('something went wrong');
		}
	};

	useEffect(() => {
		window.scrollTo({
			top: 0,
			left: 0,
			behavior: 'instant'
		});
		const object = document.querySelector("#object");
		object.classList.add("fade")
	}, []);


	return (
		<div className="change-password">
			<div className="container-lg px-0 row mx-auto change-password-main space">
				{/* Left */}
				<div className="col-12 col-md-6 px-0 chp-left">
					<h3 className="text-title text-32 text-bold pb-4">
						Recover your password
					</h3>
					<div className="text-small text-normal pb-5 text-medium">
						It's simple! Just enter and confirm new password and you are good to go.
					</div>
					<form onSubmit={(e) => e.preventDefault()}>
						<div className="form-group pb-4">
							<label
								className="text-normal text-small pb-2"
								htmlFor="new-password"
							>
								New password
							</label>
							<input
								className="form-control"
								type="password"
								id="new-password"
								placeholder="*******************"
								onChange={async (e) => {
									setPassword((p) => ({
										...p,
										password: e.target.value
									}));
								}}
							/>
							{/* Validator message */}
							{/*errorMessages.email ? <span className="error-message">{errorMessages.email}</span> : ''*/}
							{/*<small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> Keď bude zlý email*/}
						</div>
						<div className="form-group pb-4">
							<label
								className="text-normal text-small pb-2"
								htmlFor="password-again"
							>
								Password confirmation
							</label>
							<input
								className="form-control"
								type="password"
								id="password-again"
								placeholder="*******************"
								onChange={async (e) => {
									setPassword((p) => ({
										...p,
										password2: e.target.value
									}));
								}}
							/>
							{/*errorMessages.password ? (
								errorMessages.password
							) : (
								''
							)*/}
						</div>
						{/*<div class="form-check">
								<input type="checkbox" class="form-check-input" id="exampleCheck1" />
								<label class="form-check-label" for="exampleCheck1">Check me out</label>
								</div>*/}
						<span onClick={changePassword}>
							<Button
								type="submit"
								text="Confirm"
								color="yellow"
								style="login"
							/>
						</span>
					</form>
				</div>

				{/* Right */}
				<div className="col-12 col-md-6 d-flex justify-content-center justify-content-md-end px-0 pt-5 py-md-0 align-items-center img">
					<div className="animate">
						<object type="image/svg+xml" data="/animations/bg_white.svg"></object>
						<object type="image/svg+xml" data="/animations/change-password.svg" id="object"></object>
					</div>
				</div>
			</div>
			<div className="chp-white">
				{ /* Wave */ }
				<div className="wave">
					<div className="wave-down">
						<img src="/img/wave-down-gray.svg" alt="wave" />
					</div>
				</div>
			</div>
		</div>
	);
};

export default ChangePassword;
