var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { UserService } from "./user.services";
import { TOKEN, STOCK_URL, CURRENTUSER, LOGINRESULT } from "../../mocks";
import { TestBed, inject } from "@angular/core/testing";
import { HttpModule, XHRBackend, Response, ResponseOptions } from "@angular/http";
import { MockBackend } from "@angular/http/testing";
describe("UserService", () => {
    it("UserService should exsist", () => {
        expect(UserService).toBeTruthy();
    });
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpModule],
            providers: [
                {
                    provide: STOCK_URL,
                    useValue: STOCK_URL
                },
                UserService, {
                    provide: XHRBackend,
                    useClass: MockBackend
                }
            ]
        });
    });
    describe("UserService Logout", () => __awaiter(this, void 0, void 0, function* () {
        it("Logout", inject([UserService], (userService) => {
            userService.authenticationToken = "fout";
            userService.currentUser = {
                "UserID": 667,
                "LoggerInUserDisplayName": "FOUT"
            };
            userService.logout();
            expect(userService.authenticationToken).toMatch("");
        }));
    }));
    describe("UserService Login", () => __awaiter(this, void 0, void 0, function* () {
        // https://blog.thoughtram.io/angular/2016/11/28/testing-services-with-http-in-angular-2.html
        it("Login through http: stock, authtoken, isauth, currentuser", inject([
            UserService, XHRBackend
        ], (userService, mockBackend) => {
            const mockResponse = LOGINRESULT;
            mockBackend
                .connections
                .subscribe((connection) => {
                connection.mockRespond(new Response(new ResponseOptions({ body: mockResponse })));
            });
            userService.authenticationToken = "fout";
            userService.currentUser = {
                "UserID": 678,
                "LoggerInUserDisplayName": "FOUT"
            };
            userService
                .login("test", "test")
                .subscribe((stock) => {
                let stockraw = stock;
                stock = stock.json();
                let cu = userService.getCurrentUser();
                let cuold = JSON.stringify(cu);
                let cunew = JSON.stringify(CURRENTUSER);
                // tests
                expect(stock).toBe(LOGINRESULT);
                expect(userService.getAuthenticationtoken()).toBe(TOKEN);
                expect(cuold).toMatch(cunew);
                expect(userService.isAuthenticated).toBeTruthy();
            }, (e) => {
                console.log(e);
            });
        }));
    }));
});
