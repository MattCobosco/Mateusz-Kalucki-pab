import Note from '../Models/Note';
import Tag from '../Models/Tag';
import Storage from './Storage';
import User from '../Models/User';

let storage: Storage;

interface IDataStorage 
{
    addNote(note: Note): void;
    getNotes(user: User): Note[];
    getNoteById(noteId: number): Note;
    editNoteById(noteId: number): void;
    deleteNoteById(noteId: number): void;
    getPublicNotesByUsername(username: string): Note[];

    addTag(tag: Tag) :  void;
    getTags(): Tag[];
    getTagById(tagId: number): Tag;
    editTagById(tagId: number): void;
    deleteTagById(tagId: number): void;
}

export default IDataStorage;