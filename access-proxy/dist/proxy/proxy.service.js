"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProxyService = void 0;
const common_1 = require("@nestjs/common");
const graphql_request_1 = require("graphql-request");
const config_1 = require("@nestjs/config");
let ProxyService = class ProxyService {
    cfg;
    accessControlUrl;
    constructor(cfg) {
        this.cfg = cfg;
        this.accessControlUrl = cfg.get('ACCESS_CONTROL_URL') || 'http://ipaccesscontrol:3005/graphql';
    }
    async checkAccess(token, deviceId) {
        const query = (0, graphql_request_1.gql) `
            mutation($deviceId: String!){
                verifyAccess(input: { deviceId: $deviceId})
            }`;
        const client = new graphql_request_1.GraphQLClient(this.accessControlUrl, {
            headers: { authorization: token },
        });
        const { verifyAccess } = await client.request(query, {
            deviceId
        });
        return verifyAccess;
    }
    async forward(query, variables, token, deviceId) {
        try {
            const respuesta = await this.checkAccess(token, deviceId);
            if (!respuesta) {
                throw new Error('respuesta denegada por el access control');
            }
            const client = new graphql_request_1.GraphQLClient(this.accessControlUrl, {
                headers: { authorization: token },
            });
            return client.request(query, variables);
        }
        catch (error) {
            console.error('Error al reenviar la request:', error);
            throw error;
        }
    }
};
exports.ProxyService = ProxyService;
exports.ProxyService = ProxyService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], ProxyService);
//# sourceMappingURL=proxy.service.js.map