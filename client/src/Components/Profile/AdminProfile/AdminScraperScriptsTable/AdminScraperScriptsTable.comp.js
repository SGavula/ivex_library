import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

/* Utils */
import SearchButton from '../../../../utils/Button/SearchButton.util';
import Modal from 'react-bootstrap/Modal';
import Button from '../../../../utils/Button/Button.util';
import Spinner from '../../../../utils/Spinner/Spinner.util';
import SuccesAlert from '../../../../utils/Alerts/SuccessAlert/SuccessAlert.util';

/* Helpers */
import {
	get_request_scraper,
	delete_request_scraper
} from '../../../../helpers';

const AdminScraperScriptsTable = ({
	authData,
	alert,
	setAlert
}) => {
	const [ scrapedScriptsList, setScrapedScriptsList] = useState();
	const [ resendRequest, setResendRequest ] = useState(false);

	const [ page, setPage ] = useState(1);
	const [ goUp, setGoUp ] = useState(false);

	const [ showModal1, setShowModal1 ] = useState({
		show: false,
		data: { id: '' }
	});
	
	useEffect(() => {
		window.scrollTo({
			top: 0,
			left: 0,
			behavior: 'instant'
		});
	}, [ goUp ]);

	/* Modal's Logic */
	const handleCancel1 = () => setShowModal1({ show: false, data: {} });
	const handleConfirm1 = async () => {
		setResendRequest(true);
		let id = showModal1.data.id;
		try {
			const response = await delete_request_scraper(`/api/book/${id}`, { headers: {'auth': '6oLjT4ua5VwcIlHc7EJF'}});
			console.log("Delete response: ", response);
			setShowModal1({ show: false, data: {} })
		} catch (error) {
			console.log("Delete error: ", error);
		}
	};
	
	useEffect(
		async () => {
			try {
				const scripts = await get_request_scraper(`/api/books?page=${page}`, { headers: {'auth': '6oLjT4ua5VwcIlHc7EJF'}});
				console.log(scripts);
				setScrapedScriptsList(scripts.data.data);
				setResendRequest(false);
			} catch (error) {
				console.log(error);
			}
		},
		[ authData, resendRequest, page ]
	);

	/* Next Page */
	const nextPage = () => {
		setPage(prev => prev + 1);
		setGoUp(!goUp);
	}

	/* Previous Page */
	const prevPage = () => {
		setPage(prev => page <= 1 ? prev : prev - 1);
		setGoUp(!goUp);
	}

	return (
		<div className="admin-scraper-scripts-table">
			{/* Successful Alert  */}
			<SuccesAlert
				text="Book was sent successfully"
				btnText="Close"
				show={alert}
				setShow={() => setAlert(false)}
			/>

			{/* Modal */}
			<Modal
				show={showModal1.show}
				onHide={handleCancel1}
				backdrop="static"
				keyboard={false}
				dialogClassName="custom-modal"
			>
				<Modal.Header>
					<Modal.Title>Do you want to delete this book?</Modal.Title>
				</Modal.Header>
				<Modal.Footer>
					<span onClick={handleConfirm1}>
						<Button color="cancel" text="Yes" />
					</span>
					<span onClick={handleCancel1}>
						<Button color="agree" text="No" />
					</span>
				</Modal.Footer>
			</Modal>
			<div className="container-lg px-0 py-5 space">
				<div>
					<h1 className="text-title text-32 text-bold my-0">
						List of publications for approval
					</h1>
					{/*<div className="d-flex flex-column flex-md-row justify-content-between pb-4">
						<div className="searchBar pb-3 pb-md-0">
							<input
								type="text"
								className="searchbar"
								placeholder="Vyhľadávať publikácie"
							/>
							<SearchButton />
						</div>
	</div>*/}
				</div>
				{
					scrapedScriptsList ? (
						<div className="table-responsive">
							<table className="table table-striped table-width">
								<thead>
									<tr>
										<th
											scope="col"
											className="text-normal text-bold text-small"
											width="20%"
										>
											Number
										</th>
										<th
											scope="col"
											className="text-normal text-bold text-small"
											width="60%"
										>
											Name
										</th>
										<th
											scope="col"
											className="text-normal text-bold text-small text-center"
											width="8%"
										>
											Delete
										</th>
									</tr>
								</thead>
								<tbody>
									{scrapedScriptsList ? (
										scrapedScriptsList.map((script, index) => (
											<tr key={index}>
												<td className="text-normal text-small text-medium align-middle">
													{index + 1 + ((page - 1) * 25)}
												</td>
												<td className="text-odkaz text-small text-medium align-middle pointer">
													<Link
														className="text-odkaz text-medium"
														to={`/scraped-script/${script._id}`}
													>
														{script.name}
													</Link>
												</td>
												<td className="text-odkaz text-small text-medium align-middle pointer text-center">
													<span
														className="trash"
														onClick={() =>
															setShowModal1({
																show: true,
																data: {
																	id: script._id
																}
															})}
													>
														<i className="fas fa-trash" />
													</span>
												</td>
											</tr>
										))
									) : null}
								</tbody>
							</table>

							<div className="pagination">
								<div className="prev" onClick={prevPage}>
									<div>
										<img src="/icons/prev.svg" alt="Next Icon" />
									</div>
									<span>Back</span>
								</div>
								
								<div>{page}</div>

								<div className="next" onClick={nextPage}>
									<span>Next page</span>
									<div>
										<img src="/icons/next.svg" alt="Next Icon" />
									</div>
								</div>
							</div>
						</div>
					) : <Spinner />
					}
			</div>
		</div>
	);
};

export default AdminScraperScriptsTable;
