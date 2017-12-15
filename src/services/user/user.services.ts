import {OnInit} from "@angular/core/core";
import {Injectable, Inject} from "@angular/core";
import {Http, Headers, Response, RequestOptions} from "@angular/http";
import {Observable} from "rxjs/Rx";
import { of } from "rxjs/observable/of";
import "rxjs/add/operator/map";

@Injectable()

export class UserService implements OnInit {

    public currentUser: any = {};
    public authenticated: boolean = false;
    public authenticationToken: string = "";
    private config: any = {};

    constructor(@Inject(Http)private http?: Http) {
        // constructed
    }

    ngOnInit(): void {
        // thats empty
    }

    public isAuthenticated(): Observable<boolean> {
        return Observable.of(this.authenticated);
    }

    public init(config: any): void {
        this.config = config;
    }

    public getAuthenticationtoken(): string {
        // get auth token from sessionStorage
        return this.authenticationToken;
    }

    public getCurrentUser(): any {
        // returning current user let curu: any = this.currentUser; let curjson: any =JSON.parse(curu);
        return this.currentUser;
    }

    public logout(): void {
        console.log("loggin out");
        this.currentUser = {};
        this.authenticated = false;
        this.authenticationToken = "";
    }

    public login(username: string, password: string, token: string, redirect: any, secret?: string): Observable<boolean> {

        let headers: Headers = new Headers({ "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": "Basic " + this.config.CONFIRMATIONTOKEN });

        let conString: string = this.config.SERVERPROTOCOL + this.config.SERVERURL + ":" + this.config.SERVERPORT + this.config.LOGINURL;
        let body: any = "";

        if (redirect === 1) {
            body = body + "grant_type=identification_code";
            body = body + "&client_id=" + this.config.APPLICATIONID;
            body = body + "&scope=api";
            body = body + "&identification=" + token;
        } else {
            body = body + "grant_type=password";
            body = body + "&username=" + username;
            body = body + "&password=" + password;
            body = body + "&scope=api";
            body = body + "&client_id=" + this.config.APPLICATIONID;
        }
        if (secret) {
            body = body + "&client_secret=" + secret;
        }

        let loginAction: any;

        loginAction = this
            .http
            .post(conString, body, {headers: headers});

        loginAction.subscribe((data: any) => {

            console.log("data", data);
            console.log("data._body", data._body);

            try {
                let datajson: any = JSON.parse(data._body);
                console.log("datajson", datajson);

                // jwt token: https://jwt.io/
                let objectdata: any = datajson.access_token.split(".");

                console.log("objectdata", objectdata);

                let bearer: string = datajson.token_type;
                let pls: string = "" + objectdata[1];
                console.log("pls", pls);

                let payload: any = atob(pls);
                // let signature: any = atob(objectdata[2]);

                console.log("payload", payload);

                let sub: any = 0;
                let name: any = "";

                if (payload.sub) {
                    sub = payload.sub;
                }
                if (payload.name) {
                    name = payload.name;
                }

                let cu: any = {
                    "UserId": sub,
                    "LoggerInUserDisplayName": name
                };
                this.currentUser = cu;
                this.authenticationToken = "Bearer " + datajson.access_token;
                this.authenticated = true;

            } catch (e) {
                console.log("e", e);
                this.authenticationToken = "";
                return new Error("Authentication Error");
            }

        }, (error) => {
            console.log("loginAction error", error);
        });
        return loginAction;

    }

    public signup(username: string, password: string): void {alert("not yet implemented");}
}