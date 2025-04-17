const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");

const listingSchema = new Schema({                      //Documents
    title: {
      type: String,
      required: true,
    },
    description: String,
    image: {                                            //image: {
      url: String,
      filename:String,
    },
    price: Number,
    location: String,
    country: String,
    reviews: [
    {
        type: Schema.Types.ObjectId,
        ref:"Review",
       },
      ],
  owner: {
     type: Schema.Types.ObjectId,
     ref: "User",
  }, 
   geometry: {
    type: {
      type: String, // Don't do { location: { type: String } }
      enum: ['Point'], // 'location.type' must be 'Point'
    },
    coordinates: {
      type: [Number],
      required: true
    }
  }
  });


listingSchema.post("findOneAndDelete", async (listing) => {
  if (listing) {
    await Review.deleteMany({ _id: { $in: listing.reviews } }); 
  }

  })

const Listing = mongoose.model("Listing", listingSchema);         //COLLECTION 
module.exports = Listing;