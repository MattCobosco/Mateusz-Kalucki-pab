import Note from '../Models/Note';
import Tag from '../Models/Tag';
import Storage from './Storage';
import User from '../Models/User';

let storage: Storage;

interface IDataStorage 
{
    addNote(note: Note, user: User): void;
    getNotes(user: User): Note[];
    getNoteById(noteId: number): Note;
    editNoteById(noteId: number, noteContent: Note): void;
    deleteNoteById(noteId: number): void;
    getPublicNotesByLogin(login: string): Note[];
    shareNote(noteId: number, login: string) : void;
    getNotesSharedToUserByLogin(login: string) : Note[];

    addTag(tag: Tag, user: User) :  void;
    getTags(user: User): Tag[];
    getTagById(tagId: number): Tag;
    editTagById(tagId: number, tagContent: Tag): void;
    deleteTagById(tagId: number): void;

    addUser(user: User) : void;
    editUserByLogin(login: string, user: User) : void;
    getUserByLogin(login: string) : User;
    getUsers() : User[];
    deleteUserByLogin(login: string) : void;
}

export default IDataStorage;