import { Resolver, Query, Mutation, Args, Context } from "@nestjs/graphql";
import { DeviceService } from "./device.service";
import { DeviceResponse } from "./dto/device-login-responce.dto";
import { DeviceLogin } from "./dto/device-login.dto";
import { JwtService } from "@nestjs/jwt";


@Resolver()
export class DeviceResolver{
    constructor(private readonly deviceService: DeviceService, private readonly jwtService: JwtService){}
    @Query(() => String)
    dummyQuery():String{
        return this.deviceService.hola();
    }

    @Mutation(returns => DeviceResponse)
    loginDevice(@Args('loginDto') loginDto : DeviceLogin, @Context() context): Promise<DeviceResponse>{
        const token = this.extractTokenFromHeader(context);
        //console.log(token);
        //console.log(context);
        if (!token) {
        throw new Error('No se encontró el token de autorización');
    }
        if(!loginDto){
            throw new Error('error en el device');
        }

        console.log("----->", loginDto);
        return this.deviceService.loginDevice(loginDto, token);
    }

    @Mutation(returns => Number)
    syncUserDevice(@Args('userId') userId: number, @Args('ipDevice') ipDevice: string, @Args('operatingSystem') operatingSystem: string){
        return this.deviceService.registerDevice(userId, ipDevice, operatingSystem);
    }

    @Query(() => String)
    obtenerMiIp(@Context() context): string{
        //console.log(context);
        console.log('IP del cliente:', context.req.socket.remoteAddress);

        return context;
    }

    private extractTokenFromHeader(request: any): string | undefined {
        const context = request.req; 
        //console.log(context);
        const authHeader = context?.headers?.authorization;
        if (!authHeader) {
            return undefined;
        }
        const [type, token] = authHeader.split(' ');
        if (type !== 'Bearer' || !token) {
            return undefined;
        }
        return token;
    }


    @Query(() => Boolean)
    verifyDevice(
        @Args('token') token: string,
        @Args('deviceId') deviceId: string,
        @Args('userId') userId: number,
    ) {
        const payload = this.jwtService.verify(token);
        if(payload.sub !== userId)
        {
            return false;
        }

        return this.deviceService.deviceToUser(userId, deviceId);
    }
}