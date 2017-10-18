import {CeyenneLogService} from "./log.services";

let CeyenneLogServiceFactory : any = (debug_console : Boolean) => {
    return new CeyenneLogService(true);
};

export let CeyenneLogServiceProvider : any = {
    provide: CeyenneLogService,
    useFactory: CeyenneLogServiceFactory
};