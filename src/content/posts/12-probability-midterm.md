---
title: "Probability Foundations: From Counting to Continuous Distributions"
publishDate: 2026-03-16
description: "Probability (3)"
tags: ["Probability", "Chebyshev", "Markov", "Indicator Method", "Poisson Process", "Gamma", "Exponential", "Normal Approximation", "Hypergeometric", "Bayes"]
draft: false
pin: 0
---

# Probability Foundations: From Counting to Continuous Distributions

<br>

## Distribution Reference

### Discrete

| Name | Range | $P(X = k)$ | Mean | Variance |
| :---: | :---: | :---: | :---: | :---: |
| Bernoulli$(p)$ | $\{0, 1\}$ | $P(1) = p;\; P(0) = 1-p$ | $p$ | $p(1-p)$ |
| Binomial$(n,p)$ | $\{0,1,\ldots,n\}$ | $\binom{n}{k}p^k(1-p)^{n-k}$ | $np$ | $np(1-p)$ |
| Hypergeometric$(n,N,G)$ | $\{0,\ldots,n\}$ | $\binom{G}{k}\binom{N-G}{n-k}/\binom{N}{n}$ | $nG/N$ | $n(G/N)(1-G/N)(N-n)/(N-1)$ |
| Geometric$(p)$ | $\{1,2,3,\ldots\}$ | $(1-p)^{k-1}p$ | $1/p$ | $(1-p)/p^2$ |
| Geometric$(p)$ | $\{0,1,2,\ldots\}$ | $(1-p)^k p$ | $(1-p)/p$ | $(1-p)/p^2$ |
| Neg. Binomial$(r,p)$ | $\{0,1,2,\ldots\}$ | $\binom{k+r-1}{r-1}p^r(1-p)^k$ | $r(1-p)/p$ | $r(1-p)/p^2$ |
| Poisson$(\mu)$ | $\{0,1,2,\ldots\}$ | $e^{-\mu}\mu^k/k!$ | $\mu$ | $\mu$ |

### Continuous

| Name | Range | Density $f(x)$ | CDF $F(x)$ | Mean | Variance |
| :---: | :---: | :---: | :---: | :---: | :---: |
| Uniform$(a,b)$ | $(a,b)$ | $1/(b-a)$ | $(x-a)/(b-a)$ | $(a+b)/2$ | $(b-a)^2/12$ |
| Normal$(\mu,\sigma^2)$ | $(-\infty,\infty)$ | $(2\pi\sigma^2)^{-1/2}e^{-(x-\mu)^2/2\sigma^2}$ | $\Phi\!\left(\frac{x-\mu}{\sigma}\right)$ | $\mu$ | $\sigma^2$ |
| Exponential$(\lambda)$ | $(0,\infty)$ | $\lambda e^{-\lambda x}$ | $1 - e^{-\lambda x}$ | $1/\lambda$ | $1/\lambda^2$ |
| Gamma$(r,\lambda)$ | $(0,\infty)$ | $\frac{\lambda^r}{\Gamma(r)}x^{r-1}e^{-\lambda x}$ | $1 - e^{-\lambda x}\sum_{k=0}^{r-1}\frac{(\lambda x)^k}{k!}$ | $r/\lambda$ | $r/\lambda^2$ |

---

## 1. Foundations of Probability

### 1.1 Core Rules

**Complement rule.** $P(A^c) = 1 - P(A)$. Any "at least one" problem is best attacked via complement.

**Inclusion-exclusion.** For two events:

$$P(A \cup B) = P(A) + P(B) - P(A \cap B).$$

For three events:

$$P(A \cup B \cup C) = \sum_i P(A_i) - \sum_{i<j} P(A_i \cap A_j) + P(A \cap B \cap C).$$

**Independence.** Events $A, B$ are independent iff $P(A \cap B) = P(A)P(B)$. Independence and disjointness are entirely different concepts: disjoint events with positive probability are never independent.

### 1.2 Conditional Probability and Bayes' Rule

$$P(A \mid B) = \frac{P(A \cap B)}{P(B)}, \qquad P(A \mid B) = \frac{P(B \mid A)\,P(A)}{P(B)}.$$

**Law of total probability.** If $\{A_k\}$ partitions the sample space:

