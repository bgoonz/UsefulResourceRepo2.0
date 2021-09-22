---
title: "Fixed Points & Stability: Strogatz Exercise 2.2.3"
date: "2021-02-07"
published: true
tags: ["mathematics", "nonlinear-dynamics"]
image: ../src/images/butterfly_effect.jpg
pagetype: "article"
---

This exercise is from _Nonlinear Dynamics and Chaos, 2nd Edition_ by Steven H. Strogatz

- Part 1: One-Dimensional Flows
  - 2 Flows on the Line

**Exercise 2.2.3**  
Analyze the following equation graphically. Sketch the vector field on the real line, find all the fixed points, classify their stability, and sketch the graph of $x(t)$ for different initial conditions. Then try to obtain the analytical solution for $x(t)$.

$$\dot {x} = x - x^{3}$$

<iframe src="https://www.desmos.com/calculator/ysouxtxafy?embed" width="500px" height="300px" style="border: 1px solid #ccc" frameborder=0></iframe>

![vector field](./vector_field_2-2-3.jpg)

From the above graph of $\dot {x} = x - x^{3}$, it's straightforward to sketch the vector field shown below it. The fixed points are $x*$ = -1, 0, and 1. $\dot {x}$ is positive to the left of $x*$ = -1, so the flow is to the right. To the right of $x*$ = -1, $\dot {x}$ is negative, so the flow is to the left. From these two facts, it's clear that $x*$ = -1 is a stable fixed point. Using the same analysis for the other fixed points, we conclude that that $x*$ = 0 is an unstable fixed point and $x*$ = 1 is a stable fixed point.

An analytic solution is possible.

$$\dfrac{\mathrm{d} x}{\mathrm{d} t} = x - x^{3} = x(1 -x^{2}) = x(1+x)(1-x)$$

$$\dfrac{1}{x(1+x)(1-x)}dx = dt$$

$$\displaystyle\int \dfrac{1}{x}dx - \dfrac{1}{2}\int \dfrac{1}{x+1}dx - \dfrac{1}{2}\int\dfrac{1}{x-1}dx = \int_{0}^{t}dt$$

$$ln\left |x  \right | - \dfrac{1}{2}ln\left |x+1 \right | - \dfrac{1}{2}ln\left |x-1\right | + C = t$$

$$\pm \dfrac{x^{2}}{x^{2} - 1} = ke^{2t}$$ (must consider + and - solutions)

$$x(t) = \pm \dfrac{\sqrt{k}e^{t}}{\sqrt{ke^{2t}-1}}$$

and

$$x(t) = \pm \dfrac{\sqrt{k}e^{t}}{\sqrt{ke^{2t}+1}}$$

Solutions tend toward $\pm \ 1$ as t goes to $\pm \infty $

<iframe src="https://www.desmos.com/calculator/rylvicwlql?embed" width="500px" height="300px" style="border: 1px solid #ccc" frameborder=0></iframe>
