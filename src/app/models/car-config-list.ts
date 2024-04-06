import {CarConfig} from "./car-config";

export interface CarConfigList {
  configs: CarConfig[];
  towHitch: boolean;
  yoke: boolean;
}
