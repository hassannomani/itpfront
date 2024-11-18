import { BillingService } from 'src/app/services/billing-service/billing.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { AgentService } from 'src/app/services/agent-service/agent.service';
import { RepresentativeService } from 'src/app/services/representative-service/representative.service'; 
import { UserService } from 'src/app/services/user-service/user.service';
import {Title} from "@angular/platform-browser";
import { AdminService } from 'src/app/services/admin-service/admin.service';
import { LedgerService } from 'src/app/services/ledger-service/ledger.service';
import { CommissionService } from 'src/app/services/commission-service/commission.service';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
@Component({
  selector: 'app-report-admin',
  templateUrl: './report-admin.component.html',
  styleUrls: ['./report-admin.component.css']
})
export class ReportAdminComponent implements OnInit{
  buttonLabel: string= "Submit"
  buttonLabel1: string= "Download as PDF"
  buttonColor: string = "primary"
  buttonType: string = "button"
  dataSecondary: any =[]
  showThirdA: boolean = false
  showThirdR: boolean = false
  showThirdD1: boolean = false
  showThirdD2: boolean = false
  showCaption: boolean = false
  firstOption: string = ""
  secondOption: string = ""
  loaded: boolean = false
  empty: boolean = true
  dataArr : any =[]
  displayedColumns: any =[]
  logoBase : string = ""
  reportSubmission = new FormGroup({
    'type' : new FormControl('',[Validators.required]),
    'subtype' : new FormControl('',[Validators.required]),
    'agusername' : new FormControl('',[Validators.required]),
    'repusername' : new FormControl('',[Validators.required]),
    'startDate' : new FormControl('',[Validators.required]),
    'endDate' : new FormControl('',[Validators.required])
  })

  constructor(
    private agentService: AgentService,  
    private representativeService: RepresentativeService,
    private ledgerService: LedgerService,
    private titleService:Title,
    private adminService: AdminService,
    private commissionServ: CommissionService,
    private billServ: BillingService
  ){
    this.titleService.setTitle("Report");
  }

  ngOnInit(): void {
   
  }

