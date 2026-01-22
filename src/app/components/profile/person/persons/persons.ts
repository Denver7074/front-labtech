import {Component, inject, OnInit, signal} from '@angular/core';
import {NotificationService} from '../../../../shared/notification.service';
import {Router} from '@angular/router';
import {ApiResponse} from '../../../../data/response.interface';
import {MatPaginator} from '@angular/material/paginator';
import {CrudService} from '../../../../service/crud.service';
import {PersonInfo} from '../../../../data/profile.interface';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-persons',
  imports: [
    MatPaginator,
    DatePipe
  ],
  templateUrl: './persons.html',
  styleUrl: './persons.scss',
  standalone: true
})
export class Persons implements OnInit {
  private crudService = inject(CrudService);
  private notification = inject(NotificationService);
  private router = inject(Router);
  persons = signal<PersonInfo[]>([]);
  currentPage = signal(0);
  pageSize = signal(10);
  totalItems = signal(0);

  ngOnInit() {
    this.loadPeople();
  }

  loadPeople() {
    this.crudService.getEntities<PersonInfo>('profile-service/api/v1/persons', this.currentPage(), this.pageSize())
      .subscribe({
        next: (response: ApiResponse<PersonInfo[]>) => {
          this.persons.set(response.value);
          this.totalItems.set(response.pagingResults.totalItemsCount);
        },
        error: (err) => this.notification.showErrorMsg(err.error.error.message)
      });
  }

  onPageChange(event: { pageIndex: number; pageSize: number }) {
    this.currentPage.set(event.pageIndex);
    this.pageSize.set(event.pageSize);
    this.loadPeople();
  }

  getInitials(person: PersonInfo): string {
    const lastName = person?.lastName?.trim() || '';
    const firstName = person?.firstName?.trim() || '';
    return (
      (lastName[0] || '') + (firstName[0] || '')
    ).toUpperCase() || '??';
  }

  openProfile(p: PersonInfo) {
    this.router.navigate([`persons/${p.id}/general`])
  }
}
