import HttpStatus from 'http-status-codes';
import * as UserService from '../services/user.service';

/**
 * Controller to create a new user for registration
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const  userRegistration = async (req, res, next) => {
  try {
    const data = await UserService. userRegistration(req.body);
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      data: data,
      message: 'User created successfully'
    });
  } catch (error) {
    next(error);
  }
};
//for login
export const login = async (req, res, next) => {
  try {
    const data = await UserService.login(req.body);
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      data: data,
      message: 'User login successfully'
    });
  } catch (error) {
    next(error);
  }
};

//for login
export const login = async (req, res, next) => {
  try {
    const data = await UserService.login(req.body);
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      data: data,
      message: 'User login successfully'
    });
  } catch (error) {
    next(error);
  }
};

