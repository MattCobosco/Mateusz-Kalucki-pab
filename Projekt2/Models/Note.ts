import Tag from "./Tag";

class Note {
    title : string;
    content : string;
    createDate? : string;
    tags? : Tag[];
    id? : number;
    private? : boolean = true;

    constructor(note: Note)
    {
        this.title = note.title;
        this.content = note.content;
        this.createDate = note.createDate;
        this.tags = note.tags;
        this.id = note.id;
        this.private = note.private;
    }
}

export default Note;