import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  activeMenu=false; // el menu no se muestra
  constructor() { }

  ngOnInit(): void {
  }

  toggleMenu(){
    this.activeMenu=!this.activeMenu;
  }
}
