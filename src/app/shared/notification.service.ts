import {inject, Injectable} from '@angular/core';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private _snackBar = inject(MatSnackBar);

  showErrorMsg(message: string) {
    const config: MatSnackBarConfig = {
      duration: 7000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: ['error-snackbar'],
      data: {
        message,
        icon: 'error'
      }
    };

    this._snackBar.open(message, 'Ok', config);
  }

  showSuccessMsg(message: string) {
    const config: MatSnackBarConfig = {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: ['success-snackbar'],
      data: {
        message,
        icon: 'error'
      }
    };

    this._snackBar.open(message, 'Ok', config);
  }

  showInfoMsg(message: string) {
    const config: MatSnackBarConfig = {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      data: {
        message,
        icon: 'error'
      }
    };

    this._snackBar.open(message, 'Ok', config);
  }

}
