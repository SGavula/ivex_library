import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

// Utils
import Heading from '../../../utils/Heading/Heading.util';
import Button from '../../../utils/Button/Button.util';
import ProfileCard from '../../../utils/ProfileCard/ProfileCard.util';
//Import chart
import { Line } from 'react-chartjs-2';
import Spinner from '../../../utils/Spinner/Spinner.util';

// import {
// 	get_request,
// 	default_request_config
// } from '../../../helpers/requests/requests';

const AdminProfile = ({
	getAdminLibrary = (f) => f,
	logout = (f) => f,
	getAdminTotalPayments = (f) => f,
	getAdminTotalViews = (f) => f,
	getAdminTotalProfit = (f) => f,
	getPublisherPayGraphData = (f) => f,
	getAllPublishers = (f) => f,
	authData
}) => {
	const [ scripts, setScripts ] = useState([]);
	const [ addScript, setAddScript ] = useState(false);
	const [ scriptMessage, setScriptMessage ] = useState(1);
	const [ payments, setPayments ] = useState('');
	const [ views, setViews ] = useState('');
	const [ profits, setProfits ] = useState('');
	const [ type, setType ] = useState(1);
	const [ publishers, setPublishers ] = useState([]);
	const [ selectedPublisher, setSelectedPublisher ] = useState();
	const [ graphData, setGraphData ] = useState();
	const history = useHistory();
	const [ selectTitle, setSelectTitle ] = useState('');

	const data = {
		labels: [
			'JAN',
			'FEB',
			'MAR',
			'APR',
			'MAY',
			'JUNE',
			'JULY',
			'AUG',
			'SEP',
			'OCT',
			'NOV',
			'DEC'
		],
		backgroundColor: 'rgb(0, 0, 0)',
		datasets: [
			{
				label: 'Odmena',
				data: graphData,
				fill: false,
				backgroundColor: 'rgb(255, 197, 15)',
				borderColor: 'rgb(96, 147, 211)',
				borderWidth: 1,
				pointBorderColor: 'rgb(255, 197, 15)'
			}
		]
	};

	const options = {
		responsive: true,
		plugins: {
			legend: {
				display: false
			},
			tooltip: {
				backgroundColor: '#EFF4FB',
				titleColor: '#6093D3',
				bodyColor: '#6093D3',
				padding: {
					x: 16,
					y: 10
				},
				displayColors: false
			}
		},
		transitions: {
			show: {
				animations: {
					x: {
						from: 500
					},
					y: {
						from: 1000
					}
				}
			},
			hide: {
				animations: {
					x: {
						to: 500
					},
					y: {
						to: 1000
					}
				}
			}
		},
		scales: {
			x: {
				grid: {
					color: 'rgb(239, 244, 251)'
				},
				ticks: {
					color: 'rgb(45, 64, 106)',
					font: {
						size: 12,
						family: 'Montserrat',
						weight: 500
					}
				}
			},
			yAxes: {
				ticks: {
					color: 'rgb(45, 64, 106)',
					font: {
						size: 12,
						family: 'Montserrat',
						weight: 500
					}
				},
				grid: {
					display: false
				}
			}
		}
	};

	// Script table data
	useEffect(async () => {
		// ScriptData
		try {
			const script_data = await getAdminLibrary();
			if (script_data.status == 200) {
				setScripts(script_data.data.data);
			} else {
				// Error
			}
		} catch (error) {}
		try {
			// Get all publishers
			const all_publishers_request = await getAllPublishers();
			if (all_publishers_request.data.status == 200) {
				setPublishers(all_publishers_request.data.data);
				setSelectedPublisher(all_publishers_request.data.data[0]._id);
				setSelectTitle(all_publishers_request.data.data[0].name);
			}
		} catch (error) {}
	}, []);

	useEffect(
		async () => {
			try {
				if (selectedPublisher) {
					const publisher_pay_graph_request = await getPublisherPayGraphData(
						{
							publisher_id: selectedPublisher
						}
					);
					if (publisher_pay_graph_request.data.status == 200) {
						setGraphData(publisher_pay_graph_request.data.data);
					}
				}
			} catch (error) {}
		},
		[ selectedPublisher ]
	);

	useEffect(
		async () => {
			setPayments('');
			setProfits('');
			setViews('');
			// Payments
			try {
				if (publishers) {
					const payments_res = await getAdminTotalPayments({
						type: type
					});
					console.log(payments_res.data);
					if (payments_res.data.status == 200) {
						setPayments(() => payments_res.data.data.toFixed(2));
					}
					const views_res = await getAdminTotalViews({ type: type });
					if (views_res.data.status == 200) {
						setViews(() => views_res.data.data);
					}
					const profits_res = await getAdminTotalProfit({
						type: type
					});
					if (profits_res.data.status == 200) {
						setProfits(() => profits_res.data.data.toFixed(2));
					}
				}
			} catch (error) {
				console.log(error);
			}
		},
		[ type, publishers ]
	);

	const handleClick = (e) => {
		const select_arrow = document.querySelector('#select-arrow-admin');
		const options_container = document.querySelector(
			'#options-container-admin'
		);

		setSelectedPublisher(e.target.value);
		select_arrow.classList.toggle('active-img');
		options_container.classList.toggle('active');
		setSelectTitle(e.target.id);
		if (e.target.value !== selectedPublisher) {
			setGraphData([]);
		}
	};

	const toggle = () => {
		const select_arrow = document.querySelector('#select-arrow-admin');
		const options_container = document.querySelector(
			'#options-container-admin'
		);

		select_arrow.classList.toggle('active-img');
		options_container.classList.toggle('active');
	};

	useEffect(() => {
		window.scrollTo({
			top: 0,
			left: 0,
			behavior: 'instant'
		});
	}, []);

	const handleClickUsers = () => {
		history.push('/admin/get-all-users');
	};

	const handleClickScripts = () => {
		history.push('/admin/get-all-scripts');
	};

	const handleClickCategories = () => {
		history.push('/admin/admin-categories');
	};

	const handleClickScraper = () => {
		history.push('/scraper');
	};

	const handleClickEditAdmin = () => {
		history.push('/admin/edit-profile');
	};


	//console.log("views", views);

	return (
		<div className="admin-profile">
			{/* Heading */}
			<div className="profile-head bc-grey">
				<div className="container-lg px-0 space">
					<div className="text-center text-md-start">
						<Heading
							type=""
							title="Hi!"
							subtitle="You are the best!"
						/>
						<div className="pt-4">
							<span
								className="text-small text-odkaz uprava pointer"
								onClick={handleClickEditAdmin}
							>
								Edit profile
							</span>
						</div>
					</div>
					<div>
						<div className="pt-4 row g-0 profile-buttons justify-content-center justify-content-md-start">
							<span className="pb-2" onClick={handleClickUsers}>
								<Button text="Users" color="yellow" />
							</span>

							<span className="pb-2" onClick={handleClickScripts}>
								<Button text="E-books" color="yellow" />
							</span>

							<span className="pb-2" onClick={handleClickCategories}>
								<Button text="Categories" color="yellow" />
							</span>

							<span className="pb-2" onClick={handleClickScraper}>
								<Button text="Scraper" color="yellow" />
							</span>
						</div>
					</div>
				</div>
				{/* Cards */}
				<div className="cards-wrapper">
					<div className="cards">
						<div className="tags row mx-0 justify-content-center justify-content-lg-end">
							<p
								className={
									type == 1 ? (
										'tag text-center mb-3 text-10 tag-admin-grey'
									) : (
										'tag text-center mb-3 text-10'
									)
								}
								onClick={() => {
									setType(1);
								}}
							>
								Month
							</p>
							<p
								className={
									type == 2 ? (
										'tag text-center mb-3 text-10 tag-admin-grey'
									) : (
										'tag text-center mb-3 text-10'
									)
								}
								onClick={() => {
									setType(2);
								}}
							>
								Year
							</p>
							<p
								className={
									type == 3 ? (
										'tag text-center mb-3 text-10 tag-admin-grey'
									) : (
										'tag text-center mb-3 text-10'
									)
								}
								onClick={() => {
									setType(3);
								}}
							>
								Whole period
							</p>
						</div>
						<div className="d-flex flex-column flex-lg-row justify-content-between align-items-center">
							<ProfileCard
								icon="/img/euro.svg"
								title="Paid out"
								price={payments}
								time={
									type == 1 ? (
										'for this month'
									) : type == 2 ? (
										'for this year'
									) : (
										'whole period'
									)
								}
								className="mb-5 mb-lg-0"
								priceIcon={true}
							/>
							<ProfileCard
								icon="/img/euro.svg"
								title="Revenue"
								price={profits}
								time={
									type == 1 ? (
										'for this month'
									) : type == 2 ? (
										'for this year'
									) : (
										'whole period'
									)
								}
								className="mb-5 mb-lg-0"
								priceIcon={true}
							/>
							<ProfileCard
								icon="/img/eye.svg"
								title="No. of views"
								price={views}
								time={
									type == 1 ? (
										'for this month'
									) : type == 2 ? (
										'for this year'
									) : (
										'whole period'
									)
								}
								className="mb-5 mb-lg-0"
							/>
						</div>
					</div>
				</div>
			</div>
			<div className="white-space">
				{/* Wave */}
				<div className="wave">
					<div className="wave-down">
						<img src="/img/wave-down-gray.svg" alt="wave" />
					</div>
				</div>
			</div>
			<div className="container-lg">
				{!graphData ? (
					<Spinner />
				) : (
					<div className="graph-admin-profile">
						<div className="scripts-select-box">
							<div className="">
								<label
									className="text-normal text-small"
									htmlFor="script"
								>
									Select author
								</label>
								<div className="select-box-wrapper">
									<div className="select-box">
										<div className="select-box">
											<div
												className="selected"
												onClick={toggle}
											>
												<span>{selectTitle}</span>
												<span>
													<img
														id="select-arrow-admin"
														src="/icons/select-arrow.svg"
														alt="Select icon"
													/>
												</span>
											</div>
											<div
												id="options-container-admin"
												className="options-container"
											>
												{publishers.map((item) => (
													<div
														className="option"
														key={item._id}
													>
														<input
															className="radio"
															type="radio"
															id={item.name}
															name="name"
															value={item._id}
															onClick={
																handleClick
															}
														/>
														<label
															htmlFor={item.name}
														>
															{item.name}
														</label>
													</div>
												))}
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="chart-wrapper">
							<div className="chart">
								<Line data={data} options={options} />
							</div>
						</div>
						<div className="chart-buttons">
							<div className="stat-btn">
								<img src="/icons/excel_icon.png" alt="Excel Icon" />
								<span>
									Download stats
								</span>
							</div>
						</div>
					</div>
				)}

			</div>
		</div>
	);
};

export default AdminProfile;
