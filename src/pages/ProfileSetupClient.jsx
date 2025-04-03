import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserAlt, FaPhone, FaCheck } from 'react-icons/fa';
import axios from 'axios';
import { useUser } from '@clerk/clerk-react';

const ProfileSetupClient = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Validate phone number
      if (!phoneNumber.match(/^\d{10}$/)) {
        throw new Error('Please enter a valid 10-digit phone number');
      }

      const response = await axios.put('http://localhost:5000/api/user/update-profile', {
        email: user.primaryEmailAddress.emailAddress,
        phoneNumber,
        profileComplete: true
      });

      if (response.data.success) {
        navigate('/client-dashboard'); // Redirect to dashboard after successful update
      } else {
        throw new Error(response.data.message || 'Failed to update profile');
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="mx-auto w-20 h-20 bg-red-100 rounded-full flex items-center justify-center text-red-600 mb-4">
            <FaUserAlt size={28} />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Complete Your Profile</h1>
          <p className="text-gray-600">We just need a few more details to get started</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          <div className="p-8">
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaPhone className="text-gray-400" />
                  </div>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    placeholder="e.g 9876543210"
                    maxLength="10"
                    required
                  />
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  We'll use this for order updates and delivery coordination
                </p>
              </div>

              {error && (
                <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-white bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all"
              >
                {loading ? (
                  'Saving...'
                ) : (
                  <>
                    <FaCheck className="mr-2" />
                    Complete Profile
                  </>
                )}
              </button>
            </form>
          </div>
          <div className="bg-gray-50 px-8 py-4 text-center">
            <p className="text-sm text-gray-500">
              You can update this information later in your account settings
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSetupClient;