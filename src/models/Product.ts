import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },

    slug: {
      type: String,
      required: true,
      unique: true,
    },

     price: {
      type: String,        
      default: "On Request",
    },

    description: { type: String, default: "" },

    category: { type: String, required: true },

    sections: [{ type: String }],

    images: [{ type: String, required: true }],

    minOrderQty: { type: Number, default: 50 },

    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.models.Product ||
  mongoose.model("Product", ProductSchema);
