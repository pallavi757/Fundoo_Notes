import express from 'express';
import * as noteController from '../controllers/note.controller';
import { noteValidator } from '../validators/note.validator';
import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();

//route to create a new note 
router.post('/addNote',noteValidator,userAuth,noteController.addNote);

//route to get all note
router.get('/getAllNote',userAuth, noteController.getAllNote);

//route to get single note by id
router.get('/:_id',userAuth, noteController.getSingleNote);

//route to get update note by id
router.put('/:_id',userAuth, noteController.updateNote);

//route to delete note by id
router.delete('/:_id',userAuth, noteController.deleteNote);

//router to archive notes
router.put('/:_id/isArchive',userAuth,noteController.archiveNotes);

//router to isDelete
router.put('/:_id/isDelete',userAuth,noteController.isTrash); 



export default router