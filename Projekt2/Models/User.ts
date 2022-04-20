import jwt from 'jsonwebtoken';

class User
{
    id?: number;
    login: string;
    password: string;
    notesCreatedIds: number[];
    tagsCreatedIds : number[];
    isAdmin: boolean;
    notesSharedToUserIds: number[];

    constructor(user?: User)
    {
        if(user)
        {
            this.id = user.id;
            this.login = user.login;
            this.password = user.password;
            this.notesCreatedIds = user.notesCreatedIds;
            this.tagsCreatedIds = user.tagsCreatedIds;
            this.isAdmin = user.isAdmin;
            this.notesSharedToUserIds = user.notesSharedToUserIds;
        }
        else 
        {
            this.login = '';
            this.password = '';
            this.notesCreatedIds = [];
            this.tagsCreatedIds = [];
            this.isAdmin = false;
            this.notesSharedToUserIds = [];
        }
    }

    public UserIsAuthorized(authData: string, secret: string) : boolean
    {
        const token = authData.split(' ')[1];
        const payload = jwt.verify(token, secret);
        let checkValue = "";
        if(this.id)
        {
            checkValue = this.id.toString();
        }
        if(this.id && payload == checkValue)
            return true;
        else 
            return false;
    }
}

export default User;