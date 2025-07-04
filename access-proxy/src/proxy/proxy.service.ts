import { Injectable } from "@nestjs/common";
import { request} from "graphql-request";
import { gql, GraphQLClient } from "graphql-request";
import { ConfigService } from "@nestjs/config";


@Injectable()
export class ProxyService{
    private readonly accessControlUrl: string;

    constructor( private readonly cfg: ConfigService)
    {
        this.accessControlUrl = cfg.get<string>('ACCESS_CONTROL_URL') || 'http://ipaccesscontrol:3005/graphql';
    }

    //private accessControlUrl = 'http://access-control-service/graphql'; //Esta es la direccion de peticiones a access control
    async checkAccess(token:string, deviceId: string): Promise<boolean>
    {
        const query = gql`
            mutation($deviceId: String!){
                verifyAccess(input: { deviceId: $deviceId})
            }`;
        
        const client = new GraphQLClient(this.accessControlUrl, {
            headers: { authorization: token },
        });

        const { verifyAccess } = await client.request<{verifyAccess: boolean}>(
            query,
            {
                deviceId
            },
        );


        return verifyAccess;

    }


    /*async forward( query: string, variables?: any)
    {
        try {
            const data = await request(this.accessControlUrl, query, variables);
            return data;
        } catch (error) {
            console.error('Error al reenviar la request:', error);
            throw error;
        }
    }*/



     async forward( query: string, variables: any, token: string, deviceId: string)
    {
        try {
            const respuesta = await this.checkAccess(token, deviceId);
        
            if(!respuesta)
            {
                throw new Error('respuesta denegada por el access control');
            }

            const client = new GraphQLClient(this.accessControlUrl, {
                headers: { authorization: token },
            });

            return client.request(query, variables);
        } catch (error) {
            console.error('Error al reenviar la request:', error);
            throw error;
        }
    }
}