import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  constructor(private http: HttpClient) { }

  teams: Array<any> = [];
  teamStream: Subject<any> = new Subject();
  getTeamStream() {
    const api = 'http://localhost:8081/sfs/teams';
    this.http.get(api).subscribe((e: any) => this.teams = e)
    return this.http.get(api);
  }

  getTeams() {
    return this.teamStream;
  }


  addTeam(team) {
    const api = 'http://localhost:8081/sfs/teams';
    this.http.post(api, team).subscribe((e: any) => this.teams.push(e));
    this.teamStream.next(this.teams);
  }
}
