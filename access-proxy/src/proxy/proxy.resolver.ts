import { Resolver, Query, Args } from "@nestjs/graphql";
import { ProxyService } from "./proxy.service";
import { gql } from "graphql-request";

@Resolver()
export class ProxyResolver{
    
    constructor(private readonly proxyService: ProxyService){}

    @Query(() => String)
    async proxyRequest(@Args('operation') operation: string, @Args('variables', {nullable: true}) variables: string,){
        const query = gql`${operation}`;
        const vars = variables ? JSON.parse(variables) : {};
        return this.proxyService.forward(query, vars);
    }
}