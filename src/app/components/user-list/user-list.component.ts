import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="row">
      <div *ngFor="let user of users" class="col-md-4 mb-4">
        <div class="card user-card" (click)="selectUser(user)">
          <div class="card-body d-flex align-items-center">
            <div 
              class="user-avatar me-3"
              [style.background-color]="user.avatarColor">
              {{user.name.charAt(0).toUpperCase()}}
            </div>
            <div>
              <h5 class="mb-1">{{user.name}}</h5>
              <small class="text-muted">{{user.email}}</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class UserListComponent {
  @Input() users: User[] = [];
  @Output() userSelected = new EventEmitter<User>();

  selectUser(user: User): void {
    this.userSelected.emit(user);
  }
}