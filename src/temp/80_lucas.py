#!/bin/python3
from math import sqrt
import sys

def lucas(x):
    return ((1 + sqrt(5)) / 2) ** x + ((1 - sqrt(5)) / 2) ** x

x = float(sys.argv[1]) if len(sys.argv) > 1 else 5
print(lucas(x))
