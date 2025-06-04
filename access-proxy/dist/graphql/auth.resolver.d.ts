import { AccesControlService } from "./acces-control.service";
import { LoginInput } from "src/dto/login.input";
export declare class AuthResolver {
    private readonly accessControl;
    constructor(accessControl: AccesControlService);
    dummyQuery(): String;
    loginControl(credentials: LoginInput): Promise<void>;
}
