import { Resolver, Query, Args, Context } from "@nestjs/graphql";
import { ProxyService } from "./proxy.service";
import { gql } from "graphql-request";

@Resolver()
export class ProxyResolver{
    
    constructor(private readonly proxyService: ProxyService){}

    @Query(() => String)
    async proxyRequest(@Args('operation') operation: string, @Args('variables', {nullable: true}) variables: string, @Context() ctx,){
        const query = gql`${operation}`;
        const vars = variables ? JSON.parse(variables) : {};
        const token = ctx.request.headers['authorization'] as string;
        const deviceId = ctx.req.headers['x-device-id'] as string;
        if(!token || !deviceId)
        {
            throw new Error('falta el header de authorization o x-device-id');
        }

        //const upsStream = 'http:// //revisarlo pero mandar peticion a front o a otros microservicios

        return this.proxyService.forward(query, vars,token, deviceId);
    }

    @Query(() => String)
    async printeo(
        @Args('operation') operation: string,
        @Args('variables', { nullable: true }) variables: string,
        @Context() context
        ) {
        const req = context.req;
        console.log("Headers:", req.headers);
        console.log("Body:", req.body);
    }
}