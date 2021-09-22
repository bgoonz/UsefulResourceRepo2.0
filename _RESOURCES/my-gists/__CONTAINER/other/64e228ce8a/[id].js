import Car from "../../../models/Carb";
import connectDb from "../../../utils/connectDb";

export default async (req, res) => {
  await connectDb();
  const { id } = req.query;
  const car = await Car.findById(id);
  res.status(200).json(car);
};
