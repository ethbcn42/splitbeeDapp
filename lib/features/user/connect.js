import dbConnect from "@/lib/dbConnect";
import { authenticate } from "@/lib/middleware";

export const connect = async(req, res) => {
  try {
    await dbConnect()

    const user = await authenticate(req, res);
    if (!user)  res.status(404).json({ errors: ["No user found."] });
    console.log(user);
    res.status(200).json(
      {user}
    )
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).json(error.errors || ["Unkown error"]);
  }
}