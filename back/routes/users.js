import { Router } from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const users = Router();

const query = await User.findAll();
console.log("All users:", JSON.stringify(query));

export default users;
