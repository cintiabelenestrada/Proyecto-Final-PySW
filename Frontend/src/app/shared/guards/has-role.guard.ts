import { inject } from '@angular/core';
import { AuthService } from '../../usuarios/services/auth.service';
import { ToastrService } from 'ngx-toastr';

export const hasRoleGuard = (allowedRoles: string[]) => {
  return () => {
    const authService = inject(AuthService);

    const canActivate = Boolean(
      authService.currentUser() &&
        allowedRoles.includes(authService.currentUser()!.perfil)
    );

    

    if (!canActivate) {
      inject(ToastrService).error(
        'No tienes permisos para acceder a esta página'
      );
    }

    return canActivate;
  };
};
