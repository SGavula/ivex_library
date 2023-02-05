import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { put_request, default_request_config } from '../../helpers';

/* Utils */
import Heading from '../../utils/Heading/Heading.util';

const UnsubscribeFromEmails = () => {
	const token = useParams().token;
	const [ unsubscribed, setUnsubscribed ] = useState(false);

	useEffect(
		async () => {
			if (token) {
				try {
					const request = await put_request(
						`/user/unsubcribe-emails/${token}`,
						default_request_config,
						{}
					);
					console.log(request);
					if (request.data.status == 200) {
						setUnsubscribed(true);
					}
				} catch (error) {
					console.log(error);
				}
			}
		},
		[ token ]
	);

	const history = useHistory();

	useEffect(
		() => {
			if (unsubscribed == true) {
				setTimeout(() => {
					history.push('/');
				}, 5000);
			}
		},
		[ unsubscribed ]
	);

	return (
		<div className="thanks">
			<div className="bc-grey thanks-main">
				<div className="container-lg px-0 row mx-auto space">
					<div className="col-12 col-md-6 px-0 d-flex align-items-center">
						<Heading
							type="text"
							title="Mrzí nás,"
							subtitle="že už nechcete dostávať ďalšie emaily."
							text="O chvíľu budete presmerovaný na domovskú stránku."
						/>
					</div>
					<div className="right-side col-12 col-md-6 d-flex justify-content-center justify-content-md-end px-0 pt-5 py-md-0">
						<div className="animate">
							<object
								type="image/svg+xml"
								data="/animations/bg_white.svg"
							/>
							<object
								type="image/svg+xml"
								data="/animations/thanks.svg"
								id="object"
							/>
						</div>
					</div>
				</div>
			</div>

			{/* Wave */}
			<div className="wave">
				<div className="wave-down">
					<img src="/img/wave-down-gray.svg" alt="wave" />
				</div>
			</div>

			<div className="thanks-white" />
		</div>
	);
};

export default UnsubscribeFromEmails;
