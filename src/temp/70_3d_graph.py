"""
Usage:  cmd [--max-y 30000] [--log-y] [--save out.png]
"""
import argparse
import cmath
import math

import numpy as np
import matplotlib.pyplot as plt

SQRT5 = math.sqrt(5)
PHI = (1 + SQRT5) / 2
PSI = (1 - SQRT5) / 2


def newton_method(y):
    y = float(y)
    x = cmath.log(y) / cmath.log(1.5)
    n = max(int((cmath.log(y) / cmath.log(150)).real), 1)
    for _ in range(n):
        f = PHI**x - PSI**x - y * SQRT5
        fp = cmath.log(PHI) * PHI**x - cmath.log(PSI) * PSI**x
        x = x - f / fp
    return x


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--max-y", type=float, default=30000)
    ap.add_argument("--points", type=int, default=3000)
    ap.add_argument("--log-y", action="store_true",
                    help="space samples and the y axis logarithmically (log10 y)")
    ap.add_argument("--save", help="save figure to this path instead of showing")
    args = ap.parse_args()

    if args.log_y:
        y = np.logspace(0, math.log10(args.max_y), args.points)
    else:
        y = np.linspace(1, args.max_y, args.points)
    x = np.array([newton_method(v) for v in y])
    axis_y = np.log10(y) if args.log_y else y

    fig = plt.figure(figsize=(10, 8))
    ax = fig.add_subplot(projection="3d")
    ax.plot(axis_y, x.real, x.imag, lw=1.5, color="tab:red", label="Newton's method")

    ref = np.log(y * SQRT5 + 0.5) / math.log(PHI)
    ax.plot(axis_y, ref, np.zeros_like(ref), lw=1, color="tab:green", label="Closed form (Im = 0)")

    ax.set_xlabel("log10(y)" if args.log_y else "y (Fibonacci number)")
    ax.set_ylabel("Re(x)")
    ax.set_zlabel("Im(x)")
    ax.set_title("Newton's method inverse Fibonacci estimate in the complex plane")
    ax.legend()
    fig.tight_layout()
    if args.save:
        fig.savefig(args.save, dpi=150)
    else:
        plt.show()


if __name__ == "__main__":
    main()
