import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmServiceComponent } from 'src/app/confirm-service/confirm-service.component';

@Component({
  selector: 'app-in-out-type',
  templateUrl: './in-out-type.component.html',
  styleUrls: ['./in-out-type.component.css']
})
export class InOutTypeComponent implements OnInit {

  hasData: boolean = false; // 判断是否有数据显示在table中

  data: any = []; // table中显示的数据

  userId = localStorage.getItem('userId');  // 登录用户userId

  new_in_out_type: any = {code: '', name: '', userId: this.userId}; // 创建新收支类型

  displayedColumns: string[] = ['code', 'name', 'id']; // table 表头

  constructor(
    private apiService: ApiService,
    private matSnackBar: MatSnackBar,
    private dialog: MatDialog
    ) {}

  ngOnInit(): void {
    this.getInOutTypeList();
  }

  // 打开底部提示框
  openSnackBar(message: any, action: any) {
    this.matSnackBar.open(message, action, { duration: 3000});
  }

  // 新增收支类型
  addInOutType() {
    if (this.new_in_out_type.code == '') {
      this.openSnackBar('code can not be null', 'i know');
      return;
    }
    if (this.new_in_out_type.name == '') {
      this.openSnackBar('name can not be null', 'i know');
      return;
    }

    const dialogRef = this.dialog.open(ConfirmServiceComponent, {
      width: '250px',
      data: {type: 'add'}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
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
    });
  }

  // 查询收支类型数据，数据不多不用添加分页
  getInOutTypeList() {
    let params = {userId: this.userId};
    this.apiService.postApiData("/types/getInOutTypeListByUserId", params).subscribe(data => {
      this.data = data;
      if (this.data.length == 0) {
        this.hasData = false;
      } else {
        this.hasData = true;
      }
    });
  }

  // 选中收支类型的id
  checkId: number = 0;

  // 是否删除对话框
  openDeleteDialog(id: number): void {
    this.checkId = id;
    const dialogRef = this.dialog.open(ConfirmServiceComponent, {
      width: '250px',
      data: {type: 'delete'}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        let params = {id: this.checkId};
        this.apiService.postApiData("/types/deleteInOutType", params).subscribe(data =>{
          if (data == 1) {
            this.openSnackBar('delete success', 'OK');
            this.getInOutTypeList();
          } else {
            this.openSnackBar('delete failed', 'OK');
          }
          this.checkId = 0;
        });
      } else {
        this.openSnackBar('delete cancel', 'OK');
        this.checkId = 0;
      }
    });
  }

}
