import os

class Configs:

    _instance: object = None
    debug: bool = None
    
    def init(self):
        if   os.environ.get('clip_environment') == "prod":
            self.debug = False
        elif os.environ.get('clip_environment') == "debug":
            self.debug = True
        else:
            self.debug = __debug__

    @classmethod
    def instance(cls):
        if cls._instance is None:
            cls._instance : Configs = cls.__new__(cls)
            cls._instance.init()

        return cls._instance