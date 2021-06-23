import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';
declare const OAuthStrategy_base: new (...args: any[]) => Strategy;
export declare class OAuthStrategy extends OAuthStrategy_base {
    private authService;
    constructor(authService: AuthService);
    validate(username: string, password: string): Promise<any>;
}
export {};
