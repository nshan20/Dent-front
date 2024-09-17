import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UsersService} from "../../shared/services/users.service";

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit{

  medicalForms: any = {};

  constructor(private route: ActivatedRoute, private usersService: UsersService) {
  }

  ngOnInit() {
    this.usersService.wakeUpTheServer();
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.usersService.getByIdMedicalForms(id)
        .subscribe(medicalForms => {
          this.medicalForms = medicalForms;
        })
    });
  }
}
