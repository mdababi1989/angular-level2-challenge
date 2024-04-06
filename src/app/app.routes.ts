import { Routes } from '@angular/router';
import {ChooseCarComponent} from "./components/choose-car/choose-car.component";
import {CarConfigComponent} from "./components/car-config/car-config.component";

export const routes: Routes = [
  { path: '', redirectTo: 'choose-car', pathMatch: 'full' },
  { path: 'choose-car', component: ChooseCarComponent },
  { path: 'car-config', component: CarConfigComponent },
];
