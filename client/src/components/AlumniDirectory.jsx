import API_BASE_URL from '../config/api';

const fetchAlumni = async (pageNum = 1) => {
  try {
    const queryParams = new URLSearchParams({
      page: pageNum,
      limit: 12,
      search: searchTerm,
      ...filters
    });
    
    const response = await fetch(`${API_BASE_URL}/api/alumni?${queryParams}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'include'
    });
    // ... rest of the code
  } catch (error) {
    console.error('Error fetching alumni:', error);
  }
}; 