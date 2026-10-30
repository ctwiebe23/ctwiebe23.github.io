#!/bin/python3
from pprint import pprint
import sys

points = []
even_arg = True
for arg in sys.argv[1:]:
    try:
        n = float(arg)
    except ValueError:
        print('Not a number: ' + arg)
        sys.exit(1)
    if even_arg:
        points.append(n)
    else:
        points[-1] = (points[-1], n)
    even_arg = not even_arg
if not even_arg:
    print('Odd number of arguments given')
    sys.exit(2)
points.sort(key=lambda p : p[0])
print('Known points:', file=sys.stderr)
pprint(points, stream=sys.stderr)

memowy = [(p[0], p[0], p[1]) for p in points]
l = len(memowy)
n = int(l * (l + 1) / 2)
memowy[l:n] = [0] * (n - l)
m = 0
u = l - 1
t = u
for i in range(l, n):
    x1, _, y1 = memowy[m]
    m += 1
    _, x2, y2 = memowy[m]
    memowy[i] = (x1, x2, (y2 - y1) / (x2 - x1))
    if m == t:
        t += u
        u -= 1
        m += 1
print('\nDivided differences table memowy:', file=sys.stderr)
pprint(memowy, stream=sys.stderr)

A = [[0] * l for _ in range(l)]
xs = [p[0] for p in points]

for i in range(l):
    A[i][i] = 1
    for j in range(i+1, l):
        A[i][j] = A[i-1][j-1] - xs[j-1] * A[i][j-1]
print('\nPartial coefficient matrix A:', file=sys.stderr)
pprint(A, stream=sys.stderr)
ys = [0] * l
u = l
j = 0
for i in range(l):
    ys[i] = memowy[j][2]
    j += u
    u -= 1
print('\nRow 0 divided differences ys:', file=sys.stderr)
pprint(ys, stream=sys.stderr)
b = [0] * l
for i in range(l):
    for j in range(l):
        b[i] += A[i][j] * ys[j]
print('\nCoefficient vector b:', file=sys.stderr)
pprint(b, stream=sys.stderr)
print(file=sys.stderr)
print(b)
