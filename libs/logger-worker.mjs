import E_LOG_LEVELS from "./e-log-levels.mjs";

/**
 * @package
 */
export default class LoggerWorker{
    /**
     * @type {winston.Logger}
     */
    #instance;
    /**
     * @type {?object}
     */
    #ctx;


    /**
     *
     * @param {winston.Logger} instance
     * @param {?object} [ctx]
     */
    constructor(instance, ctx) {
        this.#instance = instance;
        this.#ctx = ctx;
    }


    /**
     * @type {winston.Logger}
     */
    get instance(){
        return this.#instance;
    }

    /**
     *
     * @param {winston.Logger} newInstance
     */
    set instance(newInstance){
        this.#instance = newInstance;
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
            data: { data },
        });
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
            data: this.#buildData(data, this.#ctx),
        });
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
            data: this.#buildData(data, this.#ctx),
        });
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
            data: this.#buildData(data, this.#ctx),
        });
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
            data: this.#buildData(data, this.#ctx),
        });
    }


    /**
     *
     * @param {?object} ctx
     * @return {LoggerWorker}
     */
    set(ctx){
        this.#ctx = { ...(this.#ctx || {}), ...(ctx || {}) };
        return this;
    }


    #buildData(data, ctx){
        return { ...(ctx || {}), ...(data || {}) };
    }
}