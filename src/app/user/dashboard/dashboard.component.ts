import { Component,OnInit } from '@angular/core';
import {Title} from "@angular/platform-browser";
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import {Chart } from 'chart.js/auto';
import { LedgerService } from 'src/app/services/ledger-service/ledger.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  public chart: any;
  public isAdmin: boolean = false
  public isAgent: boolean = false
  public isTrp: boolean = false
  constructor(
    private titleService:Title,
    private localStore: LocalStorageService,
    private ledgerServ: LedgerService,
  ){
    this.titleService.setTitle("Dashboard");
  }

  ngOnInit(): void{
    let user = this.localStore.getStorageItems()
    let username = user.username!=null?JSON.parse(user.username):""
    let role = user.role!=null?JSON.parse(user.role):""
    if(role=="ROLE_ADMIN"){
      console.log("hi")
      this.isAdmin = true
      this.loadGraphData()
    }
    else if(role=="ROLE_AGENT"){
      this.isAgent = true
      this.loadGraphDataAgent(username)
    } else if(role=="ROLE_REPRESENTATIVE"){
      this.isTrp = true
      this.loadGraphDataTrp(username)
    }
  }

  loadGraphData(){
    this.ledgerServ.getGraphDashboard().subscribe({
      next: (data) => {
        console.log(data)
        this.createChart(data)
      },
      error: (e) => {
        console.log(e)
      }  
    })
  }

  loadGraphDataAgent(agTin: string){
    this.ledgerServ.getGraphDashboardAgent(agTin).subscribe({
      next: (data) => {
        console.log(data)
        this.createChart(data)
      },
      error: (e) => {
        console.log(e)
      }  
    })
  }

  loadGraphDataTrp(trpTin: string){
    this.ledgerServ.getGraphDashboardTrp(trpTin).subscribe({
      next: (data) => {
        console.log(data)
        this.createChartBar(data)
      },
      error: (e) => {
        console.log(e)
      }  
    })
  }
  createChart(data: any){
    var labels = <string[]> Array()
    var dataset = <number[]> Array()
    for(var i=0;i<data.length;i++){
      dataset[i] = data[i][0] 
      labels[i] = data[i][1] + "\n("+ data[i][2] + ")"
    }
    console.log(labels)
    console.log(dataset)
    this.chart = new Chart("MyChart", {
      type: 'line', //this denotes tha type of chart
      data: {// values on X-Axis
        labels: labels, 
	       datasets: [
          {
            label: "Tax",
            data: dataset,
            backgroundColor: 'limegreen',
            borderWidth: 4
          }
        ]
      },
      options: {
        aspectRatio:3.5,
        plugins: {
            title: {
                display: true,
                text: 'Top 10 TRP Tax Collection'
            }
        }
      },
      plugins:[{
        id: 'customPlugin',
        beforeInit: function(chart) {
          if(chart.data.labels)
          chart.data.labels.forEach(function(e:any, i, a) {
             if (/\n/.test(e)) {
                a[i] = e.split(/\n/);
             }
          });
       }
      }]
    
    });
  }

  createChartBar(data: any){
    var labels = <string[]> Array()
    var dataset = <number[]> Array()
    var months = ['January','February','March','April','May','June','July','August','September','October','November','December']
    for(var i=0;i<data.length;i++){
      dataset[i] = data[i][0] 
      //let temp1 =  data[i][1]
      let temp2= data[i][2]
      labels[i] = months[temp2] + " - "+ data[i][1]
    }
    console.log(labels)
    console.log(dataset)
    this.chart = new Chart("MyBarChart", {
      type: 'bar', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: labels, 
	       datasets: [
         
          {
            label: "Income",
            data:dataset,
            backgroundColor: '#ff6384'
          }  
        ]
      },
      options: {
        aspectRatio:2.5,
        plugins: {
          title: {
              display: true,
              text: 'Monthwise Income'
          }
        }
      }
      
    });
  }
  
}
