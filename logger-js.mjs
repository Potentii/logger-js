import winston from 'winston';
import E_LOG_LEVELS from "./libs/e-log-levels.mjs";


export default class LoggerJs {

    #innerLogger;

    constructor(level, job, transports) {
        this.#innerLogger = winston.createLogger({
            level: level,
            defaultMeta: { job: job },
            transports: transports,
        });
    }


    /**
     *
     * @param {string} code
     * @param {string} message
     * @param {object|*[]} [payload]
     */
    debug(code, message, payload) {
        this.#innerLogger.log({
            level: E_LOG_LEVELS.debug,
            code: code,
            message: message,
            meta: payload,
        });
    }

    /**
     *
     * @param {string} code
     * @param {string} message
     * @param {object|*[]} [payload]
     */
    verbose(code, message, payload) {
        this.#innerLogger.log({
            level: E_LOG_LEVELS.verbose,
            code: code,
            message: message,
            meta: payload,
        });
    }

    /**
     *
     * @param {string} code
     * @param {string} message
     * @param {object|*[]} [payload]
     */
    info(code, message, payload) {
        this.#innerLogger.log({
            level: E_LOG_LEVELS.info,
            code: code,
            message: message,
            meta: payload,
        });
    }

    /**
     *
     * @param {string} code
     * @param {string} message
     * @param {Error} [err]
     * @param {object|*[]} [payload]
     */
    warn(code, message, err, payload) {
        this.#innerLogger.log({
            level: E_LOG_LEVELS.warn,
            code: code,
            message: message,
            err: err,
            meta: payload,
        });
    }

    /**
     *
     * @param {string} code
     * @param {string} message
     * @param {Error} err
     * @param {object|*[]} [payload]
     */
    error(code, message, err, payload) {
        this.#innerLogger.log({
            level: E_LOG_LEVELS.error,
            code: code,
            message: message,
            err: err,
            meta: payload,
        });
    }


    /**
     *
     * @param {ELogLevel} level
     */
    setLevel(level) {
        this.#innerLogger.level = level;
    }


    /**
     *
     * @enum {ELogLevel}
     */
    get E_LOG_LEVELS() {
        return E_LOG_LEVELS;
    }

}