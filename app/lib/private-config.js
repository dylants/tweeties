import path from 'path';

const logger = require('./logger')();

const PRIVATE_CONFIG_PATH = path.resolve(__dirname, '../config/private-config.json');

function loadPrivateConfig() {
  logger.log('attempting to load the private configuration...');

  // attempt to load the private config (if it exists)
  let config;
  try {
    config = require(PRIVATE_CONFIG_PATH);
  } catch (error) {
    logger.error('no private configuration found! bad things are soon to occur!');
    return null;
  }

  logger.log('successfully loaded private configuration');
  return config;
}

const PRIVATE_CONFIG = loadPrivateConfig();

/* *****************************************************
 *                     ACCESSORS
 * *****************************************************/

export function getToken() {
  return PRIVATE_CONFIG ? PRIVATE_CONFIG.token : null;
}
