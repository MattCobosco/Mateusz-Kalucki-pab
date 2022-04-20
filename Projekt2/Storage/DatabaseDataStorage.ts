import IDataStorage from './IDataStorage';
import Note from '../Models/Note';
import Tag from '../Models/Tag';
import User from '../Models/User';

export class DatabaseDataStorage implements IDataStorage
{
    addNote(note: Note, user: User): void {
        throw new Error('Method not implemented.');
    }
    getNotes(): Note[] {
        throw new Error('Method not implemented.');
    }
    getNoteById(noteId: number): Note {
        throw new Error('Method not implemented.');
    }
    editNoteById(noteId: number, noteContent: Note): void {
        throw new Error('Method not implemented.');
    }
    deleteNoteById(noteId: number): void {
        throw new Error('Method not implemented.');
    }
    getPublicNotesByUsername(username: string): Note[] {
        throw new Error('Method not implemented.');
    }

    addTag(tag: Tag, user : User): void {
        throw new Error('Method not implemented.');
    }
    getTags(): Tag[] {
        throw new Error('Method not implemented.');
    }
    getTagById(tagId: number): Tag {
        throw new Error('Method not implemented.');
    }
    editTagById(tagId: number, tagContent: Tag): void {
        throw new Error('Method not implemented.');
    }
    deleteTagById(tagId: number): void {
        throw new Error('Method not implemented.');
    }

    addUser(user: User): void {
        throw new Error('Method not implemented.');
    }
    editUserByUsername(username: string, user: User): void {
        throw new Error('Method not implemented.');
    }
    getUserByUsername(username: string): User {
        throw new Error('Method not implemented.');
    }
    getUsers(): User[] {
        throw new Error('Method not implemented.');
    }
    deleteUserByUsername(username: string): void {
        throw new Error('Method not implemented.');
    }

}

export default DatabaseDataStorage;