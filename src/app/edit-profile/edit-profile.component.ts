import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../interfaces/user.inteface';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit {
  editForm: FormGroup;
  user: User;
  imgUrl: string;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.user = this.authService.user;
    this.imgUrl = this.user.imgUrl;
    this.editForm = new FormGroup({
      username: new FormControl(this.user.username, [
        Validators.required,
        Validators.minLength(6),
      ]),
      imgUrl: new FormControl(this.user.imgUrl, [Validators.required]),
    });
  }

  onSubmit() {}
}
