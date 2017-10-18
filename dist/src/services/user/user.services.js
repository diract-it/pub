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
const core_1 = require("@angular/core");
const http_1 = require("@angular/http");
require("rxjs/add/operator/map");
let UserService = class UserService {
    constructor(http) {
        this.http = http;
        this.currentUser = {};
        this.authenticated = false;
        this.authenticationToken = "";
        this.config = {};
        // constructed
    }
    ngOnInit() {
        // thats empty
    }
    isAuthenticated() { return this.authenticated; }
    init(config) {
        this.config = config;
    }
    getAuthenticationtoken() {
        // get auth token from sessionStorage
        return this.authenticationToken;
    }
    getCurrentUser() {
        // returning current user let curu: any = this.currentUser; let curjson: any =JSON.parse(curu);
        return this.currentUser;
    }
    logout() {
        console.log("loggin out");
        this.currentUser = {};
        this.authenticated = false;
        this.authenticationToken = "";
    }
    login(username, password, redirect) {
        let headers = new http_1.Headers({ "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": "Basic " + this.config.CONFIRMATIONTOKEN });
        let conString = this.config.SERVERPROTOCOL + this.config.SERVERURL + ":" + this.config.SERVERPORT + this.config.LOGINURL;
        let body = "grant_type=password&username=" + username + "&password=" + password + "&client_id=" + this.config.APPLICATIONID + "&scope=api";
        // let options: any = {headers: headers};
        let loginAction;
        // if (this.config.METHOD) {
        //     if (this.config.METHOD === "local") {
        //         loginAction = this
        //             .http
        //             .get(conString);
        //     } else {
        // console.log("posting", conString);
        loginAction = this
            .http
            .post(conString, body, { headers: headers });
        // }
        // } else {
        //     // console.log("posting", conString);
        //     // loginAction = this
        //     //     .http
        //     //     .post(conString, body);
        // }
        // let th: any = this;
        loginAction.subscribe((data) => {
            console.log("data", data);
            console.log("data._body", data._body);
            try {
                let datajson = JSON.parse(data._body);
                console.log("datajson", datajson);
                // jwt token: https://jwt.io/
                let objectdata = datajson.access_token.split(".");
                console.log("objectdata", objectdata);
                let bearer = datajson.token_type;
                let pls = "" + objectdata[1];
                console.log("pls", pls);
                let payload = atob(pls);
                // let signature : any = atob(objectdata[2]);
                console.log("payload", payload);
                let sub = 0;
                let name = "";
                if (payload.sub) {
                    sub = payload.sub;
                }
                if (payload.name) {
                    name = payload.name;
                }
                let cu = {
                    "UserId": sub,
                    "LoggerInUserDisplayName": name
                };
                this.currentUser = cu;
                // window     .sessionStorage     .setItem("CurrentUser", JSON.stringify(cu));
                // settings for Identity Server
                this.authenticationToken = "Bearer " + datajson.access_token;
                // this.authenticationToken = data._body;
                // window     .sessionStorage     .setItem("Authenticationtoken",
                // data.AuthenticationToken);
                this.authenticated = true;
                // console.log("authenticated", this.authenticated);
            }
            catch (e) {
                console.log("e", e);
                this.authenticationToken = "";
                // window     .sessionStorage     .setItem("Authenticationtoken", "");
                return new Error("Authentication Error");
            }
        }, (error) => {
            console.log("loginAction error", error);
        });
        return loginAction;
    }
    signup(username, password) { alert("not yet implemented"); }
};
UserService = __decorate([
    core_1.Injectable(),
    __param(0, core_1.Inject(http_1.Http)),
    __metadata("design:paramtypes", [http_1.Http])
], UserService);
exports.UserService = UserService;
