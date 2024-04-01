import mongoose from "mongoose";

const qrCodeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    active : {
      type : Boolean,
      default: false
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
    qrCodeUrl: {
      type: String,
      required : true
    },
    redirectURL: String,
  },
  { timestamps: true }
);

const QrCode = mongoose.model('QRCODE', qrCodeSchema);

export default QrCode;
