import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {UsersService} from "../../shared/services/users.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-all-calendar',
  templateUrl: './all-calendar.component.html',
  styleUrls: ['./all-calendar.component.scss']
})
export class AllCalendarComponent  implements OnInit, AfterViewInit {

  forms: any;
  clientForms: any = [];


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
    this.usersService.getCalendar().subscribe((forms: any) => {
      this.forms = forms;
      this.clientForms = [...forms];
      this.dataSource.data = [...forms];
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
}
