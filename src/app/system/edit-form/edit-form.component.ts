import {Component, OnInit} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {UsersService} from "../../shared/services/users.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  standalone: true,
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  styleUrls: ['./edit-form.component.scss']
})
export class EditFormComponent implements OnInit {

  form: FormGroup | any;

  constructor(private usersService: UsersService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.usersService.wakeUpTheServer();
    this.createForm();
    this.getForm();
  }

  createForm() {
    this.form = new FormGroup({
      'name': new FormControl(null, [Validators.required]),
      'lastName': new FormControl(null),
      'surName': new FormControl(null),
      'age': new FormControl(null),
      'phoneNumber': new FormControl(null),
      'description': new FormControl(null),
      'urlFail': new FormControl(null),
      'registerDate': new FormControl(new Date()),
      'id': new FormControl(),
    });
  }

  getForm() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.usersService.getByIdMedicalForms(id)
        .subscribe(medicalForms => {
          this.form.patchValue(medicalForms);
        })
    });
  }

  submitAddForm() {
    if (this.form.valid) {
      this.usersService.editMedicalForms(this.form.value)
        .subscribe(value => {
          this.router.navigate(["system/forms"])
        })
    }
  }


}
