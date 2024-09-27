import { Component, OnInit } from '@angular/core';
import { Article, NewsApiService } from '../news-api.service';
import { CommonModule } from '@angular/common';
import { TrimOutlateNAmePipe } from '../trim-outlate-name.pipe';
import { PaginatorComponent } from '../../shared/paginator/paginator.component';

@Component({
  selector: 'app-na-article-list',
  standalone: true,
  imports: [ CommonModule, TrimOutlateNAmePipe, PaginatorComponent],
  templateUrl: './na-article-list.component.html',
  styleUrl: './na-article-list.component.css'
})
export class NaArticleListComponent implements OnInit{
  articles: Article[] = [];

  constructor(private newApiService: NewsApiService){
    this.newApiService.pagesOutput.subscribe((article)=>{
      this.articles = article
    })

    this.newApiService.getPage(1)
  }

  ngOnInit(): void {
    
  }

}
