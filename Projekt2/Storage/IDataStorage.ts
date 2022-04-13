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


export class DatabaseDataStorage implements IDataStorage
{
    addNote(note: Note): void {
        throw new Error('Method not implemented.');
    }
    getNotes(): Note[] {
        throw new Error('Method not implemented.');
    }
    getNoteById(noteId: number): Note {
        throw new Error('Method not implemented.');
    }
    editNoteById(noteId: number): void {
        throw new Error('Method not implemented.');
    }
    deleteNoteById(noteId: number): void {
        throw new Error('Method not implemented.');
    }
    getPublicNotesByUsername(username: string): Note[] {
        throw new Error('Method not implemented.');
    }
    addTag(tag: Tag): void {
        throw new Error('Method not implemented.');
    }
    getTags(): Tag[] {
        throw new Error('Method not implemented.');
    }
    getTagById(tagId: number): Tag {
        throw new Error('Method not implemented.');
    }
    editTagById(tagId: number): void {
        throw new Error('Method not implemented.');
    }
    deleteTagById(tagId: number): void {
        throw new Error('Method not implemented.');
    }
}