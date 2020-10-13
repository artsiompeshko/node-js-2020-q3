import { logger } from '03.1/lib/logger';

const processErrorsLoader = (): void => {
  process.on('uncaughtException', (error: Error) => {
    logger.error({
      message: error,
      label: 'uncaughtException',
    });

    process.exit(1);
  });

  process.on('unhandledRejection', (reason, promise) => {
    logger.error({
      message: `Unhandled Rejection at: ${promise}, reason: ${reason}`,
      label: 'unhandledRejection',
    });

    process.exit(1);
  });
};

export default processErrorsLoader;
