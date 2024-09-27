import { HttpClient, HttpClientModule, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { filter, map, mergeMap, Observable, of, switchMap, toArray, shareReplay, tap, catchError, throwError, retry } from 'rxjs';
import { NotificationsService } from '../notifications/notifications/notifications.service';

export interface OpenWeatherResponse {
  list: {
    dt_txt: String,
    main: {
      temp: number
    }
  }[]
}


@Injectable({
  providedIn: 'root',
})
export class ForecastService {
  private url = 'https://api.openweathermap.org/data/2.5/forecast'
  constructor(private http: HttpClient, private notificationsService:NotificationsService) {}

  getForecast() {
    return this.getCurrentLocation().pipe(
      map((coords) => {
        return new HttpParams()
        .set('lat', String(coords.latitude))
        .set('lon', String(coords.longitude))
        .set('unit', 'matric')
        .set('appid', 'c38dce1b1afe00b262d88b6e0f549830')
      }),
      switchMap(params => this.http.get<OpenWeatherResponse>(this.url, { params })),
      map((value)=>value.list),
      mergeMap((value)=> of(...value)),
      filter((value, index)=> index % 8 === 0 ),
      map((value)=>{
        return {
          dateString: value.dt_txt,
          temp: value.main.temp
        }
      }),
      toArray(),
      shareReplay()
    );
  }

  getCurrentLocation() {
    return new Observable<GeolocationCoordinates>((Observer) => {
      window.navigator.geolocation.getCurrentPosition(
        (position) => {
          Observer.next(position.coords);
          Observer.complete();
        },
        (err) => Observer.error(err)
      );
    }).pipe(
      retry(1),
      tap(()=>{
        this.notificationsService.addSuccess('Got your location')
      }),
      catchError((err)=>{
        this.notificationsService.addError('failed to get your location')

        return throwError(err)
      })
    );
  }
}
