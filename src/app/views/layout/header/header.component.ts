import { isNull } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  UserLogin:String;
  credentials:any;
  
  constructor(private storage:LocalStorageService,
    private router:Router) { }
 items : MenuItem[]
  ngOnInit(): void {
    this.credentials= this.storage.retrieve("userConnect");
    console.log(this.credentials.libellePoint);


   this.items = [
    {
      label:'Point : ' + this.credentials.libellePoint ,
      items:[   
     ]  
   },      
     {
     label:' agent : ' + this.credentials.nomAgent,
     items:[{
       
       label:'Paramètres',
       icon:'pi pi-cog',
       routerLink:'settings'
     },
     {
        label:'Se déconnecter',
        icon:'pi pi-sign-out',
        command:()=>{ this.deconnecter(); }
      }
    ]  
  }      
   ];
   

  }

  deconnecter() {
    //this.storage.store('client', null);
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('token');

    this.router.navigate(['/user/login']);
  }

  logOut(){
    //this.storage.store('client', null);
    //this.storage.clear();    
    this.router.navigate(['/user/login']);
    
  }
}
