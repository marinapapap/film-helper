import mongoose, { Schema, Model } from "mongoose";

export interface ITemp {
  message: string;
}

const TempSchema: Schema<ITemp> = new mongoose.Schema<ITemp>({
  message: { type: String },
});

const Temp: Model<ITemp> = mongoose.model<ITemp>("Temp", TempSchema);

export default Temp;
