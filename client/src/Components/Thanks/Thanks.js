import React, { useEffect } from 'react';

/* Utils */
import Heading from '../../utils/Heading/Heading.util';

const Thanks = () => {

	useEffect(() => {
		window.scrollTo({
			top: 0,
			left: 0,
			behavior: 'instant'
		});
		const object = document.querySelector("#object");
		object.classList.add("fade")
	}, []);

	return (
		<div className="thanks">
			<div className="bc-grey thanks-main">
				<div className="container-lg px-0 row mx-auto space">
					<div className="col-12 col-md-6 px-0 d-flex align-items-center">
						<Heading type="text" title="Thank you," subtitle="just verify your e-mail and your are good to go." text="After verification of your e-mail adress, you will receive an access to all availables e-books, based on your plan."/>
					</div>
					<div className="right-side col-12 col-md-6 d-flex justify-content-center justify-content-md-end px-0 pt-5 py-md-0">
						<div className="animate">
							<object type="image/svg+xml" data="/animations/bg_white.svg"></object>
							<object type="image/svg+xml" data="/animations/thanks.svg" id="object"></object>
						</div>
					</div>
				</div>
			</div>

			{ /* Wave */ }
			<div className="wave">
				<div className="wave-down">
					<img src="/img/wave-down-gray.svg" alt="wave" />
				</div>
			</div>

			<div className="thanks-white">
			</div>
		</div>
	);
};

export default Thanks;
