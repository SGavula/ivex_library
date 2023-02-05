const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const azRegEx = /[a-zA-Z]/;
const onlyNumbersRegEx = /^[0-9]*$/;
const hasDigit = /\d/;

export function validateEditPublisherCredentials(values) {
	const errors = {};

	if (values.name == '' || !values.name) errors.name = 'Enter your email address';

	if (values.email.trim() == '') errors.email = 'Enter your email address';
	else if (!emailRegEx.test(values.email))
		errors.email = 'Email has to be in the format your@email.end';

	// Return errors if any, or false
	if (Object.keys(errors).length) {
		return errors;
	} else {
		return false;
	}
}

export function validatePublisherEditPassword(values) {
	const errors = {};
	console.log(values);
	if (values.password == '' || !values.password)
		errors.password = 'Enter your password';

	if (values.password2 == '' || !values.password2)
		errors.password2 = 'Enter your password';

	if (!hasDigit.test(values.password))
		errors.password = 'Password must contain at least one number';

	if (values.password !== values.password2)
		errors.password2 = 'Passwords you entered do not match';

	// Return errors if any, or false
	if (Object.keys(errors).length) {
		return errors;
	} else {
		return false;
	}
}

export function validateChangePublisherScript(values) {
	console.log(values);
	const errors = {};

	if (values.message == '' || !values.message)
		errors.message = 'You must write a message';

	if (values.script_id == 0 || !values.script_id) {
		errors.script_id = 'Choose e-book';
	}

	// Return errors if any, or false
	if (Object.keys(errors).length) {
		return errors;
	} else {
		return false;
	}
}
