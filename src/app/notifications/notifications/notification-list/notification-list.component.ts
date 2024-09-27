import { Component, OnInit } from '@angular/core';
import { Command, NotificationsService } from '../notifications.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notification-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notification-list.component.html',
  styleUrl: './notification-list.component.css'
})
export class NotificationListComponent implements OnInit {

  messages: Observable<Command[]>

  constructor( private notificationService: NotificationsService){
    this.messages = this.notificationService.messagesOutput;
  }

  ngOnInit(): void {
    
  }

  clearMessage(id:number){
    this.notificationService.clearMessage(id)
  }
}
