import { Component, Input, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-students-card',
  templateUrl: './students-card.component.html',
  styleUrls: ['./students-card.component.scss']
})
export class StudentsCardComponent implements OnInit {
  @Input() timetable;
  @Input() discipline;
  @Input() users;
  constructor() {}

  ngOnInit(): void {}

  getAvailablePlaces(option: string) {
    return this.discipline.timetable.find(
      (timetable) => timetable.option === option
    ).students.length;
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

  getStudent(userID: string) {
    return this.users?.find((user) => user._id === userID);
  }
}
