import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { 
  Check, 
  X, 
  User, 
  UserCheck, 
  Clock, 
  ChevronLeft, 
  ChevronRight,
  LogOut,
  Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [pendingRequests, setPendingRequests] = useState([]);
  const [approvedRequests, setApprovedRequests] = useState([]);
  const [rejectedRequests, setRejectedRequests] = useState([]);
  const [stats, setStats] = useState({
    totalUsers: 0,
    pendingVerificationUsers: 0,
    verifiedAlumni: 0
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [actionLoading, setActionLoading] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');
  const [rejectingId, setRejectingId] = useState(null);
  
  // Define fetchData function with useCallback to avoid dependency issues
  const fetchData = useCallback(async (page = 1) => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      const response = await fetch(`${API_BASE_URL}/api/pending-alumni/admin/requests?page=${page}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const data = await response.json();
      
      const pending = data.pendingRequests.filter(req => req.status === 'pending');
      const approved = data.pendingRequests.filter(req => req.status === 'approved');
      const rejected = data.pendingRequests.filter(req => req.status === 'rejected');
      
      setPendingRequests(pending);
      setApprovedRequests(approved);
      setRejectedRequests(rejected);
      setCurrentPage(data.currentPage);
      setTotalPages(data.totalPages);
      
    } catch (error) {
      setError('Failed to load data. Please try again.');
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  }, []);
  
  // Define fetchStats function with useCallback to avoid dependency issues
  const fetchStats = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No authentication token found. Please login again.');
        navigate('/admin-login');
        return;
      }
      
      const response = await fetch(`${API_BASE_URL}/api/admin/stats`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        if (response.status === 403) {
          setError('You do not have permission to view admin data. Please login with admin credentials.');
          logout(); 
          navigate('/admin-login');
          return;
        }
        throw new Error('Failed to fetch stats');
      }

      const data = await response.json();
      setStats(data.stats);
      
    } catch (error) {
      console.error('Error fetching stats:', error);
      setError('Failed to load admin statistics.');
      
      // Use default stats as fallback
      setStats({
        totalUsers: "--",
        pendingVerificationUsers: "--",
        verifiedAlumni: "--"
      });
    }
  }, [navigate, logout]);

  // Initial data fetch
  useEffect(() => {
    // Check if user is admin, redirect if not
    if (user && user.role !== 'admin') {
      navigate('/');
    } else if (!user) {
      navigate('/admin-login');
    } else {
      fetchData(1);
      fetchStats();
    }
  }, [user, navigate, fetchData, fetchStats]);

  const handlePageChange = (page) => {
    fetchData(page);
  };

  const handleReviewRequest = async (requestId, status) => {
    try {
      setActionLoading(true);
      const token = localStorage.getItem('token');
      
      const requestBody = {
        status, 
      };
      
      // Add rejection reason if rejecting
      if (status === 'rejected' && rejectionReason) {
        requestBody.rejectionReason = rejectionReason;
      }
      
      const response = await fetch(`${API_BASE_URL}/api/pending-alumni/admin/review/${requestId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        throw new Error(`Failed to ${status} request`);
      }

      // Refetch data to show updated state
      fetchData(currentPage);
      fetchStats();
      
      // Reset rejection form
      setRejectionReason('');
      setRejectingId(null);
      
    } catch (error) {
      setError(`Error: ${error.message}`);
    } finally {
      setActionLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/admin-login');
  };

  const handleShowRejectForm = (id) => {
    setRejectingId(id);
  };

  const handleCancelReject = () => {
    setRejectingId(null);
    setRejectionReason('');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Admin Dashboard</h1>
            <p className="text-sm text-gray-500">Manage alumni verification requests</p>
          </div>
          
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                  <User className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Total Users</p>
                  <h3 className="text-2xl font-bold text-gray-900">{stats.totalUsers}</h3>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-yellow-100">
                  <Clock className="h-6 w-6 text-yellow-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Pending Verification</p>
                  <h3 className="text-2xl font-bold text-gray-900">{stats.pendingVerificationUsers}</h3>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
                  <UserCheck className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Verified Alumni</p>
                  <h3 className="text-2xl font-bold text-gray-900">{stats.verifiedAlumni}</h3>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Error Alert */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 flex justify-between items-center">
            <p>{error}</p>
            <button onClick={() => setError('')} className="text-red-700">
              <X className="h-4 w-4" />
            </button>
          </div>
        )}
        
        {/* Main Content */}
        <Card>
          <CardHeader>
            <CardTitle>Alumni Verification Requests</CardTitle>
            <CardDescription>Review and manage alumni profile verification requests</CardDescription>
          </CardHeader>
          
          <Tabs defaultValue="pending">
            <div className="px-6">
              <TabsList className="grid grid-cols-3 mb-6 sticky top-0 bg-white">
                <TabsTrigger value="pending">
                  Pending ({pendingRequests.length})
                </TabsTrigger>
                <TabsTrigger value="approved">
                  Approved ({approvedRequests.length})
                </TabsTrigger>
                <TabsTrigger value="rejected">
                  Rejected ({rejectedRequests.length})
                </TabsTrigger>
              </TabsList>
            </div>
            
            <CardContent className="p-6 pt-0">
              <TabsContent value="pending">
                {loading ? (
                  <div className="flex justify-center items-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
                    <span className="ml-2 text-gray-500">Loading requests...</span>
                  </div>
                ) : pendingRequests.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-gray-500">No pending verification requests</p>
                  </div>
                ) : (
                  <div className="grid gap-6">
                    {pendingRequests.map((request) => (
                      <Card key={request._id} className="overflow-hidden">
                        <CardContent className="p-0">
                          <div className="flex p-4">
                            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md">
                              <img 
                                src={request.image || 'https://alumni-website-backend2.onrender.com/uploads/default-profile.png'} 
                                alt={`${request.name}'s profile`}
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.src = 'https://alumni-website-backend2.onrender.com/uploads/default-profile.png';
                                }}
                                className="w-24 h-24 rounded-full object-cover mx-auto"
                              />
                            </div>
                            
                            <div className="flex-grow space-y-3 ml-4">
                              <div>
                                <h3 className="text-lg font-semibold text-gray-900">{request.name}</h3>
                                <p className="text-sm text-gray-500">{request.email}</p>
                              </div>
                              
                              <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                                <div>
                                  <p className="text-xs text-gray-500">Batch</p>
                                  <p className="text-sm font-medium">{request.batch}</p>
                                </div>
                                <div>
                                  <p className="text-xs text-gray-500">Department</p>
                                  <p className="text-sm font-medium">{request.department}</p>
                                </div>
                                <div>
                                  <p className="text-xs text-gray-500">Company</p>
                                  <p className="text-sm font-medium">{request.company}</p>
                                </div>
                                <div>
                                  <p className="text-xs text-gray-500">Designation</p>
                                  <p className="text-sm font-medium">{request.designation}</p>
                                </div>
                              </div>
                              
                              {rejectingId === request._id ? (
                                <div className="space-y-3">
                                  <textarea
                                    value={rejectionReason}
                                    onChange={(e) => setRejectionReason(e.target.value)}
                                    placeholder="Reason for rejection (required)"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                                    rows="2"
                                  />
                                  <div className="flex space-x-2">
                                    <Button 
                                      variant="destructive" 
                                      size="sm" 
                                      onClick={() => handleReviewRequest(request._id, 'rejected')}
                                      disabled={!rejectionReason.trim() || actionLoading}
                                    >
                                      {actionLoading ? 'Submitting...' : 'Confirm Reject'}
                                    </Button>
                                    <Button 
                                      variant="outline" 
                                      size="sm" 
                                      onClick={handleCancelReject}
                                    >
                                      Cancel
                                    </Button>
                                  </div>
                                </div>
                              ) : (
                                <div className="flex space-x-2 mt-3">
                                  <Button 
                                    variant="outline" 
                                    size="sm" 
                                    className="border-green-500 text-green-600 hover:bg-green-50"
                                    onClick={() => handleReviewRequest(request._id, 'approved')}
                                    disabled={actionLoading}
                                  >
                                    <Check className="h-4 w-4 mr-1" />
                                    Approve
                                  </Button>
                                  <Button 
                                    variant="outline" 
                                    size="sm" 
                                    className="border-red-500 text-red-600 hover:bg-red-50"
                                    onClick={() => handleShowRejectForm(request._id)}
                                    disabled={actionLoading}
                                  >
                                    <X className="h-4 w-4 mr-1" />
                                    Reject
                                  </Button>
                                </div>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="approved">
                {loading ? (
                  <div className="flex justify-center items-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
                    <span className="ml-2 text-gray-500">Loading approved requests...</span>
                  </div>
                ) : approvedRequests.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-gray-500">No approved verification requests</p>
                  </div>
                ) : (
                  <div className="grid gap-6">
                    {approvedRequests.map((request) => (
                      <Card key={request._id} className="overflow-hidden">
                        <CardContent className="p-0">
                          <div className="flex p-4">
                            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md">
                              <img 
                                src={request.image || 'https://alumni-website-backend2.onrender.com/uploads/default-profile.png'} 
                                alt={`${request.name}'s profile`}
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.src = 'https://alumni-website-backend2.onrender.com/uploads/default-profile.png';
                                }}
                                className="w-24 h-24 rounded-full object-cover mx-auto"
                              />
                            </div>
                            
                            <div className="flex-grow space-y-3 ml-4">
                              <div>
                                <h3 className="text-lg font-semibold text-gray-900">{request.name}</h3>
                                <p className="text-sm text-gray-500">{request.email}</p>
                              </div>
                              
                              <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                                <div>
                                  <p className="text-xs text-gray-500">Batch</p>
                                  <p className="text-sm font-medium">{request.batch}</p>
                                </div>
                                <div>
                                  <p className="text-xs text-gray-500">Department</p>
                                  <p className="text-sm font-medium">{request.department}</p>
                                </div>
                              </div>
                              
                              <div className="flex items-center">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                  <Check className="h-3 w-3 mr-1" />
                                  Approved
                                </span>
                                <span className="text-xs text-gray-500 ml-2">
                                  on {new Date(request.updatedAt || request.createdAt).toLocaleDateString()}
                                </span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="rejected">
                {loading ? (
                  <div className="flex justify-center items-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
                    <span className="ml-2 text-gray-500">Loading rejected requests...</span>
                  </div>
                ) : rejectedRequests.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-gray-500">No rejected verification requests</p>
                  </div>
                ) : (
                  <div className="grid gap-6">
                    {rejectedRequests.map((request) => (
                      <Card key={request._id} className="overflow-hidden">
                        <CardContent className="p-0">
                          <div className="flex p-4">
                            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md">
                              <img 
                                src={request.image || 'https://alumni-website-backend2.onrender.com/uploads/default-profile.png'} 
                                alt={`${request.name}'s profile`}
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.src = 'https://alumni-website-backend2.onrender.com/uploads/default-profile.png';
                                }}
                                className="w-24 h-24 rounded-full object-cover mx-auto"
                              />
                            </div>
                            
                            <div className="flex-grow space-y-3 ml-4">
                              <div>
                                <h3 className="text-lg font-semibold text-gray-900">{request.name}</h3>
                                <p className="text-sm text-gray-500">{request.email}</p>
                              </div>
                              
                              <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                                <div>
                                  <p className="text-xs text-gray-500">Batch</p>
                                  <p className="text-sm font-medium">{request.batch}</p>
                                </div>
                                <div>
                                  <p className="text-xs text-gray-500">Department</p>
                                  <p className="text-sm font-medium">{request.department}</p>
                                </div>
                              </div>
                              
                              <div className="flex items-center">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                  <X className="h-3 w-3 mr-1" />
                                  Rejected
                                </span>
                                <span className="text-xs text-gray-500 ml-2">
                                  on {new Date(request.updatedAt || request.createdAt).toLocaleDateString()}
                                </span>
                              </div>
                              
                              {request.rejectionReason && (
                                <div className="p-3 bg-gray-50 rounded-md">
                                  <p className="text-xs text-gray-500">Reason:</p>
                                  <p className="text-sm">{request.rejectionReason}</p>
                                </div>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>
            </CardContent>
          </Tabs>

          <CardFooter className="flex justify-between">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1 || loading}
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>
            
            <div className="text-sm text-gray-500">
              Page {currentPage} of {totalPages}
            </div>
            
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages || loading}
            >
              Next
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