$$P(B) = \sum_k P(B \mid A_k)\,P(A_k).$$

A useful distinction from the review lectures: a *forward conditional* (cause given, find effect) needs no Bayes' rule, while a *backward conditional* (effect given, find cause) does.

### 1.3 Counting Techniques

**Multinomial coefficient.** The number of ways to partition $n$ objects into groups of sizes $n_1, \ldots, n_m$:

$$\binom{n}{n_1, n_2, \ldots, n_m} = \frac{n!}{n_1!\, n_2! \cdots n_m!}, \qquad \sum n_i = n.$$

**Slot method.** To count arrangements with adjacency constraints: fix one type first, then place the other into the resulting gaps. Example: 8 coin tosses with 3 heads given. Place 5 tails to create 6 slots, then choose 3 for heads. Probability of non-consecutive heads:

$$\frac{\binom{6}{3}}{\binom{8}{3}}.$$

**Conditional sample space.** When conditioning restricts the outcome space, recompute as if the restricted space is the full space. Example: 20-sided die given no face exceeds 12 becomes a uniform 12-sided die.

### 1.4 Conditional Distributions

**Poisson conditional on sum.** If $X_1 \sim \text{Pois}(\mu_1)$, $X_2 \sim \text{Pois}(\mu_2)$ are independent, then:

$$X_1 \mid X_1 + X_2 = m \;\sim\; \text{Bin}\!\left(m,\;\frac{\mu_1}{\mu_1 + \mu_2}\right).$$

Interpretation: given $m$ total arrivals in a Poisson process with two types, the count of type 1 is Binomial with success probability equal to the rate proportion.

---

## 2. Discrete Distribution Patterns

### 2.1 Distribution Selection

| Scenario | Distribution |
| :--- | :--- |
| Fixed $n$ independent trials, count successes | Binomial$(n,p)$ |
| Without replacement from finite population, count successes | Hypergeometric$(n,N,G)$ |
| Independent trials until first success | Geometric$(p)$ |
| Independent trials until $r$th success (count failures) | Neg. Binomial$(r,p)$ |
| Count of events in a Poisson process interval | Poisson$(\lambda t)$ |
| $n$ large, $p$ small, $np$ moderate | Poisson$(\mu = np)$ approx to Binomial |
| $N \gg n$ | Binomial$(n, G/N)$ approx to Hypergeometric |

### 2.2 Approximation Methods

**Normal approximation to Binomial.** When $np$ and $n(1-p)$ are both large:

$$X \sim \text{Bin}(n,p) \;\approx\; N(np,\; np(1-p)).$$

Continuity correction for integer-valued $X$:

$$P(X = k) \approx \Phi\!\left(\frac{k + 0.5 - \mu}{\sigma}\right) - \Phi\!\left(\frac{k - 0.5 - \mu}{\sigma}\right).$$

**Poisson approximation to Binomial.** When $n$ is large, $p$ is small, and $\mu = np$ is moderate:

$$\text{Bin}(n,p) \approx \text{Pois}(\mu).$$

### 2.3 Coupon Collector Pattern

Collecting $n$ distinct types drawn uniformly at random. After $i$ types collected, the wait for type $i+1$ is:

$$W_i \sim \text{Geom}\!\left(\frac{n-i}{n}\right), \qquad i = 0, 1, \ldots, n-1.$$

The waiting times $W_0, W_1, \ldots, W_{n-1}$ are mutually independent, so:

$$\text{Var}\!\left(\sum W_i\right) = \sum \text{Var}(W_i).$$

---

## 3. Expectation and Variance

### 3.1 Expectation

$$E[X] = \sum_x x\,P(X = x).$$

**LOTUS (Law of the Unconscious Statistician):**

$$E[g(X)] = \sum_x g(x)\,P(X = x).$$

Note that $E[g(X)] \neq g(E[X])$ in general.

**Linearity.** For any random variables (no independence required):

$$E\!\left[\sum_{i=1}^n a_i X_i + b\right] = \sum_{i=1}^n a_i E[X_i] + b.$$

### 3.2 LOTUS with Poisson Series Manipulation

