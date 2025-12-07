import {Component, inject, OnInit, signal} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {AuthService} from '../../../service/auth/auth.service';
import {NotifierService} from '../../../service/notifier.service';
import {Button} from '../../ui/button/button';
import {MatProgressSpinner} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-confirmation',
  imports: [
    MatProgressSpinner,
    RouterLink,
    Button
  ],
  templateUrl: './confirmation.component.html',
  standalone: true,
  styleUrl: 'confirmation.scss'
})
export class ConfirmationComponent implements OnInit {
  private authService = inject(AuthService)
  private activatedRoute = inject(ActivatedRoute);
  private notifierService = inject(NotifierService);
  isConfirmation = signal(false);
  message = signal("");

  ngOnInit(): void {
    const activateId = this.activatedRoute.snapshot.paramMap.get('activateId');
    if (activateId) {
      this.authService.confirmation(activateId).subscribe({
        next: () =>this.isConfirmation.set(true),
        error: (error) => this.notifierService.showError(error.message)
      });
    }
  }

  repeatConfirmation() {

  }
}
