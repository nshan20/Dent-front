import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {SystemComponent} from "./system.component";
import {TableFormsComponent} from "./table-forms/table-forms.component";
import {InfoComponent} from "./info/info.component";
import {AddFormComponent} from "./add-form/add-form.component";
import {EditFormComponent} from "./edit-form/edit-form.component";
import {CalendarComponent} from "./calendar/calendar.component";
import {AuthGuard} from "../shared/services/auth.guard";
import {AllCalendarComponent} from "./all-calendar/all-calendar.component";

const routes: Routes = [
  {
    path: "system", component: SystemComponent, canActivate: [AuthGuard], children: [
      {path: "", component: TableFormsComponent, canActivate: [AuthGuard]},
      {path: "forms", component: TableFormsComponent, canActivate: [AuthGuard]},
      {path: "info/:id", component: InfoComponent, canActivate: [AuthGuard]},
      {path: "add-form", component: AddFormComponent, canActivate: [AuthGuard]},
      {path: "edit-form/:id", component: EditFormComponent, canActivate: [AuthGuard]},
      {path: "calendar", component: CalendarComponent, canActivate: [AuthGuard]},
      {path: "all-calendar", component: AllCalendarComponent, canActivate: [AuthGuard]},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class SystemRoutingModule {
}
