import {Component, OnInit} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {TeslaCarService} from "../../services/tesla-car.service";
import {CommonModule} from "@angular/common";
import {CarConfigList} from "../../models/car-config-list";
import {StateService} from "../../services/state.service";
import {CarImageComponent} from "../car-image/car-image.component";
import {CarConfig} from "../../models/car-config";

@Component({
  selector: 'app-car-config',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CarImageComponent
  ],
  templateUrl: './car-config.component.html',
  styleUrl: './car-config.component.scss'
})
export class CarConfigComponent implements OnInit {
  carConfigForm = this.fb.group({
    config: [0, [Validators.required]],
    towHitch: [false],
    yokeWheel: [false]
  })
  carConfigList!: CarConfigList;
  imageUrl!: string | null;
  selectedCarConfig!: CarConfig | null

  constructor(private teslaCarService: TeslaCarService, public fb: FormBuilder, private stateService: StateService) {
  }

  ngOnInit(): void {
    this.initFields()
    this.teslaCarService.getOptionsByModelCode(this.stateService.selectedCarModel?.code).subscribe(
      carConfigList => {
        this.carConfigList = carConfigList
      }
    )
  }

  private initFields() {
    this.imageUrl = '/assets/images/' + this.stateService.selectedCarModel?.code + '/' + this.stateService.selectedCarColor?.code + '.jpg'
    this.carConfigForm.patchValue({
      config: this.stateService.selectedCarConfig? this.stateService.selectedCarConfig?.id: 0,
      towHitch: this.stateService.towHitch,
      yokeWheel: this.stateService.yokeWheel
    })
  }

  changeCarConfig($event: Event) {
    const selectedCarConfigId: number = +($event.target as HTMLInputElement).value
    this.selectedCarConfig = this.carConfigList.configs.find((carConfig: CarConfig) => carConfig.id === selectedCarConfigId) || null
    this.stateService.selectedCarConfig = this.selectedCarConfig
  }


  get carConfigFormControls() {
    return this.carConfigForm.controls;
  }


  updateTowHitch($event: Event) {
    this.stateService.towHitch = ($event.target as HTMLInputElement).checked
  }

  updateYokeWheel($event: Event) {
    this.stateService.yokeWheel = ($event.target as HTMLInputElement).checked
  }
}
