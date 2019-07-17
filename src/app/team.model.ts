export class Team {
    id: number
    name: string
    description: string

    constructor(id:number,name:string,description:string) {
        this.id=id;
        this.description = description;
        this.name = name;
    }
}
