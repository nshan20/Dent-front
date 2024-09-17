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
  pageLimit: number[] = [5, 10, 50];


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

  paramsData: any = {
    name: "",
    lastName: "",
    surName: "",
    age: "",
    phoneNumber: "",
    page: 1,
    take: 5,
  };

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
    this.usersService.getAllMedicalForms(this.paramsData)
      .subscribe(forms => {
        this.forms = forms.data;
        this.clientForms = forms.data;

        this.metaForms = forms.meta;
        this.loading = false;
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

  search(value: string, nameColumn: string) {
    this.paramsData[nameColumn] = value;
    this.loading = true;

    this.usersService.getAllMedicalForms(this.paramsData)
      .subscribe(forms => {
        this.forms = forms.data;
        this.clientForms = forms.data;

        this.metaForms = forms.meta;
        this.loading = false;
      })

  }

  onPageChange(event: PageEvent) {
    this.loading = true;

    this.paramsData.page = event.pageIndex + 1;
    this.paramsData.take = event.pageSize;

    this.usersService.getAllMedicalForms(this.paramsData)
      .subscribe(forms => {
        this.forms = forms.data;
        this.clientForms = forms.data;

        this.metaForms = forms.meta;
        this.loading = false;
      })
  }
}
