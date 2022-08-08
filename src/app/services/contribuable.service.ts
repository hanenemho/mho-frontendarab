import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Contribuable } from '../models/contribuable';
import { Pointvente } from '../models/pointvente';

const API_URL = environment.urlServer;
@Injectable({
    providedIn: 'root'
})
export class contribuableService {

    constructor(private http: HttpClient) {
    }
   
    postContribuable = (contribuable: Contribuable): Observable<any> => {
        return this.http.post<Contribuable>(API_URL + 'Contribuable/addContribuable', contribuable);
    }
    validateContribuable = (contribuable: Contribuable): Observable<any> => {
        return this.http.post<Contribuable>(API_URL + 'Contribuable/validateContribuable', contribuable);
    }
    ChangeState = (contribuable: Contribuable): Observable<any> => {
        return this.http.put<Contribuable>(API_URL + 'Contribuable/changeState', contribuable);
    }
    userVerification = (contribuable: Contribuable): Observable<any> => {
        return this.http.post<Contribuable>(API_URL + 'Contribuable/validateContribuable' ,contribuable)
    }
    getAll = (): Observable<Contribuable[]> => {
        return this.http.get<Contribuable[]>(API_URL + 'Contribuable/getall');
    }
    getAllContribuables = (matF:string): Observable<Contribuable> => {
        return this.http.get<Contribuable>(API_URL + 'Contribuable/getContribuableList/'+matF);
    }
    updateContribuable = (id:Number, contribuable: Contribuable): Observable<any> => {
        return this.http.put<any>(API_URL + 'Contribuable/updateContribuable/'+id, contribuable);
    }
    updatePointvente = (id:Number, pv: Pointvente): Observable<any> => {
        return this.http.put<any>(API_URL + 'PointVentes/updatePointvente/'+id, pv);
    }
}