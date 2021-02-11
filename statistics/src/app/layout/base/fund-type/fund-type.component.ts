import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmServiceComponent } from 'src/app/confirm-service/confirm-service.component';

@Component({
  selector: 'app-fund-type',
  templateUrl: './fund-type.component.html',
  styleUrls: ['./fund-type.component.css']
})
export class FundTypeComponent implements OnInit {

  hasData: boolean = false;   // 是否有数据

  userId = localStorage.getItem('userId');    // 用户id

  data: any = [];   // table 显示数据

  new_fund_type: any = {code: '', name: '', userId: this.userId};   // 新增资金类型

  displayedColumns: string[] = ['code', 'name', 'status', 'id'];    // table header

  constructor(
    private apiService: ApiService,
    private matSnackBar: MatSnackBar,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getFundTypeList();
  }

  // 获取资金类型列表
  getFundTypeList(): void {
    let params = {userId: this.userId};
    this.apiService.postApiData("/types/getFundTypeListByUserId", params).subscribe(result => {
      this.data = result;
      console.log(this.data);
      if (this.data.length == 0) {
        this.hasData = false;
      } else {
        this.hasData = true;
      }
    });
  }

  // 新增资金类型
  addFundType(): void {
    if (this.new_fund_type.code.trim(' ') == '') {
      this.openSnackBar('code can not be null', 'i know');
      return;
    }
    if (this.new_fund_type.name.trim(' ') == '') {
      this.openSnackBar('name can not be null', 'i know');
      return;
    }

    const dialogRef = this.dialog.open(ConfirmServiceComponent, {
      width: '250px',
      data: {type: 'add'}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.apiService.postApiData("/types/addFundType", this.new_fund_type).subscribe(data => {
          if (data == 1) {
            this.new_fund_type.code = '';
            this.new_fund_type.name = '';
            this.openSnackBar('add success', 'OK');
            this.getFundTypeList();
          } else {
            this.openSnackBar('has wrong, try again', 'OK');
          }
        });
      }
    });
  }

  // 删除资金类型
  deleteFundType(id: any): void {
    console.log(id);
  }

  // 底部提示框
  openSnackBar(message: any, action: any): void {
    this.matSnackBar.open(message, action, { duration: 3000});
  }

}
