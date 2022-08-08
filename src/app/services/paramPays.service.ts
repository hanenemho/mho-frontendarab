import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Parampays } from '../models/parampays';

const API_URL = environment.urlServer;
@Injectable({
    providedIn: 'root'
})
export class paramPaysService {

    constructor(private http: HttpClient) {
    }
    getParamPays = (): Observable<Parampays[]> => {

        return this.http.get<Parampays[]>(API_URL + 'ParamPay/getParamPays');
    }
    
    postParamPays = (parampays: Parampays): Observable<any> => {
        return this.http.post<Parampays>(API_URL + 'ParamPay/addParamPays', parampays);
    }

    deletetParam = (code:string): Observable<boolean> => {
        return this.http.delete<boolean>(API_URL + 'ParamPay/deletePrmPays/' + code);
    }
}