#!/bin/python3
from cmath import log, sqrt
import sys

# y is the fibonacci number whose index we need to find
y = float(sys.argv[1]) if len(sys.argv) > 1 else 55
print(f'solving for y = {y}', file=sys.stderr)

x = 8
print(f'initial estimate x = {x:.2f}', file=sys.stderr)

n = 5
print(f'iterations n = {n}', file=sys.stderr)

r1 = (1 + sqrt(5)) / 2
r2 = (1 - sqrt(5)) / 2

for i in range(n):
    f = r1**x - r2**x - y * sqrt(5)
    fp = log(r1) * r1**x - log(r2) * r2**x
    x = x - f / fp
    print(f'iteration {i} x = {x:.2f}', file=sys.stderr)

print(f'final raw estimate x = {x:.2f}', file=sys.stderr)
print(round(x.real))
