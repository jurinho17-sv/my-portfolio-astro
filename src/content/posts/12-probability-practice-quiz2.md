---
title: "Practice Practice Quiz 2"
publishDate: 2026-02-25
description: "Probability Quiz 2 Prep."
tags: ["Chebyshev", "Variance", "Indicators", "Hypergeometric", "Geometric", "Poisson"]
draft: false
pin: 0
---

# Practice Quiz 2

## Problem 1

**(Probability bounds)** In a particular time period, the price of 1 pound of Vibranium is $\\$50$ on average, with a standard deviation of $\\$10$.

**(a) Using Chebyshev's Inequality, derive an upper bound on the probability that a pound of Vibranium costs greater than or equal to $\\$80$.**

Let $X$ = price. Given $E(X) = 50$, $\text{SD}(X) = 10$.

$$
P(X \geq 80) \leq P(|X - 50| \geq 30)
$$

Apply Chebyshev with $k\sigma = 30$, i.e. $k = 30/10 = 3$:

$$
P(|X - 50| \geq 3 \cdot 10) \leq \frac{1}{3^2} = \boxed{\frac{1}{9}}
$$

**(b) What would the mean of a pound of Vibranium need to be (fixing standard deviation at $\\$10$) in order to upper bound this probability by $\frac{1}{11}$?**

Let $\mu = E(X)$, $\sigma = 10$. Assume $\mu \leq 80$. Then:

$$
P(X \geq 80) \leq P(|X - \mu| \geq 80 - \mu) \leq \frac{\sigma^2}{(80 - \mu)^2}
$$

Require:

$$
\frac{100}{(80 - \mu)^2} \leq \frac{1}{11}
$$

$$
(80 - \mu)^2 \geq 1100
$$

$$
80 - \mu \geq 10\sqrt{11}
$$

$$
\mu \leq 80 - 10\sqrt{11}
$$

$$
\boxed{\mu = 80 - 10\sqrt{11}} \quad \text{(largest such mean)}
$$

---

## Problem 2

**(Expectation and variance)** Let $X$ and $Y$ be independent random variables. $X$ has variance 3 and expectation 1. $Y$ has variance 2 and expectation 0. Which of the five options below is the variance of $XY$?

(a) 8 &emsp; (b) 6 &emsp; (c) 5 &emsp; (d) 0 &emsp; (e) not enough information to answer

For independent $X, Y$:

$$
\text{Var}(XY) = E[(XY)^2] - [E(XY)]^2 = E(X^2)\,E(Y^2) - [E(X)]^2[E(Y)]^2
$$

Compute the second moments:

$$
E(X^2) = \text{Var}(X) + [E(X)]^2 = 3 + 1 = 4
$$

$$
E(Y^2) = \text{Var}(Y) + [E(Y)]^2 = 2 + 0 = 2
$$

$$
\text{Var}(XY) = (4)(2) - (1)^2(0)^2 = 8
$$

$$
\boxed{\textbf{(a)}\ 8}
$$

---

## Problem 3

**(Expectation with indicators)** Suppose there are $n$ families with 3 kids each applying for an international volunteering program. $k$ participants (kids only) are selected randomly from the $3n$ kids. Let $X$ be the number of families with kids selected. Assume $k < n$, and note that it is possible for multiple kids from one family to be selected. Find: $E(X)$.

Define indicators: let $I_j = \mathbf{1}(\text{family } j \text{ has at least one kid selected})$ for $j = 1, \ldots, n$.

$$
X = I_1 + I_2 + \cdots + I_n
$$

By linearity of expectation:

$$
E(X) = \sum_{j=1}^{n} P(I_j = 1) = n \cdot P(\text{family } j \text{ has at least one kid selected})
$$

Use the complement. The probability that none of family $j$'s 3 kids are among the $k$ selected:

$$
P(\text{none from family } j) = \frac{\binom{3n - 3}{k}}{\binom{3n}{k}}
$$

Therefore:

$$
\boxed{E(X) = n\left[1 - \frac{\binom{3n-3}{k}}{\binom{3n}{k}}\right]}
$$

---

## Problem 4

**(Hypergeometric, geometric, expectation of geometric)** Your family is trying to decide sleeping arrangements in the house. There are 10 young people staying in the house who will be divided into two rooms. You will choose a set of 5 people to sleep in the first room and the rest will sleep in the second room. A sleeping arrangement is acceptable if it meets the following two criteria:

- Your two youngest cousins (say, 7 and 8 years old) always fight, so exactly one of them must be in the first room.
- There are 4 people over 18 years old, and exactly 2 of them must be in the first room to supervise the others.

You are too lazy to work out the arrangement by hand, so you decide to do this randomly by choosing a set of 5 people at random to sleep in the first room, and repeat this until you get an acceptable arrangement.

**(a) For a single draw of 5 people, what is the probability that you will draw an acceptable sleeping arrangement?**

Partition the 10 people into three groups: 2 cousins, 4 adults, 4 others.

An acceptable arrangement requires: exactly 1 of 2 cousins, exactly 2 of 4 adults, and the remaining $5 - 1 - 2 = 2$ from the 4 others.

$$
P(\text{acceptable}) = \frac{\binom{2}{1}\binom{4}{2}\binom{4}{2}}{\binom{10}{5}} = \frac{2 \cdot 6 \cdot 6}{252} = \frac{72}{252} = \boxed{\frac{2}{7}}
$$

**(b) What is the expected number of draws of 5 people until you get an acceptable arrangement? Note: Each drawing of 5 people is independent of every other drawing of 5 people.**

Each draw is an independent Bernoulli trial with success probability $p = 2/7$. The number of draws until the first success is Geometric$(p)$ on $\{1, 2, 3, \ldots\}$.

$$
E[\text{number of draws}] = \frac{1}{p} = \frac{7}{2} = \boxed{3.5}
$$

---

## Problem 5

**(Poisson)** Suppose that on average, 2 moths per 12-hour night are killed by a particular hanging bug zapper. Assume that conditions are the same across different nights and different times of the night, and that moths arrive independently of one another. Find the chance that more than 7 moths are killed in a period of three nights.

Moths arrive as a Poisson process. Rate: $\lambda = 2$ moths per night.

Over 3 nights:

$$
\mu = 2 \times 3 = 6
$$

$$
X \sim \text{Poisson}(6)
$$

$$
P(X > 7) = 1 - P(X \leq 7) = \boxed{1 - \sum_{k=0}^{7} e^{-6}\frac{6^k}{k!}}
$$

---

## References

[1] J. Pitman, "Ch. 3: Random Variables," in *Probability*, corrected 6th printing. New York, NY: Springer, 1997, pp. 139--257.