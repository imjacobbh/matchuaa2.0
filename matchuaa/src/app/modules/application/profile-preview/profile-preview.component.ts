import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { interval, mergeMap, tap } from 'rxjs';
import { UserProfile } from 'src/app/models/user';
import { UserServiceService } from '../user-service.service';


@UntilDestroy()
@Component({
  selector: 'app-profile-preview',
  templateUrl: './profile-preview.component.html',
  styleUrls: ['./profile-preview.component.scss']
})
export class ProfilePreviewComponent implements OnInit {

  carreras: string[] = ["Ingeniería en Sistemas Computacionales", "Filosofía", "Artes Escenicas", "Computación Inteligente", 
  "Licenciatura en Informatica", "Biología", "Quimica", "Biotecnología", "Robotica", "Biomedico", "Enfermería", 
  "Diseño Grafico", "Diseño Industrial", "Medicina"]

  user: UserProfile | null = null

  constructor(private userService: UserServiceService) { }

  ngOnInit(): void {
    this.userService.currentUserProfile$
      .pipe(untilDestroyed(this), tap(console.log))
      .subscribe((user) => { this.user = user; });
  }

  getUserProfile() {
    this.userService.currentUserProfile$.subscribe((user) => this.user = user)
  }

}
