"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccesControlService = void 0;
const common_1 = require("@nestjs/common");
const graphql_request_1 = require("graphql-request");
let AccesControlService = class AccesControlService {
    client = new graphql_request_1.GraphQLClient('http://access-control:3002/graphql');
    async forwardLogin(credentials) {
        const mutation = (0, graphql_request_1.gql) `
        mutation ForwardLogin($credentials: CredentialsInput!) {
            processLogin(credentials: $credentials) {
                token
                success
                message
            }
        }
    `;
    }
};
exports.AccesControlService = AccesControlService;
exports.AccesControlService = AccesControlService = __decorate([
    (0, common_1.Injectable)()
], AccesControlService);
//# sourceMappingURL=acces-control.service.js.map