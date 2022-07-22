import dbConnect from "@/lib/dbConnect";
import Collection from "@/lib/models/Collection.model";

export const getPublicCollections = async (req, res) => {
  try {
    await dbConnect()
    const collections = await Collection.find({
      isPublic: true
    });
    res.status(200).json(collections);
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).json(error.errors || ["Unkown error"]);
  }
}