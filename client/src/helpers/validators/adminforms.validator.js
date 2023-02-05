const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const azRegEx = /[a-zA-Z]/;
const hasDigit = /\d/;

export function validateEditAdminData(values) {
	console.log(values);
	const errors = {};

	if (values.email.trim() == '') errors.email = 'Enter your email address';
	else if (!emailRegEx.test(values.email))
		errors.email = 'Email has to be in the format your@email.end';

	if (values.first_name == '') errors.first_name = 'Enter first name';
	else if (!azRegEx.test(values.first_name))
		errors.first_name = 'First name can cantain only letters';

	if (values.last_name == '') errors.last_name = 'Enter your last name';
	else if (!azRegEx.test(values.last_name))
		errors.last_name = 'Last name can cantain only letters';

	// Return errors if any, or false
	if (Object.keys(errors).length) {
		return errors;
	} else {
		return false;
	}
}

export function validateChangeAdminPassword(values) {
	const errors = {};

	if (!values.password1) errors.password1 = 'Enter new password';

	if (values.password1.length < 6) {
		errors.password1 = "Password mest be longer than 6 characters";
		return errors;
	}

	if (!hasDigit.test(values.password1))
		errors.password1 = 'Password must contain at least one number';

	if (values.password1 !== values.password2)
		errors.password2 = 'Passwords you entered do not match';

	// Return errors if any, or false
	if (Object.keys(errors).length) {
		return errors;
	} else {
		return false;
	}
}

export function validateCreatePublisher(values) {
	const errors = {};

	if (values.email.trim() == '') errors.email = 'Enter your email address';
	else if (!emailRegEx.test(values.email))
		errors.email = 'Email has to be in the format your@email.end';

	if (!values.name || values.name == '') errors.name = 'Enter name';

	// Return errors if any, or false
	if (Object.keys(errors).length) {
		return errors;
	} else {
		return false;
	}
}

export function validateCreateAdmin(values) {
	const errors = {};

	if (values.first_name == '') errors.first_name = 'Enter first name';
	else if (!azRegEx.test(values.first_name))
		errors.first_name = 'First name can cantain only letters';

	if (values.last_name == '') errors.last_name = 'Enter your last name';
	else if (!azRegEx.test(values.last_name))
		errors.last_name = 'Last name can cantain only letters';

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

export function validateCreateUser(values) {
	const errors = {};

	if (values.email.trim() == '' || !values.email)
		errors.email = 'Enter your email address';
	else if (!emailRegEx.test(values.email))
		errors.email = 'Email has to be in the format your@email.end';

	if (values.first_name == '') errors.first_name = 'Enter first name';
	else if (!azRegEx.test(values.first_name))
		errors.first_name = 'First name can cantain only letters';

	if (values.last_name == '') errors.last_name = 'Enter your last name';
	else if (!azRegEx.test(values.last_name))
		errors.last_name = 'Last name can cantain only letters';

	// Return errors if any, or false
	if (Object.keys(errors).length) {
		return errors;
	} else {
		return false;
	}
}
