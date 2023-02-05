import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { default_request_config, post_request } from '../../../../helpers';
import { validateChangePublisherScript } from '../../../../helpers/validators/publisherform.validator';
import SuccesAlert from '../../../../utils/Alerts/SuccessAlert/SuccessAlert.util';
import ErrorAlert from '../../../../utils/Alerts/ErrorAlert/ErrorAlert.util';

//Utils
import Button from '../../../../utils/Button/Button.util';

const ChangeScriptPublisher = ({ requestScriptChange = (f) => f, info }) => {
	const [ errors, setErrors ] = useState({});
	const [ scripts, setScripts ] = useState([]);
	const [ data, setData ] = useState({});
	const [ showSuccessAlert, setShowSuccessAlert ] = useState(false);
	const [ showErrorAlert, setShowErrorAlert ] = useState(false);
	const [ infoChangeStatus, setInfoChangeStatus ] = useState(1);
	const history = useHistory();

	useEffect(
		async () => {
			console.log(info.scripts);
			const req = await post_request(
				`/script/byIds`,
				{
					scripts: info.scripts
				},
				default_request_config
			);
			if (req.data.data) {
				setScripts(req.data.data);
			} else {
				setErrors({ main: 'Scripts not found' });
			}
		},
		[ info ]
	);

	async function submitRequest() {
		console.log(data);
		const validation = validateChangePublisherScript({ ...data });
		if (!validation) {
			try {
				const req = await requestScriptChange({
					...data,
					id: info._id
				});
				if (req.data.status == 200) {
					setShowSuccessAlert(true);
					setData({ message: '' });
				}
			} catch (error) {
				if (error) {
					setShowErrorAlert(true);
				}
			}
		} else {
			setErrors(validation);
		}
	}

	return (
		<div className="change-script-publisher">

					{infoChangeStatus == 1 ? (
						''
					) : infoChangeStatus == 2 ? (
						<div>
							<SuccessAlert
								text="Your data have been changed successfully."
								btnText="Close"
							/>
						</div>
					) : (
						<ErrorAlert
							text="An error occurred while changing your data."
							btnText="Close"
						/>
					)}		

			<div className="container-lg px-0 space">
				<div className="col-12 col-lg-6">
					<h5 className="text-32 text-title text-bold">
						Change request
					</h5>

					<SuccesAlert
						title={'Your request has been sent successfully.'}
						text={'We will inform you about the status of your publication.'}
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
					<form onSubmit={(e) => e.preventDefault()}>
						<div className="form-group">
							<label
								className="text-normal text-small"
								htmlFor="publisher"
							>
								Title
							</label>
							<select
								className="form-control"
								onChange={(e) =>
									setData((data) => ({
										...data,
										script_id: e.target.value
									}))}
							>
								<option value="0">Chose your title</option>
								{scripts.map((script) => (
									<option value={script._id}>
										{script.name}
									</option>
								))}
							</select>
							{errors.script_id ? (
								<span className="error-message">{errors.script_id}</span>
							) : (
								''
							)}
						</div>

						<div className="form-group">
							<label
								className="text-normal text-small"
								htmlFor="message"
							>
								Additional message
							</label>
							<textarea
								className="form-control"
								id="message"
								cols="30"
								rows="10"
								placeholder="We drove from Palermo to Etna around 3 hours, with all instruments and piano on our van. After arriving at Rifugio Sapienza Etna, with all the team we started climbing the volcano 7am with the piano on a pick up and the rest of the instruments on 8 different cableway (for 15 mins). After getting the cableway, we all moved and get all the gears in a snowcat for other 20 mins to reach the highest point, close to the chasm of Etna. It was super hard and exhausting for all of us to go up there and bring all the instruments plus the piano, but the stunning and huge view from the top worth it!"
								onChange={(e) =>
									setData((data) => ({
										...data,
										message: e.target.value
									}))}
								value={data.message}
							/>
							<p className="text-10 text-end text-normal mb-0 mt-2">
								We will answer in 24 hours from receiving request.
							</p>
							{errors.message ? (
								<span className="error-message">{errors.message}</span>
							) : (
								''
							)}
						</div>

						<span className="pe-3" onClick={submitRequest}>
							<Button color="yellow" text="Send request" />
						</span>
					</form>
				</div>
			</div>
		</div>
	);
};

export default ChangeScriptPublisher;
