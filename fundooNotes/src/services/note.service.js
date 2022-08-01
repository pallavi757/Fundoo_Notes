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


//Getting single note by id
export const getSingleNote=async(_id)=>{
    const data=await Note.findOne({_id:_id});
    if(data==null){
        throw new Error("Note is not found related id");
    }else{
      return data;
    }
};

//Update note by id
export const updateNote=async(_id,body)=>{
    const data=await Note.findByIdAndUpdate({_id:_id},body,{new:true});
    return data;
};

//Delete note by id
export const deleteNote=async(_id)=>{
    const data=await Note.findByIdAndDelete(_id);  
};