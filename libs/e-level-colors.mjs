import E_COLORS from "./e-colors.mjs";
import E_LOG_LEVELS from "./e-log-levels.mjs";

const levelColors = {}
levelColors[E_LOG_LEVELS.debug] = E_COLORS.GREEN;
levelColors[E_LOG_LEVELS.verbose] = E_COLORS.WHITE;
levelColors[E_LOG_LEVELS.info] = E_COLORS.BLUE;
levelColors[E_LOG_LEVELS.warn] = E_COLORS.YELLOW;
levelColors[E_LOG_LEVELS.error] = E_COLORS.RED;


/**
 * @typedef {string} ELevelColor
 */
/**
 *
 * @enum {ELevelColor}
 */
const E_LEVEL_COLORS = Object.freeze(levelColors);

export default E_LEVEL_COLORS;