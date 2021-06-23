/// <reference types="passport-oauth2" />
import { HttpService } from '@nestjs/common';
import { AuthService } from './auth.service';
declare const IntraStrategy_base: new (...args: any[]) => import("passport-oauth2");
export declare class IntraStrategy extends IntraStrategy_base {
    private authService;
    private http;
    constructor(authService: AuthService, http: HttpService);
    validate(accessToken: string): Promise<any>;
}
export {};
