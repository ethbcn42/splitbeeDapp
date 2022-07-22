import mongoose from "mongoose";

const ContactSchema = mongoose.Schema(
  {
    name: String,
    company: String,
    position: String,
    country: String,
    email: String,
    phone: String,
    needAppointment: Boolean,
    service: String,
    timing: String,
    description: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.models.Contact || mongoose.model("Contact", ContactSchema);
