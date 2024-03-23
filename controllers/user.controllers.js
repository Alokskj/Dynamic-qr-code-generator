import User from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

export const getUser = asyncHandler(async(req,res)=>{
    const {_id} = req.user
    const user = await User.findById(_id).select('-password -refreshToken')
    if(!user){
        throw new ApiError(500, 'Unable to get User')
    }
    res.status(200).json(new ApiResponse(200, 'success',user))
})