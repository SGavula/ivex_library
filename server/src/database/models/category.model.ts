import mongoose from 'mongoose';
// import { nanoid } from 'nanoid';

export interface CategoryInterface extends mongoose.Document {
	category_name: string;
}

const categorySchema = new mongoose.Schema<CategoryInterface>({
	category_name: String
});

export const category_model = mongoose.model('categories', categorySchema);
