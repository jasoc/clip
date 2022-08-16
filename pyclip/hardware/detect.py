import os
import re
import platform
import psutil

from . import CPU, GPU, Disk, Core, Network

def detectCPU() -> CPU:

    ret = CPU()

    if platform.system() == "Windows":
        ret.modelName = platform.processor()
    
    elif platform.system() == "Linux":
        command = "cat /proc/cpuinfo"
        all_info = os.popen(command).read()
        for line in all_info.split('\n'):
            if "model name" in line:
                ret.modelName = re.sub(".*model name.*:", "", line, 1)

    ret.phisicalCores = psutil.cpu_count(logical=False)
    ret.logicalCores = psutil.cpu_count(logical=True)

    for i, core in enumerate(psutil.cpu_freq(percpu=True)):
        ret.cores.append(Core(i, core.min, core.max))

    return ret

def detectGPU() -> GPU:
    pass

def detectDisks() -> list[Disk]:
    pass

def detectNetworks() -> list[Network]:
    nets = psutil.net_if_addrs()
    for net in [nets[k] for k in nets.keys()]:
        yield Network(net.name, net.mac, net.address, net.netmask, net.broadcast)