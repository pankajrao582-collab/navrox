'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { LogOut, Plus, Eye, Truck, DollarSign, Package, TrendingUp } from 'lucide-react';

interface User {
  email: string;
  name: string;
  role: string;
}

interface Load {
  id: string;
  from: string;
  to: string;
  distance: number;
  price: number;
  status: 'posted' | 'assigned' | 'transit' | 'completed';
  weight: number;
  createdAt: string;
}

export default function ShipperDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState<'all' | 'posted' | 'active' | 'completed'>('all');
  const [loads, setLoads] = useState<Load[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentUser = localStorage.getItem('currentUser');
    
    if (!currentUser) {
      router.push('/login');
      return;
    }

    const userData = JSON.parse(currentUser);
    
    if (userData.role !== 'shipper') {
      router.push('/trucker-dashboard');
      return;
    }

    setUser(userData);

    const savedLoads = localStorage.getItem(`loads_${userData.email}`);
    if (savedLoads) {
      setLoads(JSON.parse(savedLoads));
    }

    setLoading(false);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    router.push('/login');
  };

  const getFilteredLoads = () => {
    if (activeTab === 'all') return loads;
    if (activeTab === 'posted') return loads.filter(load => load.status === 'posted');
    if (activeTab === 'active') return loads.filter(load => load.status === 'assigned' || load.status === 'transit');
    if (activeTab === 'completed') return loads.filter(load => load.status === 'completed');
    return loads;
  };

  const stats = {
    activeLoads: loads.filter(l => l.status === 'assigned' || l.status === 'transit').length,
    totalSpent: loads.reduce((sum, l) => sum + l.price, 0),
    completedLoads: loads.filter(l => l.status === 'completed').length,
    inTransit: loads.filter(l => l.status === 'transit').length,
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center">
        <div className="text-white text-2xl font-bold">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      
      <header className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">NAVROX</h1>
            <p className="text-blue-100">Shipper Dashboard</p>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="text-lg">👤 {user?.name}</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 px-6 py-2 rounded-lg font-bold flex items-center gap-2 transition"
            >
              <LogOut size={20} /> Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-600">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-600 text-sm font-semibold">Active Loads</p>
                <p className="text-4xl font-bold text-blue-600 mt-2">{stats.activeLoads}</p>
              </div>
              <Package className="text-blue-400" size={40} />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-cyan-600">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-600 text-sm font-semibold">In Transit</p>
                <p className="text-4xl font-bold text-cyan-600 mt-2">{stats.inTransit}</p>
              </div>
              <Truck className="text-cyan-400" size={40} />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-600">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-600 text-sm font-semibold">Completed</p>
                <p className="text-4xl font-bold text-green-600 mt-2">{stats.completedLoads}</p>
              </div>
              <TrendingUp className="text-green-400" size={40} />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-600">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-600 text-sm font-semibold">Total Spent</p>
                <p className="text-4xl font-bold text-purple-600 mt-2">₹{stats.totalSpent}</p>
              </div>
              <DollarSign className="text-purple-400" size={40} />
            </div>
          </div>

        </div>

        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-2">📍 Post a New Load</h2>
              <p className="text-blue-100">Use freight calculator to determine best price</p>
            </div>
            <button
              onClick={() => router.push('/')}
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition flex items-center gap-2"
            >
              <Plus size={24} /> Post Load
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          
          <div className="border-b border-gray-200 flex flex-wrap bg-gray-50">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-6 py-4 font-bold text-lg transition ${
                activeTab === 'all'
                  ? 'text-blue-600 border-b-4 border-blue-600 bg-white'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              All Loads
            </button>
            <button
              onClick={() => setActiveTab('posted')}
              className={`px-6 py-4 font-bold text-lg transition ${
                activeTab === 'posted'
                  ? 'text-blue-600 border-b-4 border-blue-600 bg-white'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Posted
            </button>
            <button
              onClick={() => setActiveTab('active')}
              className={`px-6 py-4 font-bold text-lg transition ${
                activeTab === 'active'
                  ? 'text-blue-600 border-b-4 border-blue-600 bg-white'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Active
            </button>
            <button
              onClick={() => setActiveTab('completed')}
              className={`px-6 py-4 font-bold text-lg transition ${
                activeTab === 'completed'
                  ? 'text-blue-600 border-b-4 border-blue-600 bg-white'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Completed
            </button>
          </div>

          <div className="p-6 space-y-4">
            {getFilteredLoads().length === 0 ? (
              <div className="text-center py-12">
                <Package size={64} className="mx-auto text-gray-300 mb-4" />
                <p className="text-2xl font-bold text-gray-600">No loads found</p>
                <p className="text-gray-500 mt-2">Start by posting a new load</p>
              </div>
            ) : (
              getFilteredLoads().map(load => (
                <div
                  key={load.id}
                  className="border-2 border-blue-200 rounded-xl p-6 hover:shadow-lg transition bg-gradient-to-r from-blue-50 to-white"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <p className="font-bold text-gray-800 text-xl">
                          {load.from} → {load.to}
                        </p>
                        <span className={`px-4 py-1 rounded-full text-sm font-bold ${
                          load.status === 'completed'
                            ? 'bg-green-100 text-green-700'
                            : load.status === 'transit'
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-blue-100 text-blue-700'
                        }`}>
                          {load.status.toUpperCase()}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <span className="text-gray-700">
                          <span className="font-semibold text-blue-600">Distance:</span> {load.distance} km
                        </span>
                        <span className="text-gray-700">
                          <span className="font-semibold text-blue-600">Weight:</span> {load.weight} ton
                        </span>
                        <span className="text-gray-700">
                          <span className="font-semibold text-blue-600">Price:</span> ₹{load.price}
                        </span>
                        <span className="text-gray-700">
                          <span className="font-semibold text-blue-600">Date:</span> {new Date(load.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition flex items-center gap-2">
                      <Eye size={20} /> View
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

        </div>

      </div>

    </div>
  );
}