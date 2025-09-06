import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Star } from "lucide-react";

function App() {
  const [hotels, setHotels] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [selectedHotelId, setSelectedHotelId] = useState(null);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [userName, setUserName] = useState("");
  const [bookingMessage, setBookingMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expandedHotelId, setExpandedHotelId] = useState(null);

  useEffect(() => {
    fetch("http://localhost:4000/hotels")
      .then((res) => res.json())
      .then(setHotels);

    fetch("http://localhost:4000/restaurants")
      .then((res) => res.json())
      .then(setRestaurants);
  }, []);

  const handleBooking = async () => {
    if (!selectedHotelId || !userName) {
      alert("Please select a hotel and enter your name.");
      return;
    }
    const res = await fetch("http://localhost:4000/book", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ hotel_id: selectedHotelId, user_name: userName }),
    });
    const data = await res.json();
    if (res.ok) {
      setBookingMessage(`✅ Success! Booking ID: ${data.booking.booking_id}`);
      setIsModalOpen(false);
      setUserName("");
      fetch("http://localhost:4000/hotels")
        .then((res) => res.json())
        .then(setHotels);
    } else {
      setBookingMessage(`❌ Error: ${data.error}`);
    }
  };

  const openBookingModal = (hotel) => {
    setSelectedHotelId(hotel.id);
    setSelectedHotel(hotel);
    setIsModalOpen(true);
  };

  const toggleExpandHotel = (hotelId) => {
    setExpandedHotelId(expandedHotelId === hotelId ? null : hotelId);
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <motion.span
          key={i}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: i * 0.1 }}
        >
          <Star
            className={`w-5 h-5 ${
              i <= Math.floor(rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-500"
            }`}
          />
        </motion.span>
      );
    }
    return <div className="flex">{stars}</div>;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white font-sans p-6">
      <motion.h1
        className="text-4xl font-bold text-center mb-10 text-yellow-400"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        Outs & Eats
      </motion.h1>

      {/* Hotels Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">🏨 Hotels</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hotels.map((hotel) => (
            <motion.div
              key={hotel.id}
              whileHover={{ scale: 1.02 }}
              className={`relative overflow-hidden rounded-2xl shadow-lg bg-gray-800 border ${
                hotel.rooms_available === 0
                  ? "border-red-500 opacity-60"
                  : "border-green-500"
              }`}
            >
              {/* Hotel Image */}
              <motion.div className="h-48 overflow-hidden">
                <motion.img
                  src={hotel.image}
                  alt={hotel.name}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                />
              </motion.div>

              {/* Card Header */}
              <div className="p-6 flex justify-between items-center">
                <div>
                  <p className="font-bold text-lg">{hotel.name}</p>
                  <p className="text-gray-400 text-sm">{hotel.location}</p>
                  <p
                    className={`mt-2 ${
                      hotel.rooms_available > 0
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >
                    Rooms Available: {hotel.rooms_available}
                  </p>
                </div>

                {/* Expand Button w/ Chevron */}
                <button
                  onClick={() => toggleExpandHotel(hotel.id)}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-yellow-400 text-black font-semibold hover:bg-yellow-300 transition"
                >
                  {expandedHotelId === hotel.id ? "Hide" : "View"} Details
                  <motion.span
                    animate={{ rotate: expandedHotelId === hotel.id ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="w-5 h-5" />
                  </motion.span>
                </button>
              </div>

              {/* Expandable Details */}
              <AnimatePresence>
                {expandedHotelId === hotel.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="px-6 pb-6"
                  >
                    <div className="mt-2 p-4 rounded-lg bg-gray-700 space-y-3">
                      <p className="text-sm text-gray-300">
                        {hotel.description}
                      </p>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-yellow-400">
                          Rating:
                        </span>
                        {renderStars(hotel.rating)}
                        <span className="text-gray-400 text-sm">
                          {hotel.rating.toFixed(1)}
                        </span>
                      </div>
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        whileHover={{ scale: 1.05 }}
                        disabled={hotel.rooms_available === 0}
                        onClick={() => openBookingModal(hotel)}
                        className={`mt-4 w-full px-4 py-2 rounded-lg font-semibold ${
                          hotel.rooms_available > 0
                            ? "bg-yellow-400 text-black"
                            : "bg-gray-600 text-gray-400 cursor-not-allowed"
                        }`}
                      >
                        {hotel.rooms_available > 0
                          ? "Book This Hotel"
                          : "Unavailable"}
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Restaurants Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">🍽 Restaurants</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {restaurants.map((res) => (
            <motion.div
              key={res.id}
              whileHover={{ scale: 1.02 }}
              className="relative overflow-hidden rounded-2xl shadow-lg bg-gray-800 border border-yellow-500"
            >
              {/* Restaurant Image */}
              <motion.div className="h-40 overflow-hidden">
                <motion.img
                  src={res.image}
                  alt={res.name}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                />
              </motion.div>

              {/* Restaurant Info */}
              <div className="p-6">
                <p className="font-bold text-lg text-yellow-400">{res.name}</p>
                <p className="text-gray-300 mt-2">{res.menu.join(", ")}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Booking Message */}
      {bookingMessage && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-6 text-lg text-center"
        >
          {bookingMessage}
        </motion.p>
      )}

      {/* Booking Modal */}
      <AnimatePresence>
        {isModalOpen && selectedHotel && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-gray-800 rounded-2xl shadow-2xl p-8 w-96"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-2xl font-semibold text-yellow-400 mb-6 text-center">
                Confirm Your Booking
              </h2>
              <p className="text-gray-300 mb-2 text-center font-medium">
                {selectedHotel.name}
              </p>
              <p className="text-gray-400 mb-6 text-center text-sm">
                {selectedHotel.location}
              </p>
              <input
                type="text"
                placeholder="Your Name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="px-4 py-2 rounded-lg w-full bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-yellow-400 mb-6"
              />
              <div className="flex justify-between">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-gray-600 text-white hover:bg-gray-500"
                >
                  Cancel
                </button>
                <button
                  onClick={handleBooking}
                  className="px-4 py-2 rounded-lg bg-yellow-400 text-black font-semibold hover:bg-yellow-300"
                >
                  Confirm
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