For $X \sim \text{Pois}(\mu)$ and $g(x) = \frac{1}{(x+1)(x+2)\cdots(x+n)}$, find $E[g(X)]$.

**Step 1.** Apply LOTUS:

$$E[g(X)] = \sum_{k=0}^{\infty} \frac{1}{(k+1)(k+2)\cdots(k+n)} \cdot \frac{e^{-\mu}\mu^k}{k!}.$$

**Step 2.** Combine denominators: $(k+1)(k+2)\cdots(k+n) \cdot k! = (k+n)!$, so:

$$= \sum_{k=0}^{\infty} \frac{e^{-\mu}\mu^k}{(k+n)!}.$$

**Step 3.** Multiply and divide by $\mu^n$, substitute $j = k + n$:

$$= \frac{1}{\mu^n}\sum_{j=n}^{\infty}\frac{e^{-\mu}\mu^j}{j!} = \frac{1}{\mu^n}\,P(X \geq n).$$

**Result:**

$$\boxed{E[g(X)] = \frac{1}{\mu^n}\left[1 - \sum_{j=0}^{n-1}\frac{e^{-\mu}\mu^j}{j!}\right]}$$

The key recognition: $\sum_{j=n}^{\infty} e^{-\mu}\mu^j/j!$ is the upper tail of the Poisson CDF.

### 3.3 Indicator Method

If $X$ counts how many of the events $A_1, \ldots, A_n$ occur, decompose $X = I_1 + \cdots + I_n$ with $I_j = \mathbf{1}(A_j)$. Then:

$$E[X] = \sum_{j=1}^n P(A_j).$$

No independence is required. This is the single most common technique on exams.

### 3.4 Variance

$$\text{Var}(X) = E[X^2] - (E[X])^2, \qquad \text{Var}(aX + b) = a^2\,\text{Var}(X).$$

For independent $X, Y$: $\text{Var}(X + Y) = \text{Var}(X) + \text{Var}(Y)$.

For general (possibly dependent) $X, Y$: $\text{Var}(X + Y) = \text{Var}(X) + \text{Var}(Y) + 2\,\text{Cov}(X,Y)$.

### 3.5 Variance via Indicators

For $X = \sum I_i$:

$$E[X^2] = \sum_i E[I_i^2] + \sum_{i \neq j} E[I_i I_j] = \sum_i P(A_i) + \sum_{i \neq j} P(A_i \cap A_j),$$

since $I_i^2 = I_i$ and $I_i I_j = I_{A_i \cap A_j}$. The cross terms $P(A_i \cap A_j)$ may differ depending on the structural relationship between indicators (e.g., adjacent vs. non-adjacent pairs).

---

## 4. Probability Inequalities

### 4.1 Markov's Inequality

For $X \geq 0$:

$$P(X \geq a) \leq \frac{E[X]}{a}.$$

When $X$ takes values in $[c, d]$, apply Markov to $X - c \geq 0$:

$$P(X \geq a) = P(X - c \geq a - c) \leq \frac{E[X] - c}{a - c}.$$

### 4.2 Chebyshev's Inequality

For any random variable $X$ with finite variance:

$$P(|X - \mu| \geq k\sigma) \leq \frac{1}{k^2}.$$

Equivalently: $P(|X - \mu| \geq a) \leq \text{Var}(X)/a^2$.

**One-sided bound.** $\{X \geq a\} \subseteq \{|X - \mu| \geq a - \mu\}$ for $a > \mu$, so:

$$P(X \geq a) \leq \frac{\text{Var}(X)}{(a-\mu)^2}.$$

**Tighter bound with side information.** Chebyshev bounds both tails simultaneously:

$$P(X \geq a) + P(X \leq b) \leq \frac{1}{k^2},$$

so if a lower bound on $P(X \leq b)$ is known, it can be subtracted.

**Symmetry refinement.** If $X$ is symmetric about $\mu$, then $P(X \geq \mu + a) = P(X \leq \mu - a)$, and the Chebyshev bound can be halved:

$$P(X \geq \mu + a) \leq \frac{1}{2} \cdot \frac{\text{Var}(X)}{a^2}.$$

---

## 5. Continuous Distributions

### 5.1 PDF and CDF

For a continuous random variable $X$ with density $f$ and CDF $F$:

