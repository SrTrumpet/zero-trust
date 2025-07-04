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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProxyResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const proxy_service_1 = require("./proxy.service");
const graphql_request_1 = require("graphql-request");
let ProxyResolver = class ProxyResolver {
    proxyService;
    constructor(proxyService) {
        this.proxyService = proxyService;
    }
    async proxyRequest(operation, variables, ctx) {
        const query = (0, graphql_request_1.gql) `${operation}`;
        const vars = variables ? JSON.parse(variables) : {};
        const token = ctx.request.headers['authorization'];
        const deviceId = ctx.req.headers['x-device-id'];
        if (!token || !deviceId) {
            throw new Error('falta el header de authorization o x-device-id');
        }
        return this.proxyService.forward(query, vars, token, deviceId);
    }
    async printeo(operation, variables, context) {
        const req = context.req;
        console.log("Headers:", req.headers);
        console.log("Body:", req.body);
    }
};
exports.ProxyResolver = ProxyResolver;
__decorate([
    (0, graphql_1.Query)(() => String),
    __param(0, (0, graphql_1.Args)('operation')),
    __param(1, (0, graphql_1.Args)('variables', { nullable: true })),
    __param(2, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], ProxyResolver.prototype, "proxyRequest", null);
__decorate([
    (0, graphql_1.Query)(() => String),
    __param(0, (0, graphql_1.Args)('operation')),
    __param(1, (0, graphql_1.Args)('variables', { nullable: true })),
    __param(2, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], ProxyResolver.prototype, "printeo", null);
exports.ProxyResolver = ProxyResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [proxy_service_1.ProxyService])
], ProxyResolver);
//# sourceMappingURL=proxy.resolver.js.map