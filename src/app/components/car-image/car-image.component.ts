import {Component, Input} from '@angular/core';
import {StateService} from "../../services/state.service";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-car-image',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './car-image.component.html',
  styleUrl: './car-image.component.scss'
})
export class CarImageComponent {
  @Input() imageUrl!: string | null
  constructor(private stateService: StateService) {}

}