$$P(a \leq X \leq b) = \int_a^b f(x)\,dx = F(b) - F(a), \qquad f(x) = F'(x).$$

Note that $f(x)$ is a density, not a probability. Its units are $1/(\text{units of } X)$. Also, $P(X = a) = 0$ for any specific value $a$.

### 5.2 Exponential Distribution

The exponential distribution $\text{Exp}(\lambda)$ has the survival function:

$$P(X > t) = e^{-\lambda t}, \qquad t > 0.$$

**Memoryless property:**

$$P(X > s + t \mid X > s) = P(X > t).$$

This is the defining characteristic: the conditional distribution of remaining lifetime, given survival to time $s$, is the same as the original distribution.

### 5.3 Minimum and Maximum of Independent Variables

**Minimum.** $M = \min(X_1, \ldots, X_n)$, all independent:

$$P(M > t) = \prod_{i=1}^n P(X_i > t).$$

**Competing exponentials.** If $X_i \sim \text{Exp}(\lambda_i)$ independently:

$$\min(X_1, \ldots, X_n) \sim \text{Exp}(\lambda_1 + \cdots + \lambda_n).$$

**Maximum.** $Y = \max(X_1, \ldots, X_n)$, all independent:

$$P(Y \leq t) = \prod_{i=1}^n P(X_i \leq t).$$

---

## 6. Poisson Process and Gamma Distribution

### 6.1 Poisson Process

For a Poisson process with rate $\lambda$:

$$N(t) \sim \text{Pois}(\lambda t), \qquad T_r \sim \text{Gamma}(r, \lambda),$$

where $N(t)$ is the count in $[0, t]$ and $T_r$ is the $r$th arrival time.

**Month indexing convention.** January $= [0, 1]$, February $= [1, 2]$, ..., so month $k$ occupies $[k-1, k]$.

### 6.2 Gamma-Poisson Duality

The Gamma CDF equals the Poisson upper tail:

$$P(T_r \leq t) = P(N(t) \geq r) = 1 - \sum_{k=0}^{r-1}\frac{e^{-\lambda t}(\lambda t)^k}{k!}.$$

This identity converts between arrival time probabilities and count probabilities.

### 6.3 Memoryless Property in Poisson Processes

After observing the process up to time $s$, the remaining time until the next arrival is $\text{Exp}(\lambda)$, independent of the history. This follows from the memoryless property of the exponential and the independent increments of the Poisson process.

### 6.4 Poisson Superposition and Thinning

If $X_1 \sim \text{Pois}(\mu_1)$ and $X_2 \sim \text{Pois}(\mu_2)$ are independent:

$$X_1 + X_2 \sim \text{Pois}(\mu_1 + \mu_2).$$

Conversely, in a Poisson process with rate $\lambda$ where each arrival is independently classified as type 1 with probability $p$, the type 1 arrivals form a Poisson process with rate $\lambda p$.

---

## Pattern Recognition Table

| Signal | Technique |
| :--- | :--- |
| "Upper/lower bound", "at least/most" with limited info | Markov or Chebyshev |
| "E[W]" counting pairs, matches, or occurrences | Indicator decomposition + linearity |
| "Var(X)" with indicator structure | $E[X^2]$ via $\sum E[I_i^2] + \sum_{i\neq j} E[I_iI_j]$ |
| "With replacement" + count | Binomial |
| "Without replacement" + count | Hypergeometric |
| Sequential random experiment (urn $\to$ draw) | Law of total probability |
| "First to achieve" alternating game | Geometric series |
| Poisson process, arrival time of $r$th event | Gamma-Poisson duality |
| Min of independent lifetimes | Multiply survival functions |
| $g(x)$ with factorial-like denominator, $X \sim \text{Pois}$ | LOTUS $\to$ combine denominators $\to$ Poisson tail |
| $n$ large, $p$ moderate | Normal approximation + continuity correction |
| $n$ large, $p$ small, $np$ moderate | Poisson approximation |

---

## References

[1] J. Pitman, *Probability*, corrected 6th printing. New York, NY: Springer, 1997.

[2] A. Lucas, STAT 134 Spring 2026 Lecture Notes 1--22, UC Berkeley.
