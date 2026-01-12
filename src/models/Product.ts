import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      unique: true,
      index: true,
    },

    price: {
      type: Number,
      required: true,
    },

    description: {
      type: String,
      default: "",
    },

    category: {
      type: String,
      required: true,
    },

    sections: {
      type: [String],
      default: [],
    },

    images: {
      type: [String],
      required: true,
    },

    minOrderQty: {
      type: Number,
      default: 50,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Product ||
  mongoose.model("Product", ProductSchema);
