import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  constructor(private http: HttpClient) { }

  teams: Array<any> = [];
  getTeamStream() {
    const api = 'http://localhost:8081/sfs/teams';
    return this.http.get(api);
  }

  getTeams() {
    const api = 'http://localhost:8081/sfs/teams';
    this.http.get(api).subscribe((e: any) => this.teams = e);
    console.log(this.teams);
    return this.teams;
  }


  addTeam(team) {
    const api = 'http://localhost:8081/sfs/teams';
    this.http.post(api, team).subscribe();
  }
}
