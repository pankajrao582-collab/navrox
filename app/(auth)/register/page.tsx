'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function RegisterPage() {
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    role: 'shipper'
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      console.log('🔵 Starting registration...', formData);

      // STEP 1: Create user in Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      });

      if (authError) {
        console.log('❌ Auth Error:', authError);
        throw authError;
      }

      console.log('✅ Auth User Created:', authData.user?.id);

      // STEP 2: Save user details - USING "name" INSTEAD OF "full_name"
      const { data: userData, error: userError } = await supabase
        .from('users')
        .insert([
          {
            id: authData.user?.id,
            email: formData.email,
            name: formData.fullName,  // 👈 YE DEKHO - "name" use kiya!
            role: formData.role,
            created_at: new Date().toISOString()
          }
        ])
        .select();

      if (userError) {
        console.log('❌ User Insert Error:', userError);
        throw userError;
      }

      console.log('✅ User Data Saved:', userData);

      alert('✅ Registration Successful! Please login.');
      router.push('/login');

    } catch (err: any) {
      console.error('❌ Registration Failed:', err);
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#2563EB] flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
        
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-[#2563EB] mb-1">
            NAVROX
          </h1>
          <p className="text-gray-600 text-sm">
            Create Your Account
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm">
            ❌ {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Full Name
            </label>
            <input
              type="text"
              required
              value={formData.fullName}
              onChange={(e) => setFormData({...formData, fullName: e.target.value})}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
              placeholder="Pankaj Rao"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Password
            </label>
            <input
              type="password"
              required
              minLength={6}
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
              placeholder="At least 6 characters"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              I am a:
            </label>
            <div className="space-y-2">
              <label className="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="role"
                  value="shipper"
                  checked={formData.role === 'shipper'}
                  onChange={(e) => setFormData({...formData, role: e.target.value})}
                  className="mr-3"
                />
                <span className="text-sm">📦 Shipper (Load Provider)</span>
              </label>
              <label className="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="role"
                  value="trucker"
                  checked={formData.role === 'trucker'}
                  onChange={(e) => setFormData({...formData, role: e.target.value})}
                  className="mr-3"
                />
                <span className="text-sm">🚛 Trucker (Load Carrier)</span>
              </label>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#2563EB] text-white py-3 rounded-lg font-medium hover:bg-[#1d4ed8] transition-colors disabled:opacity-50"
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{' '}
          <a href="/login" className="text-[#2563EB] font-medium hover:underline">
            Login here
          </a>
        </p>
      </div>
    </div>
  );
}