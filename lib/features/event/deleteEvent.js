import dbConnect from "@/lib/dbConnect";
import Event from "@/lib/models/Event.model";

export const deleteEvent = async (req, res) => {
  try {
    await dbConnect()
    let event = await Event.findByIdAndDelete(req?.query?.id);
    if (event)
      res.status(200).json({ success: true, message: `Event #${req?.query?.id} deleted.` });
    throw { status: 404, errors: ["Event not found."] }
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).json(error.errors || ["Unkown error"]);
  }
}