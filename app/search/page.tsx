"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Suspense } from "react";
import { Plane, ArrowLeft, Filter, Clock, MapPin, ChevronDown } from "lucide-react";

function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const from = searchParams.get("from") || "New York (JFK)";
  const to = searchParams.get("to") || "Anywhere";
  const searchType = searchParams.get("type") || "flight";

  const dummyFlights = [
    {
      id: 1,
      airline: "Delta Airlines",
      departureTime: "08:00 AM",
      arrivalTime: "11:30 AM",
      duration: "3h 30m",
      price: "$245",
      stops: "Non-stop",
    },
    {
      id: 2,
      airline: "United Airlines",
      departureTime: "10:15 AM",
      arrivalTime: "02:45 PM",
      duration: "4h 30m",
      price: "$195",
      stops: "1 stop",
    },
    {
      id: 3,
      airline: "American Airlines",
      departureTime: "01:00 PM",
      arrivalTime: "04:20 PM",
      duration: "3h 20m",
      price: "$280",
      stops: "Non-stop",
    },
  ];

  const dummyHotels = [
    {
      id: 1,
      name: "The Ritz-Carlton",
      rating: "4.9",
      reviews: "1,245",
      price: "$450/night",
      amenities: "Pool • Spa • Free WiFi",
    },
    {
      id: 2,
      name: "Hilton Garden Inn",
      rating: "4.5",
      reviews: "830",
      price: "$195/night",
      amenities: "Gym • Breakfast • Free WiFi",
    },
    {
      id: 3,
      name: "Marriott Downtown",
      rating: "4.7",
      reviews: "2,100",
      price: "$280/night",
      amenities: "City View • Bar • Gym",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Header */}
      <div className="bg-slate-900 text-white pb-12 pt-6 px-4">
        <div className="max-w-7xl mx-auto">
          <button 
            onClick={() => router.back()}
            className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors mb-6 font-medium"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </button>
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-black mb-2 flex items-center gap-3">
                {searchType === "hotel" ? (
                  <>Hotels in {to}</>
                ) : (
                  <>{from} <Plane className="w-6 h-6" /> {to}</>
                )}
              </h1>
              <p className="text-slate-400 font-medium">
                Oct 15 - Oct 22 • {searchType === "hotel" ? "1 Room" : "2 Adults"}
              </p>
            </div>
            <button className="bg-white/10 hover:bg-white/20 px-6 py-3 rounded-full font-bold transition-colors">
              Modify Search
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="w-full lg:w-1/4">
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
                <h2 className="font-black text-xl text-slate-800 flex items-center gap-2">
                  <Filter className="w-5 h-5" /> Filters
                </h2>
                <span className="text-blue-600 font-bold text-sm cursor-pointer">Reset</span>
              </div>
              
              <div className="mb-6">
                <h3 className="font-bold text-slate-800 mb-3">Stops</h3>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" className="w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-600" defaultChecked />
                    <span className="text-slate-600 font-medium group-hover:text-slate-900">Non-stop</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" className="w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-600" />
                    <span className="text-slate-600 font-medium group-hover:text-slate-900">1 Stop</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="w-full lg:w-3/4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-slate-800">
                {searchType === "hotel" ? dummyHotels.length : dummyFlights.length} {searchType === "hotel" ? "Hotels" : "Flights"} Found
              </h2>
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-slate-200 cursor-pointer shadow-sm">
                <span className="text-sm font-bold text-slate-600">Sort by: Recommended</span>
                <ChevronDown className="w-4 h-4 text-slate-400" />
              </div>
            </div>

            <div className="space-y-4">
              {searchType === "hotel" ? (
                dummyHotels.map((hotel) => (
                  <div key={hotel.id} className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 hover:shadow-lg transition-shadow">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                      <div className="flex flex-col w-full md:w-2/4">
                        <span className="font-black text-xl text-slate-800 mb-1">{hotel.name}</span>
                        <div className="flex items-center gap-2 text-sm font-bold mb-2">
                          <span className="text-white bg-blue-600 px-2 py-0.5 rounded">{hotel.rating}</span>
                          <span className="text-slate-500">{hotel.reviews} reviews</span>
                        </div>
                        <span className="text-sm text-slate-500 font-medium">{hotel.amenities}</span>
                      </div>

                      <div className="w-full md:w-1/4 flex flex-row md:flex-col justify-between md:justify-center items-center md:items-end md:border-l md:border-slate-100 md:pl-6">
                        <div className="text-2xl font-black text-slate-900 mb-2">{hotel.price}</div>
                        <button className="bg-blue-600 text-white px-8 py-3 rounded-full font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20 active:scale-95">
                          Book Room
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                dummyFlights.map((flight) => (
                  <div key={flight.id} className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 hover:shadow-lg transition-shadow">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                      <div className="flex items-center gap-4 w-full md:w-1/4">
                        <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-600">
                          <Plane className="w-6 h-6 transform -rotate-45" />
                        </div>
                        <span className="font-black text-slate-800">{flight.airline}</span>
                      </div>

                      <div className="flex items-center justify-between w-full md:w-2/4">
                        <div className="text-center">
                          <div className="text-xl font-black text-slate-800">{flight.departureTime}</div>
                          <div className="text-sm text-slate-500 font-medium">JFK</div>
                        </div>
                        <div className="flex flex-col items-center px-4 w-32">
                          <span className="text-xs text-slate-400 font-bold mb-1">{flight.duration}</span>
                          <div className="w-full h-px bg-slate-300 relative flex items-center justify-center">
                            <Plane className="w-4 h-4 text-slate-400 absolute bg-white px-1" />
                          </div>
                          <span className="text-xs text-blue-600 font-bold mt-1">{flight.stops}</span>
                        </div>
                        <div className="text-center">
                          <div className="text-xl font-black text-slate-800">{flight.arrivalTime}</div>
                          <div className="text-sm text-slate-500 font-medium">Destination</div>
                        </div>
                      </div>

                      <div className="w-full md:w-1/4 flex flex-row md:flex-col justify-between md:justify-center items-center md:items-end md:border-l md:border-slate-100 md:pl-6">
                        <div className="text-2xl font-black text-slate-900 mb-2">{flight.price}</div>
                        <button className="bg-blue-600 text-white px-8 py-3 rounded-full font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20 active:scale-95">
                          Select
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-500 font-bold">Loading...</div>}>
      <SearchContent />
    </Suspense>
  );
}
