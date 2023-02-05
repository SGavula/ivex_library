import React, { useState, useEffect } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

const ErrorAlert = ({ title, text, btnText, show, setShow = (f) => f }) => {
	useEffect(() => {
		const timeId = setTimeout(() => {
			// After 3 seconds set the show value to false
			setShow(false);
		}, 5000);

		return () => {
			clearTimeout(timeId);
		};
	}, []);

	return (
		<Alert show={show} variant="danger">
			<Alert.Heading>{title}</Alert.Heading>
			<p>{text}</p>
			<div className="d-flex justify-content-end">
				<Button onClick={() => setShow(false)} variant="outline-danger">
					{btnText}
				</Button>
			</div>
		</Alert>
	);
};

export default ErrorAlert;
