import { Component, OnInit} from '@angular/core';
import { contribuableService } from 'src/app/services/contribuable.service';
import { Contribuable } from 'src/app/models/contribuable';
import { Pointvente } from 'src/app/models/pointvente';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Parampays } from 'src/app/models/parampays';
import { paramPaysService } from 'src/app/services/paramPays.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerModule, NgxSpinnerService } from "ngx-spinner";
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  contribuable: Contribuable;
  pointVenteList: Array<Pointvente> = []
  pointVente: Pointvente
  pointVenteDialog: boolean;
  confirmationDialog: boolean;
  submittedd: boolean;
  submitted: boolean;
  password: string;
  strongRegex: RegExp;
  paramPaysList: Array<Parampays> = []
  telmask="99-999-999"
  

  constructor(private contribuableService: contribuableService, private router: Router, private messageService: MessageService,
    private confirmationService: ConfirmationService, private paramPaysService: paramPaysService,private toastreService: ToastrService,
     private spinner: NgxSpinnerService, private translateService: TranslateService) { }

  ngOnInit(): void {
    this.contribuable = {}
    this.paramPaysService.getParamPays().subscribe((data: Parampays[]) => {
      console.log(data)
      this.paramPaysList = data
    })
  }

  register() {
    this.submitted = true
     if (!this.contribuable.matriculeFiscale ||
      !this.contribuable.raisonSocial ||
      !this.contribuable.numRegistre ||
      !this.contribuable.numtel ||
      !this.contribuable.email
    ) {
      return;
    }
    this.contribuable.paramPays = this.paramPaysList[0];
    //var testObject={'idValue':1,'viewValue':'coco'};
    //this.router.navigate(['/user/verification'],{state:this.contribuable});
    this.spinner.show();
    this.contribuableService.postContribuable(this.contribuable).subscribe((data) => {
      if(data!==null){
        this.router.navigate(['/user/verification'],{state:data});
        this.spinner.hide();
      }else{
        console.log('errooooooor'); 
      }
      setTimeout(()=>{
        this.spinner.hide();
      },10000)
    }, error => {
      this.toastreService.error(error.error.message);
      this.spinner.hide()
      this.toastreService.error("problem d'envoi d'email!");
    } 
    )
  }

  hideDialog() {
    this.pointVenteDialog = false;
    this.submittedd = false;
  }
  hideDialog2() {
    this.confirmationDialog = false;
  }

  ConfirmRegistration() {
    this.submitted = true
     if (!this.contribuable.matriculeFiscale ||
      !this.contribuable.raisonSocial ||
      !this.contribuable.numRegistre ||
      !this.contribuable.numtel ||
      !this.contribuable.email 
     
    ) {
      return;
    }
    this.confirmationDialog = true;

  }


  addNewPointVentes() {
    this.pointVente = new Pointvente();
    this.password=null
    this.pointVenteDialog = true

  }
  deletepv(pv: Pointvente) {

    this.confirmationService.confirm({
      message: 'Etes-vous sûr de vouloir supprimer ' + pv.libellePoint + '?',
      acceptLabel: 'Oui',
      rejectLabel: 'Non',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.pointVenteList = this.pointVenteList.filter(val => val.id_list !== pv.id_list);
        this.pointVente = {};
        this.messageService.add({ severity: 'success', summary: 'Succés', detail: 'Point de vente supprimer', life: 3000 });
      }
    });

  }
  updatepv(pv: Pointvente) {

    this.pointVente = { ...pv };
    this.pointVenteDialog = true;

  }

  savepv() {
    this.submittedd = true;
    if (
      !this.pointVente.codeAgent ||
      !this.pointVente.libellePoint ||
      !this.pointVente.motPasse ||
      !this.pointVente.nomAgent ||
      !this.pointVente.email ||
      !this.pointVente.motPasse
    ) {
      return;
    }
    if(this.validateRegexMdp()){
      return;
    }
    if (this.pointVente.id_list) {
      this.pointVenteList[this.findIndexById(this.pointVente.id_list, this.pointVenteList)] = this.pointVente
      this.messageService.add({ severity: 'success', summary: 'Succés', detail: 'Point de vente modifier', life: 3000 });
    } else if(!this.pointVenteList.some((pv)=> pv.codeAgent == this.pointVente.codeAgent)){
      this.pointVente.id_list = this.createId();
    this.pointVenteList.push(this.pointVente);
    this.pointVenteList = [...this.pointVenteList];
    this.pointVenteDialog = false;
    this.contribuable.pointVente = this.pointVenteList
    this.pointVente = {};
    this.toastreService.success("Point de vente ajouter!");
    this.submittedd = false;
    }else{
      this.toastreService.error("Code Agent déja existe!");
    }

  }

  findIndexById(id: string, list: Array<any>): number {
    let index = -1;
    for (let i = 0; i < list.length; i++) {
      if (list[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  }

  createId(): string {
    let id = '';
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }

  annuler() {   
  if(confirm(this.translateService.instant('enregistrement.dialog-confirm-annuler'))){
    this.router.navigate(['/user/login']);
  }
  }

  validateRegexMdp(){
    this.strongRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*+.-/])(?=.{8,})');
    if(!this.strongRegex.test(this.pointVente.motPasse)){
      return true;
    }else{
      return false;
    }
  }


}
