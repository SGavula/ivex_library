import React, { useState } from 'react';

const Radio = () => {

	const [click, setClick] = useState(false);
	
	return (
		<div>
			<div className="circle-white d-flex justify-content-center align-items-center pointer" onClick={() => { setClick(!click) }}>
				<div className={click ? "circle-yellow" : ""}></div>
			</div>
		</div>
	);
};

export default Radio;
