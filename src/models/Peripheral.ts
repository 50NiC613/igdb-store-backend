import mongoose, { Document, Schema } from "mongoose";

export interface IPeripheral {
  uid: number;
  vendor: string;
  dateCreated: Date;
  status: "online" | "offline";
}

export interface IPeripheralModel extends IPeripheral, Document {}

const PeripheralSchema: Schema = new Schema(
  {
    uid: { type: Number, required: true },
    vendor: { type: String, required: true },
    dateCreated: { type: Date, required: true },
    status: { type: String, required: true, enum: ["online", "offline"] },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export default mongoose.model<IPeripheralModel>("Peripheral", PeripheralSchema);
