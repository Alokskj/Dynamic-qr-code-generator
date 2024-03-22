import path from "path";
import QrCode from "../models/qrcode.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import qrcode from "qrcode";
import {fileURLToPath} from 'url'
import generateUniqueId from "../utils/generateUniqueId.js";

export const generateQrCode = asyncHandler(async (req, res) => {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const qrCodeId = generateUniqueId();
  const redirect = `http://192.168.29.251:5000/redirect/${qrCodeId}`;
  const qrCode = await qrcode.toFile(
    path.join(__dirname, `/public/qr-codes/${qrCodeId}.png`),
    redirect,
    { type: "png" }
  );
  const data = await QrCode.create({
    qrCodeId,
    redirectURL: "https://www.google.com/",
  });
  res
    .status(201)
    .json(new ApiResponse(201, "qrcode generated successfully", data));
});

export const redirectQrCode = asyncHandler(async (req, res) => {
  const { qrCodeId } = req.params;
  const qrCode = await QrCode.findOne({ qrCodeId });
  if (!qrCode) {
    throw new Error("Qr code not Exists");
  }
  const redirectURL = qrCode.redirectURL;
  res.redirect(redirectURL);
});
