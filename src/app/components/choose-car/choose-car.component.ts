import {Component, OnInit} from '@angular/core';
import {TeslaCarService} from "../../services/tesla-car.service";
import {CarModel} from "../../models/car-model";
import {CommonModule} from "@angular/common";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {StateService} from "../../services/state.service";
import {CarImageComponent} from "../car-image/car-image.component";

@Component({
  selector: 'choose-tesla-car',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CarImageComponent
  ],
  templateUrl: './choose-car.component.html',
  styleUrl: './choose-car.component.scss'
})
export class ChooseCarComponent implements OnInit {
  carModelList!: CarModel[]
  chooseCarForm = this.fb.group({
    carModel: ['', [Validators.required]],
    carColor: ['', [Validators.required]]
  })
  imageUrl!: string | null;

  constructor(private teslaCarService: TeslaCarService, public fb: FormBuilder, public stateService: StateService) {}


  ngOnInit(): void {
    this.initFields()
    this.teslaCarService.getTeslaModels().subscribe(
      carModelList => {
        this.carModelList = carModelList;
      }
    )
  }

  private initFields() {
    if (this.stateService.selectedCarModel && this.stateService.selectedCarColor) {
      this.chooseCarForm.patchValue({
        carModel: this.stateService.selectedCarModel.code,
        carColor: this.stateService.selectedCarColor.code
      })
    }
  }

  changeCarModel($event: Event) {
    const selectedCarModelCode: string = ($event.target as HTMLInputElement).value
    const selectedCarModel = this.carModelList.find((carModel: CarModel) => carModel.code === selectedCarModelCode) || null
    this.stateService.selectedCarModel = selectedCarModel

    if (selectedCarModel) {
      /* On valid model selection change:
      * Set the color to the first selectedModel color
      * Reset car configuration saved in the state service
      * */
      this.stateService.selectedCarColor = selectedCarModel.colors[0]
      this.stateService.resetCarConfig()
      this.chooseCarForm.patchValue({
        carColor: selectedCarModel.colors[0]?.code
      })
    }
    this.stateService.updateImageUrl()
  }

  changeCarColor($event: Event) {
    const selectedCarColorCode: string = ($event.target as HTMLInputElement).value
    if (this.stateService.selectedCarModel?.colors) {
      this.stateService.selectedCarColor = this.stateService.selectedCarModel.colors.find((carColor) => carColor.code === selectedCarColorCode) || null
      this.stateService.updateImageUrl()
    }
  }

  get chooseCarFormControls() {
    return this.chooseCarForm.controls;
  }

}
