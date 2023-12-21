import {format} from "winston";
import E_LEVEL_COLORS from "./e-level-colors.mjs";
import E_COLORS from "./e-colors.mjs";


const humanV1 = format.printf(({ level, message, timestamp, err, code, data }) => {
    const timestampStr = timestamp.replace(/^(\d{4})-(\d{2})-(\d{2}).(\d{2}):(\d{2}):(\d{2})\.(\d+).+/i, '$1-$2-$3 $4:$5:$6.$7');
    const levelColor = E_LEVEL_COLORS[level] || E_COLORS.RESET;
    const levelStr = level?.toUpperCase();
    const dataStr = data ? ` | ${JSON.stringify(data)}` : '';
    let errStr = '';
    if(err){
        errStr += ` | Error: ${err.message}`;
        try{
            errStr += ` | ${JSON.stringify(err)}`;
        } catch (err2){
            errStr += ` | <<Failed to serialize error as JSON, cause: ${err2.message}>>`;
        }

        errStr += `\nStacktrace: ${err.stack}`;
    }

    return `${timestampStr} [${levelColor}${levelStr}${E_COLORS.RESET}] [${code}]: ${message}${dataStr}${errStr}`;
});


export default class LogFormats{
    static human = format.combine(format.label(), format.timestamp(), humanV1);
    static json = format.combine(format.label(), format.timestamp(), format.json({}));
}