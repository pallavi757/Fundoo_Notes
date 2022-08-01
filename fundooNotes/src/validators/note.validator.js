import Joi from '@hapi/joi';
export const noteValidator = (req, res, next) => {
    const schema = Joi.object({
        Title: Joi.string().min(4).alphanum().required(),
        Descreption: Joi.string().min(4).required(),
        color: Joi.string().optional(),
        isArchived:Joi.boolean().optional(),
        isDeleted:Joi.boolean().optional()
    });
    const { error, value } = schema.validate(req.body);
  if (error) {
    next(error);
  } else {
    next();
  }
};