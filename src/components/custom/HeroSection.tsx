import { useEffect, useState } from 'react';
import { format, parseISO } from "date-fns";
import { useNavigate, useLocation } from 'react-router-dom';
import {
  MapPin,
  Calendar as CalendarIcon,
  User,
  Search,
  ChevronRight,
  Plus,
  Minus,
  PlaneTakeoff,
  PlaneLanding
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import HeroBg from '@/assets/12.jpg';

export function HeroSection() {
  const navigate = useNavigate();
  const location = useLocation();
  const [lastSearch, setLastSearch] = useState<string | null>(null);

  // --- State Variables ---
  const [destination, setDestination] = useState('');
  const [checkInDate, setCheckInDate] = useState<Date | undefined>();
  const [checkOutDate, setCheckOutDate] = useState<Date | undefined>();
  const [rooms, setRooms] = useState(1);
  
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);

  const guests = adults + children;

  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [departDate, setDepartDate] = useState<Date | undefined>();
  const [returnDate, setReturnDate] = useState<Date | undefined>();
  const [passengers, setPassengers] = useState(1);

  // --- Packages specific ---
  const [pkgDestination, setPkgDestination] = useState('');
  const [pkgStartDate, setPkgStartDate] = useState<Date | undefined>();
  const [pkgNights, setPkgNights] = useState(3);
  const [pkgTravelers, setPkgTravelers] = useState(2);

  // --- Load from localStorage ---
  useEffect(() => {
    const savedSearch = localStorage.getItem('tripco-last-search');
    if (savedSearch) setLastSearch(savedSearch);
  }, []);

  // --- Load from Modify Search query ---
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const destinationParam = params.get('destination');
    const roomsParam = params.get('rooms');
    const guestsParam = params.get('guests');
    const checkInParam = params.get('checkIn');
    const checkOutParam = params.get('checkOut');

    if (destinationParam) setDestination(destinationParam);
    if (roomsParam) setRooms(Number(roomsParam));
     if (guestsParam) {
      const totalGuests = Number(guestsParam);
      setAdults(Math.max(1, totalGuests - children));
    }
    if (checkInParam) setCheckInDate(parseISO(checkInParam));
    if (checkOutParam) setCheckOutDate(parseISO(checkOutParam));
  }, [location.search]);

  // --- Handle Search ---
  const handleHostelrySearch = () => {
  if (!destination) {
    alert('Please enter a destination.');
    return;
  }
  if (!checkInDate) {
    alert('Please select a check-in date.');
    return;
  }
  if (!checkOutDate) {
    alert('Please select a check-out date.');
    return;
  }

  localStorage.setItem('tripco-last-search', destination);
  setLastSearch(destination);

  const query = new URLSearchParams({
    destination,
    rooms: rooms.toString(),
    guests: guests.toString(),
    checkIn: checkInDate.toISOString(),
    checkOut: checkOutDate.toISOString(),
  }).toString();

  navigate(`/hostelry-results?${query}`);
};


  const handleFlightSearch = () => {
    if (!from || !to) {
      alert('Please enter both origin and destination.');
      return;
    }
    const flightSearchText = `${from} to ${to}`;
    localStorage.setItem('tripco-last-search', flightSearchText);
    setLastSearch(flightSearchText);
    let query = `?from=${from}&to=${to}&passengers=${passengers}`;
    if (departDate) query += `&depart=${departDate.toISOString()}`;
    if (returnDate) query += `&return=${returnDate.toISOString()}`;
    navigate(`/flight-results${query}`);
  };

  // --- Package search handler ---
  const handlePackageSearch = () => {
    if (!pkgDestination) {
      alert('Please enter a destination for packages.');
      return;
    }
    const pkgSearchText = `${pkgDestination} • ${pkgNights} nights • ${pkgTravelers} traveler(s)`;
    localStorage.setItem('tripco-last-search', pkgSearchText);
    setLastSearch(pkgSearchText);

    const queryParams = new URLSearchParams({
      destination: pkgDestination,
      nights: pkgNights.toString(),
      travelers: pkgTravelers.toString(),
      start: pkgStartDate ? pkgStartDate.toISOString() : ''
    }).toString();

    navigate(`/package-results?${queryParams}`);
  };

