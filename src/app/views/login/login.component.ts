import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { TokenStorageService } from 'src/app/util/token-storage.service';
import { Pointvente } from 'src/app/models/pointvente';
import { Contribuable } from 'src/app/models/contribuable';
import { authentificationService } from 'src/app/services/authentification.service';
import { MessageService } from 'primeng/api/public_api';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  contribuable :Contribuable;
  showBack: boolean = true;
  attribute: any;
  test:any;
  pointVenteList :Array<Pointvente>=[]
  selectedPointVente :Pointvente
  constructor(private formBuilder: FormBuilder,
    private storage: LocalStorageService,
    private router: Router,
    private serviceToken:TokenStorageService,
    private authentificationService:authentificationService,
    private toastreService: ToastrService,
    private local:LocalStorageService
  ) {

  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.loginForm = this.formBuilder.group({
      adminMail: ['', Validators.compose([Validators.required])],
      adminPassword: [{value:'',disabled:true}, Validators.compose([Validators.required])],
      selectedPointVente: [{value:'',disabled:true},Validators.compose([Validators.required])]
    });
  }

  authentificationClient() {
    console.log(this.loginForm.controls['selectedPointVente'].value)
    this.authentificationService.authentification(this.loginForm.controls['selectedPointVente'].value,
    this.loginForm.controls['adminPassword'].value).subscribe(
    (data)=>{
          console.log(data)
      this.local.store("userConnect",data.user)
      this.router.navigate(['/dashboard/facture']);

    },
     error=>{
       this.toastreService.error("Authentification invalide")
      console.log("erorr")
    })
    
  }



  verifNif(){
    
   console.log(this.loginForm.controls['adminMail'].value)
   this.authentificationService.getPointVentes(this.loginForm.controls['adminMail'].value).subscribe(
       (data:Pointvente[])=>{
         if(data.length !=0){
               this.loginForm.controls['selectedPointVente'].enable()
               this.loginForm.controls['adminPassword'].enable()
              this.pointVenteList=data
              console.log(data)
       }else{
        this.toastreService.error("Contribuable n'aucune point de vente")
       }
       })


  }
}
