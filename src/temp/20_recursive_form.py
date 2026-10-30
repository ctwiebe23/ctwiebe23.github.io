#!/bin/python3
import sys

def fibonacci(x):
    if x <= 2:
        return 1
    else:
        return fibonacci(x - 1) + fibonacci(x - 2)

x = float(sys.argv[1]) if len(sys.argv) > 1 else 5
print(fibonacci(x))
