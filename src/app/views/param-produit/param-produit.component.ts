import { Component, OnInit } from '@angular/core';
import { ParamProduit } from 'src/app/models/paramProduit';
import { MessageService, ConfirmationService } from 'primeng/api';
import { paramProduitService } from 'src/app/services/paramProduit.service';
import { ToastrService } from 'ngx-toastr';
import { Groupetaxation } from 'src/app/models/groupetaxation';
import { grpTaxationService } from 'src/app/services/grpTaxation.service';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-param-produit',
  templateUrl: './param-produit.component.html',
  styleUrls: ['./param-produit.component.scss']
})
export class ParamProduitComponent implements OnInit {

     paramProduitList : Array<ParamProduit>=[]
     paramDialog :boolean
     updateDialog :boolean
     paramProduits : ParamProduit
     submitted :boolean = false;
     contpays:any
     groupetaxationItems: Groupetaxation[]

  constructor(private ParamProduitService:paramProduitService,private messageService: MessageService,
    private confirmationService: ConfirmationService, private toastreService: ToastrService,
    private grpTaxationService: grpTaxationService, private local: LocalStorageService) { }

  ngOnInit(): void {
    this.contpays= this.local.retrieve("userConnect").contribuable.paramPays.id
    this.refresh();
  }

  saveParam(){
    this.submitted = true
    if (!this.paramProduits.codeProduit ||
     !this.paramProduits.libProduit ||
     !this.paramProduits.prixUnitaire 
   ) {
     return;
   }   
   this.paramProduits.contribuable = this.local.retrieve("userConnect").contribuable
 this.ParamProduitService.postParamProduit(this.paramProduits).subscribe(()=>this.refresh());
 this.paramDialog = false;
console.log(this.paramProduits) 
   }

   deleteParam(prm:ParamProduit){
    this.confirmationService.confirm({
      message: 'voulez vous supprimer ' + prm.libProduit + '?',
      header: 'Confirmer',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
          this.ParamProduitService.deletetParam(prm.codeProduit).subscribe(()=>this.refresh());
          this.messageService.add({severity:'success', summary: 'Succés', detail: 'Paramètres de produit supprimer', life: 3000});
        }
  });
  }

  refresh(){
    this.ParamProduitService.getparamProduits().subscribe((data:ParamProduit[])=>{
      this.paramProduitList=data;
    })
  }

   hideDialog(){
     this.refresh()
     this.paramDialog = false;
     this.updateDialog = false;
     this.submitted = false;
   }
   openNew(){
     this.paramDialog=true
     this.paramProduits={}
     this.grpTaxationService.getGrpTaxations().subscribe((data: Groupetaxation[]) => {
      const results = data.filter(result=>result.paramPays.id==this.contpays)
      this.groupetaxationItems = results
    })
   }
   
   openUpdate(prm:ParamProduit){
    this.grpTaxationService.getGrpTaxations().subscribe((data: Groupetaxation[]) => {
      const results = data.filter(result=>result.paramPays.id==this.contpays)
      this.groupetaxationItems = results
    })
    this.updateDialog=true
    this.paramProduits=prm
  }
   updateParamProduit(prm:ParamProduit){
    
     this.ParamProduitService.updateParam(prm.id,prm).subscribe(()=>this.refresh());
     this.messageService.add({severity:'success', summary: 'Succés', detail: 'Paramètres de produit changer!', life: 3000});
     this.updateDialog=false
    }

}
