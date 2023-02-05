import React from 'react';
import { useHistory } from 'react-router-dom';

const SearchBar = () => {
	const history = useHistory();
	return (
		<span onClick={(e) => history.push('/library')}>
			<input
				type="text"
				className={'searchbar'}
				placeholder={'Vyhľadávať knihy'}
			/>
		</span>
	);
};

export default SearchBar;
