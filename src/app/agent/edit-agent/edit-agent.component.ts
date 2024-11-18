import { Component,OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { CommonService } from 'src/app/services/common-service/common.service';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { UserService } from 'src/app/services/user-service/user.service';
import { AgentService } from 'src/app/services/agent-service/agent.service';
import { ActivatedRoute, Route } from '@angular/router';
import {Title} from "@angular/platform-browser";
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-edit-agent',
  templateUrl: './edit-agent.component.html',
  styleUrls: ['./edit-agent.component.css']
})
export class EditAgentComponent implements OnInit {

  editAgent = new FormGroup({
    'name' : new FormControl('',[Validators.required]),
    'tin' : new FormControl('',[Validators.required]),
    'phone' : new FormControl('',[Validators.required]),
    'registrationType' : new FormControl('',[Validators.required]),
    'registrationNo' : new FormControl('',[Validators.required]),
    'registrationDate' : new FormControl('',[Validators.required]),
    'contactPerson' : new FormControl('',[Validators.required]),
    'contactNumber' : new FormControl('',[Validators.required]),
    'contactEmail': new FormControl( '',[Validators.required]),
    'bankAccountName': new FormControl('',[Validators.required]),
    'bankAccountNo': new FormControl('',[Validators.required]),
    'bankName': new FormControl('',[Validators.required]),
    'bankDistName': new FormControl('',[Validators.required]),
    'bankBranch': new FormControl('',[Validators.required]),
    'routingNo': new FormControl('',[Validators.required]),
    'fatherName': new FormControl(''),
    'motherName': new FormControl(''),
    'spouseName': new FormControl(''),
    'regAssNID': new FormControl(''),
    'dob': new FormControl(''),
    'bdivision': new FormControl('',[Validators.required]),
    'bdistrict': new FormControl('',[Validators.required]),
    'bthana': new FormControl('',[Validators.required]),
    'baddress': new FormControl('',[Validators.required]),
    'prdivision': new FormControl('',[Validators.required]),
    'prdistrict': new FormControl('',[Validators.required]),
    'prthana': new FormControl('',[Validators.required]),
    'praddress': new FormControl('',[Validators.required]),
    'pmdivision': new FormControl('',[Validators.required]),
    'pmdistrict': new FormControl('',[Validators.required]),
    'pmthana': new FormControl('',[Validators.required]),
    'pmaddress': new FormControl('',[Validators.required]),
    'address': new FormControl(<Object>[]),
    'bankinformation': new FormControl(<Object>[]),
    
  })
  failed: boolean = false
  errorMsg: string = ""
  success: boolean = false
  successMsg: string = ""
  goSuccess: boolean = false
  bankfailed: boolean = false
  addressfailed: boolean = false
  buttonLabel: string= "Submit"
  buttonColor: string = "primary"
  buttonType: string = "button"

  buttonLabel1: string= "Change"
  buttonColor1: string = "primary"
  buttonType1: string = "button"
  
  division: any[] = []
  district: any[] = []
  thana: any[] = []
  bankInfo: any=[]
  index: any = 0
  addressArr: any =[]
  bDistrict: any = []
  bThana: any = []
  pmDistrict: any = []
  pmThana: any = []
  prDistrict: any = []
  prThana: any = []
  banks: any = []
  bankdist: any = []
  bankBranches: any = []
  bankName: string = ""
  noDataFound: boolean = false
  routeNo: string = ""
  businessAdd: string = ""
  presentAdd: string = ""
  permanentAdd: string = ""
  image: any
  constructor(
    private agentService: AgentService,  
    private commonService: CommonService, 
    private route: ActivatedRoute,
    private userService: UserService,
    private titleService:Title,
    private sanitizer :DomSanitizer,
  ){
    this.titleService.setTitle("Add Resource Center");
  }
  ngOnInit(): void {
    this
    .route
    .queryParams
    .subscribe(paramsg=>{
      let uname = paramsg['username']
      if(uname!=null){
        this.agentService.getAgentInfo(uname).subscribe({
          next: (data) => {
            this.setData(data)
            this.loadPhoto(data.contactPhoto)
          },
          error: (e) => {
           
              console.log("Error retrieving")
          }
        })
      }
    })

    this.onTabChanged();
      forkJoin([this.commonService.getDistrict(),this.commonService.getDivision(),this.commonService.getThana(),this.commonService.getBank(),this.commonService.getBankDist()])
      .subscribe({
        next: (data) => {
          //console.log(data)
          this.district = data[0];
          this.division = data[1];
          this.thana = data[2];
          this.banks = data[3];
          this.bankdist = data[4];
        },
        error: (e) => {
         
            console.log("Error retrieving")
        }
      });
  }

