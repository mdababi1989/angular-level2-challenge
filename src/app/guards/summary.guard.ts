import {CanActivateFn, Router} from '@angular/router';
import {StateService} from "../services/state.service";
import {inject} from "@angular/core";

export const summaryGuard: CanActivateFn = (route, state) => {
  const stateService: StateService = inject(StateService)
  const router: Router = inject(Router)
  if (stateService.isStep2Valid()) return true
  if (stateService.isStep1Valid()) return router.navigate(['/car-config'])
  return router.navigate(['/choose-car'])
};
