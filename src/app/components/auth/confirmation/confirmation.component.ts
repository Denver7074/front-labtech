import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-confirmation',
  imports: [
    RouterLink,
    NgClass
],
  templateUrl: './confirmation.component.html',
  standalone: true,
  styleUrl: '../auth.form.scss'
})
export class ConfirmationComponent implements OnInit {
  // authService = inject(AuthService)
  router = inject(Router)
  confirmed = false;
  message: string = "";
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // const activateId = this.route.snapshot.paramMap.get('activateId');
    // if (activateId) {
    //   this.authService.confirmation(activateId).subscribe({
    //     next: () => {
    //       this.confirmed = true;
    //     },
    //     error: (error) => {
    //       this.message = error.message || 'Произошла неизвестная ошибка';
    //     }
    //   });
    // }
  }
}
