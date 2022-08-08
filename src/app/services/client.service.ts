import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Client } from '../models/client';

const API_URL = environment.urlServer;
@Injectable({
    providedIn: 'root'
})
export class clientService {

    constructor(private http: HttpClient) {
    }

    getClient = (matFC:string): Observable<Client> => {
        return this.http.get<Client>(API_URL + 'Client/getClient/'+matFC);
    }

    getMyClients = (idc:Number): Observable<Client[]> => {
     
        return this.http.get<Client[]>(API_URL + 'Client/getAllClientsByCont/'+idc);
    }

    postClient = (matFC: Client): Observable<any> => {
        return this.http.post<Client>(API_URL + 'Client/addClient', matFC);
    }
    
    updateClient =  (id:Number, client: Client): Observable<boolean> => {
        return this.http.put<boolean>(API_URL + 'Client/updateClient/' + id, client);
    }

    deleteClient = (id:Number): Observable<boolean> => {
        return this.http.delete<boolean>(API_URL + 'Client/deleteClient/' + id);
    }
    
}