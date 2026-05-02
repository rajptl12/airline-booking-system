"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Suspense, useState, useMemo } from "react";
import { Plane, ArrowLeft, ArrowRight, Filter, Clock, MapPin, ChevronDown, CheckCircle, X } from "lucide-react";

function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const from = searchParams.get("from") || "New York (JFK)";
  const to = searchParams.get("to") || "Anywhere";
  const searchType = searchParams.get("type") || "flight";
  const adults = searchParams.get("adults") || "1";
  const travelClass = searchParams.get("class") || "Economy";
  const dateStr = searchParams.get("date") || "Oct 15 - Oct 22";

  const [sortBy, setSortBy] = useState("Recommended");
  const [isSortOpen, setIsSortOpen] = useState(false);
  
  // Filters
  const [stopsFilter, setStopsFilter] = useState({
    "Non-stop": true,
    "1 stop": false,
  });
  const [airlineFilter, setAirlineFilter] = useState({
    "Delta Airlines": true,
    "United Airlines": true,
    "American Airlines": true,
  });
  const [maxPrice, setMaxPrice] = useState(1000);

  const [bookingState, setBookingState] = useState<{ isOpen: boolean; item: any | null; status: 'idle' | 'processing' | 'success' }>({
    isOpen: false,
    item: null,
    status: 'idle',
  });

  const dummyFlights = [
    {
      id: 1,
      airline: "Delta Airlines",
      flightNo: "DL 482",
      departureTime: "08:00 AM",
      arrivalTime: "11:30 AM",
      duration: "3h 30m",
      price: "$245",
      stops: "Non-stop",
      class: "Economy",
      baggage: "1x 23kg",
      logo: "bg-blue-600",
    },
    {
      id: 2,
      airline: "United Airlines",
      flightNo: "UA 1024",
      departureTime: "10:15 AM",
      arrivalTime: "02:45 PM",
      duration: "4h 30m",
      price: "$195",
      stops: "1 stop",
      class: "Economy",
      baggage: "1x 23kg",
      logo: "bg-indigo-600",
    },
    {
      id: 3,
      airline: "American Airlines",
      flightNo: "AA 77",
      departureTime: "01:00 PM",
      arrivalTime: "04:20 PM",
      duration: "3h 20m",
      price: "$280",
      stops: "Non-stop",
      class: "Business",
      baggage: "2x 32kg",
      logo: "bg-red-600",
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

  const handleBook = (item: any) => {
    setBookingState({ isOpen: true, item, status: 'idle' });
  };

  const confirmBooking = () => {
    setBookingState(prev => ({ ...prev, status: 'processing' }));
    setTimeout(() => {
      setBookingState(prev => ({ ...prev, status: 'success' }));
    }, 1500);
  };

  const closeBookingModal = () => {
    setBookingState({ isOpen: false, item: null, status: 'idle' });
  };

  const processedFlights = useMemo(() => {
    let result = [...dummyFlights];
    
    // Filter by Stops
    const activeStops = Object.keys(stopsFilter).filter(key => stopsFilter[key as keyof typeof stopsFilter]);
    if (activeStops.length > 0) {
      result = result.filter(flight => activeStops.includes(flight.stops));
    }

    // Filter by Airlines
    const activeAirlines = Object.keys(airlineFilter).filter(key => airlineFilter[key as keyof typeof airlineFilter]);
    if (activeAirlines.length > 0) {
      result = result.filter(flight => activeAirlines.includes(flight.airline));
    }

    // Filter by Price
    result = result.filter(flight => parseInt(flight.price.replace('$', '')) <= maxPrice);

    // Sort
    if (sortBy === "Price (Low to High)") {
      result.sort((a, b) => parseInt(a.price.replace('$', '')) - parseInt(b.price.replace('$', '')));
    } else if (sortBy === "Price (High to Low)") {
      result.sort((a, b) => parseInt(b.price.replace('$', '')) - parseInt(a.price.replace('$', '')));
    }

    return result;
  }, [dummyFlights, sortBy, stopsFilter, airlineFilter, maxPrice]);

  const processedHotels = useMemo(() => {
    let result = [...dummyHotels];
    
    // Filter by Price
    result = result.filter(hotel => parseInt(hotel.price.split('/')[0].replace('$', '')) <= maxPrice);

    if (sortBy === "Price (Low to High)") {
      result.sort((a, b) => parseInt(a.price.split('/')[0].replace('$', '')) - parseInt(b.price.split('/')[0].replace('$', '')));
    } else if (sortBy === "Price (High to Low)") {
      result.sort((a, b) => parseInt(b.price.split('/')[0].replace('$', '')) - parseInt(a.price.split('/')[0].replace('$', '')));
    }

    return result;
  }, [dummyHotels, sortBy, maxPrice]);

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-24 md:pb-10">
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
                  <>{from} <ArrowRight className="w-6 h-6 text-slate-400" /> {to}</>
                )}
              </h1>
              <p className="text-slate-400 font-medium">
                {dateStr} • {searchType === "hotel" ? `${adults} Guests` : `${adults} Adult${adults !== '1' ? 's' : ''}`} • {searchType === "flight" ? travelClass : "1 Room"}
              </p>
            </div>
            <button onClick={() => router.push('/')} className="bg-white/10 hover:bg-white/20 px-6 py-3 rounded-full font-bold transition-colors">
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
                <span 
                  onClick={() => {
                    setStopsFilter({ "Non-stop": true, "1 stop": true });
                    setAirlineFilter({ "Delta Airlines": true, "United Airlines": true, "American Airlines": true });
                    setMaxPrice(1000);
                  }}
                  className="text-blue-600 font-bold text-sm cursor-pointer hover:underline"
                >
                  Reset
                </span>
              </div>
              
              <div className="mb-6">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-bold text-slate-800">Max Price</h3>
                  <span className="text-sm font-bold text-slate-500">${maxPrice}</span>
                </div>
                <input 
                  type="range" 
                  min="50" 
                  max="1000" 
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                  className="w-full accent-blue-600"
                />
              </div>

              {searchType === "flight" && (
                <>
                  <div className="mb-6 border-t border-slate-100 pt-6">
                    <h3 className="font-bold text-slate-800 mb-3">Stops</h3>
                    <div className="space-y-3">
                      <label className="flex items-center gap-3 cursor-pointer group">
                        <input 
                          type="checkbox" 
                          checked={stopsFilter["Non-stop"]}
                          onChange={(e) => setStopsFilter(prev => ({...prev, "Non-stop": e.target.checked}))}
                          className="w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-600" 
                        />
                        <span className="text-slate-600 font-medium group-hover:text-slate-900">Non-stop</span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer group">
                        <input 
                          type="checkbox" 
                          checked={stopsFilter["1 stop"]}
                          onChange={(e) => setStopsFilter(prev => ({...prev, "1 stop": e.target.checked}))}
                          className="w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-600" 
                        />
                        <span className="text-slate-600 font-medium group-hover:text-slate-900">1 Stop</span>
                      </label>
                    </div>
                  </div>

                  <div className="mb-6 border-t border-slate-100 pt-6">
                    <h3 className="font-bold text-slate-800 mb-3">Airlines</h3>
                    <div className="space-y-3">
                      {["Delta Airlines", "United Airlines", "American Airlines"].map(airline => (
                        <label key={airline} className="flex items-center gap-3 cursor-pointer group">
                          <input 
                            type="checkbox" 
                            checked={airlineFilter[airline as keyof typeof airlineFilter]}
                            onChange={(e) => setAirlineFilter(prev => ({...prev, [airline]: e.target.checked}))}
                            className="w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-600" 
                          />
                          <span className="text-slate-600 font-medium group-hover:text-slate-900">{airline}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </>
              )}
              
              {searchType === "hotel" && (
                <div className="mb-6">
                  <h3 className="font-bold text-slate-800 mb-3">Rating</h3>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input type="checkbox" className="w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-600" defaultChecked />
                      <span className="text-slate-600 font-medium group-hover:text-slate-900">4.5+ Stars</span>
                    </label>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Results */}
          <div className="w-full lg:w-3/4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-slate-800">
                {searchType === "hotel" ? processedHotels.length : processedFlights.length} {searchType === "hotel" ? "Hotels" : "Flights"} Found
              </h2>
              <div className="relative">
                <div 
                  onClick={() => setIsSortOpen(!isSortOpen)}
                  className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-slate-200 cursor-pointer shadow-sm hover:border-blue-300 transition-colors"
                >
                  <span className="text-sm font-bold text-slate-600">Sort by: {sortBy}</span>
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                </div>
                {isSortOpen && (
                  <div className="absolute top-[110%] right-0 w-48 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-10 animate-in fade-in zoom-in-95">
                    {["Recommended", "Price (Low to High)", "Price (High to Low)"].map(opt => (
                      <div 
                        key={opt}
                        onClick={() => { setSortBy(opt); setIsSortOpen(false); }}
                        className={`px-4 py-2 text-sm font-bold cursor-pointer hover:bg-slate-50 ${sortBy === opt ? "text-blue-600 bg-blue-50/50" : "text-slate-600"}`}
                      >
                        {opt}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-4">
              {searchType === "hotel" ? (
                processedHotels.map((hotel) => (
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
                        <button 
                          onClick={() => handleBook(hotel)}
                          className="bg-blue-600 text-white px-8 py-3 rounded-full font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20 active:scale-95"
                        >
                          Book Room
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                processedFlights.map((flight) => (
                  <div key={flight.id} className="bg-white rounded-3xl p-0 shadow-sm border border-slate-200 hover:shadow-xl hover:border-blue-300 transition-all flex flex-col md:flex-row overflow-hidden relative group">
                    <div className="absolute top-0 left-0 w-2 h-full bg-blue-600 scale-y-0 group-hover:scale-y-100 transition-transform origin-top"></div>
                    
                    <div className="flex-1 p-6 flex flex-col md:flex-row items-center gap-8 relative">
                      <div className="flex flex-col items-center gap-2 w-full md:w-32">
                        <div className={`w-14 h-14 ${flight.logo} rounded-2xl flex items-center justify-center text-white shadow-md`}>
                          <Plane className="w-8 h-8 transform -rotate-45" />
                        </div>
                        <span className="font-black text-slate-800 text-center leading-tight">{flight.airline}</span>
                        <span className="text-xs font-bold text-slate-400 bg-slate-100 px-2 py-1 rounded-md">{flight.flightNo}</span>
                      </div>

                      <div className="flex-1 flex items-center justify-between w-full">
                        <div className="text-center md:text-right w-24">
                          <div className="text-2xl font-black text-slate-900">{flight.departureTime}</div>
                          <div className="text-sm text-slate-500 font-bold mt-1">JFK</div>
                        </div>
                        
                        <div className="flex flex-col items-center px-4 flex-1">
                          <span className="text-xs text-slate-400 font-black tracking-widest uppercase mb-2">{flight.duration}</span>
                          <div className="w-full h-px bg-slate-300 relative flex items-center justify-center">
                            <div className="absolute w-2 h-2 rounded-full bg-slate-300 left-0"></div>
                            <Plane className="w-5 h-5 text-blue-600 absolute bg-white px-1 z-10" />
                            <div className="absolute w-2 h-2 rounded-full bg-slate-300 right-0"></div>
                          </div>
                          <span className={`text-xs font-black uppercase mt-2 px-2 py-0.5 rounded-full ${flight.stops === 'Non-stop' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                            {flight.stops}
                          </span>
                        </div>
                        
                        <div className="text-center md:text-left w-24">
                          <div className="text-2xl font-black text-slate-900">{flight.arrivalTime}</div>
                          <div className="text-sm text-slate-500 font-bold mt-1">DEST</div>
                        </div>
                      </div>
                    </div>

                    {/* Dotted Divider */}
                    <div className="hidden md:flex flex-col items-center justify-center relative w-8">
                      <div className="absolute top-0 w-4 h-4 rounded-b-full bg-slate-50 border-b border-l border-r border-slate-200"></div>
                      <div className="w-px h-full border-r-2 border-dashed border-slate-200"></div>
                      <div className="absolute bottom-0 w-4 h-4 rounded-t-full bg-slate-50 border-t border-l border-r border-slate-200"></div>
                    </div>
                    <div className="md:hidden flex items-center justify-center relative h-8 w-full">
                      <div className="absolute left-0 w-4 h-4 rounded-r-full bg-slate-50 border-t border-r border-b border-slate-200"></div>
                      <div className="h-px w-full border-b-2 border-dashed border-slate-200"></div>
                      <div className="absolute right-0 w-4 h-4 rounded-l-full bg-slate-50 border-t border-l border-b border-slate-200"></div>
                    </div>

                    <div className="w-full md:w-64 bg-slate-50/50 p-6 flex flex-row md:flex-col justify-between items-center md:items-end">
                      <div className="flex flex-col gap-1 items-start md:items-end mb-4 md:mb-0">
                        <span className="text-xs font-black uppercase tracking-widest text-slate-400">{flight.class}</span>
                        <div className="text-3xl font-black text-slate-900 tracking-tight">{flight.price}</div>
                        <div className="text-xs font-bold text-slate-500 mt-1 flex items-center gap-1"><span className="text-blue-600 font-black">✓</span> {flight.baggage}</div>
                      </div>
                      <button 
                        onClick={() => handleBook(flight)}
                        className="bg-blue-600 text-white px-8 py-3.5 rounded-2xl font-black text-sm uppercase tracking-wider hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20 active:scale-95 w-full md:w-auto text-center"
                      >
                        Select
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {bookingState.isOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-[200] flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <h3 className="text-xl font-black text-slate-800">
                {bookingState.status === 'success' ? 'Booking Confirmed!' : 'Review Booking'}
              </h3>
              <button onClick={closeBookingModal} className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-500 hover:text-slate-800">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6">
              {bookingState.status === 'success' ? (
                <div className="text-center py-6">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <p className="text-lg font-bold text-slate-800 mb-2">You're all set!</p>
                  <p className="text-slate-500">Your reservation has been confirmed. We've sent the details to your email.</p>
                </div>
              ) : (
                <>
                  <div className="mb-6">
                    <div className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-2">Item Details</div>
                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                      {searchType === 'hotel' ? (
                        <>
                          <div className="font-black text-lg text-slate-800">{bookingState.item.name}</div>
                          <div className="text-slate-600 font-medium">{bookingState.item.amenities}</div>
                          <div className="mt-2 text-blue-600 font-black">{bookingState.item.price}</div>
                        </>
                      ) : (
                        <>
                          <div className="flex items-center gap-2 font-black text-lg text-slate-800 mb-2">
                            <Plane className="w-5 h-5 text-blue-600" /> {bookingState.item.airline}
                          </div>
                          <div className="flex justify-between text-sm font-bold text-slate-600">
                            <span>{bookingState.item.departureTime}</span>
                            <span>{bookingState.item.duration}</span>
                            <span>{bookingState.item.arrivalTime}</span>
                          </div>
                          <div className="mt-4 text-blue-600 font-black text-xl">{bookingState.item.price}</div>
                        </>
                      )}
                    </div>
                  </div>

                  <button 
                    onClick={confirmBooking}
                    disabled={bookingState.status === 'processing'}
                    className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black text-lg hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2"
                  >
                    {bookingState.status === 'processing' ? (
                      <span className="animate-pulse">Processing Payment...</span>
                    ) : (
                      'Confirm & Pay'
                    )}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
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
