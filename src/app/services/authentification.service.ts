import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Pointvente } from '../models/pointvente';
import { map } from 'rxjs/operators';


const API_URL = environment.urlServer;
@Injectable({
    providedIn: 'root'
})
export class authentificationService {
     
    constructor(private http: HttpClient) {
    }
    getPointVentes= (matricule_fiscale:string): Observable<Pointvente[]> => {

        return this.http.get<Pointvente[]>(API_URL + 'PointVentes/getPointVente/'+matricule_fiscale);
    }
    

    authentification(username:string,password:string)   {
        console.log(username)
        console.log(password)
        return this.http.post<any>(API_URL + 'Contribuable/login', {username,password},{}).pipe(
           map(userData =>{
               console.log(userData)
                 sessionStorage.setItem("username",username);
                 let tokenStr="Bearer "+userData.jwt.jwttoken;
                 sessionStorage.setItem("token",tokenStr);
                 return userData;
                 
           })
        );
    }

    isUserLoggedIn(){

        let user =sessionStorage.getItem("username");

        return !(user===null)
    }
    
    sendPwdChangeCode= (pointVente:Pointvente): Observable<any> => {

        return this.http.post<Pointvente>(API_URL + 'Contribuable/sendPwdChangeCode/',pointVente);
    }

    updatePassword= (code:string,newPwd:string,codePoint:string): Observable<any> => {

        return this.http.post<any>(API_URL + 'Contribuable/updatePassword',{code,newPwd,codePoint});
    }
}