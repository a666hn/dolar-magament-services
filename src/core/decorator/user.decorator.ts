import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const GetAuthenticatedUser = createParamDecorator(
    (keyword: string, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        const user = request.user;

        return keyword ? user?.[keyword] : user
    }
)