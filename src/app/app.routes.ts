import { Routes } from '@angular/router';
import {ChooseCarComponent} from "./components/choose-car/choose-car.component";
import {CarConfigComponent} from "./components/car-config/car-config.component";
import {SummaryComponent} from "./components/summary/summary.component";
import {carConfigGuard} from "./guards/car-config.guard";
import {summaryGuard} from "./guards/summary.guard";

export const routes: Routes = [
  { path: '', redirectTo: 'choose-car', pathMatch: 'full' },
  { path: 'choose-car', component: ChooseCarComponent },
  { path: 'car-config', component: CarConfigComponent, canActivate: [carConfigGuard]},
  { path: 'summary', component: SummaryComponent, canActivate: [summaryGuard]}
];
