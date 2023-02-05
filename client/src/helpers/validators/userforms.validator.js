const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const azRegEx = /[a-zA-Z]/;
const onlyNumbersRegEx = /^[0-9]*$/;
const hasDigit = /\d/;

export function validateLogin(values) {
	const errors = {};

	if (values.email.trim() == '') errors.email = 'Enter your email address';
	else if (!emailRegEx.test(values.email))
		errors.email = 'Email has to be in the format your@email.end';

	if (!values.password) errors.password = 'Enter your password';

	// Return errors if any, or false
	if (Object.keys(errors).length) {
		return errors;
	} else {
		return false;
	}
}

export function validateEditProfile(values) {
	const errors = {};

	if (values.email.trim() == '' || !values.email)
		errors.email = 'Enter your email address';
	else if (!emailRegEx.test(values.email))
		errors.email = 'Email has to be in the format your@email.end';

	if (values.first_name == '') errors.first_name = 'Enter your first name';
	else if (!azRegEx.test(values.first_name))
		errors.first_name = 'First name can cantain only letters';

	if (values.last_name == '') errors.last_name = 'Enter your last name';
	else if (!azRegEx.test(values.last_name))
		errors.last_name = 'Last name can cantain only letters';

	if (values.year !== '') {
		if (!onlyNumbersRegEx.test(values.year))
			errors.year = 'Year can cantain only numbers';
	}

	// Return errors if any, or false
	if (Object.keys(errors).length) {
		return errors;
	} else {
		return false;
	}
}

export function validateChangeUserPassword(values) {
	const errors = {};

	if (!values.password) errors.password1 = 'Enter new password';

	if (values.password.length < 6) {
		errors.password1 = 'Password has to be longer than 6 characters';
		return errors;
	}

	if (!hasDigit.test(values.password))
		errors.password1 = 'Password has to contain at least one number';

	if (values.password !== values.password2)
		errors.password2 = 'Passwords you entered do not match';

	// Return errors if any, or false
	if (Object.keys(errors).length) {
		return errors;
	} else {
		return false;
	}
}

export function validateCreateUser({ ...values }) {
	const errors = {};
	console.log(values);

	// Basic credentials
	// Email
	if (!values.email) errors.email = 'Enter email';
	else if (values.email.trim() == '') errors.email = 'Enter email';
	else if (!emailRegEx.test(values.email))
		errors.email = 'Email has to be in the format your@email.end';

	// First name
	if (!values.first_name) errors.first_name = 'Enter first name';
	else if (values.first_name == '') errors.first_name = 'Enter first name';
	else if (!azRegEx.test(values.first_name))
		errors.first_name = 'First name can cantain only letters';

	// Last Name
	if (!values.last_name) errors.last_name = 'Enter your last name';
	else if (values.last_name == '') errors.last_name = 'Enter your last name';
	else if (!azRegEx.test(values.last_name))
		errors.last_name = 'Last name can cantain only letters';

	// Password
	if (!values.password) errors.password1 = 'Enter your password';
	else if (values.password.length < 6) {
		errors.password1 = 'Password has to be longer than 6 characters';
		return errors;
	} else if (!hasDigit.test(values.password))
		errors.password1 = 'Password has to contain at least one number';
	else if (values.password !== values.password2)
		errors.password2 = 'Passwords you entered do not match';
	else if (values.sub_type == 0) {
		errors.sub = 'Choose type of subscription';
	}

	// Return errors if any, or false
	if (Object.keys(errors).length) {
		return errors;
	} else {
		return false;
	}
}

export function validateSendContactForm({ ...values }) {
	const errors = {};

	// Basic credentials
	// Email
	if (!values.email) errors.email = 'Enter email';
	else if (values.email.trim() == '') errors.email = 'Enter email';
	else if (!emailRegEx.test(values.email))
		errors.email = 'Email has to be in the format your@email.end';

	// First name
	if (!values.name) errors.name = 'Enter your first name';
	else if (values.first_name == '') errors.name = 'Enter your first name';
	else if (!azRegEx.test(values.name))
		errors.name = 'First name can cantain only letters';

	// Last Name
	if (!values.message) errors.message = 'Enter your last name';
	else if (values.message == '') errors.message = 'Enter your last name';

	// Return errors if any, or false
	if (Object.keys(errors).length) {
		return errors;
	} else {
		return false;
	}
}
