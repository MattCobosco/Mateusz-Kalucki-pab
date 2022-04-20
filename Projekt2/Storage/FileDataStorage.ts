import IDataStorage from './IDataStorage';
import Note from '../Models/Note';
import Tag from '../Models/Tag';
import Storage from './Storage';
import User from '../Models/User';
import Repository from '../Repository';

const repo : Repository = new Repository();
let storage: Storage;

repo.readStorage().then(data => 
    {
      if(data)
        storage = JSON.parse(data);
      else 
        storage = new Storage();
    });

class FileDataStorage implements IDataStorage
{
    addNote(note: Note, user: User): void 
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
      note.id = Date.now();
      storage.notes.push(note);
      user.notesCreatedIds.push(note.id ?? 0);
      repo.updateStorage(JSON.stringify(storage));
    }

    getNotes(registeredUser: User): Note[] 
    {
        return storage.notes.filter(n => registeredUser.notesCreatedIds.includes(n.id ?? 0));
    }

    getNoteById(noteId: number): Note 
    {
        return storage.notes.find(n => n.id === noteId);
    }

    editNoteById(noteId: number, noteContent: Note): void 
    {
        const noteToEdit = storage.notes.find(n => n.id === noteId);
        if(noteToEdit)
        {
            noteToEdit.title = noteContent.title;
            noteToEdit.content = noteContent.content;
            noteToEdit.tags = noteContent.tags;
            repo.updateStorage(JSON.stringify(storage));
        }
    }

    deleteNoteById(noteId: number): void {
        const noteToDelete = storage.notes.find(n => n.id === noteId);
        if(noteToDelete)
        {
            storage.notes.splice(storage.notes.indexOf(noteToDelete), 1);
            repo.updateStorage(JSON.stringify(storage));
        }
    }

    getPublicNotesByUsername(username: string): Note[] 
    {
        return storage.notes.filter(n => n.private === false && this.getUserByUsername(username).notesCreatedIds.includes(n.id ?? 0));
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

    getUserByUsername(username: string): User {
        return storage.users.find(u => u.login === username)
    }
}

export default FileDataStorage;