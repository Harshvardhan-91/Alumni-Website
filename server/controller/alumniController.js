import Alumni from '../model/alumniModel.js';

export const getAlumni = async (req, res) => {
  console.log('Received alumni request:', req.query);
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const search = req.query.search || '';
    const filters = {
      batch: req.query.batch,
      department: req.query.department,
      country: req.query.location,
    };

    // Build query
    let query = {};
    
    // Add search conditions
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { company: { $regex: search, $options: 'i' } },
        { designation: { $regex: search, $options: 'i' } }
      ];
    }

    // Add filters (only if they're not 'all' or 'None')
    Object.entries(filters).forEach(([key, value]) => {
      if (value && value !== 'all' && value !== 'None') {
        if (key === 'location') {
          query['country'] = value;
        } else {
          query[key] = value;
        }
      }
    });

    console.log('MongoDB Query:', JSON.stringify(query, null, 2));

    // Execute query with debugging logs
    const total = await Alumni.countDocuments(query);
    console.log('Total matching documents:', total);

    const alumni = await Alumni.find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ batch: -1 })
      .lean();

    console.log(`Found ${alumni.length} alumni records for page ${page}`);

    res.json({
      success: true,
      alumni,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    console.error('Error in getAlumni:', error);
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};
