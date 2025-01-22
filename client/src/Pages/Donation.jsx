import React, { useState } from 'react';
import { Check, Info, Heart, GraduationCap, Building2, Users, CircleDollarSign, ArrowRight } from 'lucide-react';

const AlumniDonationForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    mobile: '',
    pan: '',
    aadhaar: '',
    amount: '',
    category: '',
    pinCode: '',
    address: ''
  });

  const [step, setStep] = useState(1);
  const [customAmount, setCustomAmount] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Form submission logic here
  };

  const donationCategories = [
    { value: 'scholarship', label: 'Scholarship for Needy', description: 'Support deserving students facing financial challenges', icon: GraduationCap },
    { value: 'infrastructure', label: 'Infrastructure', description: 'Help improve campus facilities and equipment', icon: Building2 },
    { value: 'medical', label: 'Medical Relief', description: 'Contribute to healthcare support for students', icon: Heart },
    { value: 'social', label: 'Social Welfare', description: 'Support community development initiatives', icon: Users },
    { value: 'general', label: 'General Fund', description: 'Flexible funding for various institutional needs', icon: CircleDollarSign }
  ];

  const donationAmounts = [
    { value: '1000', label: '₹1,000' },
    { value: '5000', label: '₹5,000' },
    { value: '10000', label: '₹10,000' },
    { value: 'custom', label: 'Custom Amount' }
  ];

  const renderStep1 = () => (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Choose Your Impact Area</h2>
        <p className="text-gray-600">Select where you'd like your contribution to make a difference</p>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {donationCategories.map((category) => {
          const Icon = category.icon;
          return (
            <button
              key={category.value}
              onClick={() => {
                setFormData({ ...formData, category: category.value });
                setStep(2);
              }}
              className={`p-6 rounded-xl border-2 transition-all duration-300 hover:shadow-lg text-left group
                ${formData.category === category.value 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-200 hover:border-blue-300'}`}
            >
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-lg bg-blue-100 text-blue-600 group-hover:bg-blue-200 transition-colors">
                  <Icon size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">{category.label}</h3>
                  <p className="text-sm text-gray-600 mt-1">{category.description}</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Choose Your Donation Amount</h2>
        <p className="text-gray-600">Every contribution makes a difference</p>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {donationAmounts.map((amount) => (
            <button
              key={amount.value}
              onClick={() => {
                setFormData({ ...formData, amount: amount.value });
                if (amount.value !== 'custom') setStep(3);
              }}
              className={`p-6 rounded-xl border-2 transition-all duration-300 text-center
                ${formData.amount === amount.value 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-200 hover:border-blue-300 hover:shadow-md'}`}
            >
              <span className="block text-xl font-bold text-gray-800">{amount.label}</span>
            </button>
          ))}
        </div>

        {formData.amount === 'custom' && (
          <div className="mt-4">
            <input
              type="number"
              value={customAmount}
              onChange={(e) => setCustomAmount(e.target.value)}
              placeholder="Enter amount in ₹"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              onClick={() => {
                if (customAmount) {
                  setFormData({ ...formData, amount: customAmount });
                  setStep(3);
                }
              }}
              className="mt-4 w-full bg-blue-600 text-white py-3 px-6 rounded-xl font-medium hover:bg-blue-700 transition-colors"
            >
              Continue
            </button>
          </div>
        )}
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Complete Your Details</h2>
        <p className="text-gray-600">Please provide your information for the donation receipt</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
            <input
              type="tel"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">PAN Number</label>
            <input
              type="text"
              name="pan"
              value={formData.pan}
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Aadhaar Number</label>
            <input
              type="text"
              name="aadhaar"
              value={formData.aadhaar}
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Pin Code</label>
            <input
              type="text"
              name="pinCode"
              value={formData.pinCode}
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              rows="3"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              required
            />
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
        <div className="flex items-start space-x-4">
          <Info className="w-6 h-6 text-blue-500 mt-1" />
          <div>
            <h3 className="font-semibold text-blue-800">Tax Benefits</h3>
            <p className="text-blue-700 mt-1">
              Your donation is eligible for tax deduction under Section 80G of the Income Tax Act. 
              A tax receipt will be sent to your email address.
            </p>
          </div>
        </div>
      </div>

      <button
        onClick={handleSubmit}
        className="w-full bg-blue-600 text-white py-4 px-6 rounded-xl font-medium hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
      >
        <span>Complete Donation</span>
        <ArrowRight className="w-5 h-5" />
      </button>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="mb-12 text-center">
        <div className="flex justify-center mb-4">
          <div className="p-3 rounded-full bg-red-100">
            <Heart className="w-8 h-8 text-red-500" />
          </div>
        </div>
        <h1 className="text-4xl font-bold text-gray-800 mb-3">Make a Difference</h1>
        <p className="text-xl text-gray-600">Your contribution helps shape the future of education</p>
      </div>

      <div className="mb-8">
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between">
            {[
              { step: 1, label: 'Choose Category' },
              { step: 2, label: 'Select Amount' },
              { step: 3, label: 'Your Details' }
            ].map((item) => (
              <div key={item.step} className="flex flex-col items-center">
                <div 
                  className={`w-12 h-12 rounded-xl flex items-center justify-center font-semibold transition-all duration-300 mb-2
                    ${step >= item.step 
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-200 scale-110' 
                      : 'bg-gray-100 text-gray-400'}`}
                >
                  {item.step}
                </div>
                <span className={`text-sm font-medium transition-colors duration-300 ${
                  step >= item.step ? 'text-blue-600' : 'text-gray-400'
                }`}>
                  {item.label}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-4 relative">
            <div className="absolute top-0 left-0 h-1 bg-blue-100 w-full rounded-full">
              <div 
                className="absolute top-0 left-0 h-1 bg-blue-600 rounded-full transition-all duration-300"
                style={{ width: `${((step - 1) / 2) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-xl p-8">
        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderStep3()}
      </div>
    </div>
  );
};

export default AlumniDonationForm;