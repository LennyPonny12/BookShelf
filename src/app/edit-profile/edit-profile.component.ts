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
  username: string;
  wrongImg: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.user = this.authService.user;
    this.imgUrl = this.user.imgUrl;
    this.editForm = new FormGroup({
      username: new FormControl(this.user.username, [
        Validators.required,
        Validators.minLength(6),
      ]),
      imgUrl: new FormControl(this.imgUrl, [Validators.required]),
    });

    this.editForm.valueChanges.subscribe((data) => {
      this.imageExist(data.imgUrl).then((exists) => {
        if (exists) {
          this.onEditFormValueChange(data);
          this.wrongImg = false;
        } else {
          this.wrongImg = true;
        }
      });
    });
  }

  imageExist(url: string) {
    return new Promise((resolve) => {
      const img = new Image();
      img.addEventListener('load', () => resolve(true));
      img.addEventListener('error', () => resolve(false));
      img.src = url;
    });
  }

  onSubmit() {
    let updatedUser = {
      _id: this.user._id,
      books: this.user.books,
      email: this.user.email,
      imgUrl: this.imgUrl,
      reviews: this.user.reviews,
      username: this.username,
    };

    this.authService.updateUser(updatedUser);
  }

  onEditFormValueChange(daata) {
    this.imgUrl = daata.imgUrl;
    this.username = daata.username;
  }
}
