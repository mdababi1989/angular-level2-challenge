import {Component, OnInit} from '@angular/core';
import {StateService} from "../../services/state.service";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.scss'
})
export class SummaryComponent implements OnInit {
  carModel!: string;
  totalCost: number = 0
  carColorDesc!: string
  carColorPrice: number = 0
  carConfigDesc!: string
  carConfigPrice: number = 0
  carConfigRange: number = 0
  carConfigSpeed: number = 0

  constructor(public stateService: StateService) {
  }

  ngOnInit(): void {
    if (this.stateService.selectedCarModel) {
      this.carModel = this.stateService.selectedCarModel.description
    }
    if (this.stateService.selectedCarColor) {
      this.carColorDesc = this.stateService.selectedCarColor.description
      this.carColorPrice = this.stateService.selectedCarColor.price
    }

    if (this.stateService.selectedCarConfig) {
      this.carConfigDesc = this.stateService.selectedCarConfig.description
      this.carConfigPrice = this.stateService.selectedCarConfig.price
      this.carConfigRange = this.stateService.selectedCarConfig.range
      this.carConfigSpeed = this.stateService.selectedCarConfig.speed
    }

    this.totalCost = this.carConfigPrice + (this.stateService.towHitch ?1000: 0)
      + (this.stateService.yokeWheel ?1000: 0) + this.carColorPrice

  }

}
