/**
 * @typedef {'debug'|'verbose'|'info'|'warn'|'error'} ELogLevel
 */
/**
 *
 * @enum {ELogLevel}
 */
const E_LOG_LEVELS = Object.freeze({
    debug: 'debug',
    verbose: 'verbose',
    info: 'info',
    warn: 'warn',
    error: 'error',
});

export default E_LOG_LEVELS;