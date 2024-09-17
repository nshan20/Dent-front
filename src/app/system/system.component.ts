import {Component, OnInit} from "@angular/core";
import {TableFormsComponent} from "./table-forms/table-forms.component";
import {Router, RouterLink, RouterOutlet} from "@angular/router";
import {AuthService} from "../shared/services/auth.service";
import {UsersService} from "../shared/services/users.service";

@Component({
  selector: "wfm-select",
  standalone: true,
  styleUrls: ['system.component.scss'],
  imports: [
    TableFormsComponent,
    RouterOutlet,
    RouterLink
  ],
  templateUrl: "./system.component.html"
})

export class SystemComponent implements OnInit {
  constructor(private router: Router, private authService: AuthService, private usersService: UsersService) {
  }

  ngOnInit() {
    this.usersService.default()
      .subscribe((value: any) => {
      })
  }

  logaut(){
    this.router.navigate(["login"]);
    this.authService.logout();
  }


}
