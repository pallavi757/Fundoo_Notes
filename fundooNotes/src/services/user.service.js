import User from '../models/user.model';
import bcrypt from 'bcrypt';

/*create new user for registration and store user password with hash password*/
export const userRegistration = async (body) => {
  console.log("before body",body);
  const present = await User.findOne({email:body.email});/* search by email for checking user is present in database or  */
  if(present){
  throw new Error("User already exist");
  }else{
    const saltRounds=10;
    const hashPassword=await bcrypt.hash(body.password,saltRounds); /* generate hash password using hash function */
    console.log("store hash password",hashPassword); // display hass password on console
    body.password=hashPassword;
    console.log("after storing hash pass body is",body);
  const data = await User.create(body);
  return data;
  }
};

