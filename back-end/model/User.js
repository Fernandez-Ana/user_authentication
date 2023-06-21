import mongoose from "mongoose";
import crypto from "crypto";
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config({ path: new URL("../../.env", import.meta.url).pathname });

// process.env.TOKEN_SECRET = crypto.randomBytes(64).toString("hex");
// console.log(process.env.TOKEN_SECRET);

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    salt: { type: String, required: true },
    hash: { type: String, required: true },
});

// Nur `function` Funktionen benutzen nicht
// Arrow (()=>) functions
userSchema.methods.setPassword = function (password) {
    // Salt erstellen
    this.salt = crypto.randomBytes(64).toString("hex");
    // Password mit salt hashen
    this.hash = crypto
        .pbkdf2Sync(password, this.salt, 1000, 64, "sha512")
        .toString("hex");
};

userSchema.methods.verifyPassword = function (password) {
    const hash = crypto
        .pbkdf2Sync(password, this.salt, 1000, 64, "sha512")
        .toString("hex");

    return this.hash === hash;
};

userSchema.methods.generateAuthToken = function () {
    const payload = { name: this.name, email: this.email };
    const secretKey = process.env.TOKEN_SECRET
    const token = jwt.sign(payload, secretKey, { expiresIn: '1800s' });
    return token;
};

export const User = mongoose.model("User", userSchema);