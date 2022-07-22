import dbConnect from "@/lib/dbConnect";
import Collection from "@/lib/models/Collection.model";

export const deleteCollection = async (req, res) => {
  try {
    await dbConnect()
    console.log({ id: req?.query.id });
    let col = await Collection.findByIdAndDelete(req?.query?.id);
    if (col)
      return res.status(200).json({ success: true, message: `Collection #${req.query.id} deleted.` });
    throw { status: 404, errors: ["Collection not found."] }
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).json(error.errors || ["Unkown error"]);
  }
}