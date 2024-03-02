import {Component, OnInit} from '@angular/core';
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {UsersService} from "../../shared/services/users.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  standalone: true,
  imports: [
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  styleUrls: ['./add-form.component.scss']
})
export class AddFormComponent implements OnInit {

  form: FormGroup | any;
  selectedFile: File | any;

  constructor(private usersService: UsersService, private router: Router) {
  }

  ngOnInit() {
    this.createForm()
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
    });
  }

  submitAddForm(){
    if (this.form.valid) {
      this.usersService.addMedicalForms(this.form.value)
        .subscribe(value => {

          this.router.navigate(["system/forms"])
        })
    }
  }


  //----------------------------------

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  uploadFile(): void {
    if (this.selectedFile) {
      this.usersService.uploadFile(this.selectedFile).subscribe(
        response => {
          console.log('File uploaded successfully:', response);
        },
        error => {
          console.error('Error uploading file:', error);
        }
      );
    }
  }

  downloadFile(): void {
    this.usersService.downloadFile(15).subscribe(
      response => {
        // Assuming 'response' is an ArrayBuffer
        const blob = new Blob([response], { type: 'your-actual-mime-type' });
        const url = window.URL.createObjectURL(blob);

        const newWindow = window.open(url);

        if (newWindow) {
          newWindow.onbeforeunload = () => {
            window.URL.revokeObjectURL(url);
          };
        }
      },
      error => {
        console.error('Error downloading file:', error);
      }
    );
  }


}
