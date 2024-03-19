import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  activeIndex: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

  setActive(index: number): void {
    this.activeIndex = index;
  }

}
