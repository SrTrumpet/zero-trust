import { Args, Context, Mutation, Resolver, Query } from '@nestjs/graphql';
import { VerifyInput } from './dto/verify.input';
import { AccessControlService } from './control.service';

@Resolver()
export class AccessControlResolver {
    constructor(private readonly service: AccessControlService) {}


    @Query(() => String)
    dummyQuery():String{
        return this.service.hola();
    }
    
    @Mutation(() => Boolean)
    async verifyAccess(
        @Args('input') input: VerifyInput,
        @Context() ctx,      
    ): Promise<boolean> {
        const token = this.getToken(ctx);
        return this.service.verify(token, input.deviceId);
    }

    private getToken(ctx: any): string {
        const auth = ctx.req.headers['authorization'] || '';
        const [, token] = auth.split(' ');
        if(!token)
        {
            throw new Error('token no enviado');
        }
        return token;
    }

}