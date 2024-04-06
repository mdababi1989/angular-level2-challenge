import {Component, OnInit} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {TeslaCarService} from "../../services/tesla-car.service";
import {CommonModule} from "@angular/common";
import {CarConfigList} from "../../models/car-config-list";

@Component({
  selector: 'app-car-config',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './car-config.component.html',
  styleUrl: './car-config.component.scss'
})
export class CarConfigComponent implements OnInit {
  carConfigForm = this.fb.group({
    config: ['', [Validators.required]],
    towHitch: [false],
    yokeWheel: [false]
  })
  carConfigList!: CarConfigList;
  carConfigDescList!: string[]

  constructor(private teslaCarService: TeslaCarService, public fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.teslaCarService.getOptionsByModelCode('X').subscribe(
      carConfigList => {
        this.carConfigList = carConfigList
        this.carConfigDescList = this.carConfigList.configs.map(config => config.description)
      }
    )
  }

  changeCarConfig($event: Event) {

  }


  get carConfigFormControls(): any {
    return this.carConfigForm['controls'];
  }


}
