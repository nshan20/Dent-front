import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {MatPaginator, MatPaginatorModule, PageEvent} from "@angular/material/paginator";
import {UsersService} from "../../shared/services/users.service";
import {Router} from "@angular/router";
import {async, map} from "rxjs";
import {Pagination, PaginationCalendar} from "../../shared/pagination";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatInputModule} from "@angular/material/input";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";


@Component({
  selector: 'app-all-calendar',
  templateUrl: './all-calendar.component.html',
  styleUrls: ['./all-calendar.component.scss']
})
export class AllCalendarComponent implements OnInit, AfterViewInit {

  clientForms: any = [];
  loading: boolean = false;
  metaForms: PaginationCalendar = {
    page: 1,
    take: 5,
    itemCount: 0,
    pageCount: 0,
    hasPreviousPage: false,
    hasNextPage: true,
    dayDate: "",
  };

  pageLimit: number[] = [5, 10, 50];
  displayedColumns: string[] = [
    'dayDate'
  ];

  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }


  constructor(private usersService: UsersService, private router: Router) {
  }

  ngOnInit() {
    this.usersService.wakeUpTheServer();
    this.getAllMedicalForms();
  }

  getAllMedicalForms() {
    this.loading = true;
    this.usersService.getCalendar(this.metaForms)
      .subscribe((forms: any) => {
        this.metaForms.page = forms.meta.page;
        this.metaForms.take = forms.meta.take;
        this.metaForms.itemCount = forms.meta.itemCount;

        this.clientForms = [...forms.data];
        this.dataSource.data = [...forms.data];
        this.loading = false;
      })
  }

  search(value: string) {
    this.metaForms["dayDate"] = value;

    this.loading = true;

    this.usersService.getCalendar(this.metaForms)
      .subscribe((forms: any) => {
        this.metaForms.page = forms.meta.page;
        this.metaForms.take = forms.meta.take;
        this.metaForms.itemCount = forms.meta.itemCount;

        this.clientForms = [...forms.data];
        this.loading = false;
      })
  }

  onPageChange(event: PageEvent) {
    this.metaForms.page = event.pageIndex + 1;
    this.metaForms.take = event.pageSize;

    console.log(this.metaForms.dayDate)

    this.loading = true;
    this.usersService.getCalendar(this.metaForms)
      .subscribe((forms: any) => {
        this.clientForms = [...forms.data];
        this.loading = false;
      })
  }

  protected readonly JSON = JSON;
}
