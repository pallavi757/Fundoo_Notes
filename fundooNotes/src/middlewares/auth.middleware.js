import HttpStatus from 'http-status-codes';
import jwt from 'jsonwebtoken';


/**
 * Middleware to authenticate if user has a valid Authorization token
 * Authorization: Bearer <token>
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export const userAuth = async (req, res, next) => {
  try {
    let bearerToken = req.header('Authorization');
    if (!bearerToken)
      throw {
        code: HttpStatus.BAD_REQUEST,
        message: 'Authorization token is required'
      };
    bearerToken = bearerToken.split(' ')[1];
    const user = await jwt.verify(bearerToken, process.env.SECREATEKEY);
    //console.log(user);
    req.body.UserID = user.email;
    next();
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      //data: data,
      message: `UnAuthorised token`
    });
  }
};
//making the middleware for reset password
export const passwordAuth = async (req, res, next) => {
  try {
    let passToken = req.header('Authorization');
    if (!passToken)
      throw {
        code: HttpStatus.BAD_REQUEST,
        message: 'Authorization token is required'
      };
    passToken = passToken.split(' ')[1];
    const user = await jwt.verify(passToken, process.env.NEWSECREATEKEY);
    req.body.email = user.email;
    next();
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `UnAuthorised token`
    });
  }
};
