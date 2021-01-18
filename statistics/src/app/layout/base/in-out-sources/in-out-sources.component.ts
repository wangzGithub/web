import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api-service.service';

@Component({
  selector: 'app-in-out-sources',
  templateUrl: './in-out-sources.component.html',
  styleUrls: ['./in-out-sources.component.css']
})
export class InOutSourcesComponent implements OnInit {

  hasData: boolean = false; // 判断是否有数据显示在table中

  data: any = []; // table中显示的数据

  userId = localStorage.getItem('userId');  // 登录用户userId

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.getInOutSourcesList();
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
      console.log(this.data);
    });
  }

}
