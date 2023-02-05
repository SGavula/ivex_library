import { DBConnect } from './connection';
import {
	seedAdmins,
	seedPublishers,
	seedScripts,
	seedUsers,
	seedUserAnalytics,
	seedPublisherAnalytics
} from './seeders';
import { seedCategories } from './seeders/category.seeder';

const seed = async () => {
	await DBConnect();
	await seedUsers();
	await seedPublishers();
	await seedAdmins();
	await seedCategories();
	await seedScripts();
	await seedUserAnalytics();
	await seedPublisherAnalytics();
	process.exit(0);
};

seed();
