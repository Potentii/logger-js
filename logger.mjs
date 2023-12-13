import winston from "winston";
import E_LOG_LEVELS from "./libs/e-log-levels.mjs";
import LogFormats from "./libs/log-formats.mjs";


// let global;
// let globalInstantiated = false;
// let globalAutoconfigured = false;

// function getEnv(){
//     return process?.env;
// }

// const MAX_LOGGERS = 4;
const DEFAULT_LEVEL = 'info';
const DEFAULT_SERVICE = 'app';
// const DEFAULT_FORMAT = LogFormats.json;



//
// /**
//  *
//  * @return {Logger}
//  */
// function initGlobal(){
//     if(globalInstantiated && globalAutoconfigured){
//         return global;
//     } else {
//
//         const loggersPrefixes = [];
//         for (let i = 0; i < MAX_LOGGERS; i++)
//             loggersPrefixes.push(`LOGGER__GLOBAL${i}`);
//
//         const logsPrefixesToAutoConfigure = loggersPrefixes.filter(prefix => getEnv()?.[`${prefix}__AUTOCONFIG`] == 'true');
//         if(logsPrefixesToAutoConfigure.length){
//
//
//             const transports = logsPrefixesToAutoConfigure.map(prefix => {
//
//                 let formatTemplateKey = getEnv()?.[`${prefix}__FORMAT_TEMPLATE`];
//                 const logFormat = formatTemplateKey?.trim().length
//                     ? LogFormats[formatTemplateKey]
//                     : DEFAULT_FORMAT;
//                 if (!logFormat)
//                     throw new TypeError(`Unknown log format template "${formatTemplateKey}" on "${prefix}__FORMAT_TEMPLATE", valid values are: [${Object.keys(LogFormats).join(', ')}]`);
//
//                 let transportType = getEnv()?.[`${prefix}__FILE`];
//
//             });
//
//             let formatTemplate = getEnv()?.LOGGER__GLOBAL__FORMAT_TEMPLATE;
//             if (!Object.keys(LogFormats).includes(formatTemplate)) {
//                 throw new TypeError(`Invalid`);
//             }
//             formatTemplate = ? formatTemplate :
//             if (!formatTemplate)
//                 formatTemplate = DEFAULT_FORMAT
//
//
//         } else if(!globalInstantiated){
//             global = new Logger(
//                 DEFAULT_LEVEL,
//                 DEFAULT_SERVICE,
//                 [ new winston.transports.Console({ format: DEFAULT_FORMAT }) ]
//             );
//             globalInstantiated = true;
//             globalAutoconfigured = false;
//         }
//
//         const hasAutoConfig = getEnv()?.[`LOGGER__GLOBAL${i}__AUTOCONFIG`] == 'true';
//
//
//         if (getEnv()?.LOGGER__GLOBAL__AUTOCONFIG == 'true') {
//
//
//
//
//             global = new Logger(
//                 DEFAULT_LEVEL,
//                 DEFAULT_SERVICE,
//                 [new winston.transports.Console({format: LogFormats.human})]
//             );
//             globalInstantiated = true;
//             globalAutoconfigured = true;
//         }
//     }
//
//     return global;
// }


export default class Logger {

    /**
     * @type {Logger}
     */
    static #global = new Logger(DEFAULT_LEVEL, DEFAULT_SERVICE, [ new winston.transports.Console({ format: LogFormats.json }) ]);

    /**
     * @type {winston.Logger}
     */
    #instance;


