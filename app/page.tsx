"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Plane, Search, CalendarDays, MapPin, Users, Globe, ShieldCheck, Heart, PlaneTakeoff, Clock, ChevronDown, CheckCircle, Percent, ArrowRight, Menu, X } from "lucide-react";

export default function Home() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("flight");
  const [tripType, setTripType] = useState("round");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeField, setActiveField] = useState("");
  const [fromValue, setFromValue] = useState("New York (JFK)");
  const [toValue, setToValue] = useState("");
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);

  useEffect(() => {
    const handleClick = () => setActiveField("");
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  const handleSearch = () => {
    if (activeTab === "flight") {
      router.push(`/search?from=${encodeURIComponent(fromValue)}&to=${encodeURIComponent(toValue || "Anywhere")}`);
    } else {
      router.push(`/search?type=hotel&to=${encodeURIComponent(toValue || "Anywhere")}`);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-blue-600 selection:text-white pb-10">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-[100] transition-all duration-300 ${isMenuOpen ? "bg-white" : "bg-white/80 backdrop-blur-xl border-b border-white/20 shadow-sm"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-2 cursor-pointer group z-50">
              <div className="bg-gradient-to-tr from-blue-600 to-indigo-600 p-2 rounded-xl text-white shadow-lg group-hover:shadow-blue-500/30 transition-all">
                <Plane className="w-6 h-6 transform -rotate-45" />
              </div>
              <span className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-indigo-800 tracking-tight">
                AeroBooking
              </span>
            </div>
            
            <div className="hidden md:flex items-center gap-8">
              <a href="#search" className="text-slate-600 font-bold hover:text-blue-600 transition-colors">Flights</a>
              <a href="#search" className="text-slate-600 font-bold hover:text-blue-600 transition-colors">Hotels</a>
              <a href="#offers" className="text-slate-600 font-bold hover:text-blue-600 transition-colors">Offers</a>
              <a href="#destinations" className="text-slate-600 font-bold hover:text-blue-600 transition-colors">Destinations</a>
            </div>

            <div className="hidden md:flex items-center gap-4">
              <button className="px-5 py-2.5 text-slate-700 font-bold hover:bg-slate-100 rounded-full transition-colors">
                Sign In
              </button>
              <button className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-full hover:shadow-lg hover:shadow-blue-500/40 transition-all active:scale-95">
                Sign Up
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center z-50">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 text-slate-600 hover:text-blue-600 focus:outline-none bg-slate-50 rounded-full cursor-pointer relative z-[101]">
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      <div className={`md:hidden fixed inset-0 bg-white z-[90] transition-opacity duration-300 ease-in-out flex flex-col pt-24 px-6 ${isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`} style={{minHeight: '100vh'}}>
        <div className="flex flex-col gap-6 text-xl font-black text-slate-800">
          <a href="#search" onClick={() => setIsMenuOpen(false)} className="pb-4 border-b border-slate-100 flex justify-between items-center group"><span className="group-hover:text-blue-600 transition-colors">Flights</span> <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-blue-600" /></a>
          <a href="#search" onClick={() => setIsMenuOpen(false)} className="pb-4 border-b border-slate-100 flex justify-between items-center group"><span className="group-hover:text-blue-600 transition-colors">Hotels</span> <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-blue-600" /></a>
          <a href="#offers" onClick={() => setIsMenuOpen(false)} className="pb-4 border-b border-slate-100 flex justify-between items-center group"><span className="group-hover:text-blue-600 transition-colors">Offers</span> <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-blue-600" /></a>
          <a href="#destinations" onClick={() => setIsMenuOpen(false)} className="pb-4 border-b border-slate-100 flex justify-between items-center group"><span className="group-hover:text-blue-600 transition-colors">Destinations</span> <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-blue-600" /></a>
        </div>
        <div className="mt-8 flex flex-col gap-4">
          <button onClick={() => setIsMenuOpen(false)} className="w-full py-4 text-slate-700 font-bold bg-slate-50 rounded-2xl hover:bg-slate-100 transition-colors text-lg">
            Sign In
          </button>
          <button onClick={() => setIsMenuOpen(false)} className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black rounded-2xl shadow-xl shadow-blue-500/30 transition-all active:scale-95 text-lg">
            Sign Up
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <div id="search" className="relative pt-32 pb-32 lg:pt-48 lg:pb-40">
        {/* Background Image & Overlay */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2074&auto=format&fit=crop" 
            alt="Hero Background"
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-slate-900/20 to-slate-50"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 tracking-tight leading-tight drop-shadow-lg">
              Let's explore the <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-indigo-200 drop-shadow-sm">
                beauty of the world
              </span>
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-10 leading-relaxed font-medium drop-shadow-md max-w-2xl mx-auto">
              Discover amazing places at exclusive deals. Book flights to your dream destinations with ease and comfort.
            </p>
          </div>

          {/* Search Widget Component */}
          <div className="max-w-6xl mx-auto px-2 sm:px-0">
            <div className="bg-white/95 backdrop-blur-2xl rounded-[2rem] p-4 md:p-8 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] border border-white/40 relative">
              {/* Tabs */}
              <div className="flex flex-wrap gap-2 mb-6">
                <button 
                  onClick={() => setActiveTab("flight")}
                  className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-bold transition-all duration-300 ${activeTab === "flight" ? "bg-slate-900 text-white shadow-md shadow-slate-900/20 scale-105" : "text-slate-600 hover:bg-slate-100"}`}
                >
                  <PlaneTakeoff className="w-5 h-5" />
                  Flight
                </button>
                <button 
                  onClick={() => setActiveTab("hotel")}
                  className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-bold transition-all duration-300 ${activeTab === "hotel" ? "bg-slate-900 text-white shadow-md shadow-slate-900/20 scale-105" : "text-slate-600 hover:bg-slate-100"}`}
                >
                  <Heart className="w-5 h-5" />
                  Hotel
                </button>
              </div>

              {/* Trip Type */}
              {activeTab === "flight" && (
                <div className="flex gap-6 mb-4 pl-2">
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${tripType === "round" ? "border-blue-600" : "border-slate-300 group-hover:border-blue-400"}`}>
                      {tripType === "round" && <div className="w-2.5 h-2.5 rounded-full bg-blue-600"></div>}
                    </div>
                    <input type="radio" name="trip" className="hidden" checked={tripType === "round"} onChange={() => setTripType("round")} />
                    <span className="text-slate-700 font-bold group-hover:text-blue-600 transition-colors">Round trip</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${tripType === "oneway" ? "border-blue-600" : "border-slate-300 group-hover:border-blue-400"}`}>
                      {tripType === "oneway" && <div className="w-2.5 h-2.5 rounded-full bg-blue-600"></div>}
                    </div>
                    <input type="radio" name="trip" className="hidden" checked={tripType === "oneway"} onChange={() => setTripType("oneway")} />
                    <span className="text-slate-700 font-bold group-hover:text-blue-600 transition-colors">One way</span>
                  </label>
                </div>
              )}

              {/* Search Inputs */}
              <div className="flex flex-col lg:flex-row gap-2 lg:gap-0 lg:border lg:border-slate-200 lg:rounded-full bg-transparent lg:bg-slate-50/50 p-1 relative shadow-sm">
                
                {/* From Component */}
                {activeTab === "flight" && (
                  <>
                    <div 
                      onClick={(e) => { e.stopPropagation(); setActiveField("from"); }}
                      className={`flex-1 group relative p-4 border lg:border-none rounded-2xl lg:rounded-full transition-all cursor-pointer ${activeField === "from" ? "bg-white shadow-[0_10px_40px_-10px_rgba(37,99,235,0.3)] ring-2 ring-blue-600 z-20" : "border-slate-200 hover:bg-white lg:hover:shadow-lg z-10"}`}
                    >
                      <label className={`text-xs font-black uppercase tracking-widest mb-1 block pl-1 transition-colors ${activeField === "from" ? "text-blue-600" : "text-slate-500 group-hover:text-blue-600"}`}>Where from?</label>
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-full lg:hidden transition-colors ${activeField === "from" ? "bg-blue-600 text-white" : "bg-blue-50 text-blue-600"}`}><MapPin className="w-5 h-5" /></div>
                        <div className="w-full">
                          <input 
                            type="text" 
                            value={fromValue}
                            onChange={(e) => setFromValue(e.target.value)}
                            className="text-slate-900 font-black text-lg bg-transparent border-none outline-none w-full p-0 m-0 focus:ring-0 placeholder-slate-900"
                          />
                          <div className="text-slate-500 text-sm font-medium">United States</div>
                        </div>
                      </div>

                      {activeField === "from" && (
                        <div className="absolute top-[110%] left-0 w-full md:w-80 bg-white rounded-3xl shadow-2xl border border-slate-100 p-4 z-50 animate-in fade-in zoom-in-95 duration-200">
                          <div className="text-xs font-bold text-slate-400 mb-3 px-2 uppercase tracking-widest">Popular Searches</div>
                          {['London (LHR)', 'Dubai (DXB)', 'Paris (CDG)', 'Tokyo (HND)'].map(city => (
                            <div 
                              key={city} 
                              onClick={(e) => { e.stopPropagation(); setFromValue(city); setActiveField(""); }}
                              className="px-4 py-3 hover:bg-blue-50 rounded-2xl cursor-pointer text-slate-700 font-bold flex items-center gap-4 transition-colors group/item"
                            >
                              <div className="bg-slate-100 group-hover/item:bg-blue-100 p-2 rounded-full transition-colors"><PlaneTakeoff className="w-4 h-4 text-slate-500 group-hover/item:text-blue-600" /></div>
                              {city}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="hidden lg:block w-px bg-slate-200 my-4 relative z-0"></div>
                  </>
                )}

                {/* To Component */}
                <div 
                  onClick={(e) => { e.stopPropagation(); setActiveField("to"); }}
                  className={`flex-1 group relative p-4 border lg:border-none rounded-2xl lg:rounded-full transition-all cursor-pointer ${activeField === "to" ? "bg-white shadow-[0_10px_40px_-10px_rgba(99,102,241,0.3)] ring-2 ring-indigo-600 z-20" : "border-slate-200 hover:bg-white lg:hover:shadow-lg z-10"}`}
                >
                  <label className={`text-xs font-black uppercase tracking-widest mb-1 block pl-1 transition-colors ${activeField === "to" ? "text-indigo-600" : "text-slate-500 group-hover:text-indigo-600"}`}>Where to?</label>
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full lg:hidden transition-colors ${activeField === "to" ? "bg-indigo-600 text-white" : "bg-indigo-50 text-indigo-600"}`}><MapPin className="w-5 h-5" /></div>
                    <div className="w-full">
                      <input 
                        type="text" 
                        placeholder="Search destination" 
                        value={toValue}
                        onChange={(e) => setToValue(e.target.value)}
                        className="text-slate-900 font-black text-lg bg-transparent border-none outline-none w-full p-0 m-0 focus:ring-0 placeholder-slate-400"
                      />
                      <div className="text-slate-500 text-sm font-medium">Anywhere</div>
                    </div>
                  </div>

                  {activeField === "to" && (
                    <div className="absolute top-[110%] left-0 w-full md:w-80 bg-white rounded-3xl shadow-2xl border border-slate-100 p-4 z-50 animate-in fade-in zoom-in-95 duration-200">
                      <div className="text-xs font-bold text-slate-400 mb-3 px-2 uppercase tracking-widest">Trending</div>
                      {['Maldives (MLE)', 'Bali (DPS)', 'Santorini (JTR)'].map(city => (
                        <div 
                          key={city} 
                          onClick={(e) => { e.stopPropagation(); setToValue(city); setActiveField(""); }}
                          className="px-4 py-3 hover:bg-indigo-50 rounded-2xl cursor-pointer text-slate-700 font-bold flex items-center gap-4 transition-colors group/item"
                        >
                          <div className="bg-slate-100 group-hover/item:bg-indigo-100 p-2 rounded-full transition-colors"><MapPin className="w-4 h-4 text-slate-500 group-hover/item:text-indigo-600" /></div>
                          {city}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="hidden lg:block w-px bg-slate-200 my-4 relative z-0"></div>

                {/* Date Component */}
                <div 
                  onClick={(e) => { e.stopPropagation(); setActiveField("dates"); }}
                  className={`flex-1 group relative p-4 border lg:border-none rounded-2xl lg:rounded-full transition-all cursor-pointer ${activeField === "dates" ? "bg-white shadow-[0_10px_40px_-10px_rgba(168,85,247,0.3)] ring-2 ring-purple-600 z-20" : "border-slate-200 hover:bg-white lg:hover:shadow-lg z-10"}`}
                >
                  <label className={`text-xs font-black uppercase tracking-widest mb-1 block pl-1 transition-colors ${activeField === "dates" ? "text-purple-600" : "text-slate-500 group-hover:text-purple-600"}`}>Dates</label>
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full lg:hidden transition-colors ${activeField === "dates" ? "bg-purple-600 text-white" : "bg-purple-50 text-purple-600"}`}><CalendarDays className="w-5 h-5" /></div>
                    <div>
                      <div className="text-slate-900 font-black text-lg p-0 m-0 leading-tight">Oct 15 - Oct 22</div>
                      <div className="text-slate-500 text-sm font-medium mt-1">Round trip</div>
                    </div>
                  </div>

                  {activeField === "dates" && (
                    <div className="absolute top-[110%] left-1/2 -translate-x-1/2 md:translate-x-0 md:left-0 w-[90vw] md:w-96 bg-white rounded-3xl shadow-2xl border border-slate-100 p-6 z-50 animate-in fade-in zoom-in-95 duration-200 text-center">
                      <CalendarDays className="w-12 h-12 text-purple-100 mx-auto mb-3" />
                      <div className="text-slate-800 font-bold mb-1">Select your dates</div>
                      <div className="text-slate-500 text-sm mb-4">Interactive calendar simulation</div>
                      <button onClick={(e) => { e.stopPropagation(); setActiveField(""); }} className="bg-purple-50 text-purple-600 font-bold w-full py-3 rounded-xl hover:bg-purple-100 transition-colors">Confirm Dates</button>
                    </div>
                  )}
                </div>

                <div className="hidden lg:block w-px bg-slate-200 my-4 relative z-0"></div>

                {/* Passenger Component */}
                <div 
                  onClick={(e) => { e.stopPropagation(); setActiveField("who"); }}
                  className={`flex-1 group relative p-4 border lg:border-none rounded-2xl lg:rounded-full transition-all cursor-pointer lg:pr-36 ${activeField === "who" ? "bg-white shadow-[0_10px_40px_-10px_rgba(20,184,166,0.3)] ring-2 ring-teal-600 z-20" : "border-slate-200 hover:bg-white lg:hover:shadow-lg z-10"}`}
                >
                  <label className={`text-xs font-black uppercase tracking-widest mb-1 block pl-1 transition-colors ${activeField === "who" ? "text-teal-600" : "text-slate-500 group-hover:text-teal-600"}`}>Who</label>
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full lg:hidden transition-colors ${activeField === "who" ? "bg-teal-600 text-white" : "bg-teal-50 text-teal-600"}`}><Users className="w-5 h-5" /></div>
                    <div>
                      <div className="text-slate-900 font-black text-lg p-0 m-0 leading-tight">{adults + children} Passenger{adults + children !== 1 ? 's' : ''}</div>
                      <div className="text-slate-500 text-sm font-medium mt-1">Economy</div>
                    </div>
                  </div>

                  {activeField === "who" && (
                    <div className="absolute top-[110%] right-0 w-full md:w-80 bg-white rounded-3xl shadow-2xl border border-slate-100 p-6 z-50 animate-in fade-in zoom-in-95 duration-200" onClick={(e) => e.stopPropagation()}>
                      <div className="flex justify-between items-center mb-6">
                        <div>
                          <div className="font-bold text-slate-800">Adults</div>
                          <div className="text-sm text-slate-500">Age 13+</div>
                        </div>
                        <div className="flex items-center gap-4">
                          <button onClick={(e) => { e.stopPropagation(); setAdults(Math.max(1, adults - 1)); }} className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:border-slate-400 hover:text-slate-600 transition-colors">-</button>
                          <span className="font-bold text-lg w-4 text-center">{adults}</span>
                          <button onClick={(e) => { e.stopPropagation(); setAdults(adults + 1); }} className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:border-slate-400 hover:text-slate-600 transition-colors">+</button>
                        </div>
                      </div>
                      <div className="flex justify-between items-center mb-6">
                        <div>
                          <div className="font-bold text-slate-800">Children</div>
                          <div className="text-sm text-slate-500">Age 2-12</div>
                        </div>
                        <div className="flex items-center gap-4">
                          <button onClick={(e) => { e.stopPropagation(); setChildren(Math.max(0, children - 1)); }} className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:border-slate-400 hover:text-slate-600 transition-colors">-</button>
                          <span className="font-bold text-lg w-4 text-center">{children}</span>
                          <button onClick={(e) => { e.stopPropagation(); setChildren(children + 1); }} className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:border-slate-400 hover:text-slate-600 transition-colors">+</button>
                        </div>
                      </div>
                      <button onClick={(e) => { e.stopPropagation(); setActiveField(""); }} className="bg-teal-600 text-white font-bold w-full py-3 rounded-xl hover:bg-teal-700 transition-colors shadow-lg shadow-teal-600/20 mt-2">Apply</button>
                    </div>
                  )}
                </div>

                {/* Submit Button */}
                <div className="mt-4 lg:mt-0 lg:absolute lg:right-3 lg:top-1/2 lg:-translate-y-1/2 flex h-full items-center z-30 pointer-events-none">
                  <button onClick={handleSearch} className="pointer-events-auto w-full lg:w-auto flex items-center justify-center gap-2 bg-slate-900 text-white lg:p-5 px-8 py-4 rounded-full font-bold text-lg shadow-[0_10px_20px_rgba(0,0,0,0.2)] hover:bg-blue-600 hover:shadow-blue-500/40 transition-all hover:scale-105 active:scale-95 group">
                    <Search className="w-6 h-6 group-hover:animate-pulse" />
                    <span className="lg:hidden tracking-wide text-center w-full">{activeTab === "flight" ? "Search Flights" : "Search Hotels"}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Special Offers Section */}
      <section id="offers" className="py-16 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                <Percent className="w-6 h-6 text-blue-600" />
                Exclusive Offers
              </h2>
              <p className="text-slate-500">Grab the best deals before they're gone</p>
            </div>
            <button className="hidden md:flex text-blue-600 font-semibold hover:text-blue-700 items-center gap-2 group text-sm">
              View all offers
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          
          <div className="flex overflow-x-auto pb-8 pt-4 md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] -mx-4 px-4 sm:mx-0 sm:px-0">
            <div onClick={() => router.push('/search')} className="min-w-[85vw] sm:min-w-[320px] md:min-w-0 snap-center bg-gradient-to-br from-indigo-50 to-blue-50 rounded-[2rem] p-8 border border-blue-100 relative overflow-hidden group hover:shadow-2xl hover:shadow-blue-100 transition-all cursor-pointer">
              <div className="absolute -right-6 -top-6 w-32 h-32 bg-blue-600 rounded-full opacity-[0.05] group-hover:scale-150 transition-transform duration-700 ease-out"></div>
              <div className="flex justify-between items-start mb-6 relative">
                <span className="bg-blue-600 text-white text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-sm">Flight Deal</span>
                <span className="text-3xl font-black text-blue-700 tracking-tight">20% OFF</span>
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-3 relative tracking-tight">International Flights</h3>
              <p className="text-slate-600 text-base mb-8 relative font-medium leading-relaxed">Book flights to Europe and Asia and get up to 20% discount on round trips.</p>
              <div className="text-base font-black text-blue-600 flex items-center gap-2 relative group-hover:text-blue-800 transition-colors">
                Book Now <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            <div onClick={() => router.push('/search?type=hotel')} className="min-w-[85vw] sm:min-w-[320px] md:min-w-0 snap-center bg-gradient-to-br from-purple-50 to-pink-50 rounded-[2rem] p-8 border border-purple-100 relative overflow-hidden group hover:shadow-2xl hover:shadow-purple-100 transition-all cursor-pointer">
              <div className="absolute -right-6 -top-6 w-32 h-32 bg-purple-600 rounded-full opacity-[0.05] group-hover:scale-150 transition-transform duration-700 ease-out"></div>
              <div className="flex justify-between items-start mb-6 relative">
                <span className="bg-purple-600 text-white text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-sm">Hotel Offer</span>
                <span className="text-3xl font-black text-purple-700 tracking-tight">Save $50</span>
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-3 relative tracking-tight">Luxury Stays</h3>
              <p className="text-slate-600 text-base mb-8 relative font-medium leading-relaxed">Get an instant $50 discount on premium hotel bookings worldwide.</p>
              <div className="text-base font-black text-purple-600 flex items-center gap-2 relative group-hover:text-purple-800 transition-colors">
                Claim Offer <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            <div onClick={() => router.push('/search')} className="min-w-[85vw] sm:min-w-[320px] md:min-w-0 snap-center bg-gradient-to-br from-orange-50 to-amber-50 rounded-[2rem] p-8 border border-orange-100 relative overflow-hidden group hover:shadow-2xl hover:shadow-orange-100 transition-all cursor-pointer">
              <div className="absolute -right-6 -top-6 w-32 h-32 bg-orange-600 rounded-full opacity-[0.05] group-hover:scale-150 transition-transform duration-700 ease-out"></div>
              <div className="flex justify-between items-start mb-6 relative">
                <span className="bg-orange-600 text-white text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-sm">Bundle</span>
                <span className="text-3xl font-black text-orange-700 tracking-tight">Free Night</span>
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-3 relative tracking-tight">Flight + Hotel</h3>
              <p className="text-slate-600 text-base mb-8 relative font-medium leading-relaxed">Book your flight & hotel together and enjoy a complimentary night stay.</p>
              <div className="text-base font-black text-orange-600 flex items-center gap-2 relative group-hover:text-orange-800 transition-colors">
                Explore Bundles <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Destinations */}
      <section id="destinations" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Popular Destinations</h2>
              <p className="text-slate-500 text-lg">Unleash your wanderlust with our top picks</p>
            </div>
            <button className="mt-4 md:mt-0 text-blue-600 font-semibold hover:text-blue-700 flex items-center gap-2 group">
              See all destinations
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </div>

          <div className="flex overflow-x-auto pb-10 pt-4 md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] -mx-4 px-4 sm:mx-0 sm:px-0">
            {[
              { name: "Paris", country: "France", image: "/paris.png", price: "$450" },
              { name: "Tokyo", country: "Japan", image: "/tokyo.png", price: "$750" },
              { name: "New York", country: "United States", image: "/nyc.png", price: "$320" },
              { name: "Male", country: "Maldives", image: "/maldives.png", price: "$890" }
            ].map((dest, i) => (
              <div 
                key={i} 
                onClick={() => router.push(`/search?from=${encodeURIComponent(fromValue)}&to=${encodeURIComponent(dest.name)}`)}
                className="min-w-[75vw] sm:min-w-[280px] md:min-w-0 snap-center group rounded-[2rem] overflow-hidden cursor-pointer relative shadow-md hover:shadow-2xl transition-all duration-500"
              >
                <div className="relative h-96 w-full">
                  <Image 
                    src={dest.image}
                    alt={dest.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
                  
                  <div className="absolute top-4 right-4 bg-black/30 backdrop-blur-md px-4 py-1.5 rounded-full text-white text-sm font-black border border-white/20 shadow-sm">
                    From {dest.price}
                  </div>
                  
                  <div className="absolute bottom-6 left-6 right-6">
                    <h3 className="text-3xl font-black text-white mb-2 tracking-tight">{dest.name}</h3>
                    <div className="flex items-center gap-2 text-white/90">
                      <MapPin className="w-4 h-4 text-blue-400" />
                      <span className="text-sm font-bold tracking-wide">{dest.country}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Why Book With Us?</h2>
            <p className="text-slate-500 text-lg">We provide the best experience for our customers, with competitive prices and amazing customer support.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 text-blue-600">
                <Globe className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Worldwide Coverage</h3>
              <p className="text-slate-500 leading-relaxed">Access hundreds of airlines and destinations globally. Wherever you want to go, we can take you there.</p>
            </div>
            
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center mb-6 text-indigo-600">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Secure Booking</h3>
              <p className="text-slate-500 leading-relaxed">Your payment and personal details are protected by industry-leading security and encryption protocols.</p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-purple-50 rounded-2xl flex items-center justify-center mb-6 text-purple-600">
                <Clock className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">24/7 Support</h3>
              <p className="text-slate-500 leading-relaxed">Our friendly customer support team is available around the clock to help you with any questions or issues.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-16 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-2 mb-6">
                <div className="bg-blue-600 p-2 rounded-xl text-white">
                  <Plane className="w-6 h-6 transform -rotate-45" />
                </div>
                <span className="text-2xl font-black text-white tracking-tight">AeroBooking</span>
              </div>
              <p className="text-slate-400 leading-relaxed mb-6">
                Making travel easier, more affordable, and purely wonderful. Your journey begins here.
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Company</h4>
              <ul className="space-y-4">
                <li><a href="#" className="hover:text-blue-400 transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Press & Media</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Contact</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Resources</h4>
              <ul className="space-y-4">
                <li><a href="#" className="hover:text-blue-400 transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Cancellation Options</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Travel Guides</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Newsletter</h4>
              <p className="text-slate-400 mb-4">Subscribe for travel deals and exclusive offers.</p>
              <div className="flex gap-2">
                <input type="email" placeholder="Email address" className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 w-full focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-white" />
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
          
          <div className="border-t border-slate-800 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-500 text-sm">© 2026 AeroBooking by Raj Patel. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="text-slate-500 hover:text-white transition-colors">Twitter</a>
              <a href="#" className="text-slate-500 hover:text-white transition-colors">Facebook</a>
              <a href="#" className="text-slate-500 hover:text-white transition-colors">Instagram</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
