import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const RawHeaders = createParamDecorator(
  (data: null | string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    return request.rawHeaders;
  },
);
