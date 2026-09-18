import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import {
	JWT_ACCESS_TOKEN_SECRET,
	JWT_REFRESH_TOKEN_SECRET,
	JWT_ACCESS_TOKEN_SECRET_EXPIRY,
	JWT_REFRESH_TOKEN_SECRET_EXPIRY,
} from "../../shared/constants.js";
const userSchema = new Schema(
	{
		username: {
			type: String,
			required: true,
			unique: true,
			lowercase: true,
			trim: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
			lowercase: true,
			trim: true,
		},
		password: {
			type: String,
			required: true,
		},
		isEmailVerified: {
			type: Boolean,
			default: false,
		},
		emailVerificationToken: {
			type: String,
		},
		emailVerificationTokenExpiry: {
			type: Date,
		},
		refreshToken: {
			type: String,
		},
		resetPasswordToken: {
			type: String,
		},
		resetPasswordTokenExpiry: {
			type: Date,
		},
	},
	{ timestamps: true },
);

userSchema.pre("save", async (next) => {
	if (!this.isModified("password")) return next();
	this.password = await bcrypt.hash(this.password, 10);
	next();
});

userSchema.methods.generateHashedToken = async function () {
	const unHashedToken = crypto.randomBytes(32).toString("hex");
	const hashedToken = crypto
		.createHash("sha256")
		.update(unHashedToken)
		.digest("hex");
	const tokenExpiry = Date.now() + 20 * 60 * 1000;
	return { unHashedToken, hashedToken, tokenExpiry };
};

userSchema.methods.generateAccessToken = function () {
	return jwt.sign(
		{
			_id: this._id,
			username: this.username,
			email: this.email,
		},
		JWT_ACCESS_TOKEN_SECRET,
		{
			expiresIn: JWT_ACCESS_TOKEN_SECRET_EXPIRY,
		},
	);
};

userSchema.methods.generateRefreshToken = function () {
	return jwt.sign(
		{
			_id: this._id,
		},
		JWT_REFRESH_TOKEN_SECRET,
		{
			expiresIn: JWT_REFRESH_TOKEN_SECRET_EXPIRY,
		},
	);
};

export const User = model("User", userSchema);
