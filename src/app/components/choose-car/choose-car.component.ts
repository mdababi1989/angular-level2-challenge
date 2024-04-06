import {Component, OnInit} from '@angular/core';
import {TeslaCarService} from "../../services/tesla-car.service";
import {CarModel} from "../../models/car-model";
import {empty, filter, map, Observable, of} from "rxjs";
import {AsyncPipe, CommonModule} from "@angular/common";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {CarColor} from "../../models/car-color";

@Component({
  selector: 'choose-tesla-car',
  standalone: true,
  imports: [
    AsyncPipe,
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './choose-car.component.html',
  styleUrl: './choose-car.component.scss'
})
export class ChooseCarComponent implements OnInit {
  carModelsDesc!: String[]
  selectedCarModel!: CarModel | null
  selectedCarColor!: CarColor | null

  teslaModels!: CarModel[]
  chooseCarForm = this.fb.group({
    carModel: ['', [Validators.required]],
    carColor: ['', [Validators.required]]
  })
  imageUrl!: string | null;

  constructor(private teslaCarService: TeslaCarService, public fb: FormBuilder) {
  }


  ngOnInit(): void {
    this.teslaCarService.getTeslaModels().subscribe(
      teslaModels => {
        this.teslaModels = teslaModels;
        this.carModelsDesc = this.teslaModels.map((carModel: CarModel) => carModel.description);
      }
    )
  }

  onSubmit() {

  }

  changeCarModel($event: Event) {
    const selectedCarModelDesc: string = ($event.target as HTMLInputElement).value
    if (!selectedCarModelDesc) {
      this.selectedCarModel = null
      this.imageUrl = null
      return
    }
    this.selectedCarModel = this.teslaModels.find((carModel: CarModel) => carModel.description === selectedCarModelDesc) || null
    this.chooseCarForm.controls.carColor.setValue(this.selectedCarModel?.colors[0]?.description || null)
    this.imageUrl = '/assets/images/' + this.selectedCarModel?.code + '/' + this.selectedCarModel?.colors[0]?.code + '.jpg'
  }

  changeCarColor($event: Event) {
    const selectedCarColorDesc: string = ($event.target as HTMLInputElement).value
    if (!selectedCarColorDesc) {
      this.selectedCarColor = null
      this.imageUrl = null
      return
    }

    this.selectedCarColor = this.selectedCarModel?.colors.find((carColor) => carColor.description === selectedCarColorDesc) || null
    this.imageUrl = '/assets/images/' + this.selectedCarModel?.code + '/' + this.selectedCarColor?.code + '.jpg'

  }

  get chooseCarFormControls(): any {
    return this.chooseCarForm['controls'];
  }
}
