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
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: data,
        message: 'Fetch all Note successfully'
      });
    } catch (error) {
      next(error);
    }
  }; 

  //Controller to get single note by id
  export const getSingleNote=async(req,res,next)=>{
    try{
      const data=await NoteService.getSingleNote(req.params._id);
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: data,
        message: 'Fetch single Note successfully'
      });   
    }catch(error){
      res.status(HttpStatus.BAD_REQUEST).json({
        code:HttpStatus.BAD_REQUEST,
        message:`${error}`
      });
    }
  };

  //Controller to update note by id
  export const updateNote=async(req,res,next)=>{
    try{
      const data=await NoteService.updateNote(req.params._id,req.body);
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: data,
        message: 'Update Note successfully'
      });   
    }catch(error){
      res.status(HttpStatus.BAD_REQUEST).json({
        code:HttpStatus.BAD_REQUEST,
        message:`${error}`
      });
    }
  };

  //Controller to delete note by id
  export const deleteNote=async(req,res,next)=>{
    try{
      const data=await NoteService.deleteNote(req.params._id);
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        message: 'Note is deleted successfully'
      });   
    }catch(error){
      next(error);
    }
  };
