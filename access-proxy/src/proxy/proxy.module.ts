import { ProxyResolver } from "./proxy.resolver";
import { ProxyService } from "./proxy.service";
import { Module } from "@nestjs/common";
import {ConfigModule} from "@nestjs/config";

@Module({
    imports: [ConfigModule.forRoot({ isGlobal: true})],
    providers:[ProxyResolver, ProxyService]
})

export class ProxyModule{};