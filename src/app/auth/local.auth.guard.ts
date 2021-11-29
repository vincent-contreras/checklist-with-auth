import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  async canActivate(context: ExecutionContext) {
    const activationResult = (await super.canActivate(context)) as boolean;
    const request = context.switchToHttp().getRequest();

    await super.logIn(request);

    return activationResult;
  }
}
