import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmServiceComponent } from 'src/app/confirm-service/confirm-service.component';

@Component({
  selector: 'app-in-out-sources',
  templateUrl: './in-out-sources.component.html',
  styleUrls: ['./in-out-sources.component.css']
})
export class InOutSourcesComponent implements OnInit {

  hasData: boolean = false; // 判断是否有数据显示在table中

  data: any = []; // table中显示的数据

  in_out_type_list: any = []; // 新增栏中显示收支定义

  userId = localStorage.getItem('userId');  // 登录用户userId

  new_in_out_sources: any = {name: '', inOutTypeId: '', userId: this.userId}; // 创建新收支分类

  displayedColumns: string[] = ['inOutType', 'name', 'id']; // table 表头

  constructor(
    private apiService: ApiService,
    private matSnackBar: MatSnackBar,
    private dialog: MatDialog
    ) { }

  ngOnInit(): void {
    this.getInOutSourcesList();
    this.getInOutTypeList();
  }

  // 打开底部提示框
  openSnackBar(message: any, action: any) {
    this.matSnackBar.open(message, action, { duration: 3000});
  }

  // 查询收支来源去向数据，数据不多不用添加分页
  getInOutSourcesList() {
    let params = { userId: this.userId };
    this.apiService.postApiData("/types/getInOutSourcesListByUserId", params).subscribe(data => {
      this.data = data;
      if (this.data.length == 0) {
        this.hasData = false;
      } else {
        this.hasData = true;
      }
    });
  }

  // 查询收支类型数据，数据不多不用添加分页
  getInOutTypeList() {
    let params = {userId: this.userId};
    this.apiService.postApiData("/types/getInOutTypeListByUserId", params).subscribe(data => {
      this.in_out_type_list = data;
    });
  }

  // 新增收支分类
  addInOutSources() {
    if (this.new_in_out_sources.inOutTypeId == '') {
      this.openSnackBar('收支定义必选', 'OK');
      return;
    }
    if (this.new_in_out_sources.name.trim(' ') == '') {
      this.openSnackBar('名称不能为空', 'OK');
      return;
    }
    const dialogRef = this.dialog.open(ConfirmServiceComponent, {
      width: '250px',
      data: {type: 'add'}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.apiService.postApiData("/types/addInOutSources", this.new_in_out_sources).subscribe(data => {
          if (data == 1) {
            this.new_in_out_sources.name = '';
            this.new_in_out_sources.inOutTypeId = '';
            this.openSnackBar('add success', 'OK');
            this.getInOutSourcesList();
          } else if (data == 2) {
            this.openSnackBar('名称重复', 'OK');
          } else {
            this.openSnackBar('has wrong, try again', 'OK');
          }
        });
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
        this.apiService.postApiData("/types/deleteInOutSource", params).subscribe(data =>{
          if (data == 1) {
            this.openSnackBar('delete success', 'OK');
            this.getInOutSourcesList();
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
