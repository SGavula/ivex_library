import { Address } from 'nodemailer/lib/mailer';

export interface MessageInterface {
	from: string | Address;
	to: string | Address | (string | Address)[];
	subject: string;
	template: string;
	context: Object;
}
