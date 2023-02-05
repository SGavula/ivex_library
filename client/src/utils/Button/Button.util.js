import React from 'react';

const Button = (props) => {
	return (
		<button
			className={`button ${props.color ? props.color : ''} ${props.style ? props.style: ''} ${props.className ? props.className: ''}${props.type ? props.type: ''}`}
		>
			{props.text}
		</button>
	);
};

export default Button;
