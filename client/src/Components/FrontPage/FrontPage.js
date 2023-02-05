import React, { useEffect } from 'react';

/* Parts of Frontpage */
import SectionI from './SectionI/SectionI';
import SectionII from './SectionII/SectionII';
import PickedScripts from './PickedScripts/Pickedscripts.comp';
import Membership from './MembershipFrontpage/MembershipFrontpage';
import SectionIII from './SectionIII/SectionIII';
import { useLocation } from 'react-router-dom';
import ReactGA from 'react-ga';
import ReactPixel from 'react-facebook-pixel';

const FrontPage = ({ authData }) => {
	const location = useLocation();
	useEffect(() => {
		if (location.hash !== '#cennik') {
			window.scrollTo({
				top: 0,
				left: 0,
				behavior: 'instant'
			});
		}
		ReactGA.pageview('/', 'Landing Page');
		ReactPixel.pageView();
	}, []);

	return (
		<div className="">
			<SectionI />
			<SectionII authData={authData} />
			<PickedScripts authData={authData} />
			{
				authData.isLoggedIn === true ? (
					null
				) : (
					<Membership
						id="cennik"
						title="Read without limitations"
						subtitle="before each payment, we will be contacting you"
					/>
				)
			}
			<SectionIII authData={authData} />
		</div>
	);
};

export default FrontPage;
