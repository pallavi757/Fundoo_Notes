import express from 'express';
import * as noteController from '../controllers/note.controller';
import { noteValidator } from '../validators/note.validator';
import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();

//route to create a new note 
router.post('/addNote',noteValidator,userAuth,noteController.addNote);

//route to get all note
router.get('/getAllNote',userAuth, noteController.getAllNote);

export default router