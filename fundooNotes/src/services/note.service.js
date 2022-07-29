import Note from '../models/note.model';

//Adding new note 
export const addNote = async (body) => {
    const data = await Note.create(body);
    return data;
};
