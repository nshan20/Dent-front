import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {UsersService} from "../../shared/services/users.service";
import {DatePipe, NgForOf, NgIf, NgStyle} from "@angular/common";
import {Router, RouterLink, Routes} from "@angular/router";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {MatPaginator, MatPaginatorModule, PageEvent} from "@angular/material/paginator";
import {Pagination} from "../../shared/pagination";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";

@Component({
  selector: 'app-table-forms',
  templateUrl: './table-forms.component.html',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    MatButtonModule,
    RouterLink,
    DatePipe,
    NgStyle,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatProgressSpinnerModule
  ],
  styleUrls: ['./table-forms.component.scss']
})
export class TableFormsComponent implements OnInit, AfterViewInit {

  forms: any;
  clientForms: any[] = [];
  deleteMedicalForms: any;

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
    'name',
    'lastName',
    'surName',
    'age',
    'phoneNumber',
    'urlFail',
    'registerDate',
    'edit',
    'delete'
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
    this.usersService.getAllMedicalForms().subscribe(forms => {
      this.forms = forms.data;
      this.clientForms = forms.data;
      this.dataSource.data = [...forms.data];

      this.metaForms = forms.meta;
    })
  }


  info(idMedicalForms: number | string) {
    this.router.navigate(["system/info", idMedicalForms])
  }

  deleteById(id: number | string) {
    this.usersService.deleteByIdForm(id)
      .subscribe(value => {
        this.getAllMedicalForms();
      })
  }

  openDeleteModal(medicalForms: any) {
    this.deleteMedicalForms = medicalForms;
  }

  search(value: string) {
    this.clientForms = this.searchRecords(this.forms, value);
    this.dataSource.data = [...this.clientForms];
  }

  searchRecords(records: any, searchTerm: any) {
    searchTerm = searchTerm.toLowerCase();

    const result = records.filter((record: any) => {
      const {
        name,
        lastName,
        surName,
        age,
        phoneNumber
      } = record;

      return (
        name && name.toLowerCase().includes(searchTerm) ||
        lastName && lastName.toLowerCase().includes(searchTerm) ||
        surName && surName.toLowerCase().includes(searchTerm) ||
        age && age.toString().includes(searchTerm) ||
        phoneNumber && phoneNumber.includes(searchTerm)
      );
    });

    return result;
  }

  onPageChange(event: PageEvent) {
    console.log(event, "event");

    this.loading = true;

    this.usersService.getAllMedicalForms(event.pageIndex + 1, event.pageSize)
      .subscribe(forms => {
      this.forms = forms.data;
      this.clientForms = forms.data;
      // this.dataSource.data = [...forms.data];

      this.metaForms = forms.meta;
      this.loading = false;
    })
  }
}
