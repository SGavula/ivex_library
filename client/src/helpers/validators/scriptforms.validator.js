const onlyNumbersRegEx = /^[0-9]*$/;

export function validateScriptChangeInfo(values, files) {
	const errors = {};

	if (!values.name || values.name == '')
		errors.name = 'Name of e-book must exist';
	if (!values.year || values.year == '')
		errors.year = 'Publication year must exist';
	if (!values.isbn || values.isbn == '')
		errors.isbn = 'ISBN of e-book must exist';
	if (!values.info || values.info == '')
		errors.info = 'Informations about e-book must exist';

	if (!onlyNumbersRegEx.test(values.year))
		errors.year = 'Publication year must contain only numbers';

	if (Object.keys(files).length !== 0) {
		if (
			files.image.type !== 'image/png' &&
			files.image.type !== 'image/jpeg' &&
			files.image.type !== 'image/jpg'
		)
			errors.image = 'Picture of e-book must be in PNG, JPG or JPEG format';
	}

	// Return errors if any, or false
	if (Object.keys(errors).length) {
		return errors;
	} else {
		return false;
	}
}

export function validateCreateScript(values) {
	const errors = {};

	// Info
	if (!values.title || values.title == '')
		errors.name = 'Name of e-book must exist';
	if (!values.year || values.year == '')
		errors.year = 'Publication year must exist';
	if (!values.isbn || values.isbn == '')
		errors.isbn = 'ISBN of e-book must exist';
	if (!values.info || values.info == '')
		errors.info = 'Informations about e-book must exist';

	// if (!values.pricing) errors.pricing = 'Zadajte cenu';

	if (!onlyNumbersRegEx.test(values.year))
		errors.year = 'Publication year must contain only numbers';

	// TODO: Author validation

	if (!values.image) errors.image = 'Choose picture';
	if (
		values.image.type !== 'image/png' &&
		values.image.type !== 'image/jpg' &&
		values.image.type !== 'image/jpeg'
	)
		errors.image = 'Picture of e-book must be in PNG, JPG or JPEG format';

	if (!values.pdf) errors.pdf = 'Choose PDF';
	if (values.pdf.type !== 'application/pdf')
		errors.pdf = 'PDF of e-book must be in PDF format';

	// if (!values.city || values.city == '') errors.city = 'Vyplnte mesto';

	if (!values.publishing || values.publishing == '')
		errors.publishing = 'Enter publisher';

	// Return errors if any, or false
	if (Object.keys(errors).length) {
		return errors;
	} else {
		return false;
	}
}
