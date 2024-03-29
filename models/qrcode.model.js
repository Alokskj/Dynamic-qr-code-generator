import mongoose from "mongoose";

const qrCodeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    active : {
      type : Boolean,
      required: true
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref : 'User'
    },
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
