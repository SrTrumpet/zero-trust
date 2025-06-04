import { InputType, Field } from "@nestjs/graphql"

@InputType()
export class LoginInput{

    @Field()
    email: string;

    @Field()
    password: string;

    @Field()//Con esto se verifica el sistema que esta usando el usuario (celular o laptop)
    fingerprintID: string;

    //@Field()//Con esto detectamos el navegador
    //userAgent: string;
}