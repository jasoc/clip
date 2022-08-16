from hardware import CPU

import psutil

def test_server_object():
    cpu = CPU()
    cpu.detect()
    print(cpu)
    print(cpu.minFreq)
    print(cpu.maxFreq)
    print(cpu.currCpuFreq())
    print(cpu.allCoresFreq())