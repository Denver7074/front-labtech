import {inject, Injectable} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotifierService {
  _snackBar = inject(MatSnackBar);

  public showError(message: string) {
    this._snackBar.open(message, 'Ok', {
      duration: 10000,
      panelClass: ['error-snackbar']
    }).onAction().subscribe(() => {});
  }

  public showWarning(message: string) {
    this._snackBar.open(message, 'Ok', {
      duration: 8000,
      panelClass: ['warning-snackbar']
    }).onAction().subscribe(() => {});
  }

  public showInfo(message: string) {
    this._snackBar.open(message, 'Ok', {
      duration: 5000,
      panelClass: ['info-snackbar']
    }).onAction().subscribe(() => {});
  }
}
