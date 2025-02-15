import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import Alumni from '../model/alumniModel.js';
import transformData from './transformData.js';

// Get the directory path for the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables from the .env file in the server directory
dotenv.config({ path: join(__dirname, '..', '.env') });

// Verify that MONGO_URI is loaded
if (!process.env.MONGO_URI) {
  console.error('MONGO_URI is not defined in environment variables');
  process.exit(1);
}

const importData = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');

    // Transform the data
    const transformedData = transformData();
    console.log(`Transformed ${transformedData.length} records`);

    // Clear existing data
    await Alumni.deleteMany({});
    console.log('Cleared existing data');

    // Import new data
    const imported = await Alumni.insertMany(transformedData);
    console.log(`Imported ${imported.length} alumni records`);

    console.log('Data import completed successfully');
  } catch (error) {
    console.error('Error importing data:', error);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
};

importData();