import IDataStorage from './IDataStorage';
import Note from '../Models/Note';
import Tag from '../Models/Tag';
import Storage from './Storage';
import User from '../Models/User'

let storage: Storage;

class FileDataStorage implements IDataStorage
{
    addNote(note: Note): void 
    {
        console.log(note);
        if(note.tags != undefined)
      {
        note.tags.forEach(tag =>
          {
            if(!storage.tags.find((t: { name: string; }) => t.name === tag.name))
            {
              const newTag : Tag = 
              {
                id: Date.now(), 
                name : tag.name
              };
                storage.tags.push(newTag);
            }
          });
      }
      note.id=Date.now();
      storage.notes.push(note);
    }

    getNotes(registeredUser: User): Note[] 
    {
        return storage.notes.filter(n => registeredUser.notesCreatedIds.includes(n.id ?? 0));
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

export default FileDataStorage;