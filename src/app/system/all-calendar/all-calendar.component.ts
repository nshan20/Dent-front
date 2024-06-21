import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {UsersService} from "../../shared/services/users.service";
import {Router} from "@angular/router";
import {async, map} from "rxjs";
import {Pagination} from "../../shared/pagination";


@Component({
  selector: 'app-all-calendar',
  templateUrl: './all-calendar.component.html',
  styleUrls: ['./all-calendar.component.scss']
})
export class AllCalendarComponent  implements OnInit, AfterViewInit {

  forms: any;
  clientForms: any = [];

  loading: boolean = false;

  metaForms: Pagination = {
    page: 0,
    take: 0,
    itemCount: 0,
    pageCount: 0,
    hasPreviousPage: false,
    hasNextPage: true,
  };
  pageLimit:number[] = [5, 10, 50] ;

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
    this.getAllMedicalForms();
  }

  getAllMedicalForms() {
    this.loading = true;
    this.usersService.getCalendar()
      .pipe(
        map((empData: any) => {
          console.log(empData, "11111")
          return empData;
        })
      )
      .subscribe((forms: any) => {
      this.metaForms = forms.meta;

      this.forms = forms.data;
      this.clientForms = [...forms.data];
      this.dataSource.data = [...forms.data];
      this.loading = false;
    })
  }

  search(value: string) {
    this.clientForms = this.searchRecords(this.forms, value);
    this.dataSource.data = [...this.clientForms];
  }

  searchRecords(records: any, searchTerm: any) {
    searchTerm = searchTerm.toLowerCase();
    const result = records.filter((record: any) => {
      const {
        dayDate
      } = record;
      return (
        dayDate && dayDate.toLowerCase().includes(searchTerm)
      );
    });
    return result;
  }

  protected readonly JSON = JSON;

  onPageChange(event: PageEvent) {
    console.log(event, "event");

    this.loading = true;
    this.usersService.getCalendar(event.pageIndex + 1, event.pageSize)
      .subscribe((forms: any) => {
        this.forms = forms.data;
        this.clientForms = [...forms.data];
        // this.dataSource.data = [...forms.data];
        this.loading = false;
      })
  }
}
