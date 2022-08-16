import os
import re
import psutil
import platform
from dataclasses import dataclass


@dataclass
class Frequency:
    """
      It rapresents a frequency of a single core
      or of the whole CPU. The getter @percentage is
      calculated but it ignores the boost frequencie
      and it stops at 100%.
    """

    current: float = 0
    min: float = 0
    max: float = 0

    def percentage(self) -> float:
        p = self.current / self.max * 100
        return p if p < 100 else 100

    def __iter__(self):
        return iter((self.current, self.min, self.max))


@dataclass
class CPU:
    """
      This object summarize the CPU informations
      providing methods such currCpuPerc that calculate
      the current CPU usage. The method detect() aquire
      the system's CPU informations, otherwise a plain
      CPU() object can be created.
    """

    modelName: str = None
    cores: float = 0
    threads: float = 0
    minFreq: float = 0
    maxFreq: float = 0

    def freqIsGoinCrazy() -> bool:
        pass

    def detect(self) -> None:
        self.modelName = CpuDetector.modelName()
        self.cores = CpuDetector.cores(False) 
        self.threads = CpuDetector.cores(True)
        _, self.minFreq, self.maxFreq = CpuDetector.cpuFreq()

    def __repr__(self) -> str:
        return self.modelName or f'Unknown {self.cores} cores CPU'

    def currCoreFreq(self, core: int = 0) -> float:
        if core > self.cores:
            raise Exception(f'You have {self.cores} cores, but you want to get the frequency of core {core}')
        return CpuDetector.coresFreq()[core].current

    def allCoresFreq(self) -> list[Frequency]:
        return [self.currCoreFreq(i) for i in range(self.cores)]

    def currCpuFreq(self) -> float:
        return CpuDetector.cpuFreq().current

    def currCpuPerc(self) -> float:
        return CpuDetector.cpuFreq().percentage()


class CpuDetector:
    """ A static class that provides methods to detect
      the system's CPU informations for various OS's. """

    def modelName() -> str:
        """ This method returns the model name of the CPU,
        trying to get it from multiple sources. Usually should
        return platform.processor(), but if blank, in Linux
        look into /proc/cpuinfo. Ultimately, it can return None. 
        
        TODO: Add support for Windows.
        """

        pproc =  platform.processor()
        if pproc != '':
            return pproc
        command = 'cat /proc/cpuinfo | grep "model name"'
        all_info = os.popen(command).read()
        for line in all_info.split('\n'):
            return re.sub(".*model name.*: ", "", line, 1)
        return None
    
    def cores(logical: bool = False) -> int:
        """ Returns the phisical cores of the system,
        if logical is True returns the logical cores. """

        return psutil.cpu_count(logical)
    
    def coresFreq() -> list[Frequency]:
        """ Returns a list of Frequency objects
        for each core of the system. """

        return [Frequency(c.current, c.min, c.max)
               for c in psutil.cpu_freq(percpu=True)]

    def cpuFreq() -> Frequency:
        """ Returns a Frequency object that can be
        iterated as (current: float, min: float, max: float).
        Each value is in MHz. """

        x = psutil.cpu_freq(percpu=False)
        return Frequency(x.current, x.min, x.max)