// Flights

// Flights

const [tripType, setTripType] = useState<'oneway' | 'roundtrip'>('oneway');
const [flightAdults, setFlightAdults] = useState(1);
const [flightChildren, setFlightChildren] = useState(0);
const flightPassengers = flightAdults + flightChildren;




  return (
    <section
      className="relative h-screen flex flex-col items-center justify-center text-center text-white bg-cover bg-center"
      style={{ backgroundImage: `url(${HeroBg})` }}
    >
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-40" />
      <div className="relative z-10 max-w-5xl w-full px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
          Explore the whole world and enjoy its beauty
        </h1>
        <p className="text-md md:text-lg mb-8 text-white" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>
          Find and write about your experiences around the world.
        </p>

        <Card className="bg-white/90 backdrop-blur-sm text-black w-full">
          <CardContent className="p-4">
            <Tabs defaultValue="hostelry" className="w-full">
              <div className="flex justify-between items-center mb-4">
                <TabsList className="grid grid-cols-5 w-fit">
                  <TabsTrigger value="hostelry">Hostelry</TabsTrigger>
                  <TabsTrigger value="flights">Flights</TabsTrigger>
                  <TabsTrigger value="bus-shuttle">Bus & Shuttle</TabsTrigger>
                  <TabsTrigger value="cars">Cars</TabsTrigger>
                  <TabsTrigger value="packages">Packages</TabsTrigger>
                </TabsList>
                {lastSearch && (
                  <div className="flex items-center text-sm text-gray-600 cursor-pointer">
                    Last Searching: <span className="font-semibold ml-1">{lastSearch}</span>
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </div>
                )}
              </div>

              {/* --- HOSTELRY TAB --- */}
              <TabsContent value="hostelry">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
                  {/* Destination */}
                  <div className="flex flex-col gap-2 text-left">
                    <Label htmlFor="destination">Destination</Label>
                    <div className="relative w-full">
                     <MapPin className="absolute left-2.5 top-1/2 -translate-y-1/2 text-blue-500" size={16} />
                     <Input
                     id="destination"
                     placeholder="e.g., Bali"
                     className="pl-7 h-10"
                     value={destination}
                     onChange={(e) => setDestination(e.target.value)}
/>
                    </div>
                  </div>

                  {/* Check-in */}
                  <div className="flex flex-col gap-2 text-left">
                    <Label>Check-in</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                     <Button
  variant="outline"
  className={cn(
    "w-full justify-start text-left font-normal h-10 px-2", // reduce padding
    !checkInDate && "text-muted-foreground"
  )}
>
  <span className="flex items-center gap-1"> 
    {/* gap-1 is smaller than mr-1, and flex keeps alignment tight */}
    <CalendarIcon className="h-4 w-4 text-blue-500" />
    {checkInDate ? format(checkInDate, "dd MMM yyyy") : <span>Select Date</span>}
  </span>
</Button>

                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 bg-slate-900 text-white border-slate-700">
                        <Calendar mode="single" selected={checkInDate} onSelect={setCheckInDate} initialFocus />
                      </PopoverContent>
                    </Popover>
                  </div>

                  {/* Check-out */}
                  <div className="flex flex-col gap-2 text-left">
                    <Label>Check-out</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                       <Button
  variant="outline"
  className={cn(
    "w-full justify-start text-left font-normal h-10 px-2",
    !checkOutDate && "text-muted-foreground"
  )}
>
  <span className="flex items-center gap-[2px]">
    <CalendarIcon className="h-4 w-4 text-blue-500" />
    {checkOutDate ? format(checkOutDate, "dd MMM yyyy") : <span>Select Date</span>}
  </span>
</Button>

                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 bg-slate-900 text-white border-slate-700">
                        <Calendar mode="single" selected={checkOutDate} onSelect={setCheckOutDate} initialFocus />
                      </PopoverContent>
                    </Popover>
                  </div>

                  {/* Room & Guest */}
                  <div className="flex flex-col gap-2 text-left">
  <Label>Room & Guest</Label>
  <Popover>
    <PopoverTrigger asChild>
      <Button
        variant="outline"
        className="w-full justify-start font-normal h-10 px-2"
      >
        <span className="flex items-center gap-[2px]">
          <User className="h-4 w-4 text-blue-500" />
          <span>{`${rooms} Room, ${guests} Guest${guests > 1 ? 's' : ''}`}</span>
        </span>
      </Button>
    </PopoverTrigger>
    <PopoverContent className="w-72 p-4 bg-slate-900 text-white border-slate-700">
      <div className="space-y-4">
                          {/* Rooms */}
                          <div className="flex items-center justify-between">
                            <Label className='text-white'>Rooms</Label>
                            <div className="flex items-center gap-2">
                              <Button variant="outline" size="icon" className="h-7 w-7 bg-slate-800 border-slate-600 hover:bg-slate-700" onClick={() => setRooms(Math.max(1, rooms - 1))}><Minus className="h-3 w-3" /></Button>
                              <span className="font-bold w-4 text-center">{rooms}</span>
                              <Button variant="outline" size="icon" className="h-7 w-7 bg-slate-800 border-slate-600 hover:bg-slate-700" onClick={() => setRooms(rooms + 1)}><Plus className="h-3 w-3" /></Button>
                            </div>
                          </div>
                          <Separator className="bg-slate-700" />

                          {/* Adults */}
                          <div className="flex items-center justify-between">
                            <Label className='text-white'>Adults</Label>
                            <div className="flex items-center gap-2">
                              <Button variant="outline" size="icon" className="h-7 w-7 bg-slate-800 border-slate-600 hover:bg-slate-700" onClick={() => setAdults(Math.max(1, adults - 1))}><Minus className="h-3 w-3" /></Button>
                              <span className="font-bold w-4 text-center">{adults}</span>
                              <Button variant="outline" size="icon" className="h-7 w-7 bg-slate-800 border-slate-600 hover:bg-slate-700" onClick={() => setAdults(adults + 1)}><Plus className="h-3 w-3" /></Button>
                            </div>
                          </div>
                          <Separator className="bg-slate-700" />

                          {/* Children */}
                          <div className="flex items-center justify-between">
                            <Label className='text-white'>Children</Label>
                            <div className="flex items-center gap-2">
                              <Button variant="outline" size="icon" className="h-7 w-7 bg-slate-800 border-slate-600 hover:bg-slate-700" onClick={() => setChildren(Math.max(0, children - 1))}><Minus className="h-3 w-3" /></Button>
                              <span className="font-bold w-4 text-center">{children}</span>
                              <Button variant="outline" size="icon" className="h-7 w-7 bg-slate-800 border-slate-600 hover:bg-slate-700" onClick={() => setChildren(children + 1)}><Plus className="h-3 w-3" /></Button>
                            </div>
                          </div>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>

                  <Button onClick={handleHostelrySearch} className="w-full h-10 bg-blue-500 hover:bg-blue-600 text-white">
                    <Search className="mr-1 h-4 w-4" /> Search
                  </Button>
                </div>
              </TabsContent>

              {/* --- FLIGHTS TAB --- */}
            <TabsContent value="flights">
  <div className="flex flex-wrap md:flex-nowrap gap-3 w-full items-end">

    {/* From */}
    <div className="flex-1 flex flex-col gap-1">
      <Label className="text-sm">From</Label>
      <div className="relative">
        <PlaneTakeoff className="absolute left-2.5 top-1/2 -translate-y-1/2 text-blue-500" size={16} />
        <Input
          placeholder="From"
          className="pl-7 h-10"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
        />
      </div>
    </div>

    {/* To */}
   <div className="flex-1 flex flex-col gap-1">
  <Label className="text-sm">To</Label>
  <div className="relative">
    <PlaneLanding className="absolute right-2.5 top-1/2 -translate-y-1/2 text-blue-500" size={16} />
    <Input
      placeholder="To"
      className="pr-7 h-10 text-right placeholder:text-right" // 👈 both text and placeholder align right
      value={to}
      onChange={(e) => setTo(e.target.value)}
    />
  </div>
</div>

    {/* Trip Type */}
    <div className="flex flex-col gap-1">
      <Label className="text-sm">Trip Type</Label>
      <div className="flex border rounded-md overflow-hidden">
        <button
          type="button"
          className={`flex-1 h-10 text-sm font-medium text-gray-700 ${
            tripType === 'oneway' ? 'border-black border' : 'border-r border-gray-300'
          }`}
          onClick={() => setTripType('oneway')}
        >
          One-way
        </button>
        <button
          type="button"
          className={`flex-1 h-10 text-sm font-medium text-gray-700 ${
            tripType === 'roundtrip' ? 'border-black border' : ''
          }`}
          onClick={() => setTripType('roundtrip')}
        >
          Round-trip
        </button>
      </div>
    </div>

    {/* Depart */}
   <div className="flex-1 flex flex-col gap-1">
  <Label className="text-sm">Depart</Label>
  <Popover>
    <PopoverTrigger asChild>
      <Button
        variant="outline"
        className={cn(
          "justify-start text-left font-normal h-10 px-2",
          !departDate && "text-muted-foreground"
        )}
      >
        <span className="flex items-center gap-[2px]">
          <CalendarIcon className="h-4 w-4 text-blue-500" />
          {departDate ? (
            format(departDate, "dd MMM yyyy")
          ) : (
            <span>Depart</span>
          )}
        </span>
      </Button>
    </PopoverTrigger>
    <PopoverContent className="w-auto p-0 bg-slate-900 text-white border-slate-700">
      <Calendar mode="single" selected={departDate} onSelect={setDepartDate} initialFocus />
    </PopoverContent>
  </Popover>
</div>

    {/* Return - only for roundtrip */}
   {tripType === "roundtrip" && (
  <div className="flex-1 flex flex-col gap-1">
    <Label className="text-sm">Return</Label>
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "justify-start text-left font-normal h-10 px-2",
            !returnDate && "text-muted-foreground"
          )}
        >
          <span className="flex items-center gap-[2px]">
            <CalendarIcon className="h-4 w-4 text-blue-500" />
            {returnDate ? (
              format(returnDate, "dd MMM yyyy")
            ) : (
              <span>Return</span>
            )}
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 bg-slate-900 text-white border-slate-700">
        <Calendar mode="single" selected={returnDate} onSelect={setReturnDate} initialFocus />
      </PopoverContent>
    </Popover>
  </div>
)}

    {/* Passengers */}
   <div className="flex-1 flex flex-col gap-1">
  <Label className="text-sm">Passengers</Label>
  <Popover>
    <PopoverTrigger asChild>
      <Button
        variant="outline"
        className="w-full justify-start font-normal h-10 px-2"
      >
        <span className="flex items-center gap-[2px]">
          <User className="h-4 w-4 text-blue-500" />
          <span>{`${flightAdults + flightChildren} Passenger${
            flightAdults + flightChildren > 1 ? "s" : ""
          }`}</span>
        </span>
      </Button>
    </PopoverTrigger>
    <PopoverContent className="w-72 p-4 bg-slate-900 text-white border-slate-700">
      <div className="space-y-4">
            {/* Adults */}
            <div className="flex items-center justify-between">
              <Label className='text-white'>Adults</Label>
              <div className="flex items-center gap-2">
                <Button onClick={() => setFlightAdults(Math.max(1, flightAdults - 1))} variant="outline" size="icon" className="h-7 w-7 bg-slate-800 border-slate-600 hover:bg-slate-700">
                  <Minus className="h-3 w-3" />
                </Button>
                <span className="font-bold w-4 text-center">{flightAdults}</span>
                <Button onClick={() => setFlightAdults(flightAdults + 1)} variant="outline" size="icon" className="h-7 w-7 bg-slate-800 border-slate-600 hover:bg-slate-700">
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
            </div>
            <Separator className="bg-slate-700" />
            {/* Children */}
            <div className="flex items-center justify-between">
              <Label className='text-white'>Children</Label>
              <div className="flex items-center gap-2">
                <Button onClick={() => setFlightChildren(Math.max(0, flightChildren - 1))} variant="outline" size="icon" className="h-7 w-7 bg-slate-800 border-slate-600 hover:bg-slate-700">
                  <Minus className="h-3 w-3" />
                </Button>
                <span className="font-bold w-4 text-center">{flightChildren}</span>
                <Button onClick={() => setFlightChildren(flightChildren + 1)} variant="outline" size="icon" className="h-7 w-7 bg-slate-800 border-slate-600 hover:bg-slate-700">
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>

    {/* Search Button */}
    <div className="flex-none w-full md:w-auto mt-2 md:mt-0">
      <Button
        onClick={() => {
          if (!from || !to) return alert('Please enter origin and destination');
          if (!departDate) return alert('Please select a departure date');
          if (tripType === 'roundtrip' && !returnDate) return alert('Please select a return date');
          handleFlightSearch();
        }}
        className="w-full md:w-auto h-10 bg-blue-500 hover:bg-blue-600 text-white font-semibold"
      >
        <Search className="h-4 w-4 mr-1" /> Search
      </Button>
    </div>

  </div>
