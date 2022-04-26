import IDataStorage from './IDataStorage';
import Note from '../Models/Note';
import Tag from '../Models/Tag';
import User from '../Models/User';
import mongoose from 'mongoose';
import * as fs from 'fs';
var jsonConfig =JSON.parse(fs.readFileSync('../config.json', 'utf8'));

export class DatabaseDataStorage implements IDataStorage
{
    noteModel: any;
    userModel: any;
    tagModel: any;

    async populateDatabase(): Promise<void> 
    {
        if(!mongoose.connection.readyState)
        {
            await mongoose.connect(jsonConfig.mongoConnectionString);
        }

        const notes = await mongoose.connection.db.collection('notes').find({}).toArray();
        const tags = await mongoose.connection.db.collection('tags').find({}).toArray();
        const users = await mongoose.connection.db.collection('users').find({}).toArray();

        if(notes.length === 0 && tags.length === 0 && users.length === 0)
        {
            const noteSchema = new mongoose.Schema({
                title: String,
                content: String,
                createDate: String,
                tags: [{type: mongoose.Schema.Types.ObjectId, ref: 'tags'}],
                id: Number,
                private: Boolean
            });
            
            const tagSchema = new mongoose.Schema({
                name: String,
                id: Number
            });

            const userSchema = new mongoose.Schema({
                username: String,
                password: String,
                notesCreatedIds: [Number],
                notesSharedIds: [Number],
                id: Number
            });

            const noteModel = mongoose.model('notes', noteSchema);
            const tagModel = mongoose.model('tags', tagSchema);
            const userModel = mongoose.model('users', userSchema);

            const tag1 = new tagModel({
                id: 1,
                name: 'tag1'
            });
            await tag1.save();

            const tag2 = new tagModel({
                id: 2,
                name: 'tag2'
            });
            await tag2.save();

            const tag3 = new tagModel({
                id: 3,
                name: 'tag3'
            });
            await tag3.save();

            const note1 = new noteModel({
                id: 1,
                title: 'Note 1',
                content: 'This is note 1',
                createDate: '2020-01-01',
                tags: ['tag1', 'tag2'],
                private: false
            });
            await note1.save();

            const note2 = new noteModel({
                id: 2,
                title: 'Note 2',
                content: 'This is note 2',
                createDate: '2020-01-02',
                tags: ['tag1', 'tag3'],
                private: true
            });
            await note2.save();

            const note3 = new noteModel({
                id: 3,
                title: 'Note 3',
                content: 'This is note 3',
                createDate: '2020-01-03',
                tags: ['tag2', 'tag3'],
                private: false
            });
            await note3.save();

            const user1 = new userModel({
                id: 1,
                login: 'user1',
                password: 'user1',
                notesCreatedIds: [1],
                tagsCreatedIds: [1, 2],
                isAdmin: true,
                notesSharedToUserIds: [3]
            });
            await user1.save();

            const user2 = new userModel({
                id: 2,
                login: 'user2',
                password: 'user2',
                notesCreatedIds: [2, 3],
                tagsCreatedIds: [3],
                isAdmin: false,
                notesSharedToUserIds: [1]
            });
            await user2.save();
        }
    }

    addNote(note: Note, user: User): void 
    {
        this.noteModel.create(note);
        if (note.id!==undefined)
        user.notesCreatedIds.push(note.id);
    }

    getNotes(): Note[] 
    {
        return this.noteModel.find({}).exec();
    }

    getNoteById(noteId: number): Note 
    {
        return this.noteModel.findOne({id: noteId}).exec();
    }

    editNoteById(noteId: number, noteContent: Note): void 
    {
        this.noteModel.findOneAndUpdate({id: noteId}, noteContent).exec();
    }

    deleteNoteById(noteId: number): void 
    {
        this.noteModel.findOneAndDelete({id: noteId}).exec();
    }

    getPublicNotesByLogin(login: string): Note[] 
    {
        let notes: Note[] = [];
        const user = this.userModel.findOne({login: login}).exec();
        if (user)
        {
            user.notesCreatedIds.forEach((noteId: any) => {
                const note = this.noteModel.findOne({id: noteId}).exec();
                if (note && !note.private)
                {
                    notes.push(note);
                }
            });
        }

        return notes;
    }

    shareNote(noteId: number, login: string): void
    {
        const user = this.userModel.findOne({login: login}).exec();
        user.notesSharedToUserIds.push(noteId);
        user.save();
    }

    getNotesSharedToUserByLogin(login: string) : Note[] 
    {
        return this.userModel.findOne({login: login}).exec().notesSharedToUserIds;
    }


    addTag(tag: Tag, user : User): void 
    {
        this.tagModel.create(tag);
    }

    getTags(): Tag[] 
    {
        return this.tagModel.find({}).exec();
    }

    getTagById(tagId: number): Tag 
    {
        return this.tagModel.findOne({id: tagId}).exec();
    }

    editTagById(tagId: number, tagContent: Tag): void 
    {
        this.tagModel.findOneAndUpdate({id: tagId}, tagContent).exec();
    }

    deleteTagById(tagId: number): void 
    {
        this.tagModel.findOneAndDelete({id: tagId}).exec();
    }


    addUser(user: User): void 
    {
        this.userModel.create(user);
    }

    editUserByLogin(login: string, user: User): void 
    {
        this.userModel.findOneAndUpdate({login: login}, user).exec();
    }

    getUserByLogin(login: string): User 
    {
        return this.userModel.findOne({login: login}).exec();
    }

    getUsers(): User[] 
    {
        return this.userModel.find({}).exec();
    }

    deleteUserByLogin(login: string): void 
    {
        this.userModel.findOneAndDelete({login: login}).exec();
    }

}

export default DatabaseDataStorage;