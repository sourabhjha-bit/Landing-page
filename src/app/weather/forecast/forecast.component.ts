import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ForecastService } from '../forecast.service';
import { HttpClientModule } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-forecast',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './forecast.component.html',
  styleUrl: './forecast.component.css'
})
export class ForecastComponent implements OnInit {
forecast$:Observable<{dateString: any; temp:number}[]>;

  constructor(forecasService: ForecastService){
    this.forecast$ = forecasService.getForecast()
  }

  ngOnInit(): void {
    
  }

  kelvinTocelcius( value:number ){
    let temp = value - 273.15;
   return temp
  }

}
