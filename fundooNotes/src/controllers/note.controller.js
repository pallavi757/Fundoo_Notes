import HttpStatus from 'http-status-codes';
import * as NoteService from '../services/note.service';

/**
 * Controller to create a new note
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
 export const  addNote = async (req, res, next) => {
    try {
      const data = await NoteService.addNote(req.body);
      res.status(HttpStatus.CREATED).json({
        code: HttpStatus.CREATED,
        data: data,
        message: 'Note added successfully'
      });
    } catch (error) {
      next(error);
    }
  };

  //Controller to get all note
  export const  getAllNote = async (req, res, next) => {
    try {
      const data = await NoteService. getAllNote(req.body);
      res.status(HttpStatus.CREATED).json({
        code: HttpStatus.CREATED,
        data: data,
        message: 'Fetch all Note successfully'
      });
    } catch (error) {
      next(error);
    }
  };
