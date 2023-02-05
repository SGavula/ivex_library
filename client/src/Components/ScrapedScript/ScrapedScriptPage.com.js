import React, { useEffect, useState } from 'react';
import { validateScriptChangeInfo } from '../../helpers/validators/scriptforms.validator';
import Button from '../../utils/Button/Button.util';
import ErrorAlert from '../../utils/Alerts/ErrorAlert/ErrorAlert.util';
import Spinner from '../../utils/Spinner/Spinner.util';
import Modal from 'react-bootstrap/Modal';
import { useHistory, useParams } from 'react-router';
import {
	get_request_scraper,
	delete_request_scraper
} from '../../helpers';

const ScrapedScriptPage = ({
	uploadScriptScraper = (f) => f,
	setAlert
}) => {
	const [ scriptInfo, setScriptInfo ] = useState();
	const [ files, setFiles ] = useState({ image: '', pdf: '' });
	const [ authors, setAuthors ] = useState();
	const [ keyword, setKeywords ] = useState();

	const [ showAlertError, setShowAlertError ] = useState(false);

	const [ errors, setErrors ] = useState();
	const [ spinner, setSpinner ] = useState(false);

	const id = useParams().id;
	const history = useHistory();

	useEffect(() => {
		window.scrollTo({
			top: 0,
			left: 0,
			behavior: 'instant'
		});
	}, [ showAlertError ]);

	useEffect(
		async () => {
			setAlert(false);
			try {
				const script = await get_request_scraper(`/api/book/${id}`, { headers: {'auth': '6oLjT4ua5VwcIlHc7EJF'}});
				setScriptInfo(script.data.data);
			} catch (error) {
				console.log(error);
			}
		},
		[]
	);

	useEffect(
		async () => {
			try {
				const image = await get_request_scraper(`/api/image/${id}`, { headers: {'auth': '6oLjT4ua5VwcIlHc7EJF'}, responseType: "blob"});
				console.log("Image: ", image);
				setFiles((data) => ({
					...data,
					image: image.data
				}))
			} catch (error) {
				console.log(error);
			}
		},
		[]
	);

	useEffect(
		async () => {
			try {
				const pdf = await get_request_scraper(`/api/pdf/${id}`, { headers: {'auth': '6oLjT4ua5VwcIlHc7EJF'}, responseType: "blob"});
				console.log("Super");
				console.log("PDF: ", pdf);
				setFiles((data) => ({
					...data,
					pdf: pdf.data
				}));
			} catch (error) {
				console.log(error);
			}
		},
		[]
	);

	const mainScriptButtonRedirect = () => {
		history.push(`/viewer/${id}/true`);
	};

	async function saveScript() {
		setSpinner(true);

		if(authors) {
			let authorsArray;
			if (authors.includes(',')) {
				authorsArray = authors.split(',');
				//console.log(authorsArray);
				authorsArray = authorsArray.map(
					Function.prototype.call,
					String.prototype.trim
				);
				//console.log(authorsArray);
			} else if (typeof authors == 'object') {
				authorsArray = [ ...authors ];
			} else {
				authorsArray = [ authors ];
			}
			scriptInfo.author = authorsArray;
		}

		if(keyword) {
			let keywordsArray;
			if (keyword.includes(';')) {
				keywordsArray = keyword.split(';');
				keywordsArray = keywordsArray.map(
					Function.prototype.call,
					String.prototype.trim
				);
			} else if (typeof keyword == 'object') {
				keywordsArray = [ ...keyword ];
			} else {
				keywordsArray = [ keyword ];
			}
			scriptInfo.keywords = keywordsArray;
		}

		try {
			const response = await uploadScriptScraper({
				data: { ...scriptInfo },
				file: { ...files }
			});

			console.log("Response: ", response);

			if(response) {
				if (response.data.status == 200) {
					setAlert(true)
					const response_delete = await delete_request_scraper(`/api/book/${id}`, { headers: {'auth': '6oLjT4ua5VwcIlHc7EJF'}});
					console.log("Delete Response: ", response_delete);
					history.push("/scraper");
				} else {
					setSpinner(false)
					setShowAlertError(true);
				}
			}
		} catch (error) {
			if (error) {
				console.log("Error here: ", error);
			}
		}
	}

	return (
		<div>
			{
				!spinner ? (
					<div>
						<ErrorAlert
							text="Oops, something went wrong."
							btnText="Close"
							show={showAlertError}
							setShow={(e) => setShowAlertError(e)}
						/>
						{
							scriptInfo && files.image && files.pdf ? (
								<div className="scrapedScriptPage">
									{/* Script Details */}
									<div className="px-0">
										<div className="container-lg row pt-5 pb-5 mb-5">
			
											<div className="col-12 col-lg-4 px-0">
												<div className="main-image pb-3">
													{
														files.image ? (
															<img
																src={URL.createObjectURL(files.image)}
																alt="star"
															/>
														) : null
													}
												</div>
												<div
													className="btn"
													onClick={mainScriptButtonRedirect}
												>
													<Button
														color="yellow"
														text={"Show"}
														style="large"
													/>
												</div>
											</div>
			
											{/* Decription of script */}
											<div className="col-12 col-lg-8 px-0 space">
												<div className="script-credentials">
													{
														scriptInfo.category ? (
															<div className="tags row mx-0">
																{
																	scriptInfo.category.split(",").map((cat, index) => (
																		<p
																			className="tag text-center my-0 text-10"
																			key={index}
																		>
																			{cat}
																		</p>
																	))
																}
															</div>
														) : null
													}
													{
														scriptInfo.name ? (
															<h1 className="title text-title text-32 text-bold my-0 pb-3 pt-4">
																{scriptInfo.name}
															</h1>
														) : null
													}
													{
														scriptInfo.author ? (
															<p className="title-info text-small my-0 text-medium">
																{scriptInfo.author[0]}
															</p>
														) : null
													}
													{
														scriptInfo.date_published ? (
															<p className="title-info text-small my-0 text-medium">
																{scriptInfo.date_published.substring(0, 4)}
															</p>
														) : null
													}
												</div>
												{
													scriptInfo.description ? (
														<div className="about-script pt-4 pb-5">
															<h3 className="text-small text-bold">
																About e-book
															</h3>
															<p className="paragraph text-small text-medium">
																{scriptInfo.description}
															</p>
														</div>
													) : null
												}
												<div className="script-info">
													<p className="text-bold text-small">
														Informations
													</p>
													<div className="d-flex">
														<div>
															{
																scriptInfo.author ? (
																	<p className="info-tag text-bold text-small">
																		Author/s:
																	</p>
																) : null
															}
															{
																scriptInfo.date_published ? (
																	<p className="info-tag text-bold text-small">
																		Year:
																	</p>
																) : null
															}
															{
																scriptInfo.isbn ? (
																	<p className="info-tag text-bold text-small">
																		ISBN:
																	</p>
																) : null
															}
															{
																scriptInfo.language	? (
																	<p className="info-tag text-bold text-small">
																		Language:
																	</p>
																) : null
															}
															{scriptInfo.location ? (
																<p className="info-tag text-bold text-small">
																	City:
																</p>
															) : null}
															{
																scriptInfo.publishing ? (
																	<p className="info-tag text-bold text-small">
																		Publisher:
																	</p>
																) : null
															}
															{
																scriptInfo.license ? (
																	<p className="info-tag text-bold text-small">
																		License:
																	</p>
																) : null
															}
														</div>
														<div className="px-4">
															{
																scriptInfo.author ? (
																	<p className="info-text text-small text-medium">
																		{scriptInfo.author.join(
																			', '
																		)}
																	</p>
																) : null
															}
															{
																scriptInfo.date_published ? (
																	<p className="info-text text-small text-medium">
																		{scriptInfo.date_published.substring(0, 4)}
																	</p>
																) : null
															}
															{
																scriptInfo.isbn ? (
																	<p className="info-text text-small text-medium">
																		{scriptInfo.isbn}
																	</p>
																) : null
															}
															{
																scriptInfo.language	? (
																	<p className="info-text text-small text-medium">
																		{scriptInfo.language}
																	</p>
																) : null
															}
															{scriptInfo.location ? (
																<p className="info-text text-small text-medium">
																	{scriptInfo.location}
																</p>
															) : null}
															{
																scriptInfo.publishing ? (
																	<p className="info-text text-small text-medium">
																		<a
																			href={
																				scriptInfo.publishing_url
																			}
																			target="_blank"
																		>
																			{scriptInfo.publishing}
																		</a>
																	</p>
																) : null
															}
															{
																scriptInfo.license ? (
																	<p className="info-text text-small text-medium">
																		<a
																			href={
																				scriptInfo.license_url
																			}
																			target="_blank"
																		>
																			{scriptInfo.license}
																		</a>
																	</p>
																) : null
															}
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
			
									{/* Script Details Inputs */}
									<div className="admin-script-bottom">
										<div className="container-lg px-0">
											<div className="row g-0">
												<div className="col-12 col-lg-4 px-0 d-flex flex-column align-items-center align-items-lg-start">
													<div className="img pb-3 pt-4">
														<img
															src={
																files.image ? (
																	URL.createObjectURL(files.image)
																) : null
															}
															alt="Default script Image"
														/>
													</div>
													<div>
														<label
															htmlFor="file-upload"
															className="custom-file-upload"
														>
															Add Picture
														</label>
														<input
															type="file"
															id="file-upload"
															onChange={(e) =>
																setFiles((data) => ({
																	...data,
																	image: e.target.files.item(0)
																}))}
														/>
														{/* Validator message */}
														{/*errors.image ? (
															<span className="error-message">
																{errors.image}
															</span>
														) : (
															''
														)*/}
													</div>
												</div>
												<div className="col-12 col-lg-8 px-0 space">
													<h1 className="text-title text-32 text-bold my-0 pb-3 pt-4">
														Edit e-book
													</h1>
													<form onSubmit={(e) => e.preventDefault()}>
														<div className="form-group">
															<label
																className="text-normal text-small pb-2"
																htmlFor="name"
															>
																Name
															</label>
															<input
																className="form-control"
																id="name"
																type="text"
																defaultValue={scriptInfo.name}
																onChange={(e) => {
																	setScriptInfo((info) => ({
																		...info,
																		name: e.target.value
																	}));
																}}
															/>
															{/* Validator message */}
															{/*errors.name ? (
																<span className="error-message">
																	{errors.name}
																</span>
															) : (
																''
															)*/}
														</div>
														{
															scriptInfo.author ? (
																<div className="form-group">
																	<label
																		className="text-normal text-small pb-2"
																		htmlFor="author"
																	>
																		Author/s separated by commas:
																	</label>
																	<input
																		className="form-control"
																		id="author"
																		type="text"
																		defaultValue={scriptInfo.author.map((author, index) => (index === 0 ? author : " " + author))}
																		onChange={(e) => {
																			setAuthors(e.target.value);
																		}}
																	/>
																</div>
															) : null
														}
														<div className="form-group">
															<label
																className="text-normal text-small pb-2"
																htmlFor="year"
															>
																Publication year
															</label>
															<input
																type="number"
																id="year"
																className="form-control"
																defaultValue={scriptInfo.date_published.substring(0, 4)}
																onChange={(e) => {
																	setScriptInfo((info) => ({
																		...info,
																		date_published: e.target.value
																	}));
																}}
															/>
														</div>
			
														<div className="form-group">
															<label
																className="text-normal text-small pb-2"
																htmlFor="about"
															>
																About e-book
															</label>
															<textarea
																className="form-control"
																id="about"
																cols="30"
																rows="10"
																defaultValue={scriptInfo.description}
																onChange={(e) => {
																	setScriptInfo((info) => ({
																		...info,
																		description: e.target.value
																	}));
																}}
															/>
														</div>
														<div className="form-group">
															<label
																className="text-normal text-small pb-2"
																htmlFor="theme"
															>
																Theme
															</label>
															<input
																className="form-control"
																id="theme"
																type="text"
																defaultValue={scriptInfo.category}
																onChange={(e) => {
																	setScriptInfo((info) => ({
																		...info,
																		category: e.target.value
																	}));
																}}
															/>
														</div>
														<div className="form-group">
															<label
																className="text-normal text-small pb-2"
																htmlFor="isbn"
															>
																ISBN
															</label>
			
															<input
																type="text"
																className="form-control"
																id="isbn"
																defaultValue={scriptInfo.isbn}
																onChange={(e) => {
																	setScriptInfo((info) => ({
																		...info,
																		isbn: e.target.value
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
																value={scriptInfo.location}
																onChange={(e) => {
																	setScriptInfo((info) => ({
																		...info,
																		location: e.target.value
																	}));
																}}
															/>
															{/*errors.city ? (
																<span className="error-message">
																	{errors.city}
																</span>
															) : (
																''
															)*/}
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
																placeholder="Managment; marketing; finance"
																defaultValue={scriptInfo.keywords}
																onChange={(e) => {
																	setKeywords(e.target.value);
																}}
															/>
															{/*errors.keywords ? (
																<span className="error-message">
																	{errors.keywords}
																</span>
															) : (
																''
															)*/}
														</div>
			
														<div className="form-group">
															<label
																className="text-normal text-small"
																htmlFor="publisher-company"
															>
																Publisher
															</label>
															<input
																className="form-control"
																id="publisher-company"
																placeholder="Umpalovic a spol"
																value={scriptInfo.publishing}
																onChange={(e) => {
																	setScriptInfo((info) => ({
																		...info,
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
																htmlFor="publisher-link"
															>
																Website address of publisher (link)
															</label>
															<input
																className="form-control"
																id="publisher-link"
																placeholder="https://www.umpalovicaspol.sk"
																defaultValue={
																	scriptInfo.publishing_url
																}
																onChange={(e) => {
																	setScriptInfo((info) => ({
																		...info,
																		publishing_url: e.target.value
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
																htmlFor="language"
															>
																Language
															</label>
															<input
																type="text"
																className="form-control"
																id="language"
																defaultValue={scriptInfo.language}
																onChange={(e) => {
																	setScriptInfo((info) => ({
																		...info,
																		language: e.target.value
																	}));
																}}
															/>
														</div>
			
														<div className="form-group">
															<label
																className="text-normal text-small pb-2"
																htmlFor="license"
															>
																Name of license
															</label>
			
															<input
																type="text"
																className="form-control"
																id="license"
																defaultValue={scriptInfo.license}
																onChange={(e) => {
																	setScriptInfo((info) => ({
																		...info,
																		license: e.target.value
																	}));
																}}
															/>
														</div>
			
														<div className="form-group">
															<label
																className="text-normal text-small pb-2"
																htmlFor="license-link"
															>
																Website address of license (link)
															</label>
			
															<input
																type="text"
																className="form-control"
																id="license-link"
																defaultValue={scriptInfo.license_url}
																onChange={(e) => {
																	setScriptInfo((info) => ({
																		...info,
																		license_url: e.target.value
																	}));
																}}
															/>
														</div>
			
													
			
														<div className="change-script-btns">
															<span
																onClick={saveScript}
																className="change-script-btn"
															>
																<Button color="yellow" text="Save script" />
															</span>
														</div>
													</form>
												</div>
											</div>
										</div>
									</div>
								</div>
							) : <Spinner />
						}
					</div>

				) : <Spinner />
			}
		</div>
	);
};

export default ScrapedScriptPage;
