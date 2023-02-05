import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

/* Utils */
import Radio from '../../../../utils/Button/Radio.util';
import SearchButton from '../../../../utils/Button/SearchButton.util';
import Button from '../../../../utils/Button/Button.util';

const AdminPublisherTable = ({ getAdminLibrary = (f) => f, authData }) => {
	const [ scripts, setScripts ] = useState([]);
	const [ search, setSearch ] = useState('');
	const [ fullScripts, setFullScripts ] = useState([]);
	const history = useHistory();

	// Script table data
	useEffect(
		async () => {
			console.log(authData);
			if (authData.isLoggedIn) {
				// ScriptData
				try {
					const script_data = await getAdminLibrary();
					if (script_data.status == 200) {
						setScripts(script_data.data.data);
						setFullScripts(script_data.data.data);
					} else {
						// Error
					}
				} catch (error) {
					console.log(error);
				}
			}
		},
		[ authData ]
	);

	useEffect(
		() => {
			// Do filter on search
			if (search !== '') {
				setScripts(
					fullScripts.filter((script) =>
						script.name.toLowerCase().includes(search.toLowerCase())
					)
				);
			} else {
				setScripts(fullScripts);
			}
		},
		[ search ]
	);

	const createScript = () => {
		history.push('/admin/create-script');
	};

	return (
		<div className="admin-scripts-table">
			<div className="">
				<div className="container-lg px-0 py-5 space">
					<div>
						<h1 className="text-title text-32 text-bold my-0">
							List of e-books
						</h1>
						<div className="d-flex flex-column flex-md-row justify-content-between pb-4">
							<div className="searchBar pb-3 pb-md-0">
								<input
									type="text"
									className={'searchbar'}
									placeholder={'Search for e-books'}
									onChange={(e) => setSearch(e.target.value)}
								/>
								<SearchButton />
							</div>
							<span onClick={createScript}>
								<Button
									text="Add new e-book"
									color="yellow"
								/>
							</span>
						</div>
					</div>
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
										Author
									</th>
									<th
										scope="col"
										className="text-normal text-bold text-small"
									>
										Open
									</th>
								</tr>
							</thead>
							<tbody>
								{/* Script table */}
								{scripts.length ? (
									scripts.map((script, index) => (
										<tr key={index + 1}>
											<td className="align-middle">
												<Radio />
											</td>
											<td className="text-normal text-small align-middle text-medium">
												{index + 1}
											</td>
											<td
												className={`text-small align-middle ${!script.published
													? 'red'
													: ''}`}
											>
												<Link
													className="text-odkaz text-medium"
													to={`/script/${script._id}`}
												>
													{script.name}
												</Link>
											</td>
											<td className="text-normal text-small align-middle text-medium">
												{script.author.join(', ')}
											</td>
											<td className="text-normal text-small align-middle text-medium">
												{script.opens}
											</td>
										</tr>
									))
								) : null}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AdminPublisherTable;
