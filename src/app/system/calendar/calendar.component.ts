import {Component, OnInit} from '@angular/core';
import {UsersService} from "../../shared/services/users.service";
import {FormArray, FormBuilder, FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {

  selected: any;
  dataDayKey: any;

  itemForm: FormGroup | any;
  itemFormArray: any;
  itemFormArrayId: number | undefined;

  loading: boolean = false;

  constructor(private usersService: UsersService, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.itemForm = this.formBuilder.group({
      items: this.formBuilder.array([])
    });
  }

  get items() {
    return this.itemForm.get('items') as FormArray;
  }

  addItem(
    time: string = "",
    name: string = "",
    lastName: string = "",
    phone: string = "",
    id: string = ""
  ) {
    const itemGroup = this.formBuilder.group({
      time: new FormControl(time),
      name: new FormControl(name),
      lastName: new FormControl(lastName),
      phone: new FormControl(phone),
      id: new FormControl(id),
    });
    this.items.push(itemGroup);
  }

  postItem(index: number) {

    // @ts-ignore
    const newTime = this.items.at(index).get('time').value;
    // @ts-ignore
    const newName = this.items.at(index).get('name').value;
    // @ts-ignore
    const newLastName = this.items.at(index).get('lastName').value;
    // @ts-ignore
    const newPhone = this.items.at(index).get('phone').value;

    if (this.itemFormArrayId) {
      if (newTime !== null || newName !== null || newLastName !== null || newPhone !== null) {
        this.items.at(index).get('time')?.patchValue(newTime);
        this.items.at(index).get('name')?.patchValue(newName);
        this.items.at(index).get('lastName')?.patchValue(newLastName);
        this.items.at(index).get('phone')?.patchValue(newPhone);


        const dayInfo = JSON.stringify(this.itemForm.value.items);

        const obj = {
          dayDate: this.dataDayKey,
          dayInfo: dayInfo,
        }

        this.usersService.patchCalendar(obj, this.itemFormArrayId)
          .subscribe((value: any) => {
          })
      }

      return;
    } else if (this.dataDayKey) {
      this.itemForm.disable();


      this.loading = true;
      if (newTime !== null || newName !== null || newLastName !== null || newPhone !== null) {
        this.items.at(index).get('time')?.patchValue(newTime);
        this.items.at(index).get('name')?.patchValue(newName);
        this.items.at(index).get('lastName')?.patchValue(newLastName);
        this.items.at(index).get('phone')?.patchValue(newPhone);

        const dayInfo = JSON.stringify(this.itemForm.value.items);

        const obj = {
          dayDate: this.dataDayKey,
          dayInfo: dayInfo,
        }

        this.usersService.postCalendar(obj)
          .subscribe((value: any) => {
            this.getDateChangedValue();
            this.loading = false;
            // this.itemForm.enabled();
            if (this.itemForm && typeof this.itemForm.enabled === 'function') {
              this.itemForm.enabled();
            }
          })
      }

      return;
    }
  }


  getDateChangedValue() {
    this.loading = true;
    // @ts-ignore
    const year = this.selected.getFullYear();
    // @ts-ignore
    const month = this.selected.getMonth() + 1;
    // @ts-ignore
    const day = this.selected.getDate();

    this.dataDayKey = `${year}-${month}-${day}`;

    this.usersService.getCalendarByDayDate(this.dataDayKey)
      .subscribe(
        (value: any) => {
          if (!value) {
            while (this.items.length !== 0) {
              this.items.removeAt(this.items.length - 1);
            }

            this.addItem();
            this.loading = false;
            this.itemFormArray = undefined;
            this.itemFormArrayId = undefined;
            return;
          }

          const valueDataCalendar = JSON.parse(value.dayInfo);

          valueDataCalendar.sort((a: { time: any; }, b: { time: any; }) => {
            const timeA = a.time;
            const timeB = b.time;

            return timeA.localeCompare(timeB);
          });

          while (this.items.length !== 0) {
            this.items.removeAt(this.items.length - 1);
          }

          this.itemFormArray = valueDataCalendar;
          this.itemFormArrayId = value.id;

          for (let j = 0; j < this.itemFormArray.length; j++) {
            this.formAdder(this.itemFormArray[j], this.itemFormArrayId);
          }

          if (this.itemFormArray.length === 0) {
            this.addItem();
          }

          this.loading = false;
          return;
        }
      );
  }

  formAdder(itemFormArray: any, id: any) {
    this.addItem(itemFormArray.time, itemFormArray.name, itemFormArray.lastName, itemFormArray.phone, id);
  }

  deleteItem(index: number) {
    this.loading = true;
    this.items.removeAt(index);

    if (this.itemFormArrayId === undefined) {
      this.loading = false;
      return;
    }

    const dayInfo = JSON.stringify(this.itemForm.value.items);

    const obj = {
      dayDate: this.dataDayKey,
      dayInfo: dayInfo,
    }

    this.usersService.patchCalendar(obj, this.itemFormArrayId)
      .subscribe((value: any) => {
        this.loading = false;
        if (JSON.parse(value).length === 0) {
          this.usersService.deleteCalendar(this.itemFormArrayId)
            .subscribe((value: any) => {
              while (this.items.length !== 0) {
                this.items.removeAt(this.items.length - 1);
              }

              this.loading = false;
              this.itemFormArray = undefined;
              this.itemFormArrayId = undefined
            })
        }
      })
  }
}
