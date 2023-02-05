import React, { useState, useEffect, useRef } from 'react';

import Heading from '../../../utils/Heading/Heading.util';
import { useDebounce } from 'use-debounce';
import ReactGA from 'react-ga';
import ReactPixel from 'react-facebook-pixel';
import {
	default_request_config,
	post_request
} from '../../../helpers/requests/requests';
import { prefix_url } from '../../../helpers/requests/requests';
import { Link } from 'react-router-dom';


//Keď pri vyhľadavaní kniknem mimo okna, ktoré vyskočím keď chcem niečo vyhľadať
let useClickOutside = (handler) => {
	let domNode = useRef();

	useEffect(
		() => {
			let maybeHandler = (e) => {
				if(domNode.current != undefined) {
					if(!domNode.current.contains(e.target)) {
						handler();
					}
				}
			}
	
			document.addEventListener("mousedown", maybeHandler)
	
			return() => {
				document.removeEventListener("mousedown", maybeHandler)
			}
		}
	)

	return domNode
}

const SectionI = () => {
	const [ category, setCategory ] = useState('');
	const [ searchState, setSearchState ] = useState(false);
	const [ results, setResults ] = useState();
	const [ searchPhrase, setSearchPhrase ] = useState('');
	const [ stoppedTypingText ] = useDebounce(searchPhrase, 500);
	const [ loading, setLoading ] = useState(false);
	const [ message, setMessage ] = useState();
	const [ isOpen, setIsOpen ] = useState(false);

	useEffect(() => {
		const object = document.querySelector('#object');
		object.classList.add('fade');
	}, []);

	useEffect(
		() => {
			serachForScripts();
			if (searchPhrase == '') {
				setSearchState(false);
			}
		},
		[ stoppedTypingText ]
	);

	async function serachForScripts() {
		setSearchState(true);
		setLoading(true);
		if (searchPhrase.length > 3) {
			const results = await post_request(
				`/script/search`,
				{
					searchphrase: stoppedTypingText.toString()
				},
				default_request_config
			);
			if (results.data.data.length > 0) {
				setResults(results.data.data);
				// setLoading(true);
				const categories = results.data.data.map(
					(script) => script.category
				);
				var counts = {};
				categories.forEach(function(x) {
					counts[x] = (counts[x] || 0) + 1;
				});
				const cat = Object.keys(counts).reduce(
					(a, b) => (counts[a] > counts[b] ? a : b)
				);
				if (cat) {
					setCategory(cat);
				}
				ReactGA.event({
					category: 'Search',
					action: 'Succesfull search',
					label: 'User entered search word, and got results',
					value: searchPhrase
				});
			} else {
				ReactGA.event({
					category: 'Search',
					action: 'Unsuccessful search',
					label:
						'User entered search word, but no search results were found',
					value: searchPhrase
				});
				setMessage('No results');
				setLoading(false);
				console.log('no results');
			}
		}
	}

	const handleChange = (e) => {
		setResults(null);
		setMessage('');
		setSearchPhrase(e.target.value);
	};

	let domNode = useClickOutside(() => {
		setIsOpen(false);
	});

	return (
		<div className="section_I">
			<div className="container-lg px-0 row mx-auto space">
				<div className="col-12 col-md-6 px-0 d-flex flex-column justify-content-center">
					<Heading
						type=""
						title="Online Library"
						subtitle="all the books in one place"
					/>
					<div className="searchBar">
						<div className="search">
							<input
								type="text"
								className={'searchbar'}
								placeholder={'Search titles'}
								onChange={handleChange}
								onClick={() => setIsOpen(true)}
							/>
							<img src="/icons/search-icon.svg" alt="Search Icon" />
						</div>

						{
							isOpen === true ? (
								searchPhrase === '' ? null : message || results ? (
									<div ref={domNode} className="search-results">
										{message === '' ? null : (
											<p className="search-message text-small text-normal text-medium">
												{message}
											</p>
										)}
		
										{results ? (
											<div className="search-result-wrapper">
												{
													(results.map((item) => (
														<div className="search-result">
															<img
																src={`${prefix_url}/${item.image}`}
															/>
															<div className="result-text">
																<p className="text-small text-odkaz text-bold m-0">
																	{item.name}
																</p>
																<p className="text-small text-normal text-medium m-0">
																	{item.author[0]}
																</p>
																<p className="text-small text-normal text-medium m-0">
																	{item.year}
																</p>
																<Link
																	to={`/script/${item._id}`}
																>
																	Open e-book
																</Link>
															</div>
														</div>
													)))
												}
											</div>
										) : null}
									</div>
								) : null
							) : null
						}

						<p>Read anythime, anyhow, anywhere or how much you wish to read...</p>
					</div>
				</div>
				<div className="right-side col-12 col-md-6 d-flex justify-content-center justify-content-md-end px-0 pt-5 py-md-0 align-items-center">
					<div className="animate">
						<object
							type="image/svg+xml"
							data="/animations/bg_white.svg"
						/>
						<object
							type="image/svg+xml"
							data="/animations/landing_online.svg"
							id="object"
						/>
					</div>
				</div>
			</div>

			{/* Wave */}
			<div className="wave">
				<div className="wave-down">
					<img src="/img/wave-up.svg" alt="wave" />
				</div>
			</div>
		</div>
	);
};

export default SectionI;
