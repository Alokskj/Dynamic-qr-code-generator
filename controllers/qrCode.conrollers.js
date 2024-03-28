import path from "path";
import QrCode from "../models/qrcode.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

import asyncHandler from "../utils/asyncHandler.js";
import qrcode from "qrcode";
import { fileURLToPath } from "url";
import generateUniqueId from "../utils/generateUniqueId.js";

export const generateQrCode = asyncHandler(async (req, res) => {
  const { name, redirect: redirectURL, active } = req.body;
  if (!name || !redirectURL || active === undefined) {
    throw new ApiError(400, "Please provide all details");
  }
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const qrCodeId = generateUniqueId();
  const serverRedirectURL = `http://${req.get('host')}/api/v1/qrcode/redirect/${qrCodeId}`;
  const qrCodePath = path.join(
    __dirname,
    "..",
    `/public/qr-codes/${qrCodeId}.png`
  );
  const qrCode = await qrcode.toFile(qrCodePath, serverRedirectURL, {
    type: "png",
  });

  const data = await QrCode.create({
    name,
    active,
    qrCodeId,
    redirectURL,
  });
  res
    .status(201)
    .json(new ApiResponse(201, "Qr code generated successfully", {...data, qrCodeUrl : `http://192.168.29.16:3000/qr-codes/${qrCodeId}.png`}));
});

export const redirectQrCode = asyncHandler(async (req, res) => {
  const { qrCodeId } = req.params;
  console.log(qrCodeId)
  const qrCode = await QrCode.findOne({ qrCodeId });
  if (!qrCode) {
    throw new Error("Qr code not Exists");
  }
  const redirectURL = qrCode.redirectURL;
  res.redirect(redirectURL);
});
