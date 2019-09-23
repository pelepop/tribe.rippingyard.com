import log4js from 'log4js'

const logger = log4js.getLogger()

export default {
  debug: message => {
    logger.level = 'debug'
    logger.debug(message)
  }
}

export function debug(message) {
  logger.debug(message)
}
