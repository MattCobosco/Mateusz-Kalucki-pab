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
    // CRUD dla notatek
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
                this.addTag(newTag, user);
            }
          });
      }

      note.id = Date.now();
      storage.notes.push(note);
      user.notesCreatedIds.push(note.id ?? 0);
      repo.updateStorage(JSON.stringify(storage));
    }

    getNotes(user: User): Note[] 
    {
        return storage.notes.filter(n => user.notesCreatedIds.includes(n.id ?? 0));
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

    deleteNoteById(noteId: number): void 
    {
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


    // CRUD dla tagów
    addTag(tag: Tag, user : User): void 
    {
        tag.id = Date.now();
        storage.tags.push(tag);
        user.tagsCreatedIds.push(tag.id ?? 0);
        repo.updateStorage(JSON.stringify(storage));
    }

    getTags(user: User): Tag[] 
    {
        return storage.tags.filter(t => user.tagsCreatedIds.includes(t.id ?? 0))
    }

    getTagById(tagId: number): Tag 
    {
        return storage.tags.find(t => t.id === tagId);
    }

    editTagById(tagId: number, tagContent: Tag): void 
    {
        const tagToEdit = storage.tags.find(t => t.id === tagId);

        if(tagToEdit)
        {
            tagToEdit.name = tagContent.name;
            repo.updateStorage(JSON.stringify(storage));
        }
    }

    deleteTagById(tagId: number): void 
    {
        const tagToDelete = storage.tags.find(t => t.id === tagId);
        if(tagToDelete)
        {
            storage.tags.splice(storage.tags.indexOf(tagToDelete), 1);
            repo.updateStorage(JSON.stringify(storage));
        }
    }

    // CRUD dla użytkowników
    addUser(user: User): void
    {
        user.id = storage.users.length + 1;
        storage.users.push(user);
        repo.updateStorage(JSON.stringify(storage));
    }

    editUserByUsername(username: string, userContent: User): void
    {
        const userToEdit = storage.users.find(u => u.login === username);

        if(userToEdit)
        {
            userToEdit.login = userContent.login;
            userToEdit.password = userContent.password;
            userToEdit.isAdmin = userContent.isAdmin;
            repo.updateStorage(JSON.stringify(storage));
        }
    }

    getUserByUsername(username: string): User 
    {
        return storage.users.find(u => u.login === username)
    }

    getUsers() : User[]
    {
        return storage.users;
    }

    deleteUser(username: string)
    {
        const userToDelete = storage.users.find(u => u.login === username);
        userToDelete.tagsCreatedIds.forEach(id => {
            const tagToDelete = storage.tags.find(t => t.id === id);
            storage.tags.splice(storage.tags.indexOf(tagToDelete), 1);
        });
        userToDelete.notesCreatedIds.forEach(id => {
            const noteToDelete = storage.notes.find(n => n.id === id);
            storage.notes.splice(storage.notes.indexOf(noteToDelete), 1);
        });
        storage.users.splice(storage.users.indexOf(userToDelete), 1);
        repo.updateStorage(JSON.stringify(storage));
    }
}

export default FileDataStorage;