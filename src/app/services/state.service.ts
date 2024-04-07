import { Injectable } from '@angular/core';
import {CarModel} from "../models/car-model";
import {CarColor} from "../models/car-color";
import {CarConfig} from "../models/car-config";

@Injectable({
  providedIn: 'root'
})
export class StateService {
  selectedCarModel!: CarModel | null
  selectedCarColor!: CarColor | null
  selectedCarConfig!: CarConfig | null
  towHitch: boolean = false
  yokeWheel: boolean = false

  resetCarConfig() {
    this.selectedCarConfig = null
    this.towHitch = false
    this.yokeWheel = false
  }
}
