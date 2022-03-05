import { Component, OnInit } from '@angular/core';
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

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    let userID = sessionStorage.getItem('userID');
    this.apiService.getUser(userID).subscribe(
      result => {
        let res = result as User;
        this.user = res;
      }
    )
  }

}