  selectedTabChange($event:any) {
    this.index = $event.index
    console.log(this.index)
    this.onTabChanged()
  }
  
  onTabChanged() {
    if (this.index==0) {
      
    } else if (this.index==2) {
      this.saveAddresses()
    }else if(this.index==3){
      this.saveBankDetails()
    }
  }

  saveBankDetails(){
    let bankObj={
      bankAccountName: this.editAgent.value['bankAccountName'],
      bankAccountNo: this.editAgent.value['bankAccountNo'],
      bankName: this.editAgent.value['bankName'],
      bankBranch: this.editAgent.value['bankBranch'],
      routingNo: this.editAgent.value['routingNo']
    }

    this.commonService
    .addBank(bankObj)
    .subscribe({
      
      next: (data) => {
        if(data?.token!=""){
          this.bankInfo.push(bankObj);
        } 
        else{
          this.bankfailed = true
        }
      },
      error: (e) => {
        this.bankfailed = true
      }
      
    });
  }

  saveAddresses(){
    let prdistrict:any={}
    prdistrict=this.editAgent.value['prdistrict']
    let bdistrict:any={}
    bdistrict=this.editAgent.value['bdistrict']
    let pmdistrict:any={}
    pmdistrict=this.editAgent.value['pmdistrict']
    let presentobj={
      type: "PRESENT",
      division: this.editAgent.value['prdivision'],
      district: prdistrict.name,
      thana: this.editAgent.value['prthana'],
      address: this.editAgent.value['praddress'],
      addedBy: "ADMIN" 
    }
    let businessobj={
      type: "BUSINESS",
      division: this.editAgent.value['bdivision'],
      district: bdistrict.name,
      thana: this.editAgent.value['bthana'],
      address: this.editAgent.value['baddress'],
      addedBy: "ADMIN" 
    }
    let permanentobj={
      type: "PERMANENT",
      division: this.editAgent.value['pmdivision'],
      district: pmdistrict.name,
      thana: this.editAgent.value['pmthana'],
      address: this.editAgent.value['pmaddress'],
      addedBy: "ADMIN" 
    }
  //this.agentService.addAddress
    forkJoin([
      this.commonService.addAddress(presentobj),
      this.commonService.addAddress(businessobj),
      this.commonService.addAddress(permanentobj)
    ])
    .subscribe({
      next: (data) => {
        //console.log(data)
        
        if(data?.length<3)
          this.addressfailed = true
        else{
          this.addressArr.push(presentobj)
          this.addressArr.push(businessobj)
          this.addressArr.push(permanentobj)
        }
      },
      error: (e) => {
        
          console.log("Error retrieving")
          this.addressfailed = true
      }
    });
  }

  
  bdivisionChange(value:any){
    console.log(value)
    this.bDistrict = []
    for(let i=0;i<this.district.length;i++){
      if(this.district[i].divisionId==value)
      this.bDistrict.push(this.district[i])
    }
  }

  bdistrictChange(value:any){
    console.log(value)
    this.bThana = []
    this.editAgent.value['bdistrict']=value.name
    for(let i=0;i<this.thana.length;i++){
      if(this.thana[i].districtId==value.districtId)
      this.bThana.push(this.thana[i])
    }
  }

