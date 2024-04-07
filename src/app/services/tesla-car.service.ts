import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CarModel} from "../models/car-model";
import {Observable} from "rxjs";
import {CarConfigList} from "../models/car-config-list";

@Injectable({
  providedIn: 'root'
})
export class TeslaCarService {

  constructor(private httpClient: HttpClient) { }

  getTeslaModels(): Observable<CarModel[]> {
    return this.httpClient.get<CarModel[]>('/models')
  }

  getOptionsByModelCode(modelCode: string | undefined): Observable<CarConfigList> {
    return this.httpClient.get<CarConfigList>(`/options/${modelCode}`);
  }
}
