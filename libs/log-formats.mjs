import {format} from "winston";
import E_LEVEL_COLORS from "./e-level-colors.mjs";
import E_COLORS from "./e-colors.mjs";


const humanV1 = format.printf(({ level, message, timestamp, err, code, data }) => {
    let err_str = '';
    if(err){
        err_str += (err.stack || err);
        try{
            err_str += '\n' + JSON.stringify(err, null, 4);
        } catch (err2){}
    }

    const data_str = data ? JSON.stringify(data) : '';
    return `${ timestamp.replace(/^(\d{4})-(\d{2})-(\d{2}).(\d{2}):(\d{2}):(\d{2})\.(\d+).+/i, '$1-$2-$3 $4:$5:$6.$7') } [${ E_LEVEL_COLORS[level] || E_COLORS.RESET }${ level?.toUpperCase() }${ E_COLORS.RESET }] [${ code }]: ${ message }${data?'\n' + data_str:''}${err?'\n' + err_str:''}`;
});


export default class LogFormats{
    static human = format.combine(format.label(), format.timestamp(), humanV1);
    static json = format.combine(format.label(), format.timestamp(), format.json({}));
}