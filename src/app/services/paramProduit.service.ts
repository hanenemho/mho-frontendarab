import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Groupetaxation } from '../models/groupetaxation';
import { ParamProduit } from '../models/paramProduit';

const API_URL = environment.urlServer;
@Injectable({
    providedIn: 'root'
})
export class paramProduitService {

    constructor(private http: HttpClient) {
    }
   
    getparamProduits = (): Observable<ParamProduit[]> => {

        return this.http.get<ParamProduit[]>(API_URL + 'ParamProduits/getParamProduit');
    }
    postParamProduit = (paramproduit: ParamProduit): Observable<any> => {
        return this.http.post<ParamProduit>(API_URL + 'ParamProduits/addParamProduit', paramproduit);
    }

    updateParam = (id:Number,paramproduit: ParamProduit): Observable<boolean> => {
        return this.http.put<boolean>(API_URL + 'ParamProduits/updateParamProduit/' + id,paramproduit);
    }

    deletetParam = (code:string): Observable<boolean> => {
        return this.http.delete<boolean>(API_URL + 'ParamProduits/deleteParamProduit/' + code);
    }

    getMyProduits = (id:Number): Observable<ParamProduit[]> => {

        return this.http.get<ParamProduit[]>(API_URL + 'ParamProduits/getmyproduits/'+id);
    }

   
}