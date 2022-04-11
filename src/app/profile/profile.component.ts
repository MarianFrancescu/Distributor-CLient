import { Component, OnInit } from '@angular/core';
import { Institution } from '../models/institution.interface';
import { User } from '../models/user.interface';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  tabOption = 1;
  user: User;
  institutions: Institution[];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.fetchUser();
    this.fetchInstitutions();
  }

  fetchUser() {
    const userID = sessionStorage.getItem('userID');
    this.apiService.getUser(userID).subscribe((result) => {
      const res = result as User;
      this.user = res;
    });
  }

  fetchInstitutions() {
    this.apiService.getIntitutions().subscribe(result => {
      const res = result as Institution[];
      this.institutions = [...res];
    })
  }

  updateUser() { 
    this.fetchUser();
  }

  getInitials(firstName: string, lastName: string) {
    const initials = firstName[0] + lastName[0];
    return initials;
  }
}
