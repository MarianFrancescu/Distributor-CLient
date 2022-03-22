import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Discipline } from '../models/discipline.interface';
import { Preference } from '../models/preference.interface';
import { User } from '../models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiURL = 'http://localhost:8080/';

  private userID = '';
  private token = '';

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    const url = `${this.apiURL}login`;
    const loginObservable = this.http.post(url, {
      email,
      password
    });
    return loginObservable;
  }

  register(
    email: string,
    firstName: string,
    lastName: string,
    password: string
  ) {
    const url = `${this.apiURL}registerUser`;
    return this.http.post(
      url,
      {
        email,
        firstName,
        lastName,
        password
      },
      { responseType: 'text' }
    );
  }

  getUserID() {
    return sessionStorage.getItem('userID');
  }

  getUsers() {
    const url = `${this.apiURL}users`;
    return this.http.get(url, {});
  }

  getUser(userID: string) {
    const url = `${this.apiURL}user/${userID}`;
    return this.http.get(url, {});
  }

  updateUser(userID: string, user: any) {
    const url = `${this.apiURL}updateUser/${userID}`;
    return this.http.patch(url, user, { responseType: 'text' });
  }

  updateUserPassword(password: string) {
    const userID = this.getUserID();
    const url = `${this.apiURL}updateUserPassword/${userID}`;
    return this.http.put(url, { newPassword: password });
  }

  deleteAccount() {
    const userID = this.getUserID();
    const url = `${this.apiURL}deleteUser/${userID}`;
    return this.http.delete(url, { responseType: 'text' });
  }

  getDisciplines() {
    const url = `${this.apiURL}disciplines`;
    return this.http.get(url, {});
  }

  getUserDisciplines() {
    const userID = this.getUserID();
    const url = `${this.apiURL}user/${userID}/disciplines`;
    return this.http.get(url, {});
  }

  getSpecificDisciplines() {
    const userID = this.getUserID();
    const url = `${this.apiURL}specificDisciplines/${userID}`;
    return this.http.get(url, {});
  }

  getDiscipline(disciplineID: string) {
    const url = `${this.apiURL}discipline/${disciplineID}`;
    return this.http.get(url, {});
  }

  enrollToDiscipline(disciplineID: string) {
    const userID = this.getUserID();
    const url = `${this.apiURL}discipline/${disciplineID}/enroll`;
    return this.http.put(url, { userID: userID }, { responseType: 'text' });
  }

  unenrollFromDiscipline(disciplineID: string) {
    const userID = this.getUserID();
    const url = `${this.apiURL}discipline/${disciplineID}/unenroll`;
    return this.http.put(url, { userID: userID }, { responseType: 'text' });
  }

  //discipline endpoints admin
  addDiscipline(discipline: Discipline) {
      const url = `${this.apiURL}addDiscipline`;
      return this.http.post(url, discipline, { responseType: 'text' });
  }

  updateDiscipline(disciplineID: string, discipline: Discipline) {
    const url = `${this.apiURL}updateDiscipline/${disciplineID}`;
    return this.http.patch(url, discipline, { responseType: 'text' });
  }

  deleteDiscipline(disciplineID: string) {
    const url = `${this.apiURL}deleteDiscipline/${disciplineID}`;
    return this.http.delete(url, {responseType: 'text' });
  }

  addUserPreference(disciplineID: string, options: string[]) {
    const userID = this.getUserID();
    const url = `${this.apiURL}addPreference/${disciplineID}`;
    return this.http.post(url, {
      userID,
      options
    }, { responseType: 'text' });
  }

  getUserPreferenceByDiscipline(disciplineID: string) {
    const userID = this.getUserID();
    const url = `${this.apiURL}preference/user/${userID}/discipline/${disciplineID}`;
    return this.http.get(url, {});
  }

  updateUserDisciplinePreference(disciplineID: string, options: string[]) {
    const userID = this.getUserID();
    const url = `${this.apiURL}preference/user/${userID}/discipline/${disciplineID}/update`;
    return this.http.put(url, {options: options}, { responseType: 'text' });
  }

  insertUserOptionOnDiscipline(disciplineID: string) {
    const userID = this.getUserID();
    const url = `${this.apiURL}user/${userID}/discipline/${disciplineID}`;
    return this.http.patch(url, {}, { responseType: 'text' });
  }

  resetDisciplinePreferences(disciplineID: string) {
    const userID = this.getUserID();
    const url = `${this.apiURL}user/${userID}/discipline/${disciplineID}/reset`;
    return this.http.put(url, {}, { responseType: 'text' });
  }
}
