import { Component, OnInit } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { tap } from 'rxjs';
import { UserProfile } from 'src/app/models/user';
import Swal from 'sweetalert2';
import { UserServiceService } from '../user-service.service';

@UntilDestroy()
@Component({
  selector: 'app-search-matches',
  templateUrl: './search-matches.component.html',
  styleUrls: ['./search-matches.component.scss']
})
export class SearchMatchesComponent implements OnInit {

  constructor(private userService: UserServiceService, private toast: HotToastService) { }

  no_matches: boolean = false;
  carreras: string[] = ["Ingeniería en Sistemas Computacionales", "Filosofía", "Artes Escenicas", "Computación Inteligente", 
  "Licenciatura en Informatica", "Biología", "Quimica", "Biotecnología", "Robotica", "Biomedico", "Enfermería", 
  "Diseño Grafico", "Diseño Industrial", "Medicina"]
  
  user: UserProfile | null = null
  ngOnInit(): void {
    this.userService.getPossibleMatch()
      .pipe(untilDestroyed(this), tap(console.log))
      .subscribe((user) => {
        if (user == null) {
          this.no_matches = true
        }
        this.user = user;
      });

  }
  rejectUser() {
    this.userService.updateInteraction(this.user!.user.id, 2).pipe(
      this.toast.observe({
        loading: 'Actualizando...',
        success: 'Usuario rechazado',
        error: 'Tuvimos un error :(',
      })
    ).subscribe(res => {
      if (res == true) {
        Swal.fire("Tienes un nuevo match", "Felicidades, has hecho match!", "success");
        this.user = null
      }
      this.userService.getPossibleMatch().subscribe((user) => {
        if (user == null) {
          this.no_matches = true
        }
        this.user = user;
      });
    })
  }

  likeUser() {
    this.userService.updateInteraction(this.user!.user.id, 1).pipe(
      this.toast.observe({
        loading: 'Actualizando...',
        success: 'Like mandado c:',
        error: 'Tuvimos un error :(',
      })
    ).subscribe(res => {
      if (res == true) {
        Swal.fire("Tienes un nuevo match", "Felicidades, has hecho match!", "success");
        this.user = null
      }
      this.userService.getPossibleMatch().subscribe((user) => {
        if (user == null) {
          this.no_matches = true
        }
        this.user = user;

      });
    })
  }

}
