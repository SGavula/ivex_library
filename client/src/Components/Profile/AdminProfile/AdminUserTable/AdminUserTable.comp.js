import React, { useEffect, useState } from 'react';

/* Utils */
import Radio from '../../../../utils/Button/Radio.util';
import SearchButton from '../../../../utils/Button/SearchButton.util';
import Button from '../../../../utils/Button/Button.util';
import Tag from '../../../../utils/Tags/Tag.util';
import { useHistory } from 'react-router-dom';

const AdminUserTable = ({
	getAllUsers = (f) => f,
	getAllPublishers = (f) => f,
	authData
}) => {
	const [ search, setSearch ] = useState('');
	const [ users, setUsers ] = useState([]);
	const [ publishers, setPublishers ] = useState([]);
	const [ allPublishers, setAllPublishers ] = useState([]);
	const [ fullUsers, setFullUsers ] = useState([]);
	const [ publishersState, setPublishersState ] = useState(false);

	// Script table data
	useEffect(
		async () => {
			if (authData.isLoggedIn) {
				const request = await getAllUsers();
				if (request) {
					if (request.data.status == 200) {
						setUsers(request.data.data);
						setFullUsers(request.data.data);
					}
				}
				const publisherRequest = await getAllPublishers();
				if (publisherRequest) {
					if (publisherRequest.data.status == 200) {
						setPublishers(publisherRequest.data.data);
						setAllPublishers(publisherRequest.data.data);
					}
				}
			}
		},
		[ authData ]
	);

	useEffect(
		() => {
			// Do filter on search
			if (search !== '') {
				setUsers(
					fullUsers.filter(
						(user) =>
							user.first_name
								.toLowerCase()
								.includes(search.toLowerCase()) ||
							user.last_name
								.toLowerCase()
								.includes(search.toLowerCase())
					)
				);
				setPublishers(
					allPublishers.filter((publisher) =>
						publisher.name
							.toLowerCase()
							.includes(search.toLowerCase())
					)
				);
			} else {
				setUsers(fullUsers);
				setPublishers(allPublishers);
			}
		},
		[ search ]
	);

	const history = useHistory();

	const handleCreateUserClick = () => {
		history.push('/admin/create-user');
	};

	const handleClickUser = (id) => {
		history.push(`/admin/user/${id}`);
	};

	const handleClickPublisher = (id) => {
		history.push(`/admin/publisher/${id}`);
	};

	return (
		<div className="admin-users-table">
			<div className="container-lg px-0 py-5 space">
				<div>
					<h1 className="text-title text-32 text-bold my-0">
						List of
						{publishersState ? ' publishers' : ' users'}
					</h1>
					<div className="d-flex flex-column flex-md-row justify-content-between pb-4">
						<div className="searchBar pb-3 pb-md-0">
							<input
								type="text"
								className="searchbar"
								placeholder="Search for users"
								onChange={(e) => setSearch(e.target.value)}
							/>
							<SearchButton />
						</div>
						<span onClick={handleCreateUserClick}>
							<Button text="Add new user" color="yellow" />
						</span>
					</div>
					<div>
						<span
							className={
								publishersState == false ? (
									'tags-grey me-2'
								) : (
									'me-2'
								)
							}
							onClick={() => setPublishersState(false)}
						>
							<Tag text="Users" />
						</span>
						<span
							className={
								publishersState == true ? (
									'tags-grey me-2'
								) : (
									'me-2'
								)
							}
							onClick={() => setPublishersState(true)}
						>
							<Tag text="Publishers" />
						</span>
					</div>
				</div>
				{publishersState == false ? (
					<div className="table-responsive">
						<table className="table table-striped table-width">
							<thead>
								<tr>
									<th scope="col" />
									<th
										scope="col"
										className="text-normal text-bold text-small"
									>
										Number
									</th>
									<th
										scope="col"
										className="text-normal text-bold text-small"
									>
										First Name
									</th>
									<th
										scope="col"
										className="text-normal text-bold text-small"
									>
										Last Name
									</th>
									<th
										scope="col"
										className="text-normal text-bold text-small"
									>
										Reg. number
									</th>
									<th
										scope="col"
										className="text-normal text-bold text-small"
									>
										Free trial
									</th>
									<th
										scope="col"
										className="text-normal text-bold text-small"
									>
										Subscription
									</th>
									<th
										scope="col"
										className="text-normal text-bold text-small"
									>
										Expiration
									</th>
								</tr>
							</thead>
							<tbody>
								{users ? (
									users.map((user, index) => (
										<tr>
											<td className="align-middle">
												<Radio />
											</td>
											<td className="text-normal text-small text-medium align-middle">
												{index + 1}
											</td>
											<td
												className="text-odkaz text-small text-medium align-middle pointer"
												onClick={(e) =>
													handleClickUser(user._id)}
											>
												{user.first_name}
											</td>
											<td className="text-normal text-small text-medium align-middle">
												{user.last_name}
											</td>
											<td className="text-normal text-small text-medium align-middle">
												{user._id}
											</td>
											<td className="text-normal text-small text-medium align-middle">
												{user.paid == false ? (
													'Nie'
												) : (
													'Ano'
												)}
											</td>
											<td className="text-normal text-small text-medium align-middle">
												Monthly,
											</td>
											<td className="text-normal text-small text-medium align-middle">
												{new Date(user.subscription_ending).getDate()}.{new Date(user.subscription_ending).getMonth() + 1}
												.{new Date(
													user.subscription_ending
												).getFullYear()}
											</td>
										</tr>
									))
								) : null}
							</tbody>
						</table>
					</div>
				) : null}
				<div>
					{/* Publishers */}
					{publishersState ? (
						<div className="table-responsive">
							<table className="table table-striped table-width">
								<thead>
									<tr>
										<th scope="col" />
										<th
											scope="col"
											className="text-normal text-bold text-small"
										>
											Number
										</th>
										<th
											scope="col"
											className="text-normal text-bold text-small"
										>
											Name
										</th>
										<th
											scope="col"
											className="text-normal text-bold text-small"
										>
											Reg. number
										</th>
									</tr>
								</thead>
								<tbody>
									{publishers ? (
										publishers.map((user, index) => (
											<tr>
												<td className="align-middle">
													<Radio />
												</td>
												<td className="text-normal text-small text-medium align-middle">
													{index + 1}
												</td>
												<td
													className="text-odkaz text-small text-medium align-middle pointer"
													onClick={(e) =>
														handleClickPublisher(
															user._id
														)}
												>
													{user.name}
												</td>
												<td className="text-normal text-small text-medium align-middle">
													{user._id}
												</td>
											</tr>
										))
									) : null}
								</tbody>
							</table>
						</div>
					) : null}
				</div>
			</div>
		</div>
	);
};

export default AdminUserTable;
