import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { TokenStorageService } from 'src/app/util/token-storage.service';
import { Pointvente } from 'src/app/models/pointvente';
import { Contribuable } from 'src/app/models/contribuable';
import { authentificationService } from 'src/app/services/authentification.service';
import { MessageService } from 'primeng/api';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-changement-password',
  templateUrl: './changement-password.component.html',
  styleUrls: ['./changement-password.component.scss']
})
export class ChangementPasswordComponent implements OnInit {
  loginForm: FormGroup;
  contribuable :Contribuable;
  showBack: boolean = true;
  attribute: any;
  pointVenteList :Array<Pointvente>=[]
  submitted:boolean=false;
  selectedPointVente :Pointvente
  constructor(private formBuilder: FormBuilder,
    private storage: LocalStorageService,
    private router: Router,
    private messageService: MessageService,
    private serviceToken:TokenStorageService,
    private authentificationService:authentificationService,
    private toastreService: ToastrService,
    private local:LocalStorageService
  ) {

  }

  ngOnInit(): void {
    this.selectedPointVente = history.state;
    this.initForm();
  }

  initForm() {
    this.loginForm = this.formBuilder.group({
      code: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }

  

  updatepwd(){
    this.submitted=true
    if (this.loginForm.invalid)
    return ;
    let pv:string;
    pv='fhfh'
    this.authentificationService.
             updatePassword(this.loginForm.controls['code'].value,this.loginForm.controls['password'].value ,this.selectedPointVente.codeAgent).
             subscribe((data)=>{
              this.messageService.add({ severity: 'success', summary: 'Succés', detail: 'Mot de passe réinitialiser avec succes', life: 3000 });
              this.router.navigate(['/user/login']).then(()=>{
                this.toastreService.success("Mot de passe réinitialiser avec succes!");
              });
             },error=>{
              this.toastreService.error(error.error.message);

             })
      

     

  }
  cancelUpdates(){

    this.router.navigate(['/user/login']); 
  }

  onPasswordChanges(){
     if (this.loginForm.controls['password'].value == this.loginForm.controls['confirmPassword'].value){
       this.loginForm.controls['confirmPassword'].setErrors(null)
     }else{
      this.loginForm.controls['confirmPassword'].setErrors({mismatch:true})
     }

  }

  get f(){
    return this.loginForm.controls;
  }
  
}
