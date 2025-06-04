import { Injectable } from "@nestjs/common";
import { gql, GraphQLClient } from "graphql-request";
import { LoginInput } from "src/dto/login.input";
import { LoginResponse } from "src/dto/login.response";

@Injectable()
export class AccesControlService{

    private readonly client = new GraphQLClient('http://access-control:3002/graphql');

    async forwardLogin(credentials) {
        const mutation = gql`
        mutation ForwardLogin($credentials: CredentialsInput!) {
            processLogin(credentials: $credentials) {
                token
                success
                message
            }
        }
    `;
    }
}