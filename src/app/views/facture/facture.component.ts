import { Component, OnInit } from '@angular/core';
import { Facture } from 'src/app/models/facture';
import { factureService } from 'src/app/services/facture.service';
import { StaticList } from 'src/app/models/staticList';
import * as moment from 'moment';
import { Detailsfacture } from 'src/app/models/detailsfacture';
import { MessageService, ConfirmationService } from 'primeng/api';
import { grpTaxationService } from 'src/app/services/grpTaxation.service';
import { Groupetaxation } from 'src/app/models/groupetaxation';
import { LocalStorageService } from 'ngx-webstorage';
import { contribuableService } from 'src/app/services/contribuable.service';
import { Contribuable } from 'src/app/models/contribuable';
import { Router } from '@angular/router';
import { paramPaysService } from 'src/app/services/paramPays.service';
import { paramProduitService } from 'src/app/services/paramProduit.service';
import { ParamProduit } from 'src/app/models/paramProduit';
import { subTotauxFacture } from 'src/app/models/subTotauxFacture';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { SubTotauxResponse } from 'src/app/models/subTotauxResponse';
import { NgxSpinnerService } from 'ngx-spinner';
import { Parampays } from 'src/app/models/parampays';
import { Client } from 'src/app/models/client';
import { clientService } from 'src/app/services/client.service';
import { ParamProduitComponent } from '../param-produit/param-produit.component';

@Component({
  selector: 'app-facture',
  templateUrl: './facture.component.html',
  styleUrls: ['./facture.component.scss']
})
export class FactureComponent implements OnInit {
  facture: Facture
  staticList: StaticList[]
  selectedStaticList: StaticList
  listDetailFacture: Detailsfacture[];
  detailsFacture: Detailsfacture;
  detailsFactureList: Array<Detailsfacture> = [];
  paramPaysList: Array<Parampays> = []

  groupetaxationItems: Groupetaxation[]
  groupeTaxationSelected: Groupetaxation;
  ParamProduitItems: ParamProduit[];
  paramProduit: ParamProduit;
  filteredParamProduit:ParamProduit[]
  numfactureAvoir:String;
  factureAvoir : Facture

  display: boolean = false;
  detailsDialog: boolean;
  FactureAvoirDialog:boolean;
  submitted: boolean;
  submittedD: boolean;
  toggle: boolean = true;
  subtotauxDisabled: boolean = true;
  validaDisabled: boolean = true;

  clientDisabled: boolean = false;
  montant: number = 0;
  montantHT: number = 0;
  montantTTC: number = 0;

  client: Client;
  devise: string;
  contpays: string;
  order: number = 1
  subTotauxFactureList: Array<subTotauxFacture> = [];
  subTotauxFacture: subTotauxFacture;
  montantTOTALS: string
  montantTaxSpec: string
  currentcont:any
  checkedclient: boolean = true;

  factAvoirDate:string
  loadSpinner: boolean = false;
  maxDate: Date;
  constructor(private factureService: factureService, private router: Router, private local: LocalStorageService, private messageService: MessageService,
    private confirmationService: ConfirmationService, private grpTaxationService: grpTaxationService,
    private contribuableService: contribuableService, private paramProduitService: paramProduitService,
    private spinner: NgxSpinnerService, private paramPaysService: paramPaysService, private storage:LocalStorageService, 
    private clientService: clientService) {
    this.staticList = [{ id: '1', code: 'Vente' },
    { id: '2', code: 'Avoir' }, { id: '3', code: 'Acompte' }
    ]
  }

  ngOnInit(): void {
    this.facture = {}
    this.facture.isSaved = false
    this.selectedStaticList = this.staticList[0]
    this.client = {}
    this.currentcont = this.local.retrieve("userConnect").contribuable
    this.devise = this.local.retrieve("userConnect").codeDevise
    this.contpays= this.local.retrieve("userConnect").contribuable.paramPays.id
    let momentVariable = moment(new Date(), 'DD-MM-YYYY');
    // this.facture.dateFact=  momentVariable.format('DD/MM/YYYY')
    this.detailsFactureList = []
    let today = new Date();
    this.maxDate = new Date();
    this.maxDate.setDate(today.getDate());

    this.paramPaysService.getParamPays().subscribe((data: Parampays[]) => {
      this.paramPaysList = data
    })
  }

