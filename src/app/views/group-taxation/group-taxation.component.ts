import { Component, OnInit } from '@angular/core';
import { Groupetaxation } from 'src/app/models/groupetaxation';
import { grpTaxationService } from 'src/app/services/grpTaxation.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { paramPaysService } from 'src/app/services/paramPays.service';
import { Parampays } from 'src/app/models/parampays';

@Component({
  selector: 'app-group-taxation',
  templateUrl: './group-taxation.component.html',
  styleUrls: ['./group-taxation.component.scss']
})
export class GroupTaxationComponent implements OnInit {
    
  grpTaxList:Array<Groupetaxation>=[]
  grpTax:Groupetaxation
  grpTaxDialog:boolean
  updateDialog :boolean
  submitted :boolean = false;
  paramPaysList: Array<Parampays> = []

  constructor(private grpTaxationService : grpTaxationService,private messageService: MessageService,
    private confirmationService: ConfirmationService,  private paramPaysService: paramPaysService) { }

  ngOnInit(): void {
     this.refresh();
     this.paramPaysService.getParamPays().subscribe((data: Parampays[]) => {
      console.log(data)
      this.paramPaysList = data
    })
  }
 
  saveGrp(){
    this.submitted = true
    if (!this.grpTax.codeGrpTax ||
     !this.grpTax.libGrp ||
     !this.grpTax.taxTva 
    
   ) {
     return;
   }
    this.grpTaxationService.postGrpTaxation(this.grpTax).subscribe(()=>this.refresh());
    this.messageService.add({severity:'success', summary: 'Succés', detail: 'Groupe de taxations ajouter', life: 3000});
    this.grpTaxDialog = false;
    console.log(this.grpTax)
   

  }
  hideDialog() {
    this.refresh()
    this.grpTaxDialog = false;
    this.updateDialog = false;
    this.submitted = false;
  }
  refresh(){
    this.grpTaxationService.getGrpTaxations().subscribe((data:Groupetaxation[])=>{
      this.grpTaxList=data
    })
  }
  openNew(){    
    this.grpTaxDialog=true
    this.grpTax={}
  }
  openUpdate(grp:Groupetaxation){
    this.updateDialog=true
    this.grpTax=grp
  }
  updateGrp(grp:Groupetaxation){  
    this.grpTax=grp
    this.grpTaxationService.updateGrpTax(grp.id, grp).subscribe(()=>this.refresh());
    this.messageService.add({severity:'success', summary: 'Succés', detail: 'Groupe de taxations changer', life: 3000});    
    this.updateDialog=false

  }
  deleteGrp(grp:Groupetaxation){
    this.confirmationService.confirm({
      message: 'Etes-vous sûr de vouloir supprimer ' + grp.libGrp + '?',
      acceptLabel:'Oui',
      rejectLabel:'Non',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
          this.grpTaxationService.deletetgrpTax(grp.id).subscribe(()=>this.refresh());
          this.messageService.add({severity:'success', summary: 'Succés', detail: 'Groupe de taxations supprimer', life: 3000});
         
        }
  });
  }

 

}