  prdivisionChange(value:any){
    console.log(value)
    this.prDistrict = []
    for(let i=0;i<this.district.length;i++){
      if(this.district[i].divisionId==value)
      this.prDistrict.push(this.district[i])
    }
  }

  prdistrictChange(value:any){
    console.log(value)
    this.editAgent.value['prdistrict']=value.name
    this.prThana = []
    for(let i=0;i<this.thana.length;i++){
      if(this.thana[i].districtId==value.districtId)
      this.prThana.push(this.thana[i])
    }
  }

  pmdivisionChange(value:any){
    console.log(value)
    this.pmDistrict = []
    for(let i=0;i<this.district.length;i++){
      if(this.district[i].divisionId==value)
      this.pmDistrict.push(this.district[i])
    }
  }

  pmdistrictChange(value:any){
    console.log(value)
    this.pmThana = []
    for(let i=0;i<this.thana.length;i++){
      if(this.thana[i].districtId==value.districtId)
      this.pmThana.push(this.thana[i])
    }
  }

  bankChange(value:any){
    this.bankName = value
  }

  bankDistChange(value:any){
    console.log(value)
    this.commonService
    .getBankBranches(this.bankName,value)
    .subscribe({
      
      next: (data) => {
        if(data.length){ //uuid
          //this.success = true;
         this.bankBranches = data
        } 
        else{
          this.noDataFound=true            
        }
      },
      error: (e) => {
        this.noDataFound=true            
      }
      
    });
  }

  bankBranchChange(value: any){
    for(let i=0;i<this.bankBranches.length;i++){
      if(this.bankBranches[i].branchName==value){
        this.routeNo = this.bankBranches[i].routingNo
        this.editAgent.get('routingNo')?.setValue(this.routeNo)
        break;
      }
    }
  }

  setData(data: any){
    // this.editAgent.get('name')?.setValue(data.name);
    // this.editAgent.get('tin')?.setValue(data.tin)
    // this.editAgent.get('fatherName')?.setValue(data.tin)
    // this.editAgent.get('motherName')?.setValue(data.tin)
    // this.editAgent.get('spouseName')?.setValue(data.tin)
    // this.editAgent.get('regAssNID')?.setValue(data.regAssNID)
    // this.editAgent.get('phone')?.setValue(data.phone)
    for(const i in data){
      this.editAgent.get(i)?.setValue(data[i])
    }
    var bank = data.bankinformation
    if(data.bankinformation.length){
      let bnk = data.bankinformation[0]
      for(let i in bnk)
      this.editAgent.get(i)?.setValue(bnk[i])
    }
    var permanent : any= {}
    var present : any= {}
    var business : any = {}
    for(let j=0;j<data.address.length;j++){
      if(data.address[j].type=="PERMANENT")
        permanent =data.address[j] 
      else if (data.address[j].type=="PRESENT")
        present =data.address[j]
      else if(data.address[j].type=="BUSINESS") 
        business = data.address[j]
    }
  
    this.presentAdd = present.district+", "+present.thana+", "+present.address
    this.permanentAdd = permanent.district+", "+permanent.thana+", "+permanent.address
    this.businessAdd = business.district+", "+business.thana+", "+business.address

    // for(let i in this.business)
    //   this.editAgent.get('b'+i)?.setValue(this.business[i])
    console.log(this.editAgent.value)
  }

  agentSubmit(){

  }

  change(type: string){
    console.log(type)
  }

  loadPhoto(url: string){
    let temp = url.split("\\")
    console.log(temp)
    if(temp.length){
      console.log(temp[temp.length-1])
      this.commonService.loadPhoto(temp[temp.length-1]).subscribe({
        next: (data) => {
         // console.log(data)
          //const fileURL = URL.createObjectURL(data);
          let temp = data
          let objectURL = URL.createObjectURL(temp)

          this.image = this.sanitizer.bypassSecurityTrustUrl(objectURL);
        
        },
        error: (e) => {
          alert("File loading Failed!")
          console.log(e)
        } 
      })
    }else alert("file not found")
  }

  

    
}
