import { CeyenneLogService } from "./log.services";
let logService = null;
describe("LogService test", () => {
    beforeEach(() => {
        logService = new CeyenneLogService(true, null);
    });
    it("LogService should exsist", () => {
        expect(logService).toBeTruthy();
    });
});
