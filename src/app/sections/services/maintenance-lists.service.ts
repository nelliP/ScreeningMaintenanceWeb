import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
//local
import { appSettings } from '../../../settings'
//Models
import { MaintenanceLists } from '../models/maintenance-lists.model';


@Injectable()
export class MaintenanceListsService {
// Create headers
  options =  {
    headers: new HttpHeaders().set('Content-Type', 'application/json')
  };  

  constructor(private http: HttpClient) { }

  getmaintenanceLists(): Observable<MaintenanceLists> {
    return this.http.get<MaintenanceLists>(`${appSettings.apiBaseUrl}Maintenance/GetAllMaintenanceLists`);
  };
}
