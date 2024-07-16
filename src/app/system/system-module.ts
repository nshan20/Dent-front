import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {SharedModule} from "../shared/shared.module";
import {TableFormsComponent} from "./table-forms/table-forms.component";
import {SystemRoutingModule} from "./system-routing.module";
import {AddFormComponent} from "./add-form/add-form.component";
import {EditFormComponent} from "./edit-form/edit-form.component";
import {MatNativeDateModule} from "@angular/material/core";
import {MatButtonModule} from "@angular/material/button";
import {MatDividerModule} from "@angular/material/divider";
import {MatIconModule} from "@angular/material/icon";
import {AllCalendarComponent} from "./all-calendar/all-calendar.component";


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    TableFormsComponent,
    SystemRoutingModule,
    AddFormComponent,
    EditFormComponent,
    MatNativeDateModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
  ],
  declarations: [
  ]
})

export class SystemModule {

}
