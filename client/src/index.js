import React from 'react';
import { hydrate, render } from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { LastLocationProvider } from 'react-router-last-location';

render(
	<React.StrictMode>
		<Router>
			<LastLocationProvider>
				<App />
			</LastLocationProvider>
		</Router>
	</React.StrictMode>,
	document.getElementById('root')
);

// const rootElement = document.getElementById('root');
// if (rootElement.hasChildNodes()) {
// 	hydrate(
// 		<React.StrictMode>
// 			<Router>
// 				<LastLocationProvider>
// 					<App />
// 				</LastLocationProvider>
// 			</Router>
// 		</React.StrictMode>,
// 		rootElement
// 	);
// } else {
// 	render(
// 		<React.StrictMode>
// 			<Router>
// 				<LastLocationProvider>
// 					<App />
// 				</LastLocationProvider>
// 			</Router>
// 		</React.StrictMode>,
// 		rootElement
// 	);
// }
