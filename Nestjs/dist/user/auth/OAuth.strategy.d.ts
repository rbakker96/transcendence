/// <reference types="passport-oauth2" />
import { HttpService } from '@nestjs/common';
import { AuthService } from './auth.service';
declare const OAuthStrategy_base: new (...args: any[]) => import("passport-oauth2");
export declare class OAuthStrategy extends OAuthStrategy_base {
    private authService;
    private http;
    constructor(authService: AuthService, http: HttpService);
    validate(accessToken: string): Promise<any>;
}
export {};
