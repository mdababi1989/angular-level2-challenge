import {Component, OnInit} from '@angular/core';
import {TeslaCarService} from "../../services/tesla-car.service";
import {CarModel} from "../../models/car-model";
import {CommonModule} from "@angular/common";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {CarColor} from "../../models/car-color";
import {StateService} from "../../services/state.service";
import {SelectedCar} from "../../models/selected-car";
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
  selectedCarModel!: CarModel | null
  selectedCarColor!: CarColor | null

  carModelList!: CarModel[]
  chooseCarForm = this.fb.group({
    carModel: ['', [Validators.required]],
    carColor: ['', [Validators.required]]
  })
  imageUrl!: string | null;

  constructor(private teslaCarService: TeslaCarService, public fb: FormBuilder, private stateService: StateService) {
  }


  ngOnInit(): void {
    this.initFields()
    this.teslaCarService.getTeslaModels().subscribe(
      carModelList => {
        this.carModelList = carModelList;
      }
    )
  }

  private initFields() {
    if (this.stateService.selectedCarModel) {
      this.chooseCarForm.controls.carModel.setValue(this.stateService.selectedCarModel.code)
      this.selectedCarModel = this.stateService.selectedCarModel
      if (this.stateService.selectedCarColor) {
        this.chooseCarForm.controls.carColor.setValue(this.stateService.selectedCarColor.code)
        this.selectedCarColor = this.stateService.selectedCarColor
        this.imageUrl = '/assets/images/' + this.selectedCarModel?.code + '/' + this.selectedCarColor?.code + '.jpg'
      }
    }
  }

  changeCarModel($event: Event) {
    const selectedCarModelCode: string = ($event.target as HTMLInputElement).value
    this.selectedCarModel = this.carModelList.find((carModel: CarModel) => carModel.code === selectedCarModelCode) || null
    if (!this.selectedCarModel) {
      this.imageUrl = null
      return
    }

    this.chooseCarForm.controls.carColor.setValue(this.selectedCarModel?.colors[0]?.code || null)
    let defaultColor: CarColor | null = this.selectedCarModel?.colors[0] || null
    this.imageUrl = '/assets/images/' + this.selectedCarModel?.code + '/' + defaultColor?.code + '.jpg'
    this.stateService.selectedCarModel = this.selectedCarModel
    this.stateService.selectedCarColor = defaultColor
    this.stateService.resetCarConfig()
  }

  changeCarColor($event: Event) {
    const selectedCarColorCode: string = ($event.target as HTMLInputElement).value
    if (this.selectedCarModel?.colors) {
      this.selectedCarColor = this.selectedCarModel.colors.find((carColor) => carColor.code === selectedCarColorCode) || null
    }
    if (!this.selectedCarColor) {
      this.imageUrl = null
      return
    }

    this.imageUrl = '/assets/images/' + this.selectedCarModel?.code + '/' + this.selectedCarColor?.code + '.jpg'
    this.stateService.selectedCarColor = this.selectedCarColor
  }


  get chooseCarFormControls() {
    return this.chooseCarForm.controls;
  }

}
