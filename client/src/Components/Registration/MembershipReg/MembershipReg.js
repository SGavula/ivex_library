import React, { useState } from 'react';
import PriceCard from '../../../utils/PriceCard/PriceCard.util';
import Heading from '../../../utils/Heading/Heading.util';

const Membership = ({
	title,
	subtitle,
	buttonId,
	setButtonId = (f) => f
}) => {
	const [ priceCardInfo, setPriceCardInfo ] = useState({
		id: 1,
		title: 'Monthly',
		subtitle: 'cancel anytime',
		price: '3',
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
		buttonColor: 'yellow'
	});

	const [ responsiveTitle, setResponsiveTitle ] = useState({
		mesiac: 'Monthly',
		semester: 'Sem...',
		freemium: 'Free...'
	});

	const [ active, setActive ] = useState(1);

	const [ width, setWidth ] = useState(window.innerWidth);
	window.addEventListener('resize', () => setWidth(window.innerWidth));

	const buttonIdFunction = () => {
		setButtonId(priceCardInfo.id);
	};

	return (
		<div className="membership" id="cennik">
			<div className="container-lg wrapper px-0 space">
				<div className="membership-heading">
					<Heading title={title} subtitle={subtitle} />
				</div>
				{width < 992 ? (
					<div className="col-12">
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
										price: '3',
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
										buttonColor: 'yellow'
									});
									setResponsiveTitle({
										mesiac: 'Monthly',
										semester: 'Sem...',
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
										price: '8',
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
										buttonColor: 'yellow'
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
										text: '',
										buttonText: 'Sign up for free',
										buttonColor: 'grey',
									});
									setResponsiveTitle({
										mesiac: 'Mes...',
										semester: 'Sem...',
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
							{/* Registration */}
							<PriceCard
								title={priceCardInfo.title}
								subtitle={priceCardInfo.subtitle}
								price={priceCardInfo.price}
								sign={priceCardInfo.sign}
								points={priceCardInfo.points}
								text={priceCardInfo.text}
								wave="false"
								buttonText={
									buttonId === priceCardInfo.id ? (
										'Vybrané'
									) : (
										'Vybrať'
									)
								}
								buttonColor={
									buttonId === priceCardInfo.id ? (
										'grey'
									) : (
										'yellow'
									)
								}
								handleClickMembership={buttonIdFunction}
							/>
						</div>
					</div>
				) : (
					/* Cards  */
					<div className="register-row mx-0">
						<div className="px-0 d-flex justify-content-start">
							<PriceCard
								title="Monthly"
								subtitle="cancel anytime"
								price="3"
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
								type=""
								buttonText={
									buttonId === 1 ? 'Chosen' : 'Choose'
								}
								buttonColor={buttonId === 1 ? 'grey' : 'yellow'}
								handleClickMembership={() => setButtonId(1)}
							/>
						</div>
						<div className="px-0 d-flex justify-content-center">
							<PriceCard
								title="Semester"
								subtitle="6-month subscription"
								price="8"
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
								type=""
								text="payment of 48 € semestrally"
								buttonText={
									buttonId === 2 ? 'Chosen' : 'Choose'
								}
								buttonColor={buttonId === 2 ? 'grey' : 'yellow'}
								handleClickMembership={() => setButtonId(2)}
							/>
						</div>
						<div className="px-0 d-flex justify-content-end">
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
								text=""
								type=""
								buttonText={
									buttonId === 3 ? 'Chosen' : 'Choose'
								}
								buttonColor={buttonId === 3 ? 'grey' : 'yellow'}
								handleClickMembership={() => setButtonId(3)}
							/>
						</div>
					</div>
				)}
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

export default Membership;
