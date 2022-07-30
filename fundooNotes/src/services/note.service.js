import Note from '../models/note.model';

//Adding new note 
export const addNote = async (body) => {
    const data = await Note.create(body);
    return data;
};

//Getting all note
export const getAllNote = async (body) => {
    const data = await Note.find({UserID:body.UserID});
    return data;
};
