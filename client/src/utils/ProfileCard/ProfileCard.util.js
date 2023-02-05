import React, { useEffect, useState } from 'react';
import Spinner from '../../utils/Spinner/Spinner.util';

const ProfileCard = ({ icon, title, price, time, className, priceIcon }) => {
	return (
		<div className={`profile-card ${className}`}>
			<div className="content h-100 d-flex flex-column align-items-center justify-content-between py-2">
				<div className="icon">
					<img src={icon} alt="Profile Card Icon" />
				</div>
				<p className="text-normal text-bold text-small">{title}</p>
				{!price ? (
					<Spinner />
				) : (
					<h5 className="text-title text-large text-bold">
						{price}{' '}
						<span className="text-small price-sign">
							{priceIcon == true ? '€' : ' '}
						</span>{' '}
					</h5>
				)}
				<p className="text-normal text-small text-medium">{time}</p>
			</div>
		</div>
	);
};

export default ProfileCard;
