import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import { appSettings } from '../../../settings';

import { User } from "./../models/user.model";


@Injectable()
export class UsersService {
  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${appSettings.apiBaseUrl}/users`);
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${appSettings.apiBaseUrl}/users/${id}`);
  }

  saveUser(user: User) {
    return this.http.post(`${appSettings.apiBaseUrl}/users`, user);
  }

  deleteUser(id: number) {
    return this.http.delete(`${appSettings.apiBaseUrl}/users/${id}`);
  }
}