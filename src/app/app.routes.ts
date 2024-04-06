import { Routes } from '@angular/router';
import {ChooseCarComponent} from "./components/choose-car/choose-car.component";

export const routes: Routes = [
  { path: '', redirectTo: 'choose-car', pathMatch: 'full' },
  { path: 'choose-car', component: ChooseCarComponent },
];
