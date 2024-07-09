import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../usuarios/services/auth.service';
import { EstadoAutenticacion } from '../../usuarios/enums/estado-autenticacion.enum';

export const isAuthenticatedGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router)

  if (!authService.currentUser() || authService.estadoAutenticacion() == EstadoAutenticacion.NoAutenticado)
    return router.createUrlTree(['/login']);

  return true;
};
