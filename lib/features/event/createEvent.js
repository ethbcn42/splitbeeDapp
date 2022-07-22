import dbConnect from "@/lib/dbConnect";
import { authenticate, onlyAdmin } from "@/lib/middleware";
import Event from "@/lib/models/Event.model";

export const createEvent = async (req, res) => {
  try {
    await dbConnect()

    const user = await authenticate(req, res);
    const admin = onlyAdmin(user);
    if (!admin) res.status(404).json({ errors: ["No user found."] });
    const { es, en, startsAt, endsAt, imgs, relatedCollections } = req.body;
    const event = new Event({ name, description, date, tags, startsAt, endsAt, imgs, relatedCollections });
    await event.save();
    res.status(200).json({ success: true, event })
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).json(error.errors || ["Unkown error"]);
  }
}