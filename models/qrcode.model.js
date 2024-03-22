import mongoose from "mongoose";

const qrCodeSchema = new mongoose.Schema(
  {
    qrCodeId: {
      type: String,
      required: true,
      unique: true,
    },
    redirectURL: String,
  },
  { timestamps: true }
);

const QrCode = mongoose.model('QRCODE', qrCodeSchema);

export default QrCode;
