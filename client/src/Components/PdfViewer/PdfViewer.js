import React, { useState, useEffect, useCallback } from 'react';
import '../../scripts/annotator.min.js';
import { useParams } from 'react-router';
import Spinner from '../../utils/Spinner/Spinner.util';
import InfoAlert from '../../utils/Alerts/InfoAlert/InfoAlert.util';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

import ReactGA from 'react-ga';
import ReactPixel from 'react-facebook-pixel';

import './PdfViewer.css';

const PdfViewer = ({
	logout = (f) => f,
	getScriptPdf = (f) => f,
	getScrapedScriptPdf = (f) => f,
	saveHighlightRequest = (f) => f,
	getHighlights = (f) => f,
	getPdfPageNumber = (f) => f,
	savePdfPageNumber = (f) => f,
	savePdfDarkMode = (f) => f,
	getScript = (f) => f,
	postScriptAnalyticsOpen = (f) => f,
	postScriptAnalyticsData = (f) => f,
	authData
}) => {
	let script_id = useParams().id;
	let scraper = useParams().scraper;

	const [ page, setPage ] = useState(1);
	const [ pdfDoc, setPdfDoc ] = useState({});
	const [ color, setColor ] = useState('#FF6565');
	const [ pageZoom, setPageZoom ] = useState(0);
	const [ darkMode, setDarkMode ] = useState(false);
	const [ pdfViewer, setPdfViewer ] = useState(false);
	const [ width, setWidth ] = useState(window.innerWidth);
	const [ authState, setAuthState ] = useState(
		JSON.parse(localStorage.getItem('authState'))
	);
	const [ saveHighlightVar, setSaveHighlight ] = useState(false);
	const [ scriptInfo, setScriptInfo ] = useState({});


	//Horizontal scrolling
	//const [ isScroll, setIsScroll ] = useState(false);
	const [ isDown, setIsDown ] = useState(false);
	const [ isLoaded, setIsLoaded ] = useState(0);
	const [ isAlert, setIsAlert ] = useState(0);
	const [ isInfo, setIsInfo ] = useState(false);
	const [ isEraser, setIsEraser ] = useState(false);

	const [ numPages, setNumPages ] = useState(0);

	//Variables
	const main = document.querySelector('#main');

	// Loaded via <script> tag, create shortcut to access PDF.js exports.
	var pdfjsLib = window['pdfjs-dist/build/pdf'];

	if (!pdfjsLib.getDocument || !pdfjsViewer.PDFViewer) {
		// eslint-disable-next-line no-alert
		alert(
			'Please build the pdfjs-dist library using\n  `gulp dist-install`'
		);
	}

	// Analytics
	useEffect(
		() => {
			// Page view
			if (Object.keys(scriptInfo).length > 0) {
				ReactGA.pageview('/viewer', `PDF Viewer - ${scriptInfo.name}`);
				ReactPixel.pageView();

				// Page load event
				ReactGA.event({
					category: 'PDFViewer',
					action: 'Opened script',
					label: `PDFViewer - ${scriptInfo.name}, ${scriptInfo._id}`,
					value: scriptInfo.name,
					nonInteraction: true
				});
			}
		},
		[ scriptInfo ]
	);

	// The workerSrc property shall be specified.
	pdfjsLib.GlobalWorkerOptions.workerSrc =
		'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.9.359/pdf.worker.min.js';

	const saveHighlight = async () => {
		const txtLayer = document.querySelector(
			`[data-page-number = "${pdfViewer.currentPageNumber}"] > .textLayer`
		);
		saveHighlightRequest({
			script_id,
			page: pdfViewer.currentPageNumber,
			textLayer: txtLayer.outerHTML
		});

		ReactGA.event({
			category: 'PDFViewer',
			action: 'Created Highlight'
		});
	};

	useEffect(
		() => {
			if (saveHighlightVar) {
				saveHighlight();
				setSaveHighlight(false);
				setIsAlert(0);
			}
		},
		[ saveHighlightVar ]
	);
	useEffect(async () => {
		const data = await getScript(script_id);
		if (data.data.data) {
			setScriptInfo(data.data.data);
		}
		// Post analytics open
		await postScriptAnalyticsOpen({
			publisher_id: data.data.data.publisher,
			script_id: data.data.data._id
		});
	}, []);

	// TODO: Rework this
	async function highlightRes() {
		// const txtLayer = document.querySelector('#textLayer');
		try {
			if (authData.user.user_id) {
				const response = await getHighlights({
					script_id,
					user_id: authData.user.user_id
				});

				if (response.data != []) {
					response.data.forEach((highlight) => {
						const txtLayer = document.querySelector(
							`[data-page-number = "${highlight.page}"] > .textLayer`
						);
						if (txtLayer) {
							txtLayer.outerHTML = highlight.highlights;
						}
					});
				}
			}
			// if (response.data != '') {
			// 	txtLayer.outerHTML = response.data;
			// } else {
			// 	return;
			// }
		} catch (error) {
			console.log(error);
		}
	}

	async function getPageNumber() {
		try {
			const response = await getPdfPageNumber({ script_id });
			if (response.data.dark_mode !== darkMode) {
				setDarkMode(response.data.dark_mode);
			}
			setPage(response.data.page);
			pdfViewer.currentPageNumber = response.data.page;
		} catch (error) {
			console.log(error);
		}
	}

	async function saveDarkMode() {
		if(authState.user.user_state === "freemium") return;

		try {
			await savePdfDarkMode({ script_id, page, darkMode, isInfo });
		} catch (error) {
			console.log(error);
		}

		// Event
		ReactGA.event({
			category: 'PDFViewer',
			action: 'Changed dark mode',
			value: `${darkMode ? 'dark' : 'light'}`
		});
	}

	useEffect(
		() => {
			if (isLoaded == 1) {
				getPageNumber();
			}
		},
		[ isLoaded ]
	);

	useEffect(
		() => {
			let timeout;
			if (scriptInfo && authData && numPages) {
				timeout = setTimeout(async () => {
					const res = await postScriptAnalyticsData({
						script_id: scriptInfo._id,
						user_id: authData.user.user_id,
						page: page,
						full_page: numPages
					});
				}, 30000);
			}

			return () => {
				clearTimeout(timeout);
			};
		},
		[ page ]
	);

	// useEffect(
	// 	() => {
	// 		if (authData.user && isLoaded == 1) {
	// 			// Highlighting
	// 			highlightRes();
	// 		}
	// 	},
	// 	[ authData, isLoaded ]
	// );

	// TOOLBAR - Functions
	//Dark Mode	
	const changeDarkMode = () => {
		if(authState.user.user_state === "freemium") return;

		setDarkMode(!darkMode);
	};

	// Eraser
	const changeEraser = () => {
		if(authState.user.user_state === "freemium") return;

		setIsEraser(!isEraser);
	}

	const removeHighlight = useCallback(
		(e) => {
			e.target.style.backgroundColor = '';
			e.target.classList.remove('tvs-annotated-text');
			e.target.classList.remove('tvs-annotate-element');
			e.target.removeEventListener("click", removeHighlight);
			setIsAlert(1);
		}, []
	);
	
	document.addEventListener("click", () => {
		if(isEraser === true) {
			const annotations = document.querySelectorAll('.tvs-annotated-text, .tvs-annotate-element');
			annotations.forEach(annotation => {
				annotation.addEventListener("click", removeHighlight);
			});
		} else {
			const annotations = document.querySelectorAll('.tvs-annotated-text, .tvs-annotate-element');
			annotations.forEach(annotation => {
				annotation.removeEventListener("click", removeHighlight);
			});
		}
	})

	//Show next page
	const showNextPage = () => {
		// // Pripočíme 1 k číslu strany
		// savePageNumber();
		// Porovnávame, či číslo strany nie je väčšie ako celkovo počet strán
		/*if (page >= numPages) {
		 	return;
		}
		setPage((prevPage) => prevPage + 1);*/
		pdfViewer.nextPage();
		ReactGA.event({
			category: 'PDFViewer',
			action: 'Clicked next page'
		});
	};

	//Show previous page
	const showPrevPage = () => {
		// // Odpočítame 1 od čísla strany
		// savePageNumber();
		// Porovnávame, či číslo strany nie je menšie ako 1
		/*if (page <= 1) {
		 	return;
		}
		setPage((prevPage) => prevPage - 1);*/
		pdfViewer.previousPage();
		ReactGA.event({
			category: 'PDFViewer',
			action: 'Clicked previous page'
		});
	};

	// Zooming in
	const zoomIn = () => {
		if(authState.user.user_state === "freemium") return;

		if (pageZoom >= 2) {
			return;
		}
		setPageZoom((prev) => prev + 1);
		ReactGA.event({
			category: 'PDFViewer',
			action: 'Clicked zoom in'
		});
	};

	// Zooming out
	const zoomOut = () => {
		if(authState.user.user_state === "freemium") return;

		if (pageZoom <= -2) {
			return;
		}
		setPageZoom((prev) => prev - 1);
		ReactGA.event({
			category: 'PDFViewer',
			action: 'Clicked zoom out'
		});
	};

	// Selecting pages with input
	const selectPages = (e) => {
		e.preventDefault();

		setPage(e.target.value);

		ReactGA.event({
			category: 'PDFViewer',
			action: 'Selected page with input field'
		});

		if (
			e.target.value != '' &&
			e.target.value != null &&
			e.target.value != NaN
		) {
			// Vyberieme hodnotu z inputu a priradíme ju do objektu
			if (pdfViewer) {
				pdfViewer.currentPageNumber = parseInt(e.target.value);
			}
			// Ak je číslo strany menšie ako 1, tak nová strana bude posledná
			/*if (parseInt(page) < 1) {
				//pageNum.value = settings.pdfDoc.numPages;
				setPage(pdfDoc.numPages);
			} else if (parseInt(page) > pdfDoc.numPages) {
				// Ak je číslo strany väčšie ako celkový počet strán, tak nová strana bude prvá
				setPage(1);
			}*/
		}
	};

	async function handlePageChange(e) {
		setPage(e.pageNumber);
		try {
			await savePdfPageNumber({
				script_id,
				page: e.pageNumber,
				darkMode
			});
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(
		() => {
			const container = document.getElementById('viewerContainer');

			if (container) {
				const eventBus = new pdfjsViewer.EventBus();

				eventBus.on('pagechanging', (e) => handlePageChange(e));
				eventBus.on('textlayerrendered', () => {
					highlightRes();
				});

				const pdfLinkService = new pdfjsViewer.PDFLinkService({
					eventBus
				});

				// (Optionally) enable find controller.
				const pdfFindController = new pdfjsViewer.PDFFindController({
					eventBus,
					linkService: pdfLinkService
				});

				const pdfViewerVar = new pdfjsViewer.PDFViewer({
					container: container,
					eventBus: eventBus,
					pdfLinkService,
					pdfFindController,
					useOnlyCssZoom: false,
					textLayerMode: 2
				});

				eventBus.on('pagesinit', () => {
					// We can use pdfViewer now, e.g. let's change default scale.
					pdfViewerVar.currentScaleValue = 2;
				});
				setPdfViewer(pdfViewerVar);
			}
		},
		[]
	);

	useEffect(
		async () => {
			if (authData.user.token !== undefined) {
				let scriptFile = "";

				if(scraper === "false") {
					scriptFile = await getScriptPdf(script_id);
				}else {
					scriptFile = await getScrapedScriptPdf(script_id);
				}

				if (scriptFile && pdfViewer) {
					const CMAP_URL = '/node_modules/pdfjs-dist/cmaps/';
					const CMAP_PACKED = true;
					const loadingTask = pdfjsLib.getDocument({
						url: URL.createObjectURL(scriptFile),
						cMapUrl: CMAP_URL,
						cMapPacked: CMAP_PACKED
					});
					loadingTask.promise.then(function(pdfDocument) {
						// Document loaded, specifying document for the viewer and
						// the (optional) linkService.
						pdfViewer.setDocument(pdfDocument);
						setNumPages(pdfDocument._pdfInfo.numPages);
						setIsLoaded(1);
					});
				}
				if (!authState) {
					logout();
				}
			}
		},
		[ authData, pdfViewer ]
	);

	// ** HIGHLIGHT ** //

	/* Annotator */
	//Vytvoríme annotator objekt
	var u = new window.tvs.Annotator();

	// Vyberáme farby zo selektoru
	/*$('#selector').on('change', () => {
		// Vyberieme jeho hodnotu a uložíme do objektu
		setColor($('#selector').val());
	});*/

	const changeColor = (e) => {
		setColor(e.target.id);
	}

	// Adding annotation
	const highlight = () => {
		if(authState.user.user_state === "freemium") return;

		//Pridáme span vybranému textu
		u.highlightSelected.apply(u, [ 'solid', 'white' ]);

		// Vyberáme všetky spany, ktoré majú class tvs-annotated-text
		var highlightedSpans = document.querySelectorAll('.tvs-annotated-text');

		// Pridávame všetkým span elementom s classom tvs-annotated-text background property
		highlightedSpans.forEach((highlightedSpan) => {
			// Ak spany nemajú background property, tak ju im pridáme ak majú tak im nič nepridáme
			if (highlightedSpan.style.backgroundColor == '') {
				highlightedSpan.style.backgroundColor = `${color}`;
			}
		});
		saveHighlight();
	};

	// ** Screenshoting protection
	const isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
	if (!isFirefox) {
		document.addEventListener('keyup', (e) => {
			if (e.key == 'PrintScreen') {
				navigator.clipboard.writeText('');
				ReactGA.event({
					category: 'PDFViewer',
					action: 'Tried to printscreen unsucesfully'
				});
			}
		});
		document.addEventListener('keydown', (e) => {
			if (e.ctrlKey && e.key == 'p') {
				e.cancelBubble = true;
				e.preventDefault();
				e.stopImmediatePropagation();
				ReactGA.event({
					category: 'PDFViewer',
					action: 'Tried print page unsucesfully'
				});
			}
		});

		//** Changing copied texted outside of Firefox
		document.addEventListener('copy', async () => {
			ReactGA.event({
				category: 'PDFViewer',
				action: 'Copied text, and it was modified'
			});
			let copiedText = await navigator.clipboard.readText();
			if (copiedText.length > 400) {
				copiedText = copiedText.substring(0, 400);
			}

			// console.log(scriptInfo.author);
			if (scriptInfo.author !== undefined) {
				const authorNameSplitted = await scriptInfo.author[0].split(
					' '
				);
				if (authorNameSplitted) {
					copiedText =
						`"${copiedText}"` +
						`\n \n \n ${authorNameSplitted[1]
							.toString()
							.toUpperCase()}, ${authorNameSplitted[0]} a i. ${scriptInfo.year}. ${scriptInfo.name}. ${scriptInfo.city}: ${scriptInfo.publishing}. ${pdfDoc.numPages}. ISBN ${scriptInfo.isbn}.`;

					navigator.clipboard.writeText(copiedText);
				}
			}
		});
	}

	window.addEventListener('resize', () => setWidth(window.innerWidth));

	const ConditionalWrapper = ({ condition, wrapper, children }) =>
		condition ? wrapper(children) : children;


	useEffect(
		() => {
			if (Object.keys(scriptInfo).length !== 0) {
				document.title = `IVEX Library - ${scriptInfo.name}`;
			}
		},
		[ scriptInfo ]
	);

	return (
		<div className={darkMode == false ? 'light viewer' : 'dark viewer'}>
			{isLoaded == 1 ? null : (
				<div className="loading">
					<Spinner />
				</div>
			)}
			{isAlert == 1 ? (
				<InfoAlert
					text="Do you want to save changes."
					btnText="Yes"
					setSaveHighlight={(e) => setSaveHighlight(e)}
					isAlert={isAlert}
					setIsAlert={(e) => setIsAlert(e)}
				/>
			) : null}
			{/* NavBar */}
			<div className="top-bar">
				<div className="top-bar-spacing">
					<div className="left">
						{width > 700 ? (
							<div className="left-wrapper">
								{/* DARK/LIGHT MODE */}
								<ConditionalWrapper
									condition={authState.user.user_state === "freemium" ? true : isInfo}
									wrapper={(children) => (
										<OverlayTrigger
											placement={'bottom'}
											overlay={
												<Tooltip id={`tooltip-bottom`}>
													{
														authState.user.user_state === "freemium" && isInfo === false ? (
															<span>
																This feature is available only for premium users.
															</span>
														) : (
															<span>
																Turn dark mode on or off
															</span>
														)
													}
												</Tooltip>
											}
											trigger="hover"
										>
											{children}
										</OverlayTrigger>
									)}
								>
									<span className={authState.user.user_state === "freemium" ? "opacity cursor-disabled" : ""} onClick={() => {
										changeDarkMode();
										saveDarkMode();
									}}>
										<img
											src={
												darkMode == false ? (
													'/icons/dark.svg'
												) : (
													'/icons/light.svg'
												)
											}
											alt="dark/light button"
										/>
									</span>
								</ConditionalWrapper>
							</div>
						) : null}

						<ConditionalWrapper
							condition={isInfo}
							wrapper={(children) => (
								<OverlayTrigger
									placement={'bottom'}
									overlay={
										<Tooltip id={`tooltip-bottom`}>
											Turn explanations on / off
										</Tooltip>
									}
									trigger="hover"
								>
									{children}
								</OverlayTrigger>
							)}
						>
							<span
								className="scroll"
								onClick={() => setIsInfo(!isInfo)}
							>
								<i
									className={
										!isInfo ? (
											'fas fa-info-circle'
										) : (
											'fas fa-info-circle active'
										)
									}
								/>
							</span>
						</ConditionalWrapper>
						<ConditionalWrapper
							condition={authState.user.user_state === "freemium" ? true : isInfo}
							wrapper={(children) => (
								<OverlayTrigger
									placement={'bottom'}
									overlay={
										<Tooltip id={`tooltip-bottom`}>
											{
												authState.user.user_state === "freemium" && isInfo === false ? (
													<span>
														This feature is available only for premium users.
													</span>
												) : (
													<span>
														You can remove highlight from text with eraser
													</span>
												)
											}
										</Tooltip>
									}
									trigger="hover"
								>
									{children}
								</OverlayTrigger>
							)}
						>
							<span
								className={authState.user.user_state === "freemium" ? "opacity cursor-disabled scroll" : "scroll"}
								onClick={() => {
									changeEraser();
								}}
							>
								<img
									src={
										!isEraser ? (
											'/icons/guma-ne-aktivni.svg'
										) : (
											'/icons/guma-aktivni.svg'
										)
									}
									alt="dark/light button"
								/>
							</span>
						</ConditionalWrapper>
					</div>

					{/* PAGE NAVIGATION */}
					<div className="page-nav">
						<ConditionalWrapper
							condition={isInfo}
							wrapper={(children) => (
								<OverlayTrigger
									placement={'bottom'}
									overlay={
										<Tooltip id={`tooltip-bottom`}>
											Move one page back
										</Tooltip>
									}
									trigger="hover"
								>
									{children}
								</OverlayTrigger>
							)}
						>
							<span className="arrow" onClick={showPrevPage}>
								<img
									src={'/icons/prev.svg'}
									alt="previous page button"
								/>
							</span>
						</ConditionalWrapper>
						<span className="page-info">
							<input
								id="page-num"
								type="number"
								value={page}
								onChange={selectPages}
								min="1"
								max={numPages}
							/>
							<span>/</span>
							<span className="page-count">{numPages}</span>
						</span>
						<ConditionalWrapper
							condition={isInfo}
							wrapper={(children) => (
								<OverlayTrigger
									placement={'bottom'}
									overlay={
										<Tooltip id={`tooltip-bottom`}>
											Move one page forward
										</Tooltip>
									}
									trigger="hover"
								>
									{children}
								</OverlayTrigger>
							)}
						>
							<span className="arrow" onClick={showNextPage}>
								<img
									src="/icons/next.svg"
									alt="next page button"
								/>
							</span>
						</ConditionalWrapper>
					</div>

					<div className="right">
						{/* HIGHLIGHT */}
						<div className="highlight">
							<ConditionalWrapper
								condition={authState.user.user_state === "freemium" ? true : isInfo}
								wrapper={(children) => (
									<OverlayTrigger
										placement={'bottom'}
										overlay={
											<Tooltip id={`tooltip-bottom`}>
												{
													authState.user.user_state === "freemium" && isInfo === false ? (
														<span>
															This feature is available only for premium users.
														</span>
													) : (
														<span>
															Select text and click on this button to highlight it
														</span>
													)
												}
											</Tooltip>
										}
										trigger="hover"
									>
										{children}
									</OverlayTrigger>
								)}
							>
								<div 
									className={
										authState.user.user_state === "freemium" ? (
											"opacity cursor-disabled marker"
										) : (
											"marker"
										)
									}
									id="highlightBtn"
									style={{
										backgroundColor: darkMode == false ? '#FFC50F' : '#203D6A',
									}}
								>
									<div
										onClick={highlight}
										className="marker-icon-wrapper"
									>
										<img
											className="marker-icon"
											src={
												color === "#FF6565" ? (
													'/icons/marker-red.svg'
												) : color === "#E065FF" ? (
													'/icons/marker-purple.svg'
												) : color === "#2E9CBF" ? (
													'/icons/marker-blue.svg'
												) : (
													'/icons/marker-green.svg'
												)
											}
											alt="highlight button"
										/>

									</div>
									{
										authState.user.user_state === "freemium" ? (
											null
										) : (
											<div className="color-picker">
												<div 
													className="color-picker-divider"
													style={{
														backgroundColor: darkMode === false ? '#203D6A' : '#FFC50F',
													}}
												></div>
												<div 
													className="color"
													id="#FF6565"
													style={{
														backgroundColor: '#FF6565',
														border: color === '#FF6565' ? 
															(darkMode === false ? '3px solid #203D6A' : '3px solid #FFC50F')
														: 
															'none',
													}}
													onClick={changeColor}
												></div>
												<div 
													className="color"
													id="#E065FF"
													style={{
														backgroundColor: '#E065FF',
														border: color === '#E065FF' ? 
															(darkMode === false ? '3px solid #203D6A' : '3px solid #FFC50F')
														: 
															'none',
													}}
													onClick={changeColor}
												></div>
												<div 
													className="color"
													id="#2E9CBF"
													style={{
														backgroundColor: '#2E9CBF',
														border: color === '#2E9CBF' ? 
															(darkMode === false ? '3px solid #203D6A' : '3px solid #FFC50F')
														: 
															'none',
													}}
													onClick={changeColor}
												></div>
												<div 
													className="color"
													id="#80EE7E"
													style={{
														backgroundColor: '#80EE7E',
														border: color === '#80EE7E' ? 
															(darkMode === false ? '3px solid #203D6A' : '3px solid #FFC50F')
														: 
															'none',
													}}
													onClick={changeColor}
												></div>
											</div>
										)
									}
								</div>
							</ConditionalWrapper>
						</div>
						{/* ZOOM-IN / ZOOM-OUT */}
						{width > 700 ? (
							<div>
								<ConditionalWrapper
									condition={authState.user.user_state === "freemium" ? true : isInfo}
									wrapper={(children) => (
										<OverlayTrigger
											placement={'bottom'}
											overlay={
												<Tooltip id={`tooltip-bottom`}>
													{
														authState.user.user_state === "freemium" && isInfo === false ? (
															<span>
																This feature is available only for premium users.
															</span>
														) : (
															<span>
																Zoom out
															</span>
														)
													}
												</Tooltip>
											}
											trigger="hover"
										>
											{children}
										</OverlayTrigger>
									)}
								>
									<span className={authState.user.user_state === "freemium" ? "opacity cursor-disabled" : ""} onClick={zoomOut}>
										<img
											src={
												darkMode == false ? (
													'/icons/zoom-out-l.svg'
												) : (
													'/icons/zoom-out-d.svg'
												)
											}
											alt="zoom out button"
										/>
									</span>
								</ConditionalWrapper>
								<ConditionalWrapper
									condition={authState.user.user_state === "freemium" ? true : isInfo}
									wrapper={(children) => (
										<OverlayTrigger
											placement={'bottom'}
											overlay={
												<Tooltip id={`tooltip-bottom`}>
													{
														authState.user.user_state === "freemium" && isInfo === false ? (
															<span>
																This feature is available only for premium users.
															</span>
														) : (
															<span>
																Zoom in
															</span>
														)
													}
												</Tooltip>
											}
											trigger="hover"
										>
											{children}
										</OverlayTrigger>
									)}
								>
									<span className={authState.user.user_state === "freemium" ? "opacity cursor-disabled" : ""} onClick={zoomIn}>
										<img
											src={
												darkMode == false ? (
													'/icons/zoom-in-l.svg'
												) : (
													'/icons/zoom-in-d.svg'
												)
											}
											alt="zoom in button"
										/>
									</span>
								</ConditionalWrapper>
							</div>
						) : null}
					</div>
				</div>
			</div>
			<div
				id="main"
				className={darkMode == false ? 'light main' : 'dark main'}
				onMouseLeave={() => setIsDown(false)}
				onMouseUp={() => setIsDown(false)}
			>
				<div id="viewerContainer" className={'zoom' + pageZoom}>
					<div id="viewer" className="pdfViewer" />
				</div>
			</div>
		</div>
	);
};

export default PdfViewer;
