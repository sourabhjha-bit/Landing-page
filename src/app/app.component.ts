import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ForecastComponent } from './weather/forecast/forecast.component';
import { HttpClientModule } from '@angular/common/http';
import { NotificationListComponent } from './notifications/notifications/notification-list/notification-list.component';
import { NaArticleListComponent } from './news-api/na-article-list/na-article-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ForecastComponent, HttpClientModule, NotificationListComponent, NaArticleListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
}
