import { ObjectType, Field } from "@nestjs/graphql";

@ObjectType()
export class LoginResponse{
    @Field()
    success: boolean;

    @Field({nullable: true})
    token?: string;

    @Field({nullable: true})
    message?: string;
}