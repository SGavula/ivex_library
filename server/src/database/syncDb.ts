import {
	admin_model,
	category_model,
	highlightsModel,
	publisher_analytics_model,
	publisher_model,
	script_model,
	user_analytics_model,
	user_model
} from './models';

export const SyncDB = async () => {
	await user_model.createCollection();
	await script_model.createCollection();
	await publisher_model.createCollection();
	await admin_model.createCollection();
	await category_model.createCollection();
	await highlightsModel.createCollection();
	await publisher_analytics_model.createCollection();
	await user_analytics_model.createCollection();
};
