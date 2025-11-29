

import { createParamDecorator, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import jwt from "jsonwebtoken";
 const Token = createParamDecorator(
  (data:unknown,ctx: ExecutionContext) => {
    const accessToken = ctx.switchToHttp().getRequest().cookies.accessToken
   const verifiedToken= jwt.verify(accessToken,process.env.JWT_ACCESS_SECRET as string)

    if (verifiedToken) {
      return verifiedToken

    }
    throw new UnauthorizedException
  },
);

export default Token