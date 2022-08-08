import { Component, OnInit } from '@angular/core';
import { factureService } from 'src/app/services/facture.service';
import { LocalStorageService } from 'ngx-webstorage';
import { NgxSpinnerService } from 'ngx-spinner';
import { Facture } from 'src/app/models/facture';
import { ChartOptions, ChartType } from 'chart.js';
import { Label, SingleDataSet, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';
import { paramProduitService } from 'src/app/services/paramProduit.service';
import { ParamProduit } from 'src/app/models/paramProduit';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {

  pv:any;
  factureList:Array<Facture>=[]
  TotalFacts:Number;
  TotalProduits:Number;
  factByState: any;
  factByType: any;
  factByMonth: any;
  prodByGt: any;
  constructor(private factureService:factureService,private ParamProduitService:paramProduitService, private storage:LocalStorageService, 
    private spinner: NgxSpinnerService) {
      monkeyPatchChartJsLegend();
      monkeyPatchChartJsTooltip();
     }

  ngOnInit(): void {
    this.spinner.show();
    this.pv=this.storage.retrieve(("userConnect"));
    this.factureByState();
    this.factureByMonth();
    this.produitsByGt();
  }
 
  factureByState(){  
    this.factureService.getAllFactures(this.pv.codeAgent).subscribe((data:Facture[])=>{     
       this.factureList=data
       this.TotalFacts = data.length
       this.factByState = {
        labels:['Enregister','Valider','EN_ATTENTE','ENVOYER'],
        datasets:[
          { data: [this.factureList.filter(f => f.state == "ENREGISTRER").length,this.factureList.filter(f => f.state == "VALIDER").length,this.factureList.filter(f => f.state == "EN_ATTENTE").length,this.factureList.filter(f => f.state == "ENVOYER").length],
            backgroundColor: ["#B9FFC8", "#9CCDFC", "#FD968A"],
            hoverBackgroundColor: ["#B9FFC8", "#9CCDFC", "#FD968A"]
          }]}
          this.factByType = {
            labels:['Vente','Avoir','Acompte'],
            datasets:[
              { data: [this.factureList.filter(f => f.typFact == "Vente").length,this.factureList.filter(f => f.typFact == "Avoir").length,this.factureList.filter(f => f.typFact == "Acompte").length],
                backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
                hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"]
              }]}
       this.spinner.hide();
       setTimeout(() => {
        this.spinner.hide();
       },4000);
    })
 
    }

 factureByMonth(){
   this.factureService.getFactByMonth().subscribe(monthlyfacts => {
    this.factByMonth ={
      labels:['Jan','Fev','Mar','Avr','Mai','Jua','Jui','Aou','sep','oct','nov','dec'],
      datasets:[
        { label: 'factures par mois',
          data: monthlyfacts,
          fill:true,
          borderColor: ["#36A2EB"],
          backgroundColor: 'rgba(54,162,235,0.2)',
          tension: .4,
        }]}
  });
 }

 produitsByGt(){
   this.ParamProduitService.getMyProduits(this.pv.contribuable.id).subscribe((data : ParamProduit[]) => {
    this.TotalProduits = data.length
    let gtlabels = new Set();
    data.forEach(e => {
      gtlabels.add(e.groupeTaxation.libGrp)
    });
    let uniquegtlabelss = [...new Set(gtlabels)];
    let prodNbList:Array<Number>=[]
    for(let i = 0; i < uniquegtlabelss.length;i++){
    prodNbList.push(data.filter(p => p.groupeTaxation.libGrp == uniquegtlabelss[i]).length)
    };
    console.log(gtlabels)
       this.prodByGt = {
        labels:uniquegtlabelss,
        datasets:[
          { label:'produit par tax', 
            data: prodNbList,
            backgroundColor: ["#B9FFC8", "#9CCDFC","#FF6384", "#36A2EB", "#FFCE56"],
            hoverBackgroundColor: ["#B9FFC8", "#9CCDFC","#FF6384", "#36A2EB", "#FFCE56"]
          }]}
       })
   
 }





}


