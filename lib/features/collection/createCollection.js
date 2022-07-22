import dbConnect from "@/lib/dbConnect";
import { authenticate, onlyAdmin } from "@/lib/middleware";
import Collection from "@/lib/models/Collection.model";

export const createCollection = async (req, res) => {
  try {
    await dbConnect()

    const user = await authenticate(req, res);
    const admin = onlyAdmin(user);
    if (!admin) res.status(404).json({ errors: ["No user found."] });
    const { isPublic, es, en, network, address, subgraph, imgs, relatedCollections } = req.body;
    const collection = new Collection({ isPublic, es, en, network, address, subgraph, imgs, relatedCollections });
    await collection.save();
    res.status(200).json({ success: true, collection })
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).json(error.errors || ["Unkown error"]);
  }
}