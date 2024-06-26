import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {LoginComponent} from "./login/login.component";
import {AuthComponent} from "./auth.component";


const routes: Routes = [
  {
    path: "", component: AuthComponent, children: [
      {path: "login", component: LoginComponent},
    ]
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AuthRoutingModule {
}
