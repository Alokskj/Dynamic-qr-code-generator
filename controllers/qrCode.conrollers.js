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
  const redirectToServerUrl = `${process.env.HOST_NAME}/api/v1/qrcode/redirect/${qrCodeId}`;
  const qrCodeUrl = `${process.env.HOST_NAME}/qr-codes/${qrCodeId}.png`;
  const qrCode = await qrcode.toFile(qrCodePath, redirectToServerUrl, {
    type: "png",
  });

  const data = await QrCode.create({
    name,
    active,
    createdBy : _id,
    qrCodeId,
    redirectURL,
    qrCodeUrl
  });
  res.status(201).json(
    new ApiResponse(201, "Qr code generated successfully", data)
  );
});

export const generateBulkQrCode = asyncHandler(async (req,res)=>{
  const user = req.user
  const {count} = req.body
  if(user.role !== 'admin'){
    throw new ApiError(401, 'You are allowed to performed this action')
  }
  if(!count){
    throw new ApiError(400, 'Please provide count of qr code to be generated')
  }
  if(count > 30){
    throw new ApiError(400, 'You cannot generate more than 30 qr codes at a time')
  }
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const parentDir = path.resolve(__dirname, "..");
  const qrCodesArray = []
  for(let i = 0;i < count; i++){
    const qrCodeId = generateUniqueId();
    const qrCodePath = path.join(parentDir, `/public/qr-codes/${qrCodeId}.png`);
    const redirectToServerUrl = `${process.env.HOST_NAME}/api/v1/qrcode/redirect/${qrCodeId}`;
    const qrCodeUrl = `${process.env.HOST_NAME}/qr-codes/${qrCodeId}.png`;
    const qrCode = await qrcode.toFile(qrCodePath, redirectToServerUrl, {
      type: "png",
    });
    const data = await QrCode.create({
      createdBy : user._id,
      qrCodeId,
      qrCodeUrl
    });
    qrCodesArray.push(data)

  }

  res.status(201).json(
    new ApiResponse(201, `${qrCodesArray.length} Qr codes generated successfully`, qrCodesArray)
  );

})

export const redirectQrCode = asyncHandler(async (req, res) => {
  const { qrCodeId } = req.params;
  const qrCode = await QrCode.findOne({ qrCodeId });
  if (!qrCode) {
    throw new ApiError(404, "Qr code not Exists");
  }
  if(!qrCode.active){
    throw new ApiError(400, 'Qr code is not active yet')
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
    throw new ApiError(404, 'Invalid Qr Code')
  }
  if(!qrCode.createdBy.equals(user._id)){
    throw new ApiError(400, 'This Qr Code not belonged to you')
  }
  const updatedQrCode = await QrCode.findOneAndUpdate({qrCodeId}, {$set:{name,redirectURL,active}}, {new: true})
  res.status(200).json(new ApiResponse(200, 'Qr Code updated succesfully', updateQrCode))
})
