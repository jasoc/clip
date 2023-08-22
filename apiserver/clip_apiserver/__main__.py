import core
from utils import get_logger

logger = get_logger("clip")

if __name__ == "__main__":
    logger.info("Starting Clip API Server...")
    core.main()
