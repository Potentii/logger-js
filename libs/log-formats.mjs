import {format} from "winston";
import E_LEVEL_COLORS from "./e-level-colors.mjs";
import E_COLORS from "./e-colors.mjs";


const humanV1 = format.printf(({ level, message, timestamp, err, code, meta }) => {
    let err_str = err ? '' + (err.stack || err) : '';
    if(err?.response?.data){
        const data = err.response.data;
        err_str += `\nresponse: ${data && (typeof data == 'object' || Array.isArray(data)) ? JSON.stringify(data) : data}`;
    }
    const payload_str = meta ? JSON.stringify(meta) : '';
    return `${ timestamp.replace(/^(\d{4})-(\d{2})-(\d{2}).(\d{2}):(\d{2}):(\d{2})\.(\d+).+/i, '$1-$2-$3 $4:$5:$6.$7') } [${ E_LEVEL_COLORS[level] || E_COLORS.RESET }${ level?.toUpperCase() }${ E_COLORS.RESET }] [${ code }]: ${ message }${meta?'\n' + payload_str:''}${err?'\n' + err_str:''}`;
});


export default class LogFormats{
    static human = format.combine(format.label(), format.timestamp(), humanV1);
    static json = format.combine(format.label(), format.timestamp(), format.json({}));
}