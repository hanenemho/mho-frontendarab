import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Contribuable } from '../models/contribuable';
import { Facture } from '../models/facture';
import { Pointvente } from '../models/pointvente';
import { SearchFacture } from '../models/searchFacture';

const API_URL = environment.urlServer;
@Injectable({
    providedIn: 'root'
})
export class factureService {

    constructor(private http: HttpClient) {
    }
   
    getFactures = (codeAgent:String): Observable<Facture[]> => {
     
        return this.http.get<Facture[]>(API_URL + 'Facture/getFactureByCodeAgent/'+codeAgent);
    }
    getAllFactures = (codeAgent:String): Observable<Facture[]> => {
     
        return this.http.get<Facture[]>(API_URL + 'Facture/getAllFactureByCodeAgent/'+codeAgent);
    }
    getFactureByNumFact = (numFact:String): Observable<Facture> => {
     
        return this.http.get<Facture>(API_URL + 'Facture/getFactureByNumFact/'+numFact);
    }
    addFacture = (facture: Facture): Observable<any> => {
        return this.http.post<Facture>(API_URL + 'Facture/addFacture', facture);
    }
    validateFacture = (numFact: string): Observable<any> => {
        return this.http.post<any>(API_URL + 'Facture/validateFacture/'+numFact,null);
    }
    deleteFacture = (id: Number): Observable<any> => {
        return this.http.delete<any>(API_URL + 'Facture/deleteFacture/'+id);
    }
    rechercheFactures = (searchFact:SearchFacture): Observable<Facture[]> => {
     
        return this.http.post<Facture[]>(API_URL + 'Facture/rechercheFacture', searchFact);
    }
    getFactByMonth = (): Observable<Facture[]> => {
     
        return this.http.get<any>(API_URL + 'Facture/countbymonth');
    }
/* 
    rechercheFactures = (numFact:string, typFact:string): Observable<Facture[]> => {
     let params = new HttpParams()
        params = params.append('numFact', numFact)
        params = params.append('typFact',typFact)

        return this.http.get<Facture[]>(API_URL + 'Facture/rechercheFacture',{params});
    }
 */
}
