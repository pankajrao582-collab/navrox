'use client';

import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-indigo-600">
      
      {/* Navigation */}
      <nav className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="bg-blue-600 text-white p-2 rounded-lg font-bold text-xl">N</div>
              <span className="text-2xl font-bold text-blue-600 hidden sm:inline">NAVROX</span>
            </div>
            
            <div className="hidden md:flex gap-4">
              <button onClick={() => router.push('/register')} className="px-6 py-2 text-blue-600 font-bold hover:bg-blue-50 rounded-lg">Register</button>
              <button onClick={() => router.push('/login')} className="px-6 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700">Login</button>
            </div>

            <div className="md:hidden">
              <button onClick={() => router.push('/login')} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm">Login</button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Content */}
          <div className="text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Connect Shippers & Truckers
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              The fastest & most reliable logistics platform. Post loads, find truckers, and track in real-time.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => router.push('/register')}
                className="px-8 py-4 bg-white text-blue-600 font-bold rounded-lg hover:bg-gray-100 transition text-lg"
              >
                Get Started Free
              </button>
              <button 
                onClick={() => router.push('/freight-calculator')}
                className="px-8 py-4 border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-blue-600 transition text-lg"
              >
                Calculate Freight
              </button>
            </div>

            <div className="mt-12 flex gap-8">
              <div>
                <p className="text-3xl font-bold">10K+</p>
                <p className="text-blue-100">Active Users</p>
              </div>
              <div>
                <p className="text-3xl font-bold">50K+</p>
                <p className="text-blue-100">Loads Completed</p>
              </div>
              <div>
                <p className="text-3xl font-bold">4.8★</p>
                <p className="text-blue-100">Ratings</p>
              </div>
            </div>
          </div>

          {/* Right Image/Illustration */}
          <div className="hidden lg:block">
            <div className="bg-white bg-opacity-10 rounded-2xl p-8 backdrop-blur-lg">
              <div className="space-y-6">
                <div className="bg-white rounded-lg p-4 shadow-lg hover:shadow-xl transition">
                  <div className="flex items-center gap-4">
                    <div className="text-4xl">🚛</div>
                    <div>
                      <p className="font-bold text-gray-800">For Truckers</p>
                      <p className="text-gray-600">Find loads near you</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-4 shadow-lg hover:shadow-xl transition">
                  <div className="flex items-center gap-4">
                    <div className="text-4xl">📦</div>
                    <div>
                      <p className="font-bold text-gray-800">For Shippers</p>
                      <p className="text-gray-600">Post & track loads</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-4 shadow-lg hover:shadow-xl transition">
                  <div className="flex items-center gap-4">
                    <div className="text-4xl">💰</div>
                    <div>
                      <p className="font-bold text-gray-800">Best Rates</p>
                      <p className="text-gray-600">Calculate instantly</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-16">Why Choose NAVROX?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            <div className="p-8 border-2 border-gray-200 rounded-xl hover:border-blue-600 transition">
              <div className="text-5xl mb-4">⚡</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">Instant Booking</h3>
              <p className="text-gray-600">Get matched with best truckers in minutes, not hours.</p>
            </div>

            <div className="p-8 border-2 border-gray-200 rounded-xl hover:border-blue-600 transition">
              <div className="text-5xl mb-4">📍</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">Real-time Tracking</h3>
              <p className="text-gray-600">Track your shipment live with GPS updates every minute.</p>
            </div>

            <div className="p-8 border-2 border-gray-200 rounded-xl hover:border-blue-600 transition">
              <div className="text-5xl mb-4">💎</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">Best Rates</h3>
              <p className="text-gray-600">Transparent pricing with no hidden charges guaranteed.</p>
            </div>

            <div className="p-8 border-2 border-gray-200 rounded-xl hover:border-blue-600 transition">
              <div className="text-5xl mb-4">🔒</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">Secure & Safe</h3>
              <p className="text-gray-600">All transactions secured with SSL encryption.</p>
            </div>

            <div className="p-8 border-2 border-gray-200 rounded-xl hover:border-blue-600 transition">
              <div className="text-5xl mb-4">📱</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">Mobile Friendly</h3>
              <p className="text-gray-600">Manage loads on the go with our mobile app.</p>
            </div>

            <div className="p-8 border-2 border-gray-200 rounded-xl hover:border-blue-600 transition">
              <div className="text-5xl mb-4">⭐</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">4.8★ Ratings</h3>
              <p className="text-gray-600">Trusted by 10,000+ shippers and truckers.</p>
            </div>

          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-16">How It Works?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            
            {/* Shipper Side */}
            <div>
              <h3 className="text-2xl font-bold text-blue-600 mb-6">For Shippers</h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-blue-600 text-white font-bold">1</div>
                  </div>
                  <div>
                    <p className="font-bold text-gray-800">Register Your Account</p>
                    <p className="text-gray-600 mt-1">Sign up as a shipper in 2 minutes</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-blue-600 text-white font-bold">2</div>
                  </div>
                  <div>
                    <p className="font-bold text-gray-800">Post Your Load</p>
                    <p className="text-gray-600 mt-1">Enter pickup & delivery locations, weight, type</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-blue-600 text-white font-bold">3</div>
                  </div>
                  <div>
                    <p className="font-bold text-gray-800">Get Matched</p>
                    <p className="text-gray-600 mt-1">See best truckers & select your preferred choice</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-blue-600 text-white font-bold">4</div>
                  </div>
                  <div>
                    <p className="font-bold text-gray-800">Track & Confirm</p>
                    <p className="text-gray-600 mt-1">Real-time tracking until delivery confirmation</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Trucker Side */}
            <div>
              <h3 className="text-2xl font-bold text-cyan-600 mb-6">For Truckers</h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-cyan-600 text-white font-bold">1</div>
                  </div>
                  <div>
                    <p className="font-bold text-gray-800">Register & Add Truck</p>
                    <p className="text-gray-600 mt-1">Sign up & register your truck details</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-cyan-600 text-white font-bold">2</div>
                  </div>
                  <div>
                    <p className="font-bold text-gray-800">Browse Loads</p>
                    <p className="text-gray-600 mt-1">See available loads near your location</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-cyan-600 text-white font-bold">3</div>
                  </div>
                  <div>
                    <p className="font-bold text-gray-800">Show Interest</p>
                    <p className="text-gray-600 mt-1">Click interest button for loads you want</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-cyan-600 text-white font-bold">4</div>
                  </div>
                  <div>
                    <p className="font-bold text-gray-800">Deliver & Earn</p>
                    <p className="text-gray-600 mt-1">Pick up load & deliver to earn money instantly</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-blue-100 mb-8">Join 10,000+ users already using NAVROX</p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => router.push('/register')}
              className="px-8 py-4 bg-white text-blue-600 font-bold rounded-lg hover:bg-gray-100 transition text-lg"
            >
              Sign Up Now
            </button>
            <button 
              onClick={() => router.push('/login')}
              className="px-8 py-4 border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-blue-600 transition text-lg"
            >
              Already Have Account?
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-white font-bold mb-4">NAVROX</h3>
              <p className="text-sm">Connecting shippers and truckers for seamless logistics.</p>
            </div>
            <div>
              <h3 className="text-white font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">About Us</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
                <li><a href="#" className="hover:text-white">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-bold mb-4">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">Terms</a></li>
                <li><a href="#" className="hover:text-white">Privacy</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-bold mb-4">Contact</h3>
              <p className="text-sm">Email: info@navrox.in</p>
              <p className="text-sm">Phone: +91-XXXX-XXXX-XX</p>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>&copy; 2024 NAVROX. All rights reserved.</p>
          </div>
        </div>
      </footer>

    </div>
  );
}