  hideDialog() {
    this.detailsDialog = false;
    this.submittedD = false;
  }


  saveFacture() {
    debugger;
    this.submitted = true;
    //let momentVariable = moment(this.facture.dateFact,'DD-MM-YYYY');
    //this.facture.dateFact=  momentVariable.format('DD/MM/YYYY')
    this.facture.datFactInit = this.factAvoirDate || this.facture.datFactInit
    this.facture.typFact = this.selectedStaticList.code
    this.facture.contribuable = this.local.retrieve("userConnect").contribuable
    this.facture.pointVente = this.local.retrieve("userConnect")
    this.client.contribuable=this.facture.contribuable
    this.facture.client = this.client
    this.facture.isValid = false
    this.facture.factureAvoir = this.factureAvoir
    this.spinner.show();
    if (this.detailsFactureList.length != 0) {
      this.factureService.addFacture(this.facture).subscribe((data) => {
        
        console.log(data)
        this.subtotauxDisabled = !this.subtotauxDisabled
        this.subTotauxFactureList = data.subTotauxFactureList
        this.facture.montantTOTALS = data.montantTotal
        this.facture.montantTaxSpec = data.montantTaxSpec
        this.facture.isSaved = true
        this.spinner.hide();
        this.messageService.add({ severity: 'success', summary: 'Succés', detail: 'Facture enregistrer avec succés', life: 1000 });

      }, error=>{
        this.spinner.hide();
        this.messageService.add({ severity: 'error', summary: 'Erreur', detail: "Erreur lors de l'enregistrement de la facture", life: 1000 });
      });
    } else {
      this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'La facture doit avoir au moins un article', life: 1000 });

    }
  }




  addNewDetails() {
    this.detailsFacture = new Detailsfacture();
    this.subTotauxFacture = new subTotauxFacture();
    this.groupeTaxationSelected = new Groupetaxation();
    this.paramProduit = new ParamProduit();
    this.groupeTaxationSelected = this.paramProduit.groupeTaxation
    this.detailsDialog = true
    this.detailsFacture.orderProduit = this.order.toString()
    this.grpTaxationService.getGrpTaxations().subscribe((data: Groupetaxation[]) => {
      const results = data.filter(result=>result.paramPays.id==this.contpays)
      this.groupetaxationItems = results
    })
    this.paramProduitService.getparamProduits().subscribe((data: ParamProduit[]) => {
    this.ParamProduitItems = data.filter(pp=>pp.contribuable.id == this.currentcont.id)
      console.log(this.ParamProduitItems)
    })
    
  }
  saveDetails() {
  debugger
    this.submittedD = true;
    console.log(this.groupeTaxationSelected)
    this.paramProduit.contribuable = this.local.retrieve("userConnect").contribuable
    this.groupeTaxationSelected = this.paramProduit.groupeTaxation
    this.detailsFacture.groupeTaxation = this.groupeTaxationSelected
    this.detailsFacture.groupeTaxationLib = this.groupeTaxationSelected.libGrp
    this.detailsFacture.paramProduit = this.paramProduit
    this.detailsFacture.refProduit = this.paramProduit.codeProduit
    this.detailsFacture.libProduit = this.paramProduit.libProduit
    this.detailsFacture.prixUnit = this.paramProduit.prixUnitaire
    if (this.detailsFacture.libProduit.trim() ||
      this.detailsFacture.quantite.trim() || this.detailsFacture.prixUnit.trim()) {
      if (this.detailsFacture.id) {
        this.detailsFactureList[this.findIndexById(this.detailsFacture.id, this.detailsFactureList)] = this.detailsFacture
        this.messageService.add({ severity: 'success', summary: 'Succés', detail: 'Détails facture modifier', life: 1000 });
      } else {
        //this.detailsFacture.id = this.createId();
        this.detailsFactureList.push(this.detailsFacture);
      }

      this.detailsFactureList = [...this.detailsFactureList];
      this.detailsDialog = false;
      this.facture.detailsFacture = this.detailsFactureList
      this.detailsFacture = {};
      this.order++
      this.submittedD = false
    }
    console.log(this.detailsFactureList)
  }
  deleteDetail(detailsFacture: Detailsfacture) {
    this.confirmationService.confirm({
      message: 'Etes-vous sûr de vouloir supprimer ' + detailsFacture.libProduit + '?',
      acceptLabel: 'Oui',
      rejectLabel: 'Non',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.detailsFactureList = this.detailsFactureList.filter(val => val.id !== detailsFacture.id);
        this.detailsFacture = {};
        this.order--

        this.messageService.add({ severity: 'success', summary: 'Succés', detail: 'Détails facture supprimer', life: 3000 });
      }
    });

  }
  updateDetail(detailsFacture: Detailsfacture) {
    this.detailsFacture = { ...detailsFacture };
    this.detailsDialog = true;
  }

  findIndexById(id: Number, list: Array<any>): number {
    let index = -1;
    for (let i = 0; i < list.length; i++) {
      if (list[i].id === id) {
        index = i;
        break;
      }
    }
    console.log("indx" + index)
    return index;
  }


  findIndexByCodeGrp(id: string, list: Array<any>): number {
    let index = -1;
    for (let i = 0; i < list.length; i++) {
      if (list[i].codeGrp === id) {
        index = i;
        break;
      }
    }
    console.log("indx" + index)
    return index;
  }





  createId(): Number {
    let id = null;
    var n = '0123456789';
    for (var i = 0; i < 5; i++) {
      id += n.charAt(Math.floor(Math.random() * n.length));
    }
    return id;
  }

   getClient(e) {
    if (this.checkedclient == false) {
      this.loadSpinner = true;
      this.clientService.getClient(this.client.matriculeFiscaleClient).subscribe(
        (data: Client) => {
          //this.clientDisabled=!this.clientDisabled
          //document.getElementById("spin").remove();
          if (data != null) {
            this.client = data
            this.loadSpinner = false;
          } else {
            console.log(this.client);
            this.loadSpinner = false;
            this.messageService.add({ severity: 'info', summary: 'Info', detail: 'client n existe pas, saisie les champs manuellement!', life: 2000 });
          }
        }, error => { })
    } else {
      this.client = {}
    }
  } 
  filterProduit(event){
    let filtered :any[] =[]
    let query = event.query
    for(let i = 0; i<this.ParamProduitItems.length;i++){
      let item = this.ParamProduitItems[i];
      if( item.codeProduit.toLowerCase().indexOf(query.toLowerCase()) == 0){
        filtered.push(item);
      }
    }
    this.filteredParamProduit = filtered
  }

  getSelectedProduit(event){
    debugger
    this.paramProduit=event;
    console.log(this.paramProduit)
  }

  annulerFct() {
    this.confirmationService.confirm({
      message: 'Etes-vous sûr de vouloir annuler la facture ?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Oui',
      rejectLabel: 'Non',
      accept: () => {
        this.ngOnInit();
        this.messageService.add({ severity: 'success', summary: 'Succés', detail: 'Facture annuler', life: 3000 });
      }
    });
  }
  validateFacture() {
    this.factureService.validateFacture(this.facture.numFact).subscribe();
    this.toggle = !this.toggle
    this.messageService.add({ severity: 'success', summary: 'Succés', detail: 'Facture valider', life: 3000 });
  }
  hideDialogAvoir(){
    this.FactureAvoirDialog=false
  }

  getFactureAvoir(){
    this.factureService.getFactureByNumFact(this.numfactureAvoir).subscribe((data) => {
      this.factureAvoir = data
      this.facture.datFactInit = moment(data.datFactInit).format('DD/MM/YYYY hh:mm:ss')  
      this.factAvoirDate = data.datFactInit
      console.log(data.datFactInit)
      this.client.matriculeFiscaleClient = data.client.matriculeFiscaleClient
      this.client.nom = data.client.nom
      this.client.email = data.client.email
      this.client.numTel = data.client.numTel
      this.client = data.client
      this.facture.detailsFacture= data.detailsFacture
      this.detailsFactureList = data.detailsFacture
      this.facture.detailsFacture = this.detailsFactureList
    console.log(this.detailsFactureList)
         });
    this.FactureAvoirDialog=false
  }
  onChangeTyp(event) {
    
    console.log(event)
    this.selectedStaticList = event.value
    if(this.selectedStaticList.id == '2'){
      this.FactureAvoirDialog=true
        
    }
  }

  phoneNumberValidator(event: any) {
    const pattern = /[0-9]{8}/;
    if (!pattern.test(event.target.value)) {
      event.target.value = event.target.value.replace(/^[0-9\-]*$/, "");
    }
  }

}
