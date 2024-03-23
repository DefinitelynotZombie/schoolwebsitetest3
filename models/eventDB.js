import mongoose from "mongoose";


// Define Mongoose schema and model for events
const eventSchema = new mongoose.Schema({
    title: String,
    description: String,
    date: Date  ,
    image: String, // Add image field to store image URLs
  });


const Event = mongoose.model('Event', eventSchema);
export default Event;



