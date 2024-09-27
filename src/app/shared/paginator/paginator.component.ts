import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-paginator',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.css'
})
export class PaginatorComponent implements OnInit{
  numberOfPage = 5;
  currentPage = 1

  pageOptions:number[]

  constructor(){
    this.pageOptions = [
      this.currentPage -2,
      this.currentPage -1,
      this.currentPage,
      this.currentPage +1,
      this.currentPage +2
    ].filter((pageNumber => pageNumber >=1 && pageNumber <= this.numberOfPage))
  }

  ngOnInit(): void {
    
  }

}
