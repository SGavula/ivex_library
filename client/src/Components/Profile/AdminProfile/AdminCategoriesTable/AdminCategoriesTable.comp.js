import React, { useEffect, useState } from 'react';

/* Utils */
import Radio from '../../../../utils/Button/Radio.util';
import SearchButton from '../../../../utils/Button/SearchButton.util';
import Modal from 'react-bootstrap/Modal';
import Button from '../../../../utils/Button/Button.util';

const AdminCategoriesTable = ({
	getCategories = (f) => f,
	editCategory = (f) => f,
	deleteCategory = (f) => f,
	authData
}) => {
	const [ showModal1, setShowModal1 ] = useState({
		show: false,
		data: { id: '' }
	});
	const [ showModal2, setShowModal2 ] = useState({
		show: false,
		data: { name: '', id: '' }
	});
	const [ categoriesList, setCategoriesList ] = useState();
	const [ resendRequest, setResendRequest ] = useState(false);

	/* Modal's Logic */
	const handleCancel1 = () => setShowModal1({ show: false, data: {} });
	const handleConfirm1 = async () => {
		setResendRequest(true);
		try {
			await deleteCategory(showModal1.data);

			setShowModal1({ show: false, data: {} });
		} catch (error) {
			console.log(error);
		}
	};

	const handleCancel2 = () => setShowModal2({ show: false, data: {} });
	const handleConfirm2 = async () => {
		setResendRequest(true);

		try {
			await editCategory(showModal2.data);

			setShowModal2({ show: false, data: {} });
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(
		async () => {
			try {
				if (authData && authData.isLoggedIn) {
					const req = await getCategories();

					if (req.data.data) {
						setCategoriesList(req.data.data);
					}
				}
				setResendRequest(false);
			} catch (error) {
				console.log(error);
			}
		},
		[ authData, resendRequest ]
	);

	return (
		<div className="admin-categories-table">
			<Modal
				show={showModal2.show}
				onHide={handleCancel2}
				backdrop="static"
				keyboard={false}
				dialogClassName="custom-modal"
			>
				<Modal.Header>
					<Modal.Title>Change name of this category</Modal.Title>
					<input
						type="text"
						value={showModal2.data.name}
						onChange={(e) =>
							setShowModal2((exis) => ({
								show: exis.show,
								data: { name: e.target.value, id: exis.data.id }
							}))}
					/>
				</Modal.Header>
				<Modal.Footer>
					<span onClick={handleConfirm2}>
						<Button color="cancel" text="Yes" />
					</span>
					<span onClick={handleCancel2}>
						<Button color="agree" text="No" />
					</span>
				</Modal.Footer>
			</Modal>

			<Modal
				show={showModal1.show}
				onHide={handleCancel1}
				backdrop="static"
				keyboard={false}
				dialogClassName="custom-modal"
			>
				<Modal.Header>
					<Modal.Title>Do you want to delete this category?</Modal.Title>
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
						List of categories
					</h1>
					<div className="d-flex flex-column flex-md-row justify-content-between pb-4">
						<div className="searchBar pb-3 pb-md-0">
							<input
								type="text"
								className="searchbar"
								placeholder="Search for categories"
							/>
							<SearchButton />
						</div>
					</div>
				</div>
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
									Edit
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
							{categoriesList ? (
								categoriesList.map((category, index) => (
									<tr key={index}>
										<td className="text-normal text-small text-medium align-middle">
											{index + 1}
										</td>
										<td className="text-odkaz text-small text-medium align-middle pointer">
											{category.category_name}
										</td>
										<td className="text-odkaz text-small text-medium align-middle pointer text-center">
											<span
												className="edit"
												onClick={() =>
													setShowModal2({
														show: true,
														data: {
															name:
																category.category_name,
															id: category._id
														}
													})}
											>
												<i className="fas fa-edit" />
											</span>
										</td>
										<td className="text-odkaz text-small text-medium align-middle pointer text-center">
											<span
												className="trash"
												onClick={() =>
													setShowModal1({
														show: true,
														data: {
															id: category._id
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
				</div>
			</div>
		</div>
	);
};

export default AdminCategoriesTable;
