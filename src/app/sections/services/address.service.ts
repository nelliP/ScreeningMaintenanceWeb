import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
//local
import { appSettings } from '../../../settings'
//Models
import { Address } from '../models/address.model';


@Injectable()
export class AddressService {
// Create headers
  options =  {
    headers: new HttpHeaders().set('Content-Type', 'application/json')
  };

  constructor(private http: HttpClient) { }

  updateAddress(address: Address): Observable<Address>{
    console.log('SERVICE put');
    return this.http.put<Address>(`${appSettings.apiBaseUrl}Maintenance/PutAddress`, address, this.options);
  };
}
