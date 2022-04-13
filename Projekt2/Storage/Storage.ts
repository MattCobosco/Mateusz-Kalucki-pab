import Note from '../Models/Note';
import Tag from '../Models/Tag';
import User from '../Models/User';

class Storage
{
    notes : Note[] = [];
    tags : Tag[] = [];
    users : User[] = [];

    constructor(data?: Storage)
    {
        if(data)
        {
            this.notes = data.notes;
            this.tags = data.tags;
            this.users = data.users;
        }
    }
}

export default Storage;