import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
//local
import { appSettings } from '../../../settings'
//Models
import { Invitation } from '../models/invitation.model';


@Injectable()
export class InvitationService {
// Create headers
  options =  {
    headers: new HttpHeaders().set('Content-Type', 'application/json')
  };

  constructor(private http: HttpClient) { }

  updateInvitation(invitation: Invitation): Observable<Invitation>{
    return this.http.put<Invitation>(`${appSettings.apiBaseUrl}Maintenance/PutInvitation`, invitation, this.options);
  };
}
