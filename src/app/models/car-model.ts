import {CarColor} from "./car-color";

export interface CarModel {
  code: string;
  description: string;
  colors: CarColor[];
}
