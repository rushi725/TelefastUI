import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  constructor() { }

  teams = [
    {
      id: 1,
      name: 'Team 1',
      desc: 'desc 1'
    },
    {
      id: 1,
      name: 'Team 2',
      desc: 'desc 1'
    },
    {
      id: 1,
      name: 'Team 3',
      desc: 'desc 1'
    },
    {
      id: 1,
      name: 'Team 4',
      desc: 'desc 1'
    },
    {
      id: 1,
      name: 'Team 5',
      desc: 'desc 1'
    },
  ];
  teamStream: Subject<any> = new Subject();
  getTeamStream() {
    return this.teamStream;
  }

  getTeams() {
    return this.teams;
  }


  addTeam(team) {
    this.teams.push(team);
    this.publishStream();
  }

  publishStream() {
    this.teamStream.next({teams: this.teams});
  }
}
