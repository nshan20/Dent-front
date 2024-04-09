import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";

import {UsersService} from "../../shared/services/users.service";
import {MassageModel} from "../../shared/models/massage.model";
import {AuthService} from "../../shared/services/auth.service";
import {parseJwt} from "../../shared/helpers/utils";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  loginForm: FormGroup | any;
  massage: MassageModel | any;

  message?: MassageModel | any;

  constructor(
    private usersService: UsersService,
    private authService: AuthService,
    private router: Router,
    private rout: ActivatedRoute
  ) {
  }

  ngOnInit() {

    // @ts-ignore
    // if (JSON.parse(localStorage.getItem('token'))) {
    //   this.router.navigate(['/system']);
    // }

    // this.massage = new MassageModel("danger", "");

    this.rout.queryParams.subscribe((params: any) => {
      if (params['newCanLogin']) {
        this.showMassage({txt: "duq hajocutyamp registracia ek ancel", type: "success"});
      } else if (params['accsesDenaid']) {
        this.showMassage({txt: "duq petke login ancnik", type: "success"});
      }
    })

    this.createForm();
  }

  private showMassage(masage: any) {
    this.message = masage;
    window.setTimeout(() => {
      // @ts-ignore
      this.message.txt = "";
    }, 5000);
  }

  createForm() {
    this.loginForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)])
    })
  }

  // onSubmit(formData: FormGroup, loginDirective: FormGroupDirective) {
  //   this.usersService.getUserByEmail()
  //     .subscribe((user: any) => {
  //       if (user.password === formData.value.password && user.email === formData.value.email) {
  //         this.massage.text = ""
  //         window.localStorage.setItem("user", JSON.stringify(user));
  //         this.authService.login();
  //         this.router.navigate(['/system']);
  //       } else {
  //         this.showMassage("սխալ գաղտնաբառ")
  //       }
  //     })
  // }

  onSubmit(formData: FormGroup | any, loginDirective: FormGroupDirective | any) {
    this.usersService.postLogin({password: formData.value.password, username: formData.value.email})
      .subscribe((user: any) => {
        console.log(user)
        window.localStorage.setItem("token", JSON.stringify(user.token));
        this.authService.login();
        this.router.navigate(['/system']);
        //ts-ignore
        this.massage.text = "";
      }, error => {
        this.showMassage("սխալ գաղտնաբառ");
      })
  }

}
