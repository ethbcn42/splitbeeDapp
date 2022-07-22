import dbConnect from "@/lib/dbConnect";
import Event from "@/lib/models/Event.model";

export const getEvents = async(req, res) => {
  try {
    await dbConnect()
    const events = await Event.find({});
    res.status(200).json({ events });
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).json(error.errors || ["Unkown error"]);
  }
}