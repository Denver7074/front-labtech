import {Component, inject, OnInit, signal} from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {AuthService} from '../../../service/auth/auth.service';

import {Button} from '../../ui/button/button';
import {Loader} from '../../ui/loader/loader';
import {NotificationService} from '../../ui/notification.service';

@Component({
  selector: 'app-confirmation',
  imports: [
    RouterLink,
    Button,
    Loader
  ],
  templateUrl: './confirmation.component.html',
  standalone: true,
  styleUrl: 'confirmation.scss'
})
export class ConfirmationComponent implements OnInit {
  private authService = inject(AuthService);
  private notification = inject(NotificationService);
  private activatedRoute = inject(ActivatedRoute);

  isConfirmation = signal(false);
  message = signal("");

  ngOnInit(): void {
    const activateId = this.activatedRoute.snapshot.paramMap.get('activateId');
    if (activateId) {
      this.authService.confirmation(activateId).subscribe({
        next: () =>this.isConfirmation.set(true),
        error: (error) => this.notification.showErrorMsg(error)
      });
    }
  }

  repeatConfirmation() {

  }
}
