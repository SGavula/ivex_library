import { now } from 'moment';
import React, { useEffect, useState } from 'react';
import Heading from '../../../../utils/Heading/Heading.util';
import { useHistory } from 'react-router';

//Utils
import Button from '../../../../utils/Button/Button.util';
import SuccesAlert from '../../../../utils/Alerts/SuccessAlert/SuccessAlert.util';
import ErrorAlert from '../../../../utils/Alerts/ErrorAlert/ErrorAlert.util';
import { validateCreateScript } from '../../../../helpers/validators/scriptforms.validator';

const CreateScriptPublisher = ({ info, uploadScript = (f) => f }) => {
	const [ files, setFiles ] = useState({ image: '', pdf: '' });
	const [ formData, setFormData ] = useState({
		publisher: info._id
	});
	const [ authors, setAuthors ] = useState('');
	const [ errors, setErrors ] = useState({});
	const [ allowRequests, setAllowRequests ] = useState(true);
	const [ showSuccessAlert, setShowSuccessAlert ] = useState(false);
	const [ showErrorAlert, setShowErrorAlert ] = useState(false);
	const [ infoChangeStatus, setInfoChangeStatus ] = useState(1);

	const history = useHistory();

	useEffect(
		() => {
			setFormData((data) => ({
				...data,
				publisher: info._id,
				free: false,
				lang: 'SK'
			}));
		},
		[ info ]
	);

	async function submitScript(value) {
		// Validation
		const validationResults = validateCreateScript({
			...files,
			...formData,
			...authors
		});
		// Request

		if (!validationResults) {
			if (allowRequests) {
				setAllowRequests(false);
				let authorsArray;
				if (authors.includes(',')) {
					authorsArray = authors.split(',');
					authorsArray = authorsArray.map(
						Function.prototype.call,
						String.prototype.trim
					);
				} else {
					authorsArray = [ authors ];
				}
				try {
					const results = await uploadScript({
						files: { ...files },
						data: {
							...formData,
							published: value,
							publisher_request: true
						},
						authors: authorsArray
					});
					if (results.data.status == 200) {
						// history.push('/profile');
						setFormData({
							publisher: info._id,
							name: '',
							year: '',
							info: '',
							isbn: '',
							category: '',
							city: '',
							publishing: ''
						});
						setAuthors('');
						setFiles({ image: '', pdf: '' });
						setAllowRequests(true);
						setShowSuccessAlert(true);
					} else {
						setAllowRequests(true);
					}
				} catch (error) {
					if (error) {
						setShowErrorAlert(true);
						setAllowRequests(true);
					}
				}
			}
		} else {
			setErrors(validationResults);
		}
	}

	return (
		<div className="create-script" id="upload-script">
			{infoChangeStatus == 1 ? (
				''
			) : infoChangeStatus == 2 ? (
				<div>
					<SuccessAlert
						text="E-book has been sent successfully."
						btnText="Close"
					/>
				</div>
			) : (
				<ErrorAlert
					text="An error occurred while changing the data."
					btnText="Close"
				/>
			)}

			<div className="container-lg px-0 space py-5">
				<div className="pb-5">
					<Heading
						type=""
						title="Upload e-books"
						subtitle=""
					/>
				</div>

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
							htmlFor="name"
						>
							Name
						</label>
						<input
							className="form-control"
							id="name"
							placeholder="Příručka pro veverky a jejich veverčata"
							value={formData.title}
							onChange={(e) => {
								setFormData((data) => ({
									...data,
									title: e.target.value
								}));
							}}
						/>

						{errors.name ? (
							<span className="error-message">{errors.name}</span>
						) : (
							''
						)}
					</div>

					<div className="form-group">
						<label
							className="text-normal text-small"
							htmlFor="author"
						>
							Author
						</label>
						<input
							className="form-control"
							id="author"
							value={authors}
							placeholder="František Umpalumpovičič"
							onChange={(e) => {
								setAuthors(e.target.value);
							}}
						/>
					</div>

					<div className="form-group">
						<label
							className="text-normal text-small"
							htmlFor="year"
						>
							Publication year
						</label>
						<input
							className="form-control"
							id="year"
							placeholder="2018"
							value={formData.year}
							onChange={(e) => {
								setFormData((data) => ({
									...data,
									year: e.target.value
								}));
							}}
						/>

						{errors.year ? (
							<span className="error-message">{errors.year}</span>
						) : (
							''
						)}
					</div>

					<div className="form-group">
						<label
							className="text-normal text-small"
							htmlFor="info"
						>
							Book summary
						</label>
						<textarea
							className="form-control"
							id="info"
							cols="30"
							rows="10"
							value={formData.info}
							placeholder="We drove from Palermo to Etna around 3 hours, with all instruments and piano on our van. After arriving at Rifugio Sapienza Etna, with all the team we started climbing the volcano 7am with the piano on a pick up and the rest of the instruments on 8 different cableway (for 15 mins). After getting the cableway, we all moved and get all the gears in a snowcat for other 20 mins to reach the highest point, close to the chasm of Etna. It was super hard and exhausting for all of us to go up there and bring all the instruments plus the piano, but the stunning and huge view from the top worth it!"
							onChange={(e) => {
								setFormData((data) => ({
									...data,
									info: e.target.value
								}));
							}}
						/>
						{errors.info ? (
							<span className="error-message">{errors.info}</span>
						) : (
							''
						)}
					</div>

					<div className="form-group">
						<label
							className="text-normal text-small"
							htmlFor="isbn"
						>
							ISBN
						</label>
						<input
							className="form-control"
							id="isbn"
							placeholder="75499842892488934"
							value={formData.isbn}
							onChange={(e) => {
								setFormData((data) => ({
									...data,
									isbn: e.target.value
								}));
							}}
						/>
						{errors.isbn ? (
							<span className="error-message">{errors.isbn}</span>
						) : (
							''
						)}
					</div>

					<div className="form-group">
						<label
							className="text-normal text-small"
							htmlFor="theme"
						>
							Theme
						</label>
						<input
							className="form-control"
							id="theme"
							placeholder="Management"
							value={formData.category}
							onChange={(e) => {
								setFormData((data) => ({
									...data,
									category: e.target.value
								}));
							}}
						/>
					</div>

					<div className="form-group">
						<label
							className="text-normal text-small"
							htmlFor="city"
						>
							City
						</label>
						<input
							className="form-control"
							id="city"
							placeholder="Umpalovicovo"
							value={formData.city}
							onChange={(e) => {
								setFormData((data) => ({
									...data,
									city: e.target.value
								}));
							}}
						/>
						{errors.city ? (
							<span className="error-message">{errors.city}</span>
						) : (
							''
						)}
					</div>

					<div className="form-group">
						<label
							className="text-normal text-small"
							htmlFor="publisher-company"
						>
							Name of publisher
						</label>
						<input
							className="form-control"
							id="publisher-company"
							placeholder="Umpalovic a spol"
							onChange={(e) => {
								setFormData((data) => ({
									...data,
									publishing: e.target.value
								}));
							}}
						/>
						{errors.publishing ? (
							<span className="error-message">
								{errors.publishing}
							</span>
						) : (
							''
						)}
					</div>

					<div className="form-group">
						<label
							className="text-normal text-small"
							htmlFor="publisher-link"
						>
							Website address of publisher (link)
						</label>
						<input
							className="form-control"
							id="publisher-link"
							placeholder="www.umpalovicaspol.sk"
							onChange={(e) => {
								setFormData((data) => ({
									...data,
									publishing: e.target.value
								}));
							}}
						/>
						{/*errors.publishing ? (
							<span className="error-message">
								{errors.publishing}
							</span>
						) : (
							''
						)*/}
					</div>

					{/* Type of Book */}
					<div className="form-group">
						<label
							className="text-normal text-small"
							htmlFor="isbn"
						>
							Type of book
						</label>
						<div className="radios-wrapper">
							<div className="d-flex align-items-center position-relative custom-radio">
								<input
									className="form-check-input"
									type="radio"
									name="free"
									id="priced"
									value="true"
									defaultChecked={!formData.free}
									onChange={(e) =>
										setFormData((data) => ({
											...data,
											free: false
										}))}
								/>
								<label
									className="text-odkaz text-small text-medium"
									htmlFor="priced"
								>
									Paid
								</label>
							</div>

							<div className="d-flex align-items-center position-relative custom-radio">
								<input
									className="form-check-input"
									type="radio"
									name="free"
									id="freemium"
									value="true"
									defaultChecked={formData.free}
									onChange={(e) =>
										setFormData((data) => ({
											...data,
											free: true
										}))}
								/>
								<label
									className="text-odkaz text-small text-medium"
									htmlFor="freemium"
								>
									Freemium
								</label>
							</div>
						</div>
					</div>

					{formData.free == false ? (
						<div className="form-group">
							<label
								className="text-normal text-small"
								htmlFor="price"
							>
								Price
							</label>
							<input
								className="form-control"
								id="price"
								type="number"
								placeholder="10"
								value={formData.pricing}
								onChange={(e) => {
									setFormData((data) => ({
										...data,
										pricing: e.target.value
									}));
								}}
							/>
							{errors.pricing ? (
								<span className="error-message">
									{errors.pricing}
								</span>
							) : (
								''
							)}
						</div>
					) : null}
					<div className="form-group">
						<label
							className="text-normal text-small"
							htmlFor="language"
						>
							Language
						</label>
						<select
							className="form-control"
							id="language"
							onChange={(e) =>
								setFormData((data) => ({
									...data,
									lang: e.target.value
								}))}
						>
							<option value={'SK'}>{'Slovak'}</option>
							<option value={'EN'}>{'English'}</option>
							<option value={'CZ'}>{'Czech'}</option>
							))
						</select>
					</div>

					<div className="form-group">
						<label
							className="text-normal text-small"
							htmlFor="license"
						>
							Name of license
						</label>
						<input
							className="form-control"
							id="license"
							placeholder="License"
							onChange={(e) => {
								setFormData((data) => ({
									...data,
									publishing: e.target.value
								}));
							}}
						/>
						{/*errors.publishing ? (
							<span className="error-message">
								{errors.publishing}
							</span>
						) : (
							''
						)*/}
					</div>

					<div className="form-group">
						<label
							className="text-normal text-small"
							htmlFor="license-link"
						>
							Website address of license (link)
						</label>
						<input
							className="form-control"
							id="license-link"
							placeholder="Link of license"
							onChange={(e) => {
								setFormData((data) => ({
									...data,
									publishing: e.target.value
								}));
							}}
						/>
						{/*errors.publishing ? (
							<span className="error-message">
								{errors.publishing}
							</span>
						) : (
							''
						)*/}
					</div>

					<div className="form-group">
						<label
							className="text-normal text-small"
							htmlFor="file"
						>
							File
						</label>
						<input
							className="form-control"
							id="file"
							type="file"
							onChange={(e) =>
								setFiles((data) => ({
									...data,
									pdf: e.target.files.item(0)
								}))}
						/>

						{errors.pdf ? (
							<span className="error-message">{errors.pdf}</span>
						) : (
							''
						)}
					</div>

					<div className="form-group">
						<label
							className="text-normal text-small"
							htmlFor="picture"
						>
							Picture
						</label>
						<input
							className="form-control"
							id="picture"
							type="file"
							onChange={(e) =>
								setFiles((data) => ({
									...data,
									image: e.target.files.item(0)
								}))}
						/>

						{errors.image ? (
							<span className="error-message">
								{errors.image}
							</span>
						) : (
							''
						)}
					</div>
					<span onClick={() => submitScript(false)}>
						<Button color="yellow" text="Submit for approval" />
					</span>
				</form>
			</div>
		</div>
	);
};

export default CreateScriptPublisher;
