import React, { useState, useEffect } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

const InfoAlert = ({
	title,
	text,
	btnText,
	setSaveHighlight = (f) => f,
	setIsAlert = (f) => f,
	isAlert
}) => {
	const [ show, setShow ] = useState(true);
	useEffect(
		() => {
			console.log(isAlert);
			if (isAlert == 1) {
				setShow(true);
			} else {
				setShow(false);
			}
		},
		[ isAlert ]
	);

	return (
		<Alert show={show} variant="dark">
			<Alert.Heading>{title}</Alert.Heading>
			<p>{text}</p>
			<div className="d-flex justify-content-end">
				<Button
					onClick={() => {
						setSaveHighlight(true);
					}}
					variant="outline-dark"
				>
					{btnText}
				</Button>
				<Button
					onClick={() => {
						window.location.reload();
					}}
					variant="outline-dark"
				>
					Nie
				</Button>
			</div>
		</Alert>
	);
};

export default InfoAlert;
