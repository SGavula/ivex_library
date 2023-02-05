// Set up stripe
import { UserInterface, user_model } from '../database/models';
import { Request, Response } from 'express';
import Stripe from 'stripe';
import { transporter } from '../emails';
import { MessageInterface, response } from '../helpers';
let stripe: any;
stripe = new Stripe(
	process.env.NODE_ENV == 'PROD'
		? process.env.STRIPE_PK!
		: process.env.STRIPE_TEST!,
	{
		apiVersion: '2020-08-27'
	}
);

export const Webhook = async (req: Request, res: Response) => {
	// Retrieve the event by verifying the signature using the raw body and secret.
	let event;

	const headers = req.headers['stripe-signature'];

	if (!headers || !process.env.STRIPE_WEBHOOK_SECRET) {
		return;
	}

	try {
		event = stripe.webhooks.constructEvent(
			req.body,
			headers,
			process.env.STRIPE_WEBHOOK_SECRET
		);
	} catch (err) {
		console.log(err);
		console.log(`⚠️  Webhook signature verification failed.`);
		console.log(
			`⚠️  Check the env file and enter the correct webhook secret.`
		);
		return res.send(400);
	}
	// Handle the event
	// Review important events for Billing webhooks
	// https://stripe.com/docs/billing/webhooks
	// Remove comment to see the various objects sent for this sample
	switch (event.type) {
		case 'customer.subscription.created':
			break;
		case 'customer.subscription.updated':
			console.log(event);

			if (event.data.object.status == 'trialing') {
				const customerId = event.data.object.customer;
				const user = await user_model.findOne({
					'stripe.customer': customerId
				});
				const stripeDate = event.data.object.trial_end;

				const date = new Date(stripeDate * 1000);

				// let url = 'https://ivexlibrary.sk'
				let url = 'http://localhost:3000';

				const price = event.data.object.plan.amount / 100 + '€';

				user.subscription_ending = date;
				user.user_state = 'free-trail';

				await user.save();

				let subscription_type =
					event.data.object.plan.interval == 'month'
						? 'mesačné (skúšobná doba)'
						: 'semestrálne (skúšobná doba)';

				// Send confirmation email
				const message: MessageInterface = {
					from: 'noreply@ivexlibrary.sk',
					to: user.email,
					subject: 'Úspešná registrácia do IVEX-Library',
					template: 'layouts/registrantion-confirm',
					context: {
						first_name: user.first_name,
						last_name: user.last_name,
						price: price,
						subscription: subscription_type,
						trial: 7,
						subscription_ending: date,
						link: `${url}/verification/${user.verification_token
							.token}`
					}
				};
				await transporter.sendMail(message);
			}
			break;
		case 'invoice.paid':
			console.log(event);
			if (event.data.object.amount_due !== 0) {
				const customerId = event.data.object.customer;
				const user = await user_model.findOne({
					'stripe.customer': customerId
				});

				const subscription = await stripe.subscriptions.retrieve(
					user.stripe.id
				);

				const stripeDate = subscription.current_period_end;

				const date = new Date(stripeDate * 1000);

				user.subscription_ending = date;
				user.user_state = 'subscribed';

				await user.save();
			}
			break;
		case 'invoice.payment_failed':
			// If the payment fails or the customer does not have a valid payment method,
			//  an invoice.payment_failed event is sent, the subscription becomes past_due.
			// Use this webhook to notify your user that their payment has
			// failed and to retrieve new card details.
			// TODO: Allow user 5 days to pay for his subscription
			break;
		case 'customer.subscription.deleted':
			if (event.request != null) {
				// TODO: Delete user account
				// handle a subscription cancelled by your request
				// from above.
			} else {
				// handle subscription cancelled automatically based
				// upon your subscription settings.
			}
			break;
		default:
		// Unexpected event type
	}

	return res.sendStatus(200);
};

export const cancelSubscription = async (req: Request, res: Response) => {
	try {
		const user: UserInterface = await user_model.findOne({
			_id: req.params.user_id
		});

		await stripe.subscriptions.update(
			// @ts-expect-error
			user.stripe.id,
			{ cancel_at_period_end: true }
		);

		user.user_state = 'awaiting-cancel';
		await user.save();
	} catch (error) {
		console.log(error);
		return res.status(400).jsonp(response(400, 'TryCatch Error', error));
	}
	return res.status(200).jsonp(response(200, 'Subscription canceled', {}));
};

export const renewSubscription = async (req: Request, res: Response) => {
	try {
		const user: UserInterface = await user_model.findOne({
			_id: req.params.user_id
		});

		await stripe.subscriptions.update(
			// @ts-expect-error
			user.stripe.id,
			{ cancel_at_period_end: false }
		);

		user.user_state = 'subscribed';
		await user.save();
	} catch (error) {
		console.log(error);
		return res.status(400).jsonp(response(400, 'TryCatch Error', error));
	}
	return res.status(200).jsonp(response(200, 'Subscription canceled', {}));
};

export const changeSubscription = async (req: Request, res: Response) => {
	try {
		const user: UserInterface = await user_model.findOne({
			_id: req.params.user_id
		});

		const subscription = await stripe.subscriptions.retrieve(
			// @ts-expect-error
			user.stripe.id
		);

		if (req.body.new_sub !== 3) {
			let price;
			if (req.body.new_sub == 1) {
				if (process.env.NODE_ENV == 'PROD') {
					price = 'price_1JxXXrDz7YsaI1yHfUEP2glu';
				} else {
					price = 'price_1Js7PyDz7YsaI1yH8DLg5tXf';
				}
			} else if (req.body.new_sub == 2) {
				if (process.env.NODE_ENV == 'PROD') {
					price = 'price_1JxXZnDz7YsaI1yHWJ7wQ8eZ';
				} else {
					price = 'price_1Js7QRDz7YsaI1yHpLT1JKcw';
				}
			}

			await stripe.subscriptions.update(
				// @ts-expect-error
				user.stripe.id,
				{
					cancel_at_period_end: false,
					items: [
						{
							id: subscription.items.data[0].id,
							price: price
						}
					]
				}
			);

			// @ts-expect-error
			user.subscription_type = parseInt(req.body.new_sub);
			await user.save();
		} else {
			await stripe.subscriptions.update(
				// @ts-expect-error
				user.stripe.id,
				{ cancel_at_period_end: true }
			);

			user.user_state = 'awaiting-cancel';
			await user.save();
		}
	} catch (error) {
		console.log(error);
		return res.status(400).jsonp(response(400, 'TryCatch Error', error));
	}
	return res.status(200).jsonp(response(200, 'Subscription canceled', {}));
};
