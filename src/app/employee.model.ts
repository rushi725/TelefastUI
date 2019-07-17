import { ThrowStmt } from '@angular/compiler';
import { Team } from './team.model';

export class Employee {
    id : number
    team : Team
    firstName : string
    lastName : string
    empRole : string
    empAddress : string
    empContactNo : string
    availableStatus : boolean 

    constructor(id : number,team : Team,firstName : string,lastName : string,empRole : string,empAddress : string,empContactNo : string,availableStatus : boolean) {
        this.id = id;
        this.team = team;
        this.firstName = firstName;
        this.lastName = lastName;
        this.empAddress = empAddress;
        this.empContactNo = empContactNo;
        this.empRole = empRole;
        this.availableStatus = availableStatus;
    }
}
