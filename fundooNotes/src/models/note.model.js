import { Schema, model } from 'mongoose';

const noteSchema = new Schema( 
 {
    Title: {type: String,required: true},
    Descreption: {type: String,required: true},
    color: {type: String},
    isArchived: {type: Boolean,type: false},
    isDeleted: {type: Boolean,type: false},
    UserID: {type: String} 
 },
 {
    timestamps: true
 }
);

export default model('Note', noteSchema);