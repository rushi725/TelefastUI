export class Task {
    id: number
    name: string
    description: string
    duration: number
    approval: boolean
    constructor(id:number,name:string,description:string,duration:number,approval:boolean) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.duration = duration;
        this.approval = approval;
    }
}
