import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import {MatTabsModule} from '@angular/material/tabs';
import { forkJoin } from 'rxjs';
import { RepresentativeService } from 'src/app/services/representative-service/representative.service';
import { CommonService } from 'src/app/services/common-service/common.service';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { UserService } from 'src/app/services/user-service/user.service';
import { AgentService } from 'src/app/services/agent-service/agent.service';
import { RegisterService } from 'src/app/services/register-service/register.service';
import { Router } from '@angular/router';
import {Title} from "@angular/platform-browser";
import { formatDate } from '@angular/common' 
import { ConfirmDialogModel } from 'src/app/layouts/confirm-modal/confirm-modal.component';
import { DataSavedModalComponent } from 'src/app/layouts/data-saved-modal/data-saved-modal.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-add-representative',
  templateUrl: './add-representative.component.html',
  styleUrls: ['./add-representative.component.css']
})
export class AddRepresentativeComponent implements OnInit{

  StrongPasswordRegx: RegExp =
  /^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d).{8,}$/;
  
  addUser = new FormGroup({
    'username' : new FormControl({value:'',disabled:true},[Validators.required, Validators.minLength(10)]),
    'password' : new FormControl('',[Validators.required, /*Validators.minLength(4)]*/Validators.pattern(this.StrongPasswordRegx)]),
    'repassword' : new FormControl('',[Validators.required, Validators.minLength(4)]),
    'firstName' : new FormControl({value:'',disabled:true},[Validators.required, Validators.minLength(2),]),
    'lastName' : new FormControl({value:'',disabled:true},[Validators.required, Validators.minLength(2)]),
    'email' : new FormControl('',[Validators.required]),
    'addedBy': new FormControl(''),
    'status': new FormControl(''),
    'photo': new FormControl(''),
    'roles': new FormControl('',[Validators.required])
  })

  addRepresentative = new FormGroup({
    'reName' : new FormControl('',[Validators.required]),
    'tinNo' : new FormControl('',[Validators.required]),
    'nid' : new FormControl('',[Validators.required]),
    'reMobileNo' : new FormControl('',[Validators.required]),
    'agId':  new FormControl('',[Validators.required]),
    'agentId' : new FormControl('',[Validators.required]),
    'bankAccountName': new FormControl('',[Validators.required]),
    'bankAccountNo': new FormControl('',[Validators.required]),
    'bankName': new FormControl('',[Validators.required]),
    'bankBranch': new FormControl('',[Validators.required]),
    'bankDistName': new FormControl('',[Validators.required]),
    'routingNo': new FormControl('',[Validators.required]),
    'reDob': new FormControl('',[Validators.required]),
    'bdivision': new FormControl(''),
    'bdistrict': new FormControl(''),
    'bthana': new FormControl(''),
    'bhouse': new FormControl(''),
    'broad': new FormControl(''),
    'bblock': new FormControl(''),
    'bcitycorporation': new FormControl(''),
    'bvillageUnion': new FormControl(''),
    'bward': new FormControl(''),
    'bothers': new FormControl(''),
    'bflat': new FormControl(''),
    'bcheck': new FormControl(''),
    'prdivision': new FormControl(''),
    'prdistrict': new FormControl(''),
    'prthana': new FormControl(''),
    'prhouse': new FormControl(''),
    'prroad': new FormControl(''),
    'prblock': new FormControl(''),
    'prward': new FormControl(''),
    'prothers': new FormControl(''),
    'prcheck': new FormControl(''),
    'prflat': new FormControl(''),
    'prcitycorporation': new FormControl(''),
    'prvillageUnion': new FormControl(''),
    'pmdivision': new FormControl(''),
    'pmdistrict': new FormControl(''),
    'pmthana': new FormControl(''),
    'pmhouse': new FormControl(''),
    'pmroad': new FormControl(''),
    'pmblock': new FormControl(''),
    'pmward': new FormControl(''),
    'pmothers': new FormControl(''),
    'pmcheck': new FormControl(''),
    'pmflat': new FormControl(''),
    'pmcitycorporation': new FormControl(''),
    'pmvillageUnion': new FormControl(''),
    'checked': new FormControl('',[Validators.required]),
    'display': new FormControl('',[Validators.required]),
    'trpId': new FormControl('',[Validators.required]),
    'refNo': new FormControl('',[Validators.required]),
    'certNo': new FormControl('',[Validators.required]),
    'certPass': new FormControl('',[Validators.required]),
    'certSerial': new FormControl('',[Validators.required]),
    'rePhoto': new FormControl('',[Validators.required]),
    'filePath': new FormControl('',[Validators.required]),
    're_address': new FormControl(<Object>[]),
    're_bankinformation': new FormControl(<Object>[]),

  })
  addedSuccess: boolean = false
  addedSuccess2: boolean = false
  addedSuccess3: boolean = false
  failedCreation: boolean = false
  duplicateEntry: boolean = false
  disabledtrue: boolean = false
  localStore: any = {}
  failed: boolean = false
  errorMsg: string = ""
  success: boolean = false
  successMsg: string = ""
  goSuccess: boolean = false
  bankfailed: boolean = false
  addressfailed: boolean = false
  fileUploaded: boolean = false
  photoUploaded: boolean = false
  buttonLabel: string= "Submit"
  buttonColor: string = "primary"
  buttonType: string = "button"
  buttonLabel1: string= "Create User"
  buttonColor1: string = "primary"
  buttonType1: string = "button"
  buttonLabel2: string= "Save and Continue"
  buttonColor2: string = "primary"
  buttonType2: string = "button"
  buttonLabel3: string= "Upload"
  buttonColor3: string = "primary"
  buttonType3: string = "button"
  buttonLabel4: string= "Upload"
  buttonColor4: string = "primary"
  buttonType4: string = "button"
  division: any[] = []
  district: any[] = []
  citycorporation : any[] = []
  thana: any[] = []
  bankInfo: any=[]
  index: any = 0
  addressArr: any =[]
  roles: any = []
  roleRep: any = []
  bDistrict: any = []
  bThana: any = []
  pmDistrict: any = []
  pmThana: any = []
  prDistrict: any = []
  prThana: any = []
  agentId: any = ""
  agents: any = []
  banks: any = []
  bankdist: any = []
  bankBranches: any = []
  certificate: any = {}
  bankName: string = ""
  noDataFound: boolean = false
  routeNo: string = ""
  saving: boolean = false
  savingMsg: string = ""
  step1Success : boolean = false
  step2Success : boolean = false
  tinnotFound : boolean = false
  file!: File;
  photo!: File;
  file_list: Array<string> = [];
  bcccheck: boolean = false
  pmcccheck: boolean = false
  prcccheck: boolean = false
  notMatch: boolean = false
  modalTitle: string = ""
  modalMessage: string= ""
  username: string= ""
  firstname: string= ""
  lastname: string= ""
  constructor(
    private representativeServ: RepresentativeService,  
    private commonService: CommonService,
    private localStorage: LocalStorageService,
    private router: Router,
    private userService: UserService,
    private agentService: AgentService,
    private titleService:Title,
    public dialog: MatDialog,
    private registrationServ: RegisterService
 
  ){
    this.titleService.setTitle
    
    ("TRP Registration");

  }
  ngOnInit(): void {
    this.localStore = this.localStorage.getUnregisteredUser();
    //let temp = JSON.parse(this.localStore)
    var tin = this.username= JSON.parse(this.localStore.un_tin)
    
    var nid = JSON.parse(this.localStore.un_nid)
    console.log(this.localStore)
    if(this.localStore.un_nid!=""){
      let temp = JSON.parse(this.localStore.un_tinData)
      console.log(temp)
      this.addUser.get('username')?.setValue(JSON.parse(this.localStore.un_tin))
      let name = temp.name
      this.addRepresentative.get('reName')?.setValue(name)

      let tempTin = JSON.parse(this.localStore.un_tin)
      this.addRepresentative.get('tinNo')?.setValue(tempTin)

      if(name!=null && name!=''){
        let split = name.split(" ")
        let lastpart=""
        this.addUser.get("firstName")?.setValue(split[0])
        this.firstname = split[0]
        for (let i=1;i<split.length;i++)
          lastpart+=split[i]+" "
        this.addUser.get("lastName")?.setValue(lastpart)
        this.lastname = lastpart
      }

      if(temp.dob!=""){
        let dob= temp.dob
        let dt= new Date(dob)
        this.setDate(dt)
      }

      if(temp.email!=""&&temp.email!=null){
        let email= temp.email
        this.addUser.get('email')?.setValue(email)

      }
    
      
      this.addRepresentative.get('reMobileNo')?.setValue(JSON.parse(this.localStore.un_mobile))
    
      this.addRepresentative.get('nid')?.setValue(JSON.parse(this.localStore.un_nid))
    }
    this.onTabChanged();
      forkJoin(
        [this.commonService.getDistrict(),
        this.commonService.getDivision(),
        this.commonService.getThana(),
        this.userService.getRoles(),
        this.agentService.getAllAgentForFront(),
        this.commonService.getBank(),
        this.commonService.getBankDist(),
        this.commonService.getCityCorp(),
        this.registrationServ.getCertificate(tin,nid)
      ])
      .subscribe({
        next: (data) => {
          //console.log(data)
          this.district = data[0];
          this.division = data[1];
          this.thana = data[2];
          this.roles = data[3];
          this.agents = data[4];
          this.banks = data[5];
          this.bankdist = data[6];
          this.citycorporation = data[7];
          this.certificate = data[8]
          this.processCert()
        },
        error: (e) => {
         
            console.log("Error retrieving")
        }
      });
  }
  
  processCert(){
    this.addRepresentative.get("certNo")?.setValue(this.certificate.examineeCertno)
    this.addRepresentative.get("certSerial")?.setValue(this.certificate.examineeCertserial)

  }
  representativeSubmit(){
    this.saving = true
    let bankObj={
      bankAccountName: this.addRepresentative.value['bankAccountName'],
      bankAccountNo: this.addRepresentative.value['bankAccountNo'],
      bankName: this.addRepresentative.value['bankName'],
      bankBranch: this.addRepresentative.value['bankBranch'],
      routingNo: this.addRepresentative.value['routingNo']
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
        this.saving = false
      }
      
    });
    

  }

  representativeSave(){
    let bankObj={
      bankAccountName: this.addRepresentative.value['bankAccountName'],
      bankAccountNo: this.addRepresentative.value['bankAccountNo'],
      bankName: this.addRepresentative.value['bankName'],
      bankBranch: this.addRepresentative.value['bankBranch'],
      routingNo: this.addRepresentative.value['routingNo']
    }

  this.commonService
  .addBank(bankObj)
  .subscribe({
    
    next: (data) => {
      if(data?.uuid!=""){
        this.bankInfo.push(bankObj);
        if(this.bankInfo.length){

          this.addRepresentative.value['agentId'] = this.agentId
          this.addRepresentative.value['re_address']=this.addressArr
          //this.addAgent.value['address']?.push(this.businessAdd)
          this.addRepresentative.value['re_bankinformation'] = this.bankInfo 
            
          this.representativeServ
          .addRepresentative(this.addRepresentative.value)
          .subscribe({
            
            next: (data) => {
              if(data?.userid!=""){
                this.success = true;
                this.saving = false
                this.addRepresentative.reset()
                this.modalMessage = "You have successfully submitted the application. Please wait for the approval"
                this.modalTitle = "Success!"
                this.alertDialog()
                this.failed=false;
                this.disabledtrue = true
                this.freeLocal()
              } 
              else{
                this.saving = false
                this.failed = true
                this.modalMessage = "Application couldn't be submitted"
                this.modalTitle = "Failed!"
                this.alertDialog()
              }
            },
            error: (e) => {
              console.log(e)
              this.failed = true
              this.saving = false
              this.modalMessage = "Error occurred. Please try again later!"
              this.modalTitle = "Error!"
              this.alertDialog()

            }

          })
        } 
        else{
          this.bankfailed = true
        }
      }
    },
    error: (e) => {
      this.bankfailed = true
      this.saving = false
    }
    
  });}

  selectedTabChange($event:any) {
    this.index = $event.index
    console.log(this.index)
    this.onTabChanged()
  }

  saveAddresses(){
    let prdistrict:any={}
    prdistrict=this.addRepresentative.value['prdistrict']
    let bdistrict:any={}
    bdistrict=this.addRepresentative.value['bdistrict']
    let pmdistrict:any={}
    pmdistrict=this.addRepresentative.value['pmdistrict']
    let presentobj={
      type: "PRESENT",
      division: this.addRepresentative.value['prdivision'],
      district: prdistrict.name,
      thana: this.addRepresentative.value['prthana'],
      house: this.addRepresentative.value['prhouse'],
      road: this.addRepresentative.value['prroad'],
      block: this.addRepresentative.value['prblock'],
      ward: this.addRepresentative.value['prward'],
      flat: this.addRepresentative.value['prflat'],
      villageUnion: this.addRepresentative.value['prvillageUnion'],
      citycorporation: this.addRepresentative.value['prcitycorporation'],
      others: this.addRepresentative.value['prothers'],
      addedBy: "SELF" 
    }
    let businessobj={
      type: "BUSINESS",
      division: this.addRepresentative.value['bdivision'],
      district: pmdistrict.name,
      thana: this.addRepresentative.value['bthana'],
      house: this.addRepresentative.value['bhouse'],
      road: this.addRepresentative.value['broad'],
      block: this.addRepresentative.value['bblock'],
      ward: this.addRepresentative.value['bward'],
      flat: this.addRepresentative.value['bflat'],
      villageUnion: this.addRepresentative.value['bvillageUnion'],
      citycorporation: this.addRepresentative.value['bcitycorporation'],
      others: this.addRepresentative.value['bothers'],
      addedBy: "SELF" 
    }
    let permanentobj={
      type: "PERMANENT",
      division: this.addRepresentative.value['pmdivision'],
      district: pmdistrict.name,
      thana: this.addRepresentative.value['pmthana'],
      house: this.addRepresentative.value['pmhouse'],
      road: this.addRepresentative.value['pmroad'],
      block: this.addRepresentative.value['pmblock'],
      ward: this.addRepresentative.value['pmward'],
      flat: this.addRepresentative.value['pmflat'],
      villageUnion: this.addRepresentative.value['pmvillageUnion'],
      citycorporation: this.addRepresentative.value['pmcitycorporation'],
      others: this.addRepresentative.value['pmothers'],
      addedBy: "SELF" 
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
          this.index+=1;
          this.step2Success = true
        }
      },
      error: (e) => {
        
          console.log("Error retrieving")
          this.addressfailed = true
      }
    });
  }

  saveBankDetails(){
    let bankObj={
      bankAccountName: this.addRepresentative.value['bankAccountName'],
      bankAccountNo: this.addRepresentative.value['bankAccountNo'],
      bankName: this.addRepresentative.value['bankName'],
      bankBranch: this.addRepresentative.value['bankBranch'],
      routingNo: this.addRepresentative.value['routingNo']
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
        this.saving = false
      }
      
    });
  }

  registerUser(){
   
    this.addUser.value['addedBy']="0"
    this.addUser.value['status']="0"
    this.addUser.value['photo']=""
    let index = -1;
    for(let i=0;i<this.roles.length;i++){
      if(this.roles[i].name=="ROLE_REPRESENTATIVE"){
        this.roleRep.push( this.roles[i])
        break;
      }
    }
    this.addUser.value['roles'] = this.roleRep;
    if(!this.passwordFormField?.value?.match('^(?=.*[A-Z])')
    ||!this.passwordFormField?.value?.match('(?=.*[a-z])')
    ||!this.passwordFormField?.value?.match('(.*[0-9].*)')
    ||!this.passwordFormField?.value?.match('(?=.*[!@#$%^&*])')
    ||!this.passwordFormField?.value?.match('.{8,}')
    ||this.addUser.get('password')?.value!=this.addUser.get('repassword')?.value)
    {
      return
    }
    this.addUser.value["username"] = this.username
    this.addUser.value["firstName"]= this.firstname
    this.addUser.value["lastName"] = this.lastname
    this.userService.registerUser(this.addUser.value).subscribe({
     
      next: (data) => {
        if(data.uuid){
          this.addedSuccess = true
          this.addRepresentative.get("reName")?.setValue(data.firstName+" "+data.lastName)
          this.addRepresentative.get("tinNo")?.setValue(data.username)
          this.addUser.reset()
          this.index +=1
          //console.log(this.roles)
        } 
        else{
          this.failedCreation = true
        }
      },
      error: (e) => {
        if(e.status==400)
          this.duplicateEntry = true
        else
          this.failedCreation = true
      }  
    });
    
  
  }
  
  onTabChanged() {
    console.log(this.index)
    if(this.index==1){
      //this.registerUser()
    }
    else if (this.index==2) {
      //this.saveBankDetails()
    } else if (this.index==3) {
      //his.saveAddresses()
    }
  }
  step1(){
    this.step1Success = true
    this.index+=1;
  }
  step2(){
  
    this.saveAddresses();
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
    this.addRepresentative.value['bdistrict']=value.name
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
    this.addRepresentative.value['prdistrict']=value.name
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
        this.addRepresentative.get('routingNo')?.setValue(this.routeNo)
        break;
      }
    }
  }

  checkAddress(completed:boolean){
   
    if(completed==true){

      let pmward= this.addRepresentative.value['pmward']
      if(pmward!=null)
        this.addRepresentative.get('prward')?.setValue(pmward)
    
      let pmroad= this.addRepresentative.value['pmroad']
      if(pmroad!=null)
        this.addRepresentative.get('prroad')?.setValue(pmroad)

      let pmhouse= this.addRepresentative.value['pmhouse']
      if(pmhouse!=null)
        this.addRepresentative.get('prhouse')?.setValue(pmhouse)

      let pmblock= this.addRepresentative.value['pmblock']
      if(pmblock!=null)
        this.addRepresentative.get('prblock')?.setValue(pmblock)
        
      let div = this.addRepresentative.value['pmdivision']
      console.log(div)

      if(div!=null)
        this.addRepresentative.get('prdivision')?.setValue(div)

      this.prdivisionChange(div)

      let dist = this.addRepresentative.value['pmdistrict']
      console.log(dist)
      console.log(this.prDistrict)
      if(dist!=null)
        this.addRepresentative.get('prdistrict')?.setValue(dist)
      this.prdistrictChange(dist)
      
      let thana = this.addRepresentative.value['pmthana']
      if(thana!=null)
        this.addRepresentative.get('prthana')?.setValue(thana)

        
      let others = this.addRepresentative.value['pmothers']
      if(others!=null)
          this.addRepresentative.get('prothers')?.setValue(others)
      
      let union = this.addRepresentative.value['pmvillageUnion']
      if(union!=null)
          this.addRepresentative.get('prvillageUnion')?.setValue(union)

      let check = this.addRepresentative.value['pmcheck']
      if(check!=null)
      this.addRepresentative.get('prcheck')?.setValue(check)

      if(this.pmcccheck){
        this.prcccheck = true
        let cc = this.addRepresentative.value['pmcitycorporation']
        if(cc!=null)
        this.addRepresentative.get('prcitycorporation')?.setValue(cc)

      }
      let flat = this.addRepresentative.value['pmflat']
      if(flat!=null){
        this.addRepresentative.get('prflat')?.setValue(flat)
      }

    } else{
      this.addRepresentative.controls['prward'].reset()
      this.addRepresentative.controls['prdivision'].reset()
      this.addRepresentative.controls['prdistrict'].reset()
      this.addRepresentative.controls['prthana'].reset()
      this.addRepresentative.controls['prvillageUnion'].reset()
      this.addRepresentative.controls['prhouse'].reset()
      this.addRepresentative.controls['prflat'].reset()
      this.addRepresentative.controls['prroad'].reset()
      this.addRepresentative.controls['prblock'].reset()
      this.addRepresentative.controls['prothers'].reset()
      this.addRepresentative.controls['prcitycorporation'].reset()
      this.addRepresentative.controls['prcheck'].reset()
      this.prcccheck = false
    }
    

  }
  verify(){
    let username = this.addUser.value["username"]?this.addUser.value["username"]:""
    this.commonService.getTin(username).subscribe({
      next: (data) => {
        console.log(data)
        if(data.isError==1){
          this.tinnotFound = true
        }else{
          this.localStorage.saveRepresentative(data)
          this.addUser.get('email')?.setValue(data.email)
          let name = data.name
          if(name!=null && name!=''){
            let split = name.split(" ")
            let lastpart=""
            this.addUser.get("firstName")?.setValue(split[0])
            for (let i=1;i<split.length;i++)
              lastpart+=split[i]+" "
            this.addUser.get("lastName")?.setValue(lastpart)
            if(data.dob!=""){
              let dt= new Date(data.dob)
              this.setDate(dt)
            }
            this.addRepresentative.get('reMobileNo')?.setValue(data.mobile)
            let pattern = /\d+/g
            let string= data.nid  
            let final = string.match(pattern)
            if(final.length)
              this.addRepresentative.get('nid')?.setValue(final[0])
          }
        }
      },
      error: (e) => {
        console.log(e)

      }  
    })
  }
  setDate(value:any){
    this.addRepresentative.get('reDob')?.setValue(formatDate(value,'yyyy-MM-dd','en'))

  }

  setAgent(value:any){
    console.log(value)
    this.agentId=value
  }
  selectFile(event: any){
    this.file = event.target.files.item(0);
  }

  uploadFile() {
    this.commonService.uploadFile(this.file).subscribe({
      next: (data) => {
        console.log(data.fileUri)
        if(data.fileUri){
          this.addRepresentative.get('filePath')?.setValue(data.fileUri);
          console.log(this.addRepresentative)
          this.fileUploaded = true
        }
        //this.fileUris.push(this.fileDetails.fileUri);
        //alert("File Uploaded Successfully")
      },
      error: (e) => {
        console.log(e);
      }
    });
  }

  selectPhoto(event: any){
    this.photo = event.target.files.item(0);
  }

  uploadPhoto() {
    this.commonService.uploadPhoto(this.photo).subscribe({
      next: (data) => {
        console.log(data.fileUri)
        if(data.fileUri){
          this.addRepresentative.get('rePhoto')?.setValue(data.fileUri);
          console.log(this.addRepresentative)
          this.photoUploaded = true
        }
        //this.fileUris.push(this.fileDetails.fileUri);
        //alert("File Uploaded Successfully")
      },
      error: (e) => {
        console.log(e);
      }
    });
  }

  setBCheck(completed: boolean){
    if(completed)
      this.bcccheck = true
    else
      this.bcccheck = false

  }
  setPmCheck(completed: boolean){
    if(completed)
      this.pmcccheck = true
    else
      this.pmcccheck = false

  }
  setPrCheck(completed: boolean){
    if(completed)
      this.prcccheck = true
    else
      this.prcccheck = false

  }

  alertDialog(): void {

    const dialogData = new ConfirmDialogModel(this.modalTitle, this.modalMessage);

    const dialogRef = this.dialog.open(DataSavedModalComponent, {
      maxWidth: "400px",
      data: dialogData
    });
  }

  freeLocal(){
    this.localStorage.deleteUnregisteredUser()
  }

  get passwordFormField() {
    return this.addUser.get('password');
  }

  get repasswordFormField() {
    return this.addUser.get('repassword');
  }

  checkBothFields(event: any){
    let a = this.addUser.get('password')?.value
    let b = this.addUser.get('repassword')?.value
    console.log(a+" "+b)
    if (this.addUser.get('password')?.value!=this.addUser.get('repassword')?.value)
      this.notMatch = true
    else
      this.notMatch = false
  }
}

