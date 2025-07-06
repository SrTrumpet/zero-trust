import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GraphQLClient, gql } from 'graphql-request';

@Injectable()
export class AccessControlService {
    private authUser: GraphQLClient;
    private authDevice: GraphQLClient;

    constructor(private readonly cfg: ConfigService) {
        this.authUser = new GraphQLClient(
            cfg.get('AUTH_USER_URL', 'http://ipauthuser:3001/graphql'),
        );
        this.authDevice = new GraphQLClient(
            cfg.get('AUTH_DEVICE_URL', 'http://ipdevice:3003/graphql'),
        );
    }
    
    hola(): String{
        return "Hola del Service";
    }
    async verify(token: string, deviceId: string): Promise<boolean>{

        //query pa user
        const queryUser = gql`            
            query($token: String!) {
                validateToken(token: $token) {
                ok
                userId
                }
            }`;
        
        const { validateToken } = await this.authUser.request<{
            validateToken: { ok: boolean, userId: number | null};
        }>(queryUser, {token});

        if(!validateToken.ok || !validateToken.userId)
        {
            return false;
        }

        //query pa device
        const queryDevice = gql`
            query($token: String!, $deviceId: String!, $userId: Float!) {
                verifyDevice(token: $token, deviceId: $deviceId, userId: $userId)
            }
        `;

        const { verifyDevice } = await this.authDevice.request<{
            verifyDevice: boolean;
        }>(queryDevice, {
            token,
            deviceId,
            userId: validateToken.userId,
        });

        return validateToken.ok && verifyDevice;
    }
    
}