  reportType(value:any){
    this.showCaption = false
    console.log(value)
    this.firstOption = value
    if(value==1)
      this.dataSecondary = [{"id":1,"value":"All Resource Center"},{"id":2, "value": "All TRP of a Resource Center"}/*,{"id":3,"value":"Search By Creation Date"}*/]
    else if(value==2)
      this.dataSecondary = [{"id":1,"value":"All TRPs"}/*,{"id":2,"value":"Search By Creation Date"}*/]
    else if (value==3)
      this.dataSecondary = [
        {"id":"1","value":"All"},
        {"id":"2", "value": "Resource Center"},
        {"id":"3", "value":"TRP"},
        {"id":"4","value":"Date Range"},
        {"id":"5","value":"Resource Center Ledger with Date Range"},
        {"id":"6","value":"TRP Ledger with Date Range"}
      ]
    else if(value==4)
      this.dataSecondary = [
        {"id":"1","value":"All"},
        {"id":"2", "value": "Resource Center"},
        {"id":"3", "value":"TRP"},
        {"id":"4","value":"Date Range"}/*,
        {"id":"5","value":"Agent Commission with Date Range"},
        {"id":"6","value":"TRP Commission with Date Range"}*/
      ]
    else if(value==5)
      this.dataSecondary = [
        {"id":"1","value":"All"},
        {"id":"2", "value": "Resource Center"},
        {"id":"3", "value":"TRP"}
        /*{"id":"4","value":"Date Range"}/*,
      {"id":"5","value":"Agent Commission with Date Range"},
      {"id":"6","value":"TRP Commission with Date Range"}*/
    ]

  }
  reportSubType(value: any){
    this.showCaption = false
    this.secondOption  = value
    if((value=="2" && this.firstOption=="1")||(this.firstOption=="3"&&value=="2")||(this.firstOption=="4"&&value=="2")){
      this.showThirdA = true
      this.showThirdR = false
      this.showThirdD1=false
      this.showThirdD2=false
    }else if((value=="3"&&this.firstOption=="1")||(value=="2"&&this.firstOption=="2")){
      this.showThirdA = false
      this.showThirdR = false
      this.showThirdD1=true
      this.showThirdD2=true
    }
    else if((value=="3" && this.firstOption=="3")||(value=="3" && this.firstOption=="4")){
      this.showThirdR =  true
      this.showThirdA = false
      this.showThirdD1=false
      this.showThirdD2=false
    }else if((value=="4"||value=="5"||value=="6")&&(this.firstOption=="3"||this.firstOption=="4")){
      
      this.showThirdD1=true
      this.showThirdD2=true
      if(value=="4"){
        this.showThirdA=false
        this.showThirdR = false
      }else if(value=="5"){
        this.showThirdA=true
        this.showThirdR = false
      }else{
        this.showThirdA=false
        this.showThirdR = true
      }
     
    } else if(this.firstOption=="5"){
      if(value=="2"){
        this.showThirdA=true
        this.showThirdR = false
      }else if(value=="3"){
        this.showThirdA=false
        this.showThirdR = true
      }
    }
    else{
      this.showThirdA = false
      this.showThirdR = false
      this.showThirdD1=false
      this.showThirdD2=false
    }
  }

  
  formSubmit(){
   
    this.showCaption = true
    if(this.firstOption=="1"&&this.secondOption=="1")
      this.getAllAgents()

    else if(this.firstOption=="1"&&this.secondOption=="2"){

      let thirdVal = this.reportSubmission.value["agusername"]
      this.getAllRepresentativeOfAnAgent(thirdVal)

    }
    else if(this.firstOption=="2" && this.secondOption=="1")
      this.getAllRepresentatives()

    else if(this.firstOption=="2" && this.secondOption=="2"){
      let thirdVal= this.reportSubmission.value["startDate"]
      let fourthVal= this.reportSubmission.value["endDate"]
      this.getAllRepresentativesWithDate(thirdVal,fourthVal)

    }

    else if(this.firstOption=="3"&&this.secondOption=="1")
      this.getAllLedgers()

    else if(this.firstOption=="3"&&this.secondOption=="2"){
      let thirVal = this.reportSubmission.value["agusername"]
      this.getAllLedgerAgent(thirVal)
    }
    
    else if (this.firstOption=="3"&&this.secondOption=="3"){
      let thirVal = this.reportSubmission.value["repusername"]
      this.getAllLedgerRepresentative(thirVal)
    } 
    
    else if(this.firstOption=="3"&&(this.secondOption=="4"||this.secondOption=="5"||this.secondOption=="6")){
      let thirdVal= this.reportSubmission.value["startDate"]
      let fourthVal= this.reportSubmission.value["endDate"]
      if(this.secondOption=="4")
        this.getAllLedgerRange(thirdVal,fourthVal)
      else if(this.secondOption=="5"){
        let fifthVal = this.reportSubmission.value["agusername"]
        this.getagentLedgerRange(thirdVal,fourthVal,fifthVal)
      }
      else if(this.secondOption=="6"){
        let fifthVal = this.reportSubmission.value["repusername"]
        this.getrepresentativeLedgerRange(thirdVal,fourthVal,fifthVal)
      }
       
    }
    else if(this.firstOption=="4"){
      if(this.secondOption=="1"){
        this.getAllCommissions()
      }else if(this.secondOption=="2"){
        let thirVal = this.reportSubmission.value["agusername"]
        this.getAgentCommission(thirVal);
      }else if(this.secondOption=="3"){
        let thirdVal = this.reportSubmission.value["repusername"]
        this.getTRPCommission(thirdVal);
      }
      else if(this.secondOption=="4"){
        let thirdVal= this.reportSubmission.value["startDate"]
        let fourthVal= this.reportSubmission.value["endDate"]
        this.getRangeCommission(thirdVal, fourthVal);
      }
    }else if(this.firstOption=="5"){
      if(this.secondOption=="1"){
        this.getAllBills()
      }else if(this.secondOption=="2"){
        let thirVal = this.reportSubmission.value["agusername"]
        this.getAgentBills(thirVal);
      }else if(this.secondOption=="3"){
        let thirdVal = this.reportSubmission.value["repusername"]
        this.getTRPBills(thirdVal);
      }
    }
  }

  getAllAgents(){
    this.agentService.getAll()
    .subscribe({
      next: (data) => {
        let col = [ 'name','tin','phone','registration_no','contact_email']
        this.positiveResponse(data, col)
      },
      error: (e) => {
        this.loaded = false;
        console.log("Error retrieving")
      }
    });
  }

  getAllRepresentativeOfAnAgent(val: any){
   
    this.getAllRepresentativeOfAnAgentSecStep(val)

      
  }

  getAllRepresentatives(){
    this.representativeService.getAllRepresentatives().subscribe({
      next: (data) => {
        let col = [ 'tinNo','reName','reDob','reMobileNo','nid']     
         this.positiveResponse(data, col)
      },
      error: (e) => {
        this.loaded = false
      }
    })
  }

  getAllLedgers(){
    this.adminService.getAdminLedger().subscribe({
      next: (data) => {
        let col = ['taxpayerId','created_at','paidAmount','paymentMethod','assessmentYear','agentTin','representativeId']     
         this.positiveResponse(data, col)
      },
      error: (e) => {
        this.loaded = false
      }
    })
  }

