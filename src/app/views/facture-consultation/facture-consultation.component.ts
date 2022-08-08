import { Component, OnInit } from '@angular/core';
import { Facture } from 'src/app/models/facture';
import { factureService } from 'src/app/services/facture.service';
import { Pointvente } from 'src/app/models/pointvente';
import { LocalStorageService } from 'ngx-webstorage';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmationService, MessageService } from 'primeng/api';
import { StaticList } from 'src/app/models/staticList';
import { FactureStateList } from 'src/app/models/factureStateList';
import { SearchFacture } from 'src/app/models/searchFacture';
import { error } from 'protractor';

@Component({
  selector: 'app-facture-consultation',
  templateUrl: './facture-consultation.component.html',
  styleUrls: ['./facture-consultation.component.scss']
})
export class FactureConsultationComponent implements OnInit {
  pv:any;
  factstate:any;
  factureList:Array<Facture>=[]
  fctDialog:boolean
  facture:Facture
  staticList: StaticList[]
  selectedStaticList: StaticList
  stateList: FactureStateList[]
  selectedStateList: FactureStateList
  maxDate: Date;
  searchFact: SearchFacture;
  numeroFacture:string
  dateRange:string
  constructor(private factureService:factureService, private storage:LocalStorageService, 
    private spinner: NgxSpinnerService, private confirmationService: ConfirmationService,
    private messageService: MessageService) {
    this.staticList = [
        { id: '0', code: 'Tout' },
        { id: '1', code: 'Vente' },
        { id: '2', code: 'Avoir' }, 
        { id: '3', code: 'Acompte'}
    ]
 
    this.stateList = [
      {id: '0', etat: 'Tout'},
      {id: '1', etat: 'ENREGISTRER'},
      {id: '2', etat: 'VALIDER'},
      {id: '3', etat: 'EN_ATTENTE'},
      {id: '4', etat: 'ENVOYER'}
    ]
     }
  ngOnInit(): void {
    this.spinner.show();
    this.pv=this.storage.retrieve(("userConnect"));
    this.factureService.getFactures(this.pv.codeAgent).subscribe((data:Facture[])=>{     
       this.factureList=data
       this.spinner.hide();
      
    },error =>{ setTimeout(() => {
      this.spinner.hide();
     },4000);})
    this.searchFact={}
    let today = new Date();
    this.maxDate = new Date();
    this.maxDate.setDate(today.getDate());

    this.selectedStateList = {}
    this.selectedStaticList = {}

    this.dateRange=null
  }
 
  deleteFacture(fct:Facture){
    this.confirmationService.confirm({
      message: 'voulez vous supprimer ' + fct.numFact + '?',
      header: 'Confirmer',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
          this.factureService.deleteFacture(fct.id).subscribe(()=>this.ngOnInit());
          this.messageService.add({severity:'success', summary: 'Succés', detail: 'Facture supprimer', life: 3000});
        }
  });
  }
  validerFacture(fct:Facture){
    this.confirmationService.confirm({
      message: 'voulez vous valider ' + fct.numFact + '?',
      header: 'Confirmer',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
          this.factureService.validateFacture(fct.numFact).subscribe(()=>this.ngOnInit());
          this.messageService.add({severity:'success', summary: 'Succés', detail: 'Facture valider', life: 3000});
          this.fctDialog = false;
        }
  });
  }
  consultFct(fct:Facture){
     this.fctDialog=true
     this.facture=fct
     console.log(fct);
  }

  hideDialog() {
    this.fctDialog = false;
  }

  factureSearch(){
    this.searchFact = new SearchFacture()   
    if(this.selectedStateList.id == '0' ){
      this.selectedStateList.etat = null
    }
    if(this.selectedStaticList.id == '0' ){
      this.selectedStaticList.code =null
    }
    this.searchFact.etat = this.selectedStateList.etat
    this.searchFact.typFact = this.selectedStaticList.code
    this.searchFact.numFact = this.numeroFacture
    if(this.dateRange != null){
    this.searchFact.minDate = this.dateRange[0]
    this.searchFact.maxDate = this.dateRange[1]
  }
    this.factureService.rechercheFactures(this.searchFact).subscribe((data)=>{
      console.log(data)
      this.factureList = data
    });     
  }
  
  clearSearch(){
    this.numeroFacture = ""
    this.selectedStateList = {}
    this.selectedStaticList = {}
    this.dateRange = ""
  }


}
