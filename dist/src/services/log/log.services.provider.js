import { AlertController } from "ionic-angular";
import { CeyenneLogService } from "./log.services";
let CeyenneLogServiceFactory = (debug_console, alertCtrl) => {
    return new CeyenneLogService(true, alertCtrl);
};
export let CeyenneLogServiceProvider = {
    provide: CeyenneLogService,
    useFactory: CeyenneLogServiceFactory,
    deps: [true, AlertController]
};
