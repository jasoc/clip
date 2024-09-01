import logging


def init_logging():
    formatter = logging.Formatter("%(levelname)-9s %(name)-0s: %(message)s")
    console = logging.StreamHandler()
    console.setFormatter(formatter)
    logging.getLogger().addHandler(console)


def get_logger(
    name: str,
) -> logging.Logger:
    logger = logging.getLogger(name)
    logger.setLevel(logging.DEBUG if __debug__ else logging.INFO)
    return logger
