import User from '../models/user.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { sendMail } from '../utils/user.util';

import { sendMail } from '../utils/user.util';

/*create new user for registration and store user password with hash password*/
export const userRegistration = async (body) => {
  const present = await User.findOne({ email: body.email });/* search by email for checking user is present in database or  */
  if (present) {
    throw new Error("User already exist");
  } else {
    const saltRounds = 10;
    const hashPassword = await bcrypt.hash(body.password, saltRounds); /* generate hash password using hash function */
    body.password = hashPassword;
    const data = await User.create(body);
    return data;
  }
};
//for login
export const login = async (body) => {
  const data = await User.findOne({ email: body.email });
  if (data == null) {
    throw new Error("User not exist");
  } else {
    const isPasswordCorrect = await bcrypt.compare(body.password, data.password);
    if (isPasswordCorrect) {
      let token = jwt.sign({ email: data.email, _id: data._id }, process.env.SECREATEKEY);
      return token;
    } else {
      throw new Error("password not match");
    }
  }
};
//for forget password
export const forgetPassword = async (body) => {
  console.log("body --> ", body);
  const data = await User.findOne({ email: body.email });
  console.log("data --> ", data);
  if (data) {
    const token = jwt.sign({ email: data.email, _id: data._id }, process.env.NEWSECREATEKEY);
    const result = await sendMail(data.email, token);
    return result;
  } else {
    throw new Error("User not exist");
  }
};
//for reset password
export const resetPassword = async (body) => {
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(body.password, saltRounds);
  body.password = passwordHash;
  const data = await User.findOneAndUpdate({ email: body.email }, { password: body.password }, { new: true });
  if (data) {
    return data;
  } else {
    throw new Error("User not exist");
  }
};





