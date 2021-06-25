/// <reference types="passport-oauth2" />
import { HttpService } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtService } from "@nestjs/jwt";
declare const IntraStrategy_base: new (...args: any[]) => import("passport-oauth2");
export declare class IntraStrategy extends IntraStrategy_base {
    private authService;
    private http;
    private jwtService;
    constructor(authService: AuthService, http: HttpService, jwtService: JwtService);
    validate(accessToken: string): Promise<any>;
}
export {};
