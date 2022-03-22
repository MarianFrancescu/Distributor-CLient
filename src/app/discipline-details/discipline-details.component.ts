import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Discipline } from '../models/discipline.interface';
import { User } from '../models/user.interface';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-discipline-details',
  templateUrl: './discipline-details.component.html',
  styleUrls: ['./discipline-details.component.scss']
})
export class DisciplineDetailsComponent implements OnInit {
  discipline: Discipline;
  selectedOption = '14-16';
  users: User[];

  constructor(private route: ActivatedRoute, private apiService: ApiService) {}

  ngOnInit(): void {
    this.getDiscipline();
    this.getStudents()
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
    return this.users?.find(
      user => user._id === userID
    );
  }

  getStudents() {
    this.apiService.getUsers().subscribe(
      response => {
        const res = response as User[];
        this.users = [...res];
      }
    )
  }
}
