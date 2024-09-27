import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subject, switchMap, tap } from 'rxjs';

export interface Article{
  title: String,
  url: String,
  source:{
    name: String
  }
}

export interface NewsApiResponse{
  totalResults: number,
  articles:Article[]
}

@Injectable({
  providedIn: 'root'
})
export class NewsApiService {
  private url = 'https://newsapi.org/v2/top-headlines';
  private pageSize = 10;
  private apiKey = 'ac851f0f5c77490a964ab8e4a8535183';
  private country = 'in';

  private pagesInput: Subject<Number>;
  pagesOutput: Observable<Article[]>;
  numberOfPages: Subject<number>

  constructor(private http: HttpClient) {
    this.numberOfPages = new Subject()
    this.pagesInput = new Subject()
    this.pagesOutput = this.pagesInput.pipe(
      map((page) =>{
        return new HttpParams()
        .set('apiKey', this.apiKey)
        .set('country', this.country)
        .set('pageSize', this.pageSize)
        .set('page', String(page))
      }),
      switchMap((params)=>{
        return this.http.get<NewsApiResponse>(this.url, { params })
      }),
      tap(res => {
        const totalPages = Math.ceil(res.totalResults/ this.pageSize)
        this.numberOfPages.next(totalPages)
      }),
      map((res)=> res.articles),
    )
   }

   getPage(page:number){
    this.pagesInput.next(page);
   }
}
