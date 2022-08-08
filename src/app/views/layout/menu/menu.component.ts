import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';
import { Router } from '@angular/router';
import { isNullOrUndefined } from 'util';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  isAdmin: boolean;
   matF: String;
  constructor(private toastr: ToastrService,
    private storage: LocalStorageService,
    private router: Router,
    private local:LocalStorageService,) {
  }

  ngOnInit(): void {
     this.matF= this.local.retrieve("userConnect").contribuable.matriculeFiscale;

  }

  deconnecter() {
    //this.storage.store('client', null);
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('token');

    this.router.navigate(['/user/login']);
  }
  prises(){
         this.router.routeReuseStrategy.shouldReuseRoute=()=>false;
         this.router.onSameUrlNavigation='reload'
         this.router.navigate(['/dashboard/facture']);

  }
}
