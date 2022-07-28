import User from '../models/user.model';


//create new user for registration
export const userRegistration = async (body) => {
  const data = await User.create(body);
  return data;
};

