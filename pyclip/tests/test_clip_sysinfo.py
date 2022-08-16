from hardware import CPU

import psutil

def test_server_object():
    cpu = CPU()
    cpu.detect()

    print(f"""
    CPU:              {cpu}

    CPU.cores:        {cpu.cores}

    CPU.threads:      {cpu.threads}

    CPU.minFreq:      {cpu.minFreq}

    CPU.maxFreq:      {cpu.maxFreq}

    CPU.allCoresFreq: {[round(c, 2) for c in cpu.allCoresFreq()[0:int(cpu.cores / 2)]]}
                      {[round(c, 2) for c in cpu.allCoresFreq()[int(cpu.cores / 2):cpu.cores]]}

    CPU.currCpuFreq:  {cpu.currCpuFreq()}

    CPU.currCpuPerc:  {cpu.currCpuPerc()}
    """)