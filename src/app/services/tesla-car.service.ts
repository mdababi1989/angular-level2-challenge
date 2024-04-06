import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CarModel} from "../models/car-model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TeslaCarService {

  constructor(private httpClient: HttpClient) { }

  getTeslaModels(): Observable<CarModel[]> {
    return this.httpClient.get<CarModel[]>('/models')
  }
}
