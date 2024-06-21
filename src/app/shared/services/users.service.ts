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
  getAllMedicalForms(page: number = 1, take: number = 5): Observable<any> {
    return this.http.get(`${this.urlLink}/medical-forms?page=${page}&take=${take}`);
  }

  getByIdMedicalForms(id: number | string): Observable<any> {
    return this.http.get(`${this.urlLink}/medical-forms/${id}`);
  }

  addMedicalForms(obj: object): Observable<any> {
    return this.http.post(`${this.urlLink}/medical-forms`, obj);
  }

  editMedicalForms(obj: any): Observable<any> {
    return this.http.put(`${this.urlLink}/medical-forms/${obj.id}`, obj);
  }

  deleteByIdForm(id: number | string) {
    return this.http.delete(`${this.urlLink}/medical-forms/${id}`);
  }

//------------ calendar -------------

  getCalendar(page: number = 1, take: number = 5) {
    return this.http.get(`${this.urlLink}/calendars?page=${page}&take=${take}`);
  }

  getCalendarByDayDate(dayDate: string) {
    return this.http.get(`${this.urlLink}/calendars?q=${dayDate}`);
  }

  postCalendar(obj: object) {
    return this.http.post(`${this.urlLink}/calendars`, obj);
  }

  patchCalendar(obj: object, id: any) {
    return this.http.put(`${this.urlLink}/calendars/${id}`, obj);
  }

  deleteCalendar(id: any) {
    return this.http.delete(`${this.urlLink}/calendarDelete/${id}`);
  }

  //----- login -------------

  postLogin(obj: object): Observable<any> {
    return this.http.post(`${this.urlLink}/auth/login`, obj);
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