  getAllLedgerRepresentative(representative: any){
   
    this.getAllLedgerRepresentativeSecStep(representative)
       
  }

  getAllLedgerRange(startDate: any, endDate: any){
    this.ledgerService.getAllRangeLedger(startDate,endDate).subscribe({
      next: (data) => {
        let col = ['taxpayerId','created_at','paidAmount','paymentMethod','assessmentYear','agentTin','representativeId']
        this.positiveResponse(data, col)
      },
      error: (e) => {
        this.loaded = false;
      }  
    })
  }

  getagentLedgerRange(startDate: any, endDate: any, agentId: any){
    this.ledgerService.getAgentRangeLedger(startDate,endDate,agentId).subscribe({
      next: (data) => {
        let col = ['taxpayerId','created_at','paidAmount','paymentMethod','assessmentYear','agentTin','representativeId']
        this.positiveResponse(data, col) 
      },
      error: (e) => {
        this.loaded = false
      }
    })
  }

  getrepresentativeLedgerRange(startDate: any, endDate: any, representativeId: any){
    this.ledgerService.getRepresentativeRangeLedger(startDate,endDate,representativeId).subscribe({
      next: (data) => {
        let col = ['taxpayerId','created_at','paidAmount','paymentMethod','assessmentYear','agentTin','representativeId']
        this.positiveResponse(data, col) 
      },
      error: (e) => {
        this.loaded = false
      }
    })
  }

  getAllRepresentativeOfAnAgentSecStep(val: any){
    this.representativeService.getRepresentativeUnderAnAgent(val).subscribe({
      next: (data) => {
        let col = [ 'tinNo','reName','reDob','reMobileNo','nid']
        this.positiveResponse(data, col)
      },
      error: (e) => {
        this.loaded = false;
      }  
    })
  }
  getAllLedgerAgent(agentId: any){
    this.ledgerService.getAgentLedger(agentId).subscribe({
      next: (data) => {
        let col = ['taxpayerId','created_at','paidAmount','paymentMethod','assessmentYear','agentTin','representativeTin']
        this.positiveResponse(data, col)
      },
      error: (e) => {
        this.loaded = false
      }
    })
  }
  getAllLedgerRepresentativeSecStep(repId:any){
    this.ledgerService.getRepresentativeLedger(repId).subscribe({
      next: (data) => {
        let col = ['taxpayerId','created_at','paidAmount','paymentMethod','assessmentYear','agentTin','representativeTin']
        this.positiveResponse(data,col)
      },
      error: (e) => {
        this.loaded = false
      }
    
    })
  }

  getAllCommissions(){
    this.commissionServ.getCommissionAll().subscribe({
      next: (data) => {
        let col = ['taxpayer_name','taxpayer_id','agent_tin','name','agent_commission','representative_tin','re_name','representative_commission','assessment_year','year_no']
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

  getTRPCommission(trp: any){
    this.commissionServ.getCommissionRepresentative(trp).subscribe({
      next: (data) => {
        let col = ['taxpayerId','taxpayerName', 'created_at','paidAmount','assessmentYear','representativeTin','representativeCommission']
        this.positiveResponse(data,col)
      },
      error: (e) => {
        this.loaded = false
      }
    })
  }

  
  getRangeCommission(startDate: any, endDate: any){
    this.commissionServ.getAllRangeCommission(startDate,endDate).subscribe({
      next: (data) => {
        let col = ['taxpayerId','taxpayerName','paidAmount','created_at','assessmentYear','agentTin','agentCommission','representativeTin','representativeCommission']
        this.positiveResponse(data, col)
      },
      error: (e) => {
        this.loaded = false;
      }  
    })
  }

  getAllRepresentativesWithDate(startDate: any, endDate: any){
    // this.representativeService.getAllRepresentativesInRange(startDate,endDate).subscribe({

    // })
  }

  getAllBills(){
    this.billServ.approvedBills().subscribe({
      next: (data) => {
        let col = ['taxpayer_id','taxpayer_name','payee_type','payee','name','commission']     
         this.positiveResponse(data, col)
      },
      error: (e) => {
        this.loaded = false
      }
    })
  }

  getTRPBills(tin: any){
    this.billServ.getTRPApproved(tin).subscribe({
      next: (data) => {
        let col = ['taxpayer_id','taxpayer_name','payee_type','payee','name','commission']     
         this.positiveResponse(data, col)
      },
      error: (e) => {
        this.loaded = false
      }
    })
  }

  
  getAgentBills(tin: any){
    this.billServ.getAgentApproved(tin).subscribe({
      next: (data) => {
        let col = ['taxpayer_id','taxpayer_name','payee_type','payee','name','commission']     
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
