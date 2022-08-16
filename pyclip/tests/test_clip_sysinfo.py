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

    CPU.allCoresFreq: {cpu.allCoresFreq()}

    CPU.currCpuFreq:  {cpu.currCpuFreq()}

    CPU.currCpuPerc:  {cpu.currCpuPerc()}
    """)