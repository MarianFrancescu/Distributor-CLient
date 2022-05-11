import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Discipline } from '../models/discipline.interface';
import { User } from '../models/user.interface';
import { ApiService } from '../services/api.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-discipline-details',
  templateUrl: './discipline-details.component.html',
  styleUrls: ['./discipline-details.component.scss']
})
export class DisciplineDetailsComponent implements OnInit {
  discipline: Discipline;
  selectedOption = '14-16';
  users: User[];
  fileName = 'ExcelSheet.xlsx';

  constructor(private route: ActivatedRoute, private apiService: ApiService) {}

  ngOnInit(): void {
    this.getDiscipline();
    this.getStudents();
  }

  getDiscipline() {
    const disciplineId = this.route.snapshot.paramMap.get('id');
    this.apiService.getDiscipline(disciplineId).subscribe(
      (response) => {
        this.discipline = response as Discipline;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getAvailablePlaces(option: string) {
    return this.discipline.timetable.find(
      (timetable) => timetable.option === option
    ).students.length;
  }

  getStudent(userID: string) {
    return this.users?.find((user) => user._id === userID);
  }

  getStudents() {
    this.apiService.getUsers().subscribe((response) => {
      const res = response as User[];
      this.users = [...res];
    });
  }

  exportExcel(option: string, disciplineName: string) {
    let filename = '';
    const element = document.getElementById(option);
    filename = disciplineName + '_' + option + '.xlsx';
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    XLSX.writeFile(wb, filename);
  }
}
