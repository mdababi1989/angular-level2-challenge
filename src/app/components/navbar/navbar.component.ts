import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive} from "@angular/router";
import {StateService} from "../../services/state.service";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  constructor(public stateService: StateService) {}

}
