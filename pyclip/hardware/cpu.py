import psutil
import os
import re
import platform

from dataclasses import dataclass


@dataclass
class Frequency:
    """
    A class used to rapresent the current, minimum
    and maximum frequency of a core of the entire CPU.

    Attributes
    ----------
    curr : float
        the current freqerncy
    min : float
        the name of the animal
    sound : str
        the sound that the animal makes
    num_legs : int
        the number of legs the animal has (default 4)

    Methods
    -------
    says(sound=None)
        Prints the animals name and what sound it makes
    """
    curr: float = 0
    min: float = 0
    max: float = 0

    def __iter__(self):
        return iter((self.curr, self.min, self.max))


class CPU:
    modelName: str = None
    cores: float = 0
    threads: float = 0
    minFreq: float = 0
    maxFreq: float = 0

    def detect(self):
        self.modelName = CpuDetector.modelName()
        self.cores = CpuDetector.cores(False) 
        self.threads = CpuDetector.cores(True)
        _, self.minFreq, self.maxFreq = CpuDetector.cpuFreq()

    def __repr__(self):
        return self.modelName or f'Unknown {self.cores} cores CPU'

    def currCoreFreq(self, core: int = 0) -> float:
        if core > self.cores:
            raise Exception(f'You have {self.cores} cores, but you want to get the frequency of core {core}')
        return CpuDetector.coresFreq()[core].curr

    def allCoresFreq(self) -> list[Frequency]:
        return [self.currCoreFreq(i) for i in range(self.cores)]

    def currCpuFreq(self) -> float:
        return CpuDetector.cpuFreq().curr


class CpuDetector:

    def modelName() -> str:
        command = 'cat /proc/cpuinfo | grep "model name"'
        all_info = os.popen(command).read()
        for line in all_info.split('\n'):
            return re.sub(".*model name.*:", "", line, 1)
        pproc =  platform.processor()
        if pproc != '':
            return pproc
        return None
    
    def cores(logical=False) -> int:
        return psutil.cpu_count(logical)
    
    def coresFreq() -> list[Frequency]:
        ret = []
        for i, c in enumerate(psutil.cpu_freq(percpu=True)):
            ret.append(Frequency(c.current, c.min, c.max))
        return ret

    def cpuFreq() -> Frequency:
        x = psutil.cpu_freq(percpu=False)
        return Frequency(x.current, x.min, x.max)