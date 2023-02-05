import React, { useEffect, useState } from 'react';

/* Utils */
import Heading from '../../utils/Heading/Heading.util';

const Page404 = () => {

	return (
		<div className="page404">
			<div className="bc-grey page404-main">
				<div className="container-lg px-0 row mx-auto space">
					<div className="col-12 col-md-6 px-0 d-flex align-items-center">
						<Heading type="text" title="Ouuuu," subtitle="nothing was found, please try it again." text="Make sure you entered the url correctly. In case of persistent problems, do not hesitate to contact us."/>
					</div>
					<div className="right-side col-12 col-md-6 d-flex justify-content-center justify-content-md-end px-0 pt-5 py-md-0">
						<div className="animate">
							<img src="/img/page404_img.png" alt="Page 404 Image" />
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

			<div className="page404-white">
			</div>
		</div>
	);
};

export default Page404;
