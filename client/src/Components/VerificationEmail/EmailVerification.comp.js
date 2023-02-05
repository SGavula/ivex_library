import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';

/* Utils */
import Button from '../../utils/Button/Button.util';
import { post_request, default_request_config } from '../../helpers';

const EmailVerification = () => {
	const [ pageState, setPageState ] = useState(0);
	const history = useHistory();
	const token = useParams().token;

	useEffect(async () => {
		const res = await post_request(
			`/user/verification/${token}`,
			{},
			default_request_config
		);
		if (res.data.status == 200) {
			history.push('/');
		} else {
			setPageState(1);
		}
	}, []);

	useEffect(() => {
		window.scrollTo({
			top: 0,
			left: 0,
			behavior: 'instant'
		});
	}, []);

	return (
		<div className="email-verif">
			{pageState == 1 ? (
				<h1>Potvrdzovací token vypršal, alebo sa niečo pokazilo</h1>
			) : null}
			<h1>Potvrďovanie emailu</h1>
		</div>
	);
};

export default EmailVerification;
