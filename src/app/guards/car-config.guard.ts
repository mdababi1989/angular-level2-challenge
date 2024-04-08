import {CanActivateFn, Router} from '@angular/router';
import {StateService} from "../services/state.service";
import {inject} from "@angular/core";

export const carConfigGuard: CanActivateFn = (route, state) => {
  const stateService: StateService = inject(StateService)
  const router: Router = inject(Router)
  /* return true if step 1 is valid; else redirect to step1 */
  return stateService.isStep1Valid() ? true: router.navigate(['/choose-car']);
};
