import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
//rxjs
import { Observable } from 'rxjs/Observable';
//local
import { appSettings } from '../../../settings'
//Models
import { Maintenance } from '../models/maintenance.model';
import { Clinic } from '../models/clinic.model';

@Injectable()
export class MaintenanceService {
// Create headers
options =  {
  headers: new HttpHeaders().set('Content-Type', 'application/json')
};
  constructor(private http: HttpClient) { }

  createMaintenance(regionDivision: string, screeningType:string): Observable<Maintenance> {
    const params = new HttpParams().set('regionDivision', regionDivision).set('screeningType', screeningType)
    return this.http.get<Maintenance>
    (`${appSettings.apiBaseUrl}Maintenance/CreateMaintenance/`, {params});
  };

  updateNewMaintenance(maintenance: Maintenance): Observable<Clinic> {
    return this.http.put<Clinic>(`${appSettings.apiBaseUrl}Maintenance/PutMaintenance/`, maintenance, this.options);
  };
}