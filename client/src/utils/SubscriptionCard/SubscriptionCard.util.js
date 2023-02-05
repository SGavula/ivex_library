import React, { useEffect, useState } from 'react';

const SubscriptionCard = ({ type, dateDay, dateMonth, dateYear }) => {

	return (
		<div className="subscription-card">
			<div className="vlajocka">
				<img src="/img/vlajka.svg" alt="Flag Icon"/>
			</div>
			<div className="content h-100 d-flex flex-column align-items-center justify-content-between py-3">
				<div className="icon">
					<img src="/img/hand_icon.svg" alt="Profile Card Icon"/>
				</div>
				<div className="type d-flex flex-column align-items-center">
					<p className="text-normal text-bold text-small mb-0">Subscription</p>
					<p className="text-normal text-small text-medium">{type}</p>
				</div>
				<div className="d-flex flex-column align-items-center">
					<h5 className="text-title text-large text-bold mb-0">
						{
							type === "Freemium" ? (
								dateDay
							) : (
								dateDay + ". " + dateMonth + "."
							)
						}
					</h5>
					 <p className="text-title text-bold text-small">{dateYear}</p>
				</div>
				<p className="text-normal text-small mb-0 text-medium">subscription ends</p>
			</div>
		</div>
	);
};

export default SubscriptionCard;
