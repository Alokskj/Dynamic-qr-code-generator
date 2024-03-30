import User from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
const options = { httpOnly: true, secure: false };
const generateAccessAndRefreshToken = async (user) => {
  const accessToken = await user.generateAccessToken();
  const refreshToken = await user.generateRefreshToken();
  user.refreshToken = refreshToken;
  await user.save();
  return { accessToken, refreshToken };
};
export const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (
    [email, password, name].some(
      (field) => field?.trim() === "" || field?.trim() === undefined
    )
  ) {
    throw new ApiError(400, "Provide email and password");
  }
  const isUserExists = await User.findOne({ email });
  if (isUserExists) {
    throw new ApiError(400, "User already Exist");
  }
  const user = await User.create({ email, password, name });
  res.status(201).json(new ApiResponse(201, "User registred Successfully"));
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new ApiError(400, "Provide email and password");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(404, "User not registred");
  }
  const isPasswordCorrect = await user.isPasswordCorrect(password);
  if (!isPasswordCorrect) {
    throw new ApiError(400, "Invalid Credentials");
  }
  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user
  );

  const LoggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  if (!LoggedInUser) {
    throw new ApiError(500, "Something went wrong while loggin user");
  }
  res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(200, "Logged in Successfully", {
        accessToken,
        refreshToken,
        LoggedInUser,
      })
    );
});

export const google = asyncHandler(async (req, res) => {
  const { name, email, profilePicture } = req.body;
  if (!email || !name || !profilePicture) {
    throw new ApiError(400, "Provide email and password");
  }
  let user = await User.findOne({ email });
  if (!user) {
    const generatePassword = Math.random().toString(36).slice(-8);
    user = await User.create({
      name,
      email,
      profilePicture,
      password: generatePassword,
    });
  }
  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user
  );
  const LoggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  if (!LoggedInUser) {
    throw new ApiError(500, "Something went wrong while loggin user");
  }
  res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(200, "Logged in Successfully", {
        accessToken,
        refreshToken,
        LoggedInUser,
      })
    );
});

export const logout = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const updateUser = await User.findByIdAndUpdate(
    _id,
    { $set: { refreshToken: null } },
    { new: true }
  );
  res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, "User Logged out"));
});
