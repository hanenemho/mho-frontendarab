import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { TokenStorageService } from 'src/app/util/token-storage.service';
import { Pointvente } from 'src/app/models/pointvente';
import { Contribuable } from 'src/app/models/contribuable';
import { authentificationService } from 'src/app/services/authentification.service';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-password-oublie',
  templateUrl: './password-oublie.component.html',
  styleUrls: ['./password-oublie.component.scss']
})
export class PasswordOublieComponent implements OnInit {
  loginForm: FormGroup;
  contribuable :Contribuable;
  showBack: boolean = true;
  attribute: any;
  submitted:boolean=false;
  pointVenteList :Array<Pointvente>=[]
  selectedPointVente :Pointvente
  constructor(private formBuilder: FormBuilder,
    private storage: LocalStorageService,
    private router: Router,
    private serviceToken:TokenStorageService,
    private authentificationService:authentificationService,
    private toastreService: ToastrService,
    private local:LocalStorageService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {

  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.loginForm = this.formBuilder.group({
      matFiscale: ['', Validators.required ],
      selectedPointVente: [{value:'pointv',disabled:true},Validators.required]
    });
  }


  verifNif(){
       this.authentificationService.getPointVentes(this.loginForm.controls['matFiscale'].value).subscribe(
       (data:Pointvente[])=>{
         if(data.length !=0){
               this.loginForm.controls['selectedPointVente'].enable()
              this.pointVenteList=data
              console.log(data)
       }else{
        this.toastreService.error("Contribuable n'aucune point de vente")
       }
      })
  }

  sendCode(){
    this.submitted=true
    if (this.loginForm.invalid)
    return ;
    this.authentificationService.sendPwdChangeCode(this.loginForm.controls['selectedPointVente'].value).
    subscribe((data)=>{
      this.confirmationService.confirm({
        message: 'Etes-vous sûr de vouloir réinitialiser le mot de passe pour la point de vente ?',
        acceptLabel: 'Oui',
        rejectLabel: 'Non',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.messageService.add({ severity: 'success', summary: 'Succés', detail: 'Code de récuertion envoyer avec succes', life: 5000 });
          this.router.navigate(['/user/changePwd'],{state:this.loginForm.controls['selectedPointVente'].value});
        }
      });

     },error=>{

      this.toastreService.error(error)

     })
    
  }

  cancelUpdates(){
    this.router.navigate(['/user/login']); 
  }
}
