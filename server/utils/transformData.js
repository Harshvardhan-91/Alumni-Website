import fs from 'fs';
import path from 'path';

const transformData = () => {
  try {
    // Read the JSON file
    const rawData = JSON.parse(
      fs.readFileSync(path.join(process.cwd(), 'alumni-data.json'), 'utf-8')
    );

    // Transform the nested data into a flat array
    const transformedData = Object.entries(rawData).flatMap(([yearRange, alumni]) => {
      return alumni.map(person => ({
        name: person["Name of Alumnus"] || person["Name"] || "",
        batch: person["Batch"]?.toString() || "",
        degree: person["Degree and programme from NITJ"] || "",
        department: person["Department"] || extractDepartment(person["Degree and programme from NITJ"]) || "",
        company: person["Current Place of work"] || "",
        designation: person["Designation"] || "",
        email: person["E-mail"] || person["email"] || "",
        phone: person["Contact Details"]?.toString() || person["Contact"]?.toString() || "",
        country: person["Current country"] || "INDIA",
        linkedin: cleanLinkedinUrl(person["Linkedin"] || ""),
        image: "https://via.placeholder.com/150"
      }));
    });

    // Write the transformed data
    fs.writeFileSync(
      path.join(process.cwd(), 'transformed-alumni-data.json'),
      JSON.stringify(transformedData, null, 2)
    );

    console.log(`Transformed ${transformedData.length} alumni records`);
    return transformedData;
  } catch (error) {
    console.error('Error transforming data:', error);
    throw error;
  }
};

// Helper function to clean LinkedIn URLs
function cleanLinkedinUrl(url) {
  if (!url) return "";
  if (!url.startsWith('http')) {
    return `https://${url.replace(/^\/+/, '')}`;
  }
  return url;
}

// Helper function to extract department from degree
function extractDepartment(degree) {
  if (!degree) return "";
  if (degree.toLowerCase().includes('chemical')) return "Chemical Engineering";
  if (degree.toLowerCase().includes('mechanical')) return "Mechanical Engineering";
  if (degree.toLowerCase().includes('civil')) return "Civil Engineering";
  if (degree.toLowerCase().includes('electrical')) return "Electrical Engineering";
  if (degree.toLowerCase().includes('electronics')) return "Electronics Engineering";
  if (degree.toLowerCase().includes('computer')) return "Computer Science";
  return degree;
}

export default transformData;