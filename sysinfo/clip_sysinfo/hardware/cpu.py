import psutil

class Core:
    num: int = 0
    minFreq: float = 0
    maxFreq: float = 0
    
    def __init__(self, num, minFreq, maxFreq):
        self.num = num
        self.minFreq = minFreq
        self.maxFreq = maxFreq

    def currentFreq(self):
        return psutil.cpu_freq(percpu=True)[self.num].current


class CPU:
    modelName: str = None
    phisicalCores: int = None
    logicalCores: int = None
    cores: list[Core] = []

    def __repr__(self):
        return f'{self.modelName} ({self.phisicalCores})'