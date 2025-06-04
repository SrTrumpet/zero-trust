import { Resolver, Mutation, Query, Args } from "@nestjs/graphql";
import { AccesControlService } from "./acces-control.service";
import { LoginInput } from "src/dto/login.input";
import { LoginResponse } from "src/dto/login.response";

@Resolver()
export class AuthResolver{
    constructor(private readonly accessControl: AccesControlService){}

    @Query(() => String)
    dummyQuery(): String{
        return "si";
    }

    @Mutation(() => LoginResponse)
    loginControl(@Args('credentials') credentials: LoginInput){
        return this.accessControl.forwardLogin(credentials);
    }

}