import winston from 'winston';
import E_COLORS from "./e-colors.mjs";
import E_LEVEL_COLORS from "./e-level-colors.mjs";


export const humanReadableFormat = winston.format.printf(({ level, message, timestamp, err, code, meta }) => {
    const err_str = err ? '' + (err.stack || err) : '';
    const payload_str = meta ? JSON.stringify(meta) : '';
    return `${ timestamp.replace(/^(\d{4})-(\d{2})-(\d{2}).(\d{2}):(\d{2}):(\d{2})\.(\d+).+/i, '$1-$2-$3 $4:$5:$6.$7') } [${ E_LEVEL_COLORS[level] || E_COLORS.RESET }${ level?.toUpperCase() }${ E_COLORS.RESET }] [${ code }]: ${ message }${meta?'\n' + payload_str:''}${err?'\n' + err_str:''}`;
});

// TODO add JSON format
