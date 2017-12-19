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
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var Rx_1 = require("rxjs/Rx");
require("rxjs/add/operator/map");
var UserService = /** @class */ (function () {
    function UserService(http) {
        this.http = http;
        this.currentUser = {};
        this.authenticated = false;
        this.authenticationToken = "";
        this.config = {};
        // constructed
    }
    UserService.prototype.ngOnInit = function () {
        // thats empty
    };
    UserService.prototype.isAuthenticated = function () {
        return Rx_1.Observable.of(this.authenticated);
    };
    UserService.prototype.init = function (config) {
        this.config = config;
    };
    UserService.prototype.getAuthenticationtoken = function () {
        // get auth token from sessionStorage
        return this.authenticationToken;
    };
    UserService.prototype.getCurrentUser = function () {
        // returning current user let curu: any = this.currentUser; let curjson: any
        // =JSON.parse(curu);
        return this.currentUser;
    };
    UserService.prototype.logout = function () {
        console.log("loggin out");
        this.currentUser = {};
        this.authenticated = false;
        this.authenticationToken = "";
    };
    UserService.prototype.login = function (username, password, token, redirect, secret) {
        var _this = this;
        console.log("token", token);
        console.log("redirect", redirect);
        var headers;
        var conString = this.config.SERVERPROTOCOL + this.config.SERVERURL + ":" + this.config.SERVERPORT + this.config.LOGINURL;
        var body = "";
        if (redirect === 1) {
            headers = new http_1.Headers({
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": "Basic " + this.config.CONFIRMATIONTOKEN
            });
            body = body + "grant_type=identification_code";
            body = body + "&client_id=" + this.config.APPLICATIONID;
            body = body + "&scope=api";
            body = body + "&identification=" + token;
        }
        else {
            if (this.config.PASSWORDTOKEN) {
                headers = new http_1.Headers({
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Authorization": "Basic " + this.config.PASSWORDTOKEN
                });
            }
            else {
                headers = new http_1.Headers({
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Authorization": "Basic " + this.config.CONFIRMATIONTOKEN
                });
            }
            body = body + "grant_type=password";
            body = body + "&username=" + username;
            body = body + "&password=" + password;
            body = body + "&scope=api";
            body = body + "&client_id=" + this.config.APPLICATIONID;
        }
        if (secret) {
            body = body + "&client_secret=" + secret;
        }
        var loginAction;
        loginAction = this
            .http
            .post(conString, body, { headers: headers });
        loginAction.subscribe(function (data) {
            console.log("data", data);
            console.log("data._body", data._body);
            try {
                var datajson = JSON.parse(data._body);
                console.log("datajson", datajson);
                // jwt token: https://jwt.io/
                var objectdata = datajson
                    .access_token
                    .split(".");
                console.log("objectdata", objectdata);
                var bearer = datajson.token_type;
                var pls = "" + objectdata[1];
                console.log("pls", pls);
                var payload = atob(pls);
                // let signature: any = atob(objectdata[2]);
                console.log("payload", payload);
                var sub = 0;
                var name_1 = "";
                if (payload.sub) {
                    sub = payload.sub;
                }
                if (payload.name) {
                    name_1 = payload.name;
                }
                var cu = {
                    "UserId": sub,
                    "LoggerInUserDisplayName": name_1
                };
                _this.currentUser = cu;
                _this.authenticationToken = "Bearer " + datajson.access_token;
                _this.authenticated = true;
            }
            catch (e) {
                console.log("e", e);
                _this.authenticationToken = "";
                return new Error("Authentication Error");
            }
        }, function (error) {
            console.log("loginAction error", error);
        });
        return loginAction;
    };
    UserService.prototype.signup = function (username, password) {
        alert("not yet implemented");
        // alerting
    };
    UserService = __decorate([
        core_1.Injectable(),
        __param(0, core_1.Inject(http_1.Http)),
        __metadata("design:paramtypes", [http_1.Http])
    ], UserService);
    return UserService;
}());
exports.UserService = UserService;
//# sourceMappingURL=user.services.js.map