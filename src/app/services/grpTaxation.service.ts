import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Groupetaxation } from '../models/groupetaxation';

const API_URL = environment.urlServer;
@Injectable({
    providedIn: 'root'
})
export class grpTaxationService {

    constructor(private http: HttpClient) {
    }
   
    getGrpTaxations = (): Observable<Groupetaxation[]> => {

        return this.http.get<Groupetaxation[]>(API_URL + 'GrpTax/getGrpTaxation');
    }

    postGrpTaxation = (Groupetaxation: Groupetaxation): Observable<any> => {
        return this.http.post<Groupetaxation>(API_URL + 'GrpTax/addGrpTaxation', Groupetaxation);
    }

    updateGrpTax = (id:Number, Groupetaxation: Groupetaxation): Observable<boolean> => {
        return this.http.put<boolean>(API_URL + 'GrpTax/updateGrpTaxation/' + id, Groupetaxation);
    }

    deletetgrpTax = (id:Number): Observable<boolean> => {
        return this.http.delete<boolean>(API_URL + 'GrpTax/deleteGrp/' + id);
    }
}