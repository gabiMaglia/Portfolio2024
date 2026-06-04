import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(
    private readonly config: ConfigService,
    private readonly reflector: Reflector,
  ) {}

  canActivate(ctx: ExecutionContext): boolean {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      ctx.getHandler(),
      ctx.getClass(),
    ]);

    if (isPublic) return true;

    const req = ctx.switchToHttp().getRequest<{ method: string; headers: Record<string, string> }>();

    // All GET requests are public
    if (req.method === 'GET') return true;

    const key = req.headers['x-api-key'];
    const expected = this.config.getOrThrow<string>('API_KEY');

    if (key && key === expected) return true;

    throw new UnauthorizedException('Missing or invalid x-api-key header');
  }
}
