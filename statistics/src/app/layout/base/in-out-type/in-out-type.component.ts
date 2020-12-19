import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../api-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-in-out-type',
  templateUrl: './in-out-type.component.html',
  styleUrls: ['./in-out-type.component.css']
})
export class InOutTypeComponent implements OnInit {

  hasData: boolean = false;

  data: any = [];

  userId = localStorage.getItem('userId');

  new_in_out_type: any = {code: '', name: '', userId: this.userId};

  displayedColumns: string[] = ['code', 'name'];

  constructor(
    private apiService: ApiService,
    private matSnackBar: MatSnackBar
    ) {}

  ngOnInit(): void {
    this.getInOutTypeList();
  }

  openSnackBar(message: any, action: any) {
    this.matSnackBar.open(message, action, { duration: 3000});
  }

  addInOutType() {
    if (this.new_in_out_type.code == '') {
      this.openSnackBar('code can not be null', 'i know');
      return;
    }
    if (this.new_in_out_type.name == '') {
      this.openSnackBar('name can not be null', 'i know');
      return;
    }
    this.apiService.postApiData("/types/addInOutType", this.new_in_out_type).subscribe(data => {
      if (data == 1) {
        this.new_in_out_type.code = '';
        this.new_in_out_type.name = '';
        this.openSnackBar('add success', 'OK');
        this.getInOutTypeList();
      } else {
        this.openSnackBar('has wrong, try again', 'OK');
      }
    });
  }

  getInOutTypeList() {
    let params = {userId: this.userId};
    this.apiService.postApiData("/types/getInOutTypeListByUserId", params).subscribe(data => {
      this.data = data;
      if (this.data.length == 0) {
        this.hasData = false;
      } else {
        this.hasData = true;
        console.log(this.data);
      }
    });
  }
}
