import { SetMetadata } from '@nestjs/common';
import { ROLE_TYPE } from 'src/constants/user.enum';

export const ROLES_KEY = 'roles';
// eslint-disable-next-line @typescript-eslint/naming-convention
export const Roles = (...roles: ROLE_TYPE[]) => SetMetadata(ROLES_KEY, roles);