</TabsContent>




              {/* --- PACKAGES TAB --- */}
            <TabsContent value="packages">
  <div className="grid grid-cols-1 md:grid-cols-5 gap-3 items-end"> {/* ↓ reduced from gap-4 to gap-3 */}
    
    {/* Destination */}
    <div className="flex flex-col gap-1 text-left md:col-span-2"> {/* ↓ reduced from gap-2 to gap-1 */}
      <Label htmlFor="pkgDestination" className="text-sm">Package Destination</Label>
      <div className="relative w-full">
        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-500" size={18} />
        <Input
          id="pkgDestination"
          placeholder="e.g., Amalfi Coast"
          className="pl-9 h-10"
          value={pkgDestination}
          onChange={(e) => setPkgDestination(e.target.value)}
        />
      </div>
    </div>

                  <div className="flex flex-col gap-2 text-left">
  <Label>Start Date</Label>
  <Popover>
    <PopoverTrigger asChild>
      <Button
        variant={"outline"}
        className={cn(
          "w-full justify-start text-left font-normal h-10 px-2",
          !pkgStartDate && "text-muted-foreground"
        )}
      >
        <span className="flex items-center gap-[2px]">
          <CalendarIcon className="h-4 w-4 text-blue-500" />
          {pkgStartDate ? (
            format(pkgStartDate, "dd MMM yyyy")
          ) : (
            <span>Select Date</span>
          )}
        </span>
      </Button>
    </PopoverTrigger>
    <PopoverContent className="w-auto p-0 bg-slate-900 text-white border-slate-700">
      <Calendar
        mode="single"
        selected={pkgStartDate}
        onSelect={setPkgStartDate}
        initialFocus
      />
    </PopoverContent>
  </Popover>
</div>


                  <div className="flex flex-col gap-2 text-left">
                    <Label>Nights</Label>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => setPkgNights(Math.max(1, pkgNights - 1))}><Minus className="h-4 w-4" /></Button>
                      <span className="font-bold">{pkgNights}</span>
                      <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => setPkgNights(pkgNights + 1)}><Plus className="h-4 w-4" /></Button>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 text-left">
                    <Label>Travelers</Label>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => setPkgTravelers(Math.max(1, pkgTravelers - 1))}><Minus className="h-4 w-4" /></Button>
                      <span className="font-bold">{pkgTravelers}</span>
                      <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => setPkgTravelers(pkgTravelers + 1)}><Plus className="h-4 w-4" /></Button>
                    </div>
                  </div>

                  <div className="md:col-span-5">
                    <Button onClick={handlePackageSearch} className="w-full h-10 bg-blue-500 hover:bg-blue-600 text-white">
                      <Search className="mr-2 h-4 w-4" /> Search Packages
                    </Button>
                  </div>
                </div>
              </TabsContent>

            </Tabs>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
