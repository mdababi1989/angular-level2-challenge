import {CanActivateFn, Router} from '@angular/router';
import {StateService} from "../services/state.service";
import {inject} from "@angular/core";

export const summaryGuard: CanActivateFn = (route, state) => {
  const stateService: StateService = inject(StateService)
  const router: Router = inject(Router)
  /* return true if step 1 and 2 are valid */
  if (stateService.isStep2Valid()) return true
  /* If step1 is valid then redirect to step2 */
  if (stateService.isStep1Valid()) return router.navigate(['/car-config'])
  /* Redirect to step1 */
  return router.navigate(['/choose-car'])
};