    /**
     *
     * @param {string} [level]
     * @param {string} [service]
     * @param {(ConsoleTransportInstance|FileTransportInstance|HttpTransportInstance|StreamTransportInstance)[]} [transports]
     */
    constructor(level, service, transports) {
        this.#instance = winston.createLogger({
            level: level || DEFAULT_LEVEL,
            defaultMeta: { service: service || DEFAULT_SERVICE },
            transports: transports,
        });
    }

    /**
     *
     */
    reset(){
        this.#instance = winston.createLogger({
            level: DEFAULT_LEVEL,
            defaultMeta: { service: DEFAULT_SERVICE },
            transports: [],
        });
    }


    // initFromEnv(){
    //
    // }


    /**
     *
     * @return {Logger}
     */
    static get global(){
        return this.#global;
    }


    /**
     * @type {winston.Logger}
     */
    get instance(){
        return this.#instance;
    }

    /**
     *
     * @param {string} level
     */
    set level(level){
        this.#instance.level = level;
    }

    /**
     *
     * @param {string} level
     * @return {Logger}
     */
    withLevel(level){
        this.level = level;
        return this;
    }

    /**
     *
     * @param {string} service
     */
    set service(service){
        this.#instance.defaultMeta.service = service;
    }

    /**
     *
     * @param {string} service
     * @return {Logger}
     */
    withService(service){
        this.service = service;
        return this;
    }

    /**
     *
     * @param {ConsoleTransportInstance|FileTransportInstance|HttpTransportInstance|StreamTransportInstance} transport
     * @return {Logger}
     */
    addTransport(transport){
        this.#instance.add(transport);
        return this;
    }


    /**
     *
     * @return {winston}
     */
    static get WINSTON(){
        return winston;
    }

    /**
     *
     * @enum {ELogLevel}
     */
    static get LEVELS(){
        return E_LOG_LEVELS;
    }


    /**
     *
     * @return {LogFormats}
     */
    static get FORMAT_TEMPLATES(){
        return LogFormats;
    }


    /**
     *
     * @param {string} code
     * @param {string} message
     * @param {object|*[]} [data]
     */
    debug(code, message, data) {
        this.#instance.log({
            level: E_LOG_LEVELS.debug,
            code: code,
            message: message,
            data: data,
        });
    }

    /**
     *
     * @param {string} code
     * @param {string} message
     * @param {object|*[]} [data]
     */
    static debug(code, message, data) {
        Logger.#global.debug(code, message, data);
    }

    /**
     *
     * @param {string} code
     * @param {string} message
     * @param {object|*[]} [data]
     */
    verbose(code, message, data) {
        this.#instance.log({
            level: E_LOG_LEVELS.verbose,
            code: code,
            message: message,
            data: data,
        });
    }

    /**
     *
     * @param {string} code
     * @param {string} message
     * @param {object|*[]} [data]
     */
    static verbose(code, message, data) {
        Logger.#global.verbose(code, message, data);
    }

    /**
     *
     * @param {string} code
     * @param {string} message
     * @param {object|*[]} [data]
     */
    info(code, message, data) {
        this.#instance.log({
            level: E_LOG_LEVELS.info,
            code: code,
            message: message,
            data: data,
        });
    }

    /**
     *
     * @param {string} code
     * @param {string} message
     * @param {object|*[]} [data]
     */
    static info(code, message, data) {
        Logger.#global.info(code, message, data);
    }

    /**
     *
     * @param {string} code
     * @param {string} message
     * @param {Error} [err]
     * @param {object|*[]} [data]
     */
    warn(code, message, err, data) {
        this.#instance.log({
            level: E_LOG_LEVELS.warn,
            code: code,
            message: message,
            err: err,
            data: data,
        });
    }

    /**
     *
     * @param {string} code
     * @param {string} message
     * @param {Error} [err]
     * @param {object|*[]} [data]
     */
    static warn(code, message, err, data) {
        Logger.#global.warn(code, message, err, data);
    }

    /**
     *
     * @param {string} code
     * @param {string} message
     * @param {Error} err
     * @param {object|*[]} [data]
     */
    error(code, message, err, data) {
        this.#instance.log({
            level: E_LOG_LEVELS.error,
            code: code,
            message: message,
            err: err,
            data: data,
        });
    }

    /**
     *
     * @param {string} code
     * @param {string} message
     * @param {Error} err
     * @param {object|*[]} [data]
     */
    static error(code, message, err, data) {
        Logger.#global.error(code, message, err, data);
    }

}