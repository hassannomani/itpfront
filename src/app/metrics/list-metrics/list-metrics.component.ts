import { Component, OnInit  } from '@angular/core';
import { UserService } from 'src/app/services/user-service/user.service';
import { Router } from '@angular/router';
import {Title} from "@angular/platform-browser";
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarModule, MatSnackBarVerticalPosition,} from '@angular/material/snack-bar';
import { MetricsService } from 'src/app/services/metrics-service/metrics.service';

@Component({
  selector: 'app-list-metrics',
  templateUrl: './list-metrics.component.html',
  styleUrls: ['./list-metrics.component.css']
})
export class ListMetricsComponent implements OnInit{

  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  username: any = ""
  metricsList: any[] = []
  displayedColumns: any = []
  message : string = ""
  buttonLabel: string = "View"
  buttonColor: string = "primary"
  buttonType: string = "button"
  constructor(
    private userService: UserService,
    private router: Router,
    private titleService:Title,
    private localStore: LocalStorageService,
    private metricsServ: MetricsService,
    private _snackBar: MatSnackBar
  ){
    this.titleService.setTitle("Message List");
  }

  ngOnInit(): void {
    
    this.metricsServ.getAllMetrics().subscribe({
      next: (data) => {
        if(data.length){
          this.metricsList = data
          //this.metricsList.sort((a,b) => a.slotNo.rendered - b.slotNo.rendered);

          this.displayedColumns = ['serial', 'assessmentYear','taxAmount','agentRate','representativeRate','yearNo']
        } 
        else{
          this.message = "No Data found"
          this.openSnackBar()
        }
      },
      error: (e) => {
        console.log(e)
        this.message = "Error Retrieving Data. Please try again"
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
