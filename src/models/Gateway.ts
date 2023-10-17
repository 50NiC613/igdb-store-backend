import mongoose, { Document, Schema } from "mongoose";

export interface IGateway {
  serialNumber: string;
  name: string;
  ipv4Address: string;
  peripheralDevices: Array<Schema.Types.ObjectId>;
}

export interface IGatewayModel extends IGateway, Document {}

const GatewaySchema: Schema = new Schema(
  {
    serialNumber: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    ipv4Address: {
      type: String,
      required: true,
      validate: /\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/,
    },
    peripheralDevices: [{ type: Schema.Types.ObjectId, ref: "Peripheral" }],
  },
  {
    versionKey: false,
  },
);

export default mongoose.model<IGatewayModel>("Gateway", GatewaySchema);
