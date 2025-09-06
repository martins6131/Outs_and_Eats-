const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

// Sample data
let hotels = [
  { 
    id: 1, 
    name: "Outs Hotel", 
    location: "City Center", 
    rooms_available: 5,
    description: "A modern hotel located at the heart of the city with luxury suites.",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1551884834-3db645fd29b4?w=800&q=80"
  },
  { 
    id: 2, 
    name: "Eats Hotel", 
    location: "Downtown", 
    rooms_available: 3,
    description: "Cozy and budget-friendly stay near local eateries.",
    rating: 3.8,
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80"
  },
  { 
    id: 3, 
    name: "Skyline Suites", 
    location: "Uptown", 
    rooms_available: 7,
    description: "Luxury suites with panoramic city views and rooftop lounge.",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1501117716987-c8e2a1a1f7d4?w=800&q=80"
  }
];

let restaurants = [
  { 
    id: 1, 
    name: "Outs Diner", 
    menu: ["Burger", "Salad", "Fries"],
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=800&q=80"
  },
  { 
    id: 2, 
    name: "Eats Cafe", 
    menu: ["Coffee", "Sandwich", "Cake"],
    image: "https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=800&q=80"
  },
  { 
    id: 3, 
    name: "Golden Spoon", 
    menu: ["Steak", "Pasta", "Wine"],
    image: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=800&q=80"
  }
];

let bookings = [];

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to Outs and Eats API');
});

app.get('/hotels', (req, res) => {
  res.json(hotels);
});

app.get('/restaurants', (req, res) => {
  res.json(restaurants);
});

app.post('/book', (req, res) => {
  const { hotel_id, user_name } = req.body;
  const hotel = hotels.find(h => h.id === hotel_id);
  if (!hotel) {
    return res.status(404).json({ error: 'Hotel not found' });
  }
  if (hotel.rooms_available <= 0) {
    return res.status(400).json({ error: 'No rooms available' });
  }
  hotel.rooms_available -= 1;
  const booking = { hotel_id, user_name, booking_id: bookings.length + 1 };
  bookings.push(booking);
  res.json({ message: 'Booking successful', booking });
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
