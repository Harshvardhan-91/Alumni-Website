import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs/promises';
import Alumni from '../model/alumniModel.js';

// Setup directory paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config({ path: join(__dirname, '..', '.env') });

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB successfully');

    // Read the JSON file
    console.log('Reading alumni data...');
    const rawData = JSON.parse(
      await fs.readFile(join(__dirname, '..', 'data', 'alumni-data.json'), 'utf-8')
    );

    // Transform the data
    console.log('Transforming data...');
    const transformedData = [];

    Object.entries(rawData).forEach(([yearRange, alumni]) => {
      alumni.forEach((person, index) => {
        // Ensure required fields have values
        const name = person["Name of Alumnus"] || person["Name"] || `Anonymous Alumni ${yearRange}-${index + 1}`;
        const batch = person["Batch"]?.toString() || yearRange.split('-')[0] || "";

        // Skip records without a batch
        if (!batch) {
          console.log(`Skipping record due to missing batch: ${name}`);
          return;
        }

        transformedData.push({
          name,
          batch,
          degree: person["Degree and programme from NITJ"] || "",
          department: extractDepartment(person["Degree and programme from NITJ"]) || "",
          company: person["Current Place of work"] || "",
          designation: person["Designation"] || "",
          email: person["E-mail"] || person["email"] || "",
          phone: person["Contact Details"]?.toString() || "",
          country: person["Current country"] || "INDIA",
          linkedin: cleanLinkedinUrl(person["Linkedin"] || ""),
          image: "https://via.placeholder.com/150"
        });
      });
    });

    console.log(`Transformed ${transformedData.length} records`);

    // Clear existing data
    console.log('Clearing existing alumni data...');
    await Alumni.deleteMany({});

    // Insert new data in batches to avoid memory issues
    console.log('Inserting new alumni data...');
    const batchSize = 100;
    for (let i = 0; i < transformedData.length; i += batchSize) {
      const batch = transformedData.slice(i, i + batchSize);
      await Alumni.insertMany(batch, { ordered: false });
      console.log(`Inserted records ${i + 1} to ${Math.min(i + batchSize, transformedData.length)}`);
    }

    // Verify the import
    const count = await Alumni.countDocuments();
    console.log(`Total documents in database: ${count}`);

    const sample = await Alumni.findOne();
    console.log('Sample document:', JSON.stringify(sample, null, 2));

  } catch (error) {
    console.error('Error seeding database:', error);
    if (error.writeErrors) {
      console.error('Write Errors:', error.writeErrors.length);
      error.writeErrors.forEach((err, index) => {
        console.error(`Error ${index + 1}:`, err.err);
      });
    }
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
};

function cleanLinkedinUrl(url) {
  if (!url) return "";
  if (!url.startsWith('http')) {
    return `https://${url.replace(/^\/+/, '')}`;
  }
  return url;
}

function extractDepartment(degree) {
  if (!degree) return "";
  const degreeLC = degree.toLowerCase();
  if (degreeLC.includes('chemical')) return "Chemical Engineering";
  if (degreeLC.includes('mechanical')) return "Mechanical Engineering";
  if (degreeLC.includes('civil')) return "Civil Engineering";
  if (degreeLC.includes('electrical')) return "Electrical Engineering";
  if (degreeLC.includes('electronics')) return "Electronics Engineering";
  if (degreeLC.includes('computer')) return "Computer Science";
  return degree;
}

// Run the seeding function
seedDatabase()
  .then(() => {
    console.log('Seeding completed successfully');
    process.exit(0);
  })
  .catch(error => {
    console.error('Seeding failed:', error);
    process.exit(1);
  });