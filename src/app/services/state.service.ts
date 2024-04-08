import {Injectable} from '@angular/core';
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

  imageUrl!: string | null

  resetCarConfig() {
    this.selectedCarConfig = null
    this.towHitch = false
    this.yokeWheel = false
  }

  isStep1Valid() {
    return this.selectedCarModel && this.selectedCarColor
  }

  isStep2Valid() {
    return this.isStep1Valid() && this.selectedCarConfig
  }

  updateImageUrl() {
    if (this.selectedCarModel && this.selectedCarColor)
      this.imageUrl = `/assets/images/${this.selectedCarModel.code}/${this.selectedCarColor.code}.jpg`
    else this.imageUrl = null
  }
}
