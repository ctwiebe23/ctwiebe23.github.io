"""
Usage:  cmd [--max-y 200] [--save out.png]
"""
import argparse
import math
import cmath

import numpy as np
import matplotlib.pyplot as plt

SQRT5 = math.sqrt(5)
PHI = (1 + SQRT5) / 2
PSI = (1 - SQRT5) / 2

B = [
    1.277272322046726,
    0.4861679248695622,
    0.28736372080779704,
    -0.05172805815811952,
    0.0009255931317747189,
    -1.5028998406958724e-06,
    2.021003809157445e-10,
    -1.6057201789792526e-20,
    4.533053474864063e-41,
    -2.0397820678196715e-103,
    1.4630145545923898e-207,
]

def newton_poly(y, b=B):
    y = np.asarray(y, dtype=float)
    result = np.full_like(y, b[-1])
    for c in reversed(b[:-1]):
        result = result * y + c
    return result


def closed_form(y):
    y = np.asarray(y, dtype=float)
    return np.log(y * SQRT5 + 0.5) / math.log(PHI)


def newton_method(y):
    y = float(y)
    x = cmath.log(y) / cmath.log(1.5)
    n = max(1, int((cmath.log(y) / cmath.log(150)).real))
    for _ in range(n):
        f = PHI**x - PSI**x - y * SQRT5
        fp = cmath.log(PHI) * PHI**x - cmath.log(PSI) * PSI**x
        x = x - f / fp
    return x.real


newton_method_vec = np.vectorize(newton_method, otypes=[float])


def fibs_up_to(limit):
    a, b, out = 1, 2, []
    n = 2
    while a <= limit:
        out.append((a, n))
        a, b, n = b, a + b, n + 1
    return out


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--max-y", type=float, default=200)
    ap.add_argument("--save", help="save figure to this path instead of showing")
    args = ap.parse_args()

    y = np.linspace(1, args.max_y, 2000)
    ref = closed_form(y)  # used as the reference for the error plot
    methods = {
        "Newton divided differences": newton_poly(y),
        "Closed-form inverse": ref,
        "Newton's method": newton_method_vec(y),
    }
    colors = ["tab:blue", "tab:green", "tab:red"]

    fig, (ax1, ax2) = plt.subplots(2, 1, figsize=(10, 8), sharex=True,
                                   gridspec_kw={"height_ratios": [2, 1]})

    for (name, vals), c in zip(methods.items(), colors):
        ax1.plot(y, vals, label=name, color=c, lw=1.5)
    fp = fibs_up_to(args.max_y)
    ax1.scatter([f for f, _ in fp], [n for _, n in fp], color="black", s=18,
                zorder=5, label="Exact (F(n), n)")
    ax1.set_ylim(0, math.log(args.max_y * SQRT5) / math.log(PHI) * 1.3)
    ax1.set_ylabel("estimated index n")
    ax1.set_title("Inverse Fibonacci approximations")
    ax1.legend()
    ax1.grid(alpha=0.3)

    for (name, vals), c in zip(methods.items(), colors):
        if name == "Closed-form inverse":
            continue
        ax2.plot(y, vals - ref, label=f"{name} - closed form", color=c, lw=1.2)
    ax2.axhline(0, color="gray", lw=0.8)
    ax2.set_yscale("symlog", linthresh=1)
    ax2.set_xlabel("Fibonacci number y")
    ax2.set_ylabel("difference")
    ax2.set_title("Difference from closed-form inverse")
    ax2.legend()
    ax2.grid(alpha=0.3)

    fig.tight_layout()
    if args.save:
        fig.savefig(args.save, dpi=150)
    else:
        plt.show()


if __name__ == "__main__":
    main()
