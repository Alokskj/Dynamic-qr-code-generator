import path from "path";
import QrCode from "../models/qrcode.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

import asyncHandler from "../utils/asyncHandler.js";
import qrcode from "qrcode";
import { fileURLToPath, pathToFileURL } from "url";
import generateUniqueId from "../utils/generateUniqueId.js";

export const generateQrCode = asyncHandler(async (req, res) => {
  const {_id} = req.user
  const { name,redirectURL, active } = req.body;
  if (!name || !redirectURL || active === undefined) {
    throw new ApiError(400, "Please provide all details");
  }

  const qrCodeId = generateUniqueId();
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const parentDir = path.resolve(__dirname, "..");
  const qrCodePath = path.join(parentDir, `/public/qr-codes/${qrCodeId}.png`);
  const serverRedirectURL = `${process.env.HOST_NAME}/api/v1/qrcode/redirect/${qrCodeId}`;
  const qrCodeUrl = `${process.env.HOST_NAME}/qr-codes/${qrCodeId}.png`;
  const qrCode = await qrcode.toFile(qrCodePath, serverRedirectURL, {
    type: "png",
  });

  const data = await QrCode.create({
    name,
    active,
    createdBy : _id,
    qrCodeId,
    redirectURL,
  });
  res.status(201).json(
    new ApiResponse(201, "Qr code generated successfully", {
      ...data,
      qrCodeUrl,
    })
  );
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

export const getQrCode = asyncHandler(async(req,res)=>{
  const user = req.user
  const {qrCodeId} = req.params
  const qrCode = await QrCode.findOne({qrCodeId})
  if(!qrCode){
    throw new ApiError(404,'Invalid Qr Code')
  }
  if(!qrCode.createdBy.equals(user._id)){
    throw new ApiError(400,'This Qr Code not belonged to you')
  }
  res.status(200).json(new ApiResponse(200, 'Qr Code fetched successfully', qrCode))

})

export const getAllQrCodes = asyncHandler(async(req,res)=>{
  const user = req.user
  const allQrCodes = await QrCode.find({createdBy: user._id})
  res.status(200).json(new ApiResponse(200, 'all qr Codes fetched successfully', allQrCodes))
})

export const updateQrCode = asyncHandler(async (req,res)=>{
  const {qrCodeId} = req.params
  const {name,redirectURL,active} = req.body
  const user = req.user
  const qrCode = await QrCode.findOne({qrCodeId})
  if(!qrCode){
    throw new Error('Invalid Qr Code')
  }
  if(!qrCode.createdBy.equals(user._id)){
    throw new Error('This Qr Code not belonged to you')
  }
  const updatedQrCode = await QrCode.findOneAndUpdate({qrCodeId}, {$set:{name,redirectURL,active}}, {new: true})
  res.status(200).json(new ApiResponse(200, 'Qr Code updated succesfully', updateQrCode))
})
