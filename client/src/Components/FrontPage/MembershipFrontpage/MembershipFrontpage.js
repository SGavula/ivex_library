import React, { useState } from 'react';
import PriceCard from '../../../utils/PriceCardFrontpage/PriceCardFrontpage.util';
import Heading from '../../../utils/Heading/Heading.util';

const Membership = ({
	title,
	subtitle,
}) => {
	const [ priceCardInfo, setPriceCardInfo ] = useState({
		id: 1,
		title: 'Monthly',
		subtitle: 'cancel anytime',
		price: '9',
		points: [
			'access to all titles',
			'make notes',
			'highlight text',
			'night mode',
			'automatic citations',
			'select your favourites titles',
			'virtual bookmark',
			'high-quality PDF'
		],
		sign: '€',
		text: 'monthly payment',
		buttonText: 'Try first 7 days for free',
	});

	const [ responsiveTitle, setResponsiveTitle ] = useState({
		mesiac: 'Monthly',
		semester: 'Sem...',
		freemium: 'Free...'
	});

	const [ active, setActive ] = useState(1);

	const [ width, setWidth ] = useState(window.innerWidth);
	window.addEventListener('resize', () => setWidth(window.innerWidth));

	return (
		<div className="membership-frontpage" id="cennik">
			<div className="container-lg wrapper px-0 space">
				<div className="membership-heading">
					<Heading title={title} subtitle={subtitle} />
				</div>
				{width < 992 ? (
					<div className="frontpage-membership-responsive">
						
						<div className="labels mx-auto d-flex">
							<div
								className={
									active == 1 ? 'label active' : 'label'
								}
								onClick={() => {
									setPriceCardInfo({
										id: 1,
										title: 'Monthly',
										subtitle: 'cancel anytime',
										price: '9',
										points: [
											'access to all titles',
											'make notes',
											'highlight text',
											'night mode',
											'automatic citations',
											'select your favourites titles',
											'virtual bookmark',
											'high-quality PDF'
										],
										sign: '€',
										text: 'monthly payment',
										buttonText: 'Try first 7 days for free',
									});
									setResponsiveTitle({
										mesiac: 'Monthly',
										semester: "Sem...",
										freemium: 'Free...'
									});
									setActive(1);
								}}
							>
								{responsiveTitle.mesiac}
							</div>
							<div
								className={
									active == 2 ? 'label active' : 'label'
								}
								onClick={() => {
									setPriceCardInfo({
										id: 2,
										title: 'Semester',
										subtitle: 'cancel anytime',
										price: '4,5',
										sign: '€',
										points: [
											'access to all titles',
											'make notes',
											'highlight text',
											'night mode',
											'automatic citations',
											'select your favourites titles',
											'virtual bookmark',
											'high-quality PDF'
										],
										text: 'monthly payment',
										buttonText: 'Try first 7 days for free',
									});
									setResponsiveTitle({
										mesiac: 'Mon...',
										semester: "Semester",
										freemium: 'Free...'
									});
									setActive(2);
								}}
							>
								{responsiveTitle.semester}
							</div>
							<div
								className={
									active == 3 ? 'label active' : 'label'
								}
								onClick={() => {
									setPriceCardInfo({
										id: 3,
										title: 'Freemium',
										subtitle: 'Free access',
										price: '0',
										sign: '€',
										points: [
											'access to all titles',
											'make notes',
											'highlight text',
											'night mode',
											'automatic citations',
											'select your favourites titles',
											'virtual bookmark',
											'high-quality PDF'
										],
										text: 'monthly payment',
										buttonText: 'Choose',
									});
									setResponsiveTitle({
										mesiac: 'Mon...',
										semester: "Sem...",
										freemium: 'Freemium'
									});
									setActive(3);
								}}
							>
								{responsiveTitle.freemium}
							</div>
						</div>
					
						{/* Cards - Responsive */}
						<div className="d-flex justify-content-center">
							<PriceCard
								title={priceCardInfo.title}
								subtitle={priceCardInfo.subtitle}
								price={priceCardInfo.price}
								sign={priceCardInfo.sign}
								points={priceCardInfo.points}
								text={priceCardInfo.text}
								wave="false"
								type="frontpage"
								buttonText={priceCardInfo.buttonText}
								buttonColor={priceCardInfo.buttonColor}
							/>
						</div>
					</div>
				) : (
					/* Cards  */
					<div className="frontpage-membership">
						<PriceCard
							title="Monthly"
							subtitle="cancel anytime"
							price="9"
							sign="€"
							points={[
								'access to all titles',
								'make notes',
								'highlight text',
								'night mode',
								'automatic citations',
								'select your favourites titles',
								'virtual bookmark',
								'high-quality PDF'
							]}
							text="monthly payment"
							buttonText="Try first 7 days for free"
						/>

						<PriceCard
							title="Semester"
							subtitle="cancel anytime"
							price="4,5"
							sign="€"
							points={[
								'access to all titles',
								'make notes',
								'highlight text',
								'night mode',
								'automatic citations',
								'select your favourites titles',
								'virtual bookmark',
								'high-quality PDF'
							]}
							text="monthly payment"
							buttonText="Try first 7 days for free"
						/>

						<PriceCard
							title="Freemium"
							subtitle="Free access"
							price="0"
							sign="€"
							points={[
								'access to all titles',
								'make notes',
								'highlight text',
								'night mode',
								'automatic citations',
								'select your favourites titles',
								'virtual bookmark',
								'high-quality PDF'
							]}
							text="monthly"
							buttonText="Choose"
						/>
					</div>
				)}

				<p className="statement">After finishing your freetrial, you will be automaticly signed for monthly plan. You can cancel or change subscription anytime and we are not going to charge you any additional fees.</p>
			</div>
		</div>
	);
};

export default Membership;
