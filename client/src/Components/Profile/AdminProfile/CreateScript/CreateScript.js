import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { validateCreateScript } from '../../../../helpers/validators/scriptforms.validator';

//Utils
import Button from '../../../../utils/Button/Button.util';
import Heading from '../../../../utils/Heading/Heading.util';
import ErrorAlert from '../../../../utils/Alerts/ErrorAlert/ErrorAlert.util';
const CreateScript = ({
	uploadScript = (f) => f,
	getAllPublishers = (f) => f,
	authData
}) => {
	const [ files, setFiles ] = useState({ image: '', pdf: '' });
	const [ formData, setFormData ] = useState({});
	const [ authors, setAuthors ] = useState('');
	const [ keyword, setKeywords ] = useState('');
	const [ errors, setErrors ] = useState({});
	const [ publishers, setPublishers ] = useState([]);
	const [ rerender, setReRender ] = useState(false);
	const [ allowRequests, setAllowRequests ] = useState(true);
	const [ showErrorAlert, setShowErrorAlert ] = useState(false);
	const history = useHistory();

	useEffect(() => {
		window.scrollTo({
			top: 0,
			left: 0,
			behavior: 'instant'
		});
	}, [ errors ]);

	useEffect(
		async () => {
			if (authData.isLoggedIn) {
				const res = await getAllPublishers();
				console.log(res);
				if (res.data) {
					setPublishers(res.data.data);
					setFormData((data) => ({
						...data,
						publisher: res.data.data[0]._id,
						free: false,
						lang: 'SK'
					}));
				}
			}
		},
		[ authData ]
	);

	useEffect(
		() => {
			console.log(keyword);
		},
		[ keyword ]
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
				let keywordsArray;

				if (authors.includes(',')) {
					authorsArray = authors.split(',');
					authorsArray = authorsArray.map(
						Function.prototype.call,
						String.prototype.trim
					);
				} else {
					authorsArray = [ authors ];
				}

				if (keyword.includes(';')) {
					keywordsArray = keyword.split(';');
					keywordsArray = keywordsArray.map(
						Function.prototype.call,
						String.prototype.trim
					);
				} else {
					keywordsArray = [ keyword ];
				}
				try {
					const results = await uploadScript({
						files: { ...files },
						data: { ...formData, published: value },
						authors: authorsArray,
						keywords: keywordsArray
					});
					console.log("Result create script: ", results);
					if (results.data.status == 200) {
						history.push('/admin/get-all-scripts');
						setAllowRequests(true);
					} else {
						setShowErrorAlert(true);
						setAllowRequests(true);
					}
				} catch (error) {
					setShowErrorAlert(true);
				}
			}
		} else {
			setErrors(validationResults);
		}
	}

	return (
		<div className="create-script">
			<div className="container-lg px-0 space">
				<div className="pb-5">
					<Heading
						type=""
						title="Add new e-book"
						subtitle="to the library."
					/>
				</div>
				<ErrorAlert
					title={'Oops, something went wrong'}
					text={'Please, try it later.'}
					btnText={'Close'}
					show={showErrorAlert}
					setShow={(e) => setShowErrorAlert(e)}
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
							htmlFor="keywords"
						>
							Tags
						</label>
						<input
							className="form-control"
							id="keywords"
							placeholder="Management; marketing; finance"
							value={keyword}
							onChange={(e) => {
								setKeywords(e.target.value);
							}}
						/>
						{errors.keywords ? (
							<span className="error-message">
								{errors.keywords}
							</span>
						) : (
							''
						)}
					</div>

					<div className="form-group">
						<label
							className="text-normal text-small"
							htmlFor="publisher-company"
						>
							Name of publisher's company
						</label>
						<input
							className="form-control"
							id="publisher-company"
							placeholder="Umpalovic a spol"
							value={formData.publishing}
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
									publishing_link: e.target.value
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
							htmlFor="publisher"
						>
							Name of publisher
						</label>
						<select
							className="form-control"
							//defaultValue={publishers[0]._id}
							value={formData.publisher}
							onChange={(e) =>
								setFormData((data) => ({
									...data,
									publisher: e.target.value
								}))}
						>
							{publishers.map((publisher) => (
								<option value={publisher._id}>
									{publisher.name}
								</option>
							))}
						</select>
					</div>

					{/* PRICING */}
					<div className="form-group">
						<label
							className="text-normal text-small"
							htmlFor="type"
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
									defaultChecked
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
					{!formData.free ? (
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
								defaultChecked={true}
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
					<div className="form-group">
						<label
							className="text-normal text-small"
							htmlFor="language"
						>
							Language
						</label>
						<input
							type="text"
							className="form-control"
							id="language"
							placeholder="Slovak"
							onChange={(e) =>
								setFormData((data) => ({
									...data,
									lang: e.target.value
								}))
							}
						/>
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
									licence: e.target.value
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
									licence_link: e.target.value
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

					<span className="pe-3" onClick={() => submitScript(true)}>
						<Button color="yellow" text="Publish" />
					</span>
					<span onClick={() => submitScript(false)}>
						<Button color="yellow" text="Save informations" />
					</span>
				</form>
			</div>
		</div>
	);
};

export default CreateScript;
