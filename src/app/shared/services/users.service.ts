import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root',
})

export class UsersService {

  urlLink: string = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  //----------- medical Forms ------------
  getAllMedicalForms(): Observable<any> {
    return this.http.get(`${this.urlLink}/medicalFormsAll`);
  }

  getByIdMedicalForms(id: number | string): Observable<any> {
    return this.http.get(`${this.urlLink}/medicalFormsById/${id}`);
  }

  addMedicalForms(obj: object): Observable<any> {
    return this.http.post(`${this.urlLink}/smedicalFormsAdd`, obj);
  }

  editMedicalForms(obj: any): Observable<any> {
    return this.http.put(`${this.urlLink}/medicalFormsUpdate/${obj.id}`, obj);
  }

  deleteByIdForm(id: number | string) {
    return this.http.delete(`${this.urlLink}/medicalFormsDelete/${id}`);
  }

//------------ calendar -------------

  getCalendar() {
    return this.http.get(`${this.urlLink}/calendar`);
  }

  getCalendarByDayDate(dayDate: string) {
    return this.http.get(`${this.urlLink}/calendar/${dayDate}`);
  }

  postCalendar(obj: object) {
    return this.http.post(`${this.urlLink}/calendarAdd`, obj);
  }

  patchCalendar(obj: object, id: any) {
    return this.http.put(`${this.urlLink}/calendarUpdate/${id}`, obj);
  }

  deleteCalendar(id: any) {
    return this.http.delete(`${this.urlLink}/calendarDelete/${id}`);
  }

  //----- login -------------

  postLogin(obj: object): Observable<any> {
    return this.http.post(`${this.urlLink}/login`, obj);
  }

  getCheckOut() {
    return this.http.get(`${this.urlLink}/checkout`);
  }

  //---------------------

  uploadFile(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post(`${this.urlLink}/upload`, formData);
  }

  downloadFile(id: number): Observable<any> {
    return this.http.get(`${this.urlLink}/download/${id}`, {
      observe: "response",
      responseType: 'blob',
    });
  }

}
