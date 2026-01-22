'use client';

import { useState, useEffect } from 'react';

interface TruckData {
  name: string;
  capacity: number;
  baseRate: number;
  mileage: number;
  dailyWages: number;
  toll: number;
  parking: number;
  maintenance: number;
  insurance: number;
  overhead: number;
}

interface Results {
  distance: number;
  days: number;
  truck: TruckData;
  fuelLiters: string;
  fuelCost: number;
  expenses: {
    fuel: number;
    driver: number;
    toll: number;
    parking: number;
    maintenance: number;
    insurance: number;
    overhead: number;
    total: number;
  };
  pricing: {
    baseFreight: number;
    materialAdjustment: number;
    subtotal: number;
    profit: number;
    finalRate: number;
    commission: number;
    netEarnings: number;
    profitMargin: string;
  };
  suggestedPrice: number;
}

export default function FreightCalculator() {
  const [inputs, setInputs] = useState({
    from: 'Mumbai',
    to: 'Delhi',
    truckType: 'open',
    materialType: 'general',
    fuelPrice: 100,
  });

  const [results, setResults] = useState<Results | null>(null);

  const cityDistances: Record<string, number> = {
    'Mumbai-Delhi': 1200,
    'Delhi-Mumbai': 1200,
    'Mumbai-Bangalore': 1000,
    'Bangalore-Mumbai': 1000,
    'Delhi-Bangalore': 2200,
    'Bangalore-Delhi': 2200,
    'Mumbai-Chennai': 1300,
    'Chennai-Mumbai': 1300,
    'Delhi-Chennai': 2100,
    'Chennai-Delhi': 2100,
    'Bangalore-Chennai': 350,
    'Chennai-Bangalore': 350,
    'Mumbai-Pune': 150,
    'Pune-Mumbai': 150,
    'Delhi-Jaipur': 250,
    'Jaipur-Delhi': 250,
    'Bangalore-Hyderabad': 600,
    'Hyderabad-Bangalore': 600,
  };

  const truckData: Record<string, TruckData> = {
    open: {
      name: '🚛 Open Truck',
      capacity: 20,
      baseRate: 5000,
      mileage: 8,
      dailyWages: 500,
      toll: 200,
      parking: 100,
      maintenance: 150,
      insurance: 200,
      overhead: 300,
    },
    container: {
      name: '📦 Container Truck',
      capacity: 25,
      baseRate: 6000,
      mileage: 7,
      dailyWages: 600,
      toll: 250,
      parking: 150,
      maintenance: 200,
      insurance: 250,
      overhead: 350,
    },
    tanker: {
      name: '🛢️ Tanker',
      capacity: 15,
      baseRate: 7000,
      mileage: 6,
      dailyWages: 700,
      toll: 300,
      parking: 200,
      maintenance: 250,
      insurance: 300,
      overhead: 400,
    },
    refrigerated: {
      name: '❄️ Refrigerated',
      capacity: 18,
      baseRate: 8000,
      mileage: 6.5,
      dailyWages: 800,
      toll: 280,
      parking: 180,
      maintenance: 300,
      insurance: 350,
      overhead: 450,
    },
    flatbed: {
      name: '📊 Flatbed',
      capacity: 22,
      baseRate: 6500,
      mileage: 7.5,
      dailyWages: 550,
      toll: 220,
      parking: 120,
      maintenance: 170,
      insurance: 220,
      overhead: 320,
    },
  };

  const materialMultiplier: Record<string, number> = {
    general: 1.0,
    fragile: 1.5,
    hazardous: 2.0,
    perishable: 1.8,
    oversized: 1.6,
  };

  const getDistance = () => {
    const route = `${inputs.from}-${inputs.to}`;
    return cityDistances[route] || 500;
  };

  const calculateTrip = () => {
    const distance = getDistance();
    const truck = truckData[inputs.truckType];
    const materialFactor = materialMultiplier[inputs.materialType];
    
    const days = Math.ceil(distance / 500);

    const fuelLiters = distance / truck.mileage;
    const fuelCost = fuelLiters * inputs.fuelPrice;

    const driverWages = truck.dailyWages * days;
    const tollCost = truck.toll;
    const parkingCost = truck.parking * days;
    const maintenanceCost = truck.maintenance;
    const insuranceCost = truck.insurance;
    const overheadCost = truck.overhead;

    const totalExpenses = 
      fuelCost + 
      driverWages + 
      tollCost + 
      parkingCost + 
      maintenanceCost + 
      insuranceCost + 
      overheadCost;

    const baseFreight = truck.baseRate * (distance / 100);
    const distanceMultiplier = distance > 1000 ? 0.9 : 1.0;
    const materialAdjustment = baseFreight * (materialFactor - 1);
    const subtotal = (baseFreight + materialAdjustment) * distanceMultiplier;
    const truckerProfit = subtotal * 0.35;
    const finalFreightRate = subtotal + truckerProfit;
    const platformCommission = Math.round(finalFreightRate * 0.05);
    const truckerNetEarnings = Math.round(finalFreightRate - platformCommission - totalExpenses);
    const suggestedPrice = Math.round(finalFreightRate);

    setResults({
      distance,
      days,
      truck,
      fuelLiters: fuelLiters.toFixed(2),
      fuelCost: Math.round(fuelCost),
      expenses: {
        fuel: Math.round(fuelCost),
        driver: Math.round(driverWages),
        toll: Math.round(tollCost),
        parking: Math.round(parkingCost),
        maintenance: Math.round(maintenanceCost),
        insurance: Math.round(insuranceCost),
        overhead: Math.round(overheadCost),
        total: Math.round(totalExpenses),
      },
      pricing: {
        baseFreight: Math.round(baseFreight),
        materialAdjustment: Math.round(materialAdjustment),
        subtotal: Math.round(subtotal),
        profit: Math.round(truckerProfit),
        finalRate: Math.round(finalFreightRate),
        commission: platformCommission,
        netEarnings: truckerNetEarnings,
        profitMargin: ((truckerNetEarnings / finalFreightRate) * 100).toFixed(1),
      },
      suggestedPrice,
    });
  };

  useEffect(() => {
    calculateTrip();
  }, [inputs]);

  const handleInputChange = (field: string, value: string | number) => {
    if (field === 'fuelPrice') {
      setInputs(prev => ({
        ...prev,
        [field]: typeof value === 'string' ? parseInt(value) || 0 : value
      }));
    } else {
      setInputs(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const cities = ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Pune', 'Jaipur', 'Hyderabad'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-indigo-600 p-6">
      <div className="max-w-6xl mx-auto">
        
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">💰 NAVROX Freight Calculator</h1>
          <p className="text-blue-100 text-lg">Simple & Accurate Pricing</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-8">📋 Trip Details</h2>

            <div className="mb-8">
              <label className="block text-sm font-bold text-gray-700 mb-3">📍 From</label>
              <select 
                value={inputs.from}
                onChange={(e) => handleInputChange('from', e.target.value)}
                className="w-full p-4 border-2 border-blue-300 rounded-xl focus:outline-none focus:border-blue-600 text-lg font-semibold text-gray-700"
              >
                {cities.map(city => <option key={city} value={city}>{city}</option>)}
              </select>
            </div>

            <div className="mb-8">
              <label className="block text-sm font-bold text-gray-700 mb-3">📍 To</label>
              <select 
                value={inputs.to}
                onChange={(e) => handleInputChange('to', e.target.value)}
                className="w-full p-4 border-2 border-blue-300 rounded-xl focus:outline-none focus:border-blue-600 text-lg font-semibold text-gray-700"
              >
                {cities.map(city => <option key={city} value={city}>{city}</option>)}
              </select>
            </div>

            <div className="mb-8">
              <label className="block text-sm font-bold text-gray-700 mb-3">🚛 Truck Type</label>
              <select 
                value={inputs.truckType}
                onChange={(e) => handleInputChange('truckType', e.target.value)}
                className="w-full p-4 border-2 border-green-300 rounded-xl focus:outline-none focus:border-purple-600 text-lg font-semibold text-gray-700"
              >
                <option value="open">🚛 Open Truck (20 ton)</option>
                <option value="container">📦 Container (25 ton)</option>
                <option value="tanker">🛢️ Tanker (15 ton)</option>
                <option value="refrigerated">❄️ Refrigerated (18 ton)</option>
                <option value="flatbed">📊 Flatbed (22 ton)</option>
              </select>
            </div>

            <div className="mb-8">
              <label className="block text-sm font-bold text-gray-700 mb-3">📦 Material Type</label>
              <select 
                value={inputs.materialType}
                onChange={(e) => handleInputChange('materialType', e.target.value)}
                className="w-full p-4 border-2 border-green-300 rounded-xl focus:outline-none focus:border-green-600 text-lg font-semibold text-gray-700"
              >
                <option value="general">📦 General (1.0x)</option>
                <option value="fragile">🥚 Fragile (1.5x)</option>
                <option value="hazardous">⚠️ Hazardous (2.0x)</option>
                <option value="perishable">🍎 Perishable (1.8x)</option>
                <option value="oversized">📏 Oversized (1.6x)</option>
              </select>
            </div>

            <div className="mb-8">
              <label className="block text-sm font-bold text-gray-700 mb-3">⛽ Fuel Price (₹/liter)</label>
              <input 
                type="number" 
                value={inputs.fuelPrice}
                onChange={(e) => handleInputChange('fuelPrice', e.target.value)}
                className="w-full p-4 border-2 border-orange-300 rounded-xl focus:outline-none focus:border-orange-600 text-lg font-semibold text-gray-700"
                placeholder="100"
              />
            </div>
          </div>

          {results && (
            <div className="space-y-6">
              
              <div className="bg-white rounded-2xl shadow-2xl p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">📊 Trip Summary</h2>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
                    <span className="text-gray-700 font-semibold">Route</span>
                    <span className="text-xl font-bold text-blue-600">{inputs.from} → {inputs.to}</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
                    <span className="text-gray-700 font-semibold">Distance</span>
                    <span className="text-xl font-bold text-blue-600">{results.distance} km</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
                    <span className="text-gray-700 font-semibold">Truck Type</span>
                    <span className="text-xl font-bold text-blue-600">{results.truck.name}</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
                    <span className="text-gray-700 font-semibold">Days</span>
                    <span className="text-xl font-bold text-blue-600">{results.days}</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
                    <span className="text-gray-700 font-semibold">Fuel Needed</span>
                    <span className="text-xl font-bold text-blue-600">{results.fuelLiters} L</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-2xl p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">💸 All Expenses</h2>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                    <span className="text-gray-700">Fuel</span>
                    <span className="font-bold text-black">₹{results.expenses.fuel}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                    <span className="text-gray-700">Driver Wages</span>
                    <span className="font-bold text-black">₹{results.expenses.driver}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                    <span className="text-gray-700">Toll</span>
                    <span className="font-bold text-black">₹{results.expenses.toll}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                    <span className="text-gray-700">Parking</span>
                    <span className="font-bold text-black">₹{results.expenses.parking}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                    <span className="text-gray-700">Maintenance</span>
                    <span className="font-bold text-black">₹{results.expenses.maintenance}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                    <span className="text-gray-700">Insurance</span>
                    <span className="font-bold text-black">₹{results.expenses.insurance}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                    <span className="text-gray-700">Overhead</span>
                    <span className="font-bold text-black">₹{results.expenses.overhead}</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-4 bg-red-100 rounded-lg border-2 border-red-400 mt-4">
                    <span className="font-bold text-lg text-black">TOTAL EXPENSES</span>
                    <span className="text-2xl font-bold text-red-600">₹{results.expenses.total}</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl shadow-2xl p-8 text-white">
                <h2 className="text-2xl font-bold mb-4">💰 TRUCKER EARNINGS</h2>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-white bg-opacity-20 rounded-lg">
                    <span className="text-lg text-black">Shipper Pays</span>
                    <span className="text-3xl font-bold text-black">₹{results.suggestedPrice}</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-4 bg-white bg-opacity-20 rounded-lg">
                    <span className="text-lg text-black">Commission (5%)</span>
                    <span className="text-2xl font-bold text-black">-₹{results.pricing.commission}</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-4 bg-white bg-opacity-20 rounded-lg">
                    <span className="text-lg text-black">Expenses</span>
                    <span className="text-2xl font-bold text-black">-₹{results.expenses.total}</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-6 bg-white rounded-xl border-4 border-white mt-4">
                    <span className="text-gray-800 text-2xl font-bold">NET EARN</span>
                    <span className="text-4xl font-bold text-green-600">₹{results.pricing.netEarnings}</span>
                  </div>
                </div>

                <p className="text-green-100 text-center mt-6 text-lg font-semibold">
                  ✅ Profit Margin: {results.pricing.profitMargin}%
                </p>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
}