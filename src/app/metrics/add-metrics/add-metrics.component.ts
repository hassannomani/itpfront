import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import {Title} from "@angular/platform-browser";
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { FormControl, FormGroup, NgForm, Validators, AbstractControl } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarModule, MatSnackBarVerticalPosition,} from '@angular/material/snack-bar';
import { MetricsService } from 'src/app/services/metrics-service/metrics.service';
@Component({
  selector: 'app-add-metrics',
  templateUrl: './add-metrics.component.html',
  styleUrls: ['./add-metrics.component.css']
})
export class AddMetricsComponent {

  buttonLabel: string = "Save"
  buttonColor: string = "primary"
  buttonType: string = "button"
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  message : string = ""
  addMetrics = new FormGroup({
    'taxAmount' : new FormControl('',[Validators.required]),
    'assessmentYear' : new FormControl('',[Validators.required]),
    'agentRate' : new FormControl('',[Validators.required]),
    'representativeRate' : new FormControl('',[Validators.required]),
    'yearNo' : new FormControl('',[Validators.required]),
    'slotNo' : new FormControl('',[Validators.required]),
  })
  constructor(
    private router: Router,
    private titleService:Title,
    private route: ActivatedRoute,
    private localStore: LocalStorageService,
    private metricService: MetricsService,
    private _snackBar: MatSnackBar
  ){
    this.titleService.setTitle("Add Metrics");
  }
  ngOnInit(): void{
  }
  metricsSubmit(){

    this.metricService.saveMetrics(this.addMetrics.value).subscribe({
      next: (data) => {
        console.log(data)
        if(data.response=="ok"){
          this.message = "Metrics Added Successfully"
          this.addMetrics.reset();
          this.openSnackBar()
        } 
        else{
          this.message = "Metrics Adding Failed"
          this.openSnackBar()

        }
      },
      error: (e) => {
        console.log(e)
        this.message = "Error! Try again later"
        this.openSnackBar()

      }  
    })
   

  }

  openSnackBar() {
    this._snackBar.open(this.message, 'x', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 5 * 1000,

    });
  }
}
