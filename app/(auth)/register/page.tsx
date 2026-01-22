'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Register() {
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    role: 'shipper',
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
      if (!formData.email || !formData.password || !formData.name) {
        setError('Please fill all fields');
        setLoading(false);
        return;
      }

      if (formData.password.length < 6) {
        setError('Password must be at least 6 characters');
        setLoading(false);
        return;
      }

      // Success message
      setSuccess('Registration successful! Redirecting to login...');
      
      // Save to localStorage (temporary - later will use Supabase)
      const userData = {
        email: formData.email,
        password: formData.password,
        name: formData.name,
        role: formData.role,
        createdAt: new Date().toISOString(),
      };
      
      localStorage.setItem(`user_${formData.email}`, JSON.stringify(userData));

      // Redirect to login after 2 seconds
      setTimeout(() => {
        router.push('/login');
      }, 2000);

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
          <p className="text-gray-600">Create Your Account</p>
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
          
          {/* Name */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              className="w-full p-4 border-2 border-blue-300 rounded-lg focus:outline-none focus:border-blue-600 text-lg"
            />
          </div>

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
              placeholder="At least 6 characters"
              className="w-full p-4 border-2 border-blue-300 rounded-lg focus:outline-none focus:border-blue-600 text-lg"
            />
          </div>

          {/* Role Selection */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">I am a:</label>
            <div className="space-y-2">
              <label className="flex items-center p-3 border-2 border-gray-300 rounded-lg cursor-pointer hover:bg-blue-50">
                <input
                  type="radio"
                  name="role"
                  value="shipper"
                  checked={formData.role === 'shipper'}
                  onChange={handleChange}
                  className="w-4 h-4 text-blue-600"
                />
                <span className="ml-3 text-lg">📦 Shipper (Load Provider)</span>
              </label>

              <label className="flex items-center p-3 border-2 border-gray-300 rounded-lg cursor-pointer hover:bg-blue-50">
                <input
                  type="radio"
                  name="role"
                  value="trucker"
                  checked={formData.role === 'trucker'}
                  onChange={handleChange}
                  className="w-4 h-4 text-blue-600"
                />
                <span className="ml-3 text-lg">🚛 Trucker (Load Carrier)</span>
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-lg font-bold text-lg hover:shadow-lg transition disabled:opacity-50"
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        {/* Login Link */}
        <div className="text-center mt-6">
          <p className="text-gray-600">
            Already have an account?{' '}
            <a href="/login" className="text-blue-600 font-bold hover:underline">
              Login here
            </a>
          </p>
        </div>

      </div>
    </div>
  );
}