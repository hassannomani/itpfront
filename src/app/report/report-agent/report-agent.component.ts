import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { AgentService } from 'src/app/services/agent-service/agent.service';
import { RepresentativeService } from 'src/app/services/representative-service/representative.service'; 
import { UserService } from 'src/app/services/user-service/user.service';
import {Title} from "@angular/platform-browser";
import { LedgerService } from 'src/app/services/ledger-service/ledger.service';
import { CommissionService } from 'src/app/services/commission-service/commission.service';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-report-agent',
  templateUrl: './report-agent.component.html',
  styleUrls: ['./report-agent.component.css']
})
export class ReportAgentComponent implements OnInit{
  buttonLabel: string= "Submit"
  buttonLabel1: string= "Download as PDF"
  buttonColor: string = "primary"
  buttonType: string = "button"
  dataSecondary: any =[]
  showThirdA: boolean = false
  showThirdR: boolean = false
  showThirdD1: boolean = false
  showThirdD2: boolean = false
  firstOption: string = ""
  secondOption: string = ""
  loaded: boolean = false
  empty: boolean = true
  dataArr : any =[]
  displayedColumns: any =[]
  logoBase : string = ""
  userName: string = ""
  reportSubmission = new FormGroup({
    'type' : new FormControl('',[Validators.required]),
    'subtype' : new FormControl('',[Validators.required]),
    'repusername' : new FormControl('',[Validators.required]),
    'startDate' : new FormControl('',[Validators.required]),
    'endDate' : new FormControl('',[Validators.required])
  })
  constructor(
    private agentService: AgentService,  
    private representativeService: RepresentativeService,
    private ledgerService: LedgerService,
    private titleService:Title,
    private commissionServ: CommissionService,
    private localStorage: LocalStorageService,
  ){
    this.titleService.setTitle("Resource Center Report");
  }
  
  ngOnInit(): void {
    let user = this.localStorage.getStorageItems()
    this.userName = user.username!=null?JSON.parse(user.username):""
  }

  reportType(value:any){

    console.log(value)
    this.firstOption = value
    if(value==1)
      this.dataSecondary = [
        {"id":1,"value":"All TRPs"},
        {"id":2,"value":"Specific TRP"},
        // {"id":3,"value":"Search By Creation Date"}
      ]
    else if (value==2)
      this.dataSecondary = [
        {"id":"1", "value":"TRP"},
        {"id":"2","value":"Date Range"},
        {"id":"3","value":"TRP with Date Range"}
      ]
  }
  reportSubType(value: any){
    this.secondOption  = value
    if((value=="2" && this.firstOption=="1")||(value=="1" && this.firstOption=="2")){
      this.showThirdR = true
      this.showThirdD1=false
      this.showThirdD2=false
    }else if((value=="3"&&this.firstOption=="1")||(value=="2" && this.firstOption=="2")){
      this.showThirdR = false
      this.showThirdD1=true
      this.showThirdD2=true
    }
    else if(value=="3" && this.firstOption=="2"){
      this.showThirdR = true
      this.showThirdD1=true
      this.showThirdD2=true
    }
    else{
      this.showThirdR = false
      this.showThirdD1=false
      this.showThirdD2=false
    }
  }

    
  formSubmit(){
    if(this.secondOption=="1" && this.firstOption=="1"){
      this.getAllRepresentativeOfAnAgent(this.userName)
    }
    else if(this.secondOption=="2" && this.firstOption=="1"){
      let thirdVal = this.reportSubmission.value["repusername"]
      this.getSingleTRP(thirdVal)
    }else if(this.secondOption=="1" && this.firstOption=="2"){
      let thirdVal = this.reportSubmission.value["repusername"]
      this.getTrpCommission(this.userName,thirdVal)
    }else if(this.secondOption=="2" && this.firstOption=="2"){
      this.getAgentCommission(this.userName)
    }else if(this.secondOption=="3" && this.firstOption=="2"){
      let thirdVal = this.reportSubmission.value["repusername"]
      let fourthVal = this.reportSubmission.value["startDate"]
      let fifthVal = this.reportSubmission.value["endDate"]
      this.getTrpCommissionRange(thirdVal,fourthVal,fifthVal)
    }
    
  }

  getAllRepresentativeOfAnAgent(username: string) {

    this.representativeService.getRepresentativeUnderAnAgent(username).subscribe({
      next: (data) => {
        let col = [ 'tinNo','reName','reDob','reMobileNo','nid']
        this.positiveResponse(data, col)
      },
      error: (e) => {
        this.loaded = false;
      }  
    })
    
  }

  getSingleTRP(username: any){
    this.representativeService.getARepresentative(username).subscribe({
      next: (data) => {
        let col = [ 'tinNo','reName','reDob','reMobileNo','nid','trpId','certNo','certSerial','certPass']
        let dataArr: any =[]
        dataArr.push(data)
        this.positiveResponse(dataArr, col)
      },
      error: (e) => {
        this.loaded = false;
      }  
    })
  }

  getTrpCommission(agent: any, trp: any){
    this.commissionServ.getCommissionOfTRPofAgent(agent,trp).subscribe({
      next: (data) => {
        let col = ['taxpayerId','taxpayerName', 'created_at','paidAmount','assessmentYear','representativeTin','representativeCommission']
        this.positiveResponse(data,col)
      },
      error: (e) => {
        this.loaded = false
      }
    })
  }

  getAgentCommission(agent: any){
    this.commissionServ.getCommissionAgent(agent).subscribe({
      next: (data) => {
        let col = ['taxpayerId','taxpayerName', 'created_at','paidAmount','assessmentYear','agentTin','agentCommission']
        this.positiveResponse(data,col)
      },
      error: (e) => {
        this.loaded = false
      }
    })
  }

  getTrpCommissionRange(trp: any,start: any,end: any){
    this.commissionServ.getRepresentativeRangeCommission(this.userName,trp,start,end).subscribe({
      next: (data) => {
        let col = ['taxpayerId','taxpayerName', 'created_at','paidAmount','assessmentYear','representativeTin','representativeCommission']
        this.positiveResponse(data, col) 
      },
      error: (e) => {
        this.loaded = false
      }
    })
  }




  open(){
    var logobase = ""
    this.toDataURL('../../assets/img/bdlogo.png', function(dataUrl:any) {
     logobase  = dataUrl
    })
    
    let DATA: any = document.getElementById('dataTable');
    html2canvas(DATA).then((canvas) => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      // if(this.firstOption=="4"&&this.secondOption=="1")
      // var PDF = new jsPDF('l', 'mm', 'a4');
      // else
      var PDF = new jsPDF('p', 'mm', 'a4');

      let position = 0;


      PDF.addImage(logobase, 'PNG', 100, 15, 10, 10);
      PDF.setFontSize(12);
      PDF.text("National Board of Revenue", 82, 35);
      PDF.setFontSize(8);

      PDF.text("Tax Return Preparer", 90, 43);
      PDF.addImage(FILEURI, 'PNG', 0, 55, fileWidth, fileHeight);
      PDF.save('angular-demo.pdf');
    });
    
  }

  toDataURL(url: any, callback:any) {
  
    var xhr = new XMLHttpRequest();
    xhr.onload = function() {
      var reader = new FileReader();
      reader.onloadend = function() {
        callback(reader.result);
      }
      reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
  }
  
  

  positiveResponse(data : any, arr:any){
    if(data.length){
      this.dataArr = data
      this.loaded  = true
      this.displayedColumns = arr
    } 
    else{
      this.dataArr = []
      this.empty = true
    }
  }
}
