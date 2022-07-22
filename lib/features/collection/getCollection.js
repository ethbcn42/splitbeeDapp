import dbConnect from "@/lib/dbConnect";
import Collection from "@/lib/models/Collection.model";

export const getCollection = async (req, res) => {
  try {
    await dbConnect()
    // console.log({ id: req?.params });
    const collection = await Collection.findById(req?.query?.id);
    // console.log({ collection });
    res.status(200).json(collection);
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).json(error.errors || ["Unkown error"]);
  }
}
