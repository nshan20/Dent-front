import {HttpClient, HttpParams} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {catchError, Observable, throwError} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root',
})

export class UsersService {

  urlLink: string = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  //----------- medical Forms ------------
  // getAllMedicalForms(page: number = 1, take: number = 5, name?: string): Observable<any> {
  //   return this.http.get(`${this.urlLink}/medical-forms?page=${page}&take=${take}&name=${name}`);
  // }

  getAllMedicalForms(paramObj: any): Observable<any> {

    let params = new HttpParams()
      .set('page', paramObj.page.toString())
      .set('take', paramObj.take.toString());

    if (paramObj.name) {
      params = params.set('name', paramObj.name);
    }

    if (paramObj.lastName) {
      params = params.set('lastName', paramObj.lastName);
    }

    if (paramObj.surName) {
      params = params.set('surName', paramObj.surName);
    }

    if (paramObj.age) {
      params = params.set('age', paramObj.age);
    }

    if (paramObj.phoneNumber) {
      params = params.set('phoneNumber', paramObj.phoneNumber);
    }

    return this.http.get<any>(`${this.urlLink}/medical-forms`, { params }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError('Something went wrong; please try again later.');
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

  getCalendar(paramObj: any): Observable<any> {
    let params = new HttpParams()
      .set('page', paramObj.page.toString())
      .set('take', paramObj.take.toString());

    if (paramObj.dayDate) {
      params = params.set('dayDate', paramObj.dayDate);
    }

    return this.http.get<any>(`${this.urlLink}/calendars`, { params }).pipe(
      catchError(this.handleError)
    );
  }

  getCalendarByDayDate(dayDate: string) {
    return this.http.get(`${this.urlLink}/calendars?dayDate=${dayDate}`);
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

  //---------default------------

  default(): Observable<any> {
    return this.http.get(`${this.urlLink}/health`);
  }

}
