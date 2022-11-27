import { Injectable } from '@angular/core';
import {HttpClient,HttpParams, HttpErrorResponse, HttpStatusCode} from '@angular/common/http'; //servicio de angular para hacer requests
import {environment} from './../../environments/environment'
import { CreateUserDto ,User} from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private apiUrl= 'https://young-sands-07814.herokuapp.com/api/users';

  constructor(private http:HttpClient) { }

  create(dto: CreateUserDto){
    return this.http.post(this.apiUrl,dto);
  }

  getAll(){
    return this.http.get<User[]>(this.apiUrl);
  }
}
