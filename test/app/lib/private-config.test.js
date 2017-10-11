const logger = require('../../../app/lib/logger');

const MODULE_PATH = '../../../app/lib/private-config';

describe('the private-config library', () => {
  let privateConfig;

  beforeEach(() => {
    logger.log = jest.fn(() => {});
    logger.error = jest.fn(() => {});

    jest.mock('path', () => ({
      resolve() {
        return '../../test/app/lib/private-config.test.json';
      },
    }));

    privateConfig = require(MODULE_PATH);
  });

  it('should exist', () => {
    expect(privateConfig).toBeDefined();
  });

  describe('when a private configuration exists', () => {
    let privateConfigData;

    beforeEach(() => {
      privateConfigData = require('./private-config.test.json');
    });

    describe('getTwitterConfig', () => {
      it('should return the twitter config', () => {
        expect(privateConfig.getTwitterConfig()).toEqual(privateConfigData.twitter);
      });
    });
  });

  describe('when a private configuration does NOT exist', () => {
    beforeEach(() => {
      jest.resetModules();

      logger.log = jest.fn(() => {});
      logger.error = jest.fn(() => {});

      jest.mock('path', () => ({
        extname() {},
        basename() {},
        resolve() {
          return '../../test/app/lib/foo.json';
        },
      }));

      privateConfig = require(MODULE_PATH);
    });

    describe('getTwitterConfig', () => {
      it('should return the null', () => {
        expect(privateConfig.getTwitterConfig()).toBeNull();
      });
    });
  });
});
