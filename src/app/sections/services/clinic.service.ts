import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
//local
import { appSettings } from '../../../settings'
//Models
import { Clinic } from '../models/clinic.model';


@Injectable()
export class ClinicService {
// Create headers
  options =  {
    headers: new HttpHeaders().set('Content-Type', 'application/json')
  };  

  constructor(private http: HttpClient) { }

  updateClinic(clinic: Clinic): Observable<Clinic>{
    return this.http.put<Clinic>(`${appSettings.apiBaseUrl}Maintenance/PutClinic`, clinic, this.options);
  };
  
}
