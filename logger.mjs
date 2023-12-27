import winston from "winston";
import E_LOG_LEVELS from "./libs/e-log-levels.mjs";
import LogFormats from "./libs/log-formats.mjs";
import LoggerWorker from "./libs/logger-worker.mjs";


const DEFAULT_LEVEL = 'info';
const DEFAULT_SERVICE = 'app';


export default class Logger {

    /**
     * @type {Logger}
     */
    static #global = new Logger(DEFAULT_LEVEL, DEFAULT_SERVICE, [ new winston.transports.Console({ format: LogFormats.json }) ]);

    /**
     * @type {LoggerWorker}
     */
    #worker;


    /**
     *
     * @param {string} [level]
     * @param {string} [service]
     * @param {(ConsoleTransportInstance|FileTransportInstance|HttpTransportInstance|StreamTransportInstance)[]} [transports]
     */
    constructor(level, service, transports) {
        this.#worker = new LoggerWorker(winston.createLogger({
            level: level || DEFAULT_LEVEL,
            defaultMeta: { service: service || DEFAULT_SERVICE },
            transports: transports,
        }), {});
    }

    /**
     *
     */
    reset(){
        this.#worker.instance = winston.createLogger({
            level: DEFAULT_LEVEL,
            defaultMeta: { service: DEFAULT_SERVICE },
            transports: [],
        });
    }


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
        return this.#worker.instance;
    }

    /**
     *
     * @param {string} level
     */
    set level(level){
        this.#worker.instance.level = level;
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
        this.#worker.instance.defaultMeta.service = service;
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
        this.#worker.instance.add(transport);
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
        this.#worker.debug(code, message, data);
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
        this.#worker.verbose(code, message, data);
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
        this.#worker.info(code, message, data);
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
        this.#worker.warn(code, message, err, data);
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
        this.#worker.error(code, message, err, data);
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


    /**
     *
     * @param {?object} ctx
     * @return {LoggerWorker}
     */
    dynamic(ctx){
        return new LoggerWorker(this.#worker.instance, ctx);
    }

    /**
     *
     * @param {?object} ctx
     * @return {LoggerWorker}
     */
    static dynamic(ctx){
        return Logger.#global.dynamic(ctx);
    }

}