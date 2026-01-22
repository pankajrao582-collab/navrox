'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Login() {
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // Basic validation
      if (!formData.email || !formData.password) {
        setError('Please fill all fields');
        setLoading(false);
        return;
      }

      // Get user from localStorage
      const userData = localStorage.getItem(`user_${formData.email}`);
      
      if (!userData) {
        setError('User not found. Please register first.');
        setLoading(false);
        return;
      }

      const user = JSON.parse(userData);

      if (user.password !== formData.password) {
        setError('Wrong password');
        setLoading(false);
        return;
      }

      // Success
      setSuccess('Login successful! Redirecting...');
      
      // Save current user
      localStorage.setItem('currentUser', JSON.stringify({
        email: user.email,
        name: user.name,
        role: user.role,
      }));

      // Redirect based on role
      setTimeout(() => {
        if (user.role === 'shipper') {
          router.push('/shipper-dashboard');
        } else {
          router.push('/trucker-dashboard');
        }
      }, 1500);

    } catch (err) {
      setError('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-600 mb-2">NAVROX</h1>
          <p className="text-gray-600">Welcome Back</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border-2 border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4">
            ⚠️ {error}
          </div>
        )}

        {/* Success Message */}
        {success && (
          <div className="bg-green-100 border-2 border-green-400 text-green-700 px-4 py-3 rounded-lg mb-4">
            ✅ {success}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Email */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your@email.com"
              className="w-full p-4 border-2 border-blue-300 rounded-lg focus:outline-none focus:border-blue-600 text-lg"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Your password"
              className="w-full p-4 border-2 border-blue-300 rounded-lg focus:outline-none focus:border-blue-600 text-lg"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-lg font-bold text-lg hover:shadow-lg transition disabled:opacity-50"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        {/* Register Link */}
        <div className="text-center mt-6">
          <p className="text-gray-600">
            Don't have an account?{' '}
            <a href="/register" className="text-blue-600 font-bold hover:underline">
              Register here
            </a>
          </p>
        </div>

      </div>
    </div>
  );
}