import { OnInit } from "@angular/core/core";
import { Http } from "@angular/http";
import { Observable } from "rxjs/Rx";
import "rxjs/add/operator/map";
export declare class UserService implements OnInit {
    private http;
    currentUser: any;
    authenticated: boolean;
    authenticationToken: string;
    private config;
    constructor(http?: Http);
    ngOnInit(): void;
    isAuthenticated(): Observable<boolean>;
    init(config: any): void;
    getAuthenticationtoken(): string;
    getCurrentUser(): any;
    logout(): void;
    login(username: string, password: string, token?: string, redirect?: any, secret?: string): Observable<boolean>;
    signup(username: string, password: string): void;
}
