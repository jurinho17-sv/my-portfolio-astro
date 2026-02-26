---
title: "Random Variables, Expectation, Variance, Normal Approximation, Discrete Distributions, Poisson, Symmetry"
publishDate: 2026-02-24
description: "Probability (2)"
tags: ["Random Variables", "Expectation", "Variance", "Normal Approximation", "Geometric", "Poisson", "Hypergeometric", "Symmetry"]
draft: false
pin: 0
---

# Random Variables, Expectation, Variance, Normal Approximation, Discrete Distributions, Poisson, Symmetry

<br>

## Distribution Reference (Chapter 3 Scope)

| Name | Range | $P(X = k)$ | Mean | Variance |
| :---: | :---: | :---: | :---: | :---: |
| Bernoulli$(p)$ | $\{0, 1\}$ | $P(1) = p;\; P(0) = 1 - p$ | $p$ | $p(1 - p)$ |
| Binomial$(n, p)$ | $\{0, 1, \ldots, n\}$ | $\binom{n}{k} p^k (1-p)^{n-k}$ | $np$ | $np(1-p)$ |
| Hypergeometric$(n, N, G)$ | $\{0, \ldots, n\}$ | $\binom{G}{k}\binom{N-G}{n-k} / \binom{N}{n}$ | $nG/N$ | $n(G/N)(1 - G/N)(N-n)/(N-1)$ |
| Geometric$(p)$ | $\{1, 2, 3, \ldots\}$ | $(1-p)^{k-1}p$ | $1/p$ | $(1-p)/p^2$ |
| Geometric$(p)$ | $\{0, 1, 2, \ldots\}$ | $(1-p)^{k}p$ | $(1-p)/p$ | $(1-p)/p^2$ |
| Neg. Binomial$(r, p)$ (failures $F_r$) | $\{0, 1, 2, \ldots\}$ | $\binom{k+r-1}{r-1}p^r(1-p)^k$ | $r(1-p)/p$ | $r(1-p)/p^2$ |
| Poisson$(\mu)$ | $\{0, 1, 2, \ldots\}$ | $e^{-\mu}\mu^k / k!$ | $\mu$ | $\mu$ |
| Uniform on $\{a, \ldots, b\}$ | $\{a, a+1, \ldots, b\}$ | $1/(b - a + 1)$ | $(a+b)/2$ | $[(b-a+1)^2 - 1]/12$ |

> The Geometric distribution has two conventions. Pitman primarily uses $\{1, 2, \ldots\}$ (waiting time to first success). The $\{0, 1, 2, \ldots\}$ version counts failures before first success. Always check the problem statement.

> The Negative Binomial$(r, p)$ table above counts failures $F_r$ before the $r$th success. The waiting time $T_r = F_r + r$ lives on $\{r, r+1, \ldots\}$ with $E(T_r) = r/p$ and $\text{SD}(T_r) = \sqrt{r(1-p)}/p$.

> **Convention used throughout these notes:** $q = 1 - p$ wherever $p$ is a success probability.

---

## Section 3.1: Introduction to Random Variables

*Core idea: a random variable is a numerical summary of a random outcome, and its distribution tells you the probability of each possible value.*

### 1. Random Variable and Its Distribution

A random variable $X$ is denoted by a capital letter. A lowercase letter $x$ is a dummy variable representing a specific possible value.

**Range:** the set of all possible values of $X$. Example: the number of heads in 4 coin tosses has range $\{0, 1, 2, 3, 4\}$.

**Distribution** of $X$ is the collection of probabilities

$$
P(X = x), \quad x \in \text{range of } X,
$$

satisfying two conditions:

$$
P(X = x) \geq 0 \quad \text{(nonnegativity)}, \qquad \sum_{x} P(X = x) = 1 \quad \text{(sums to 1)}.
$$

For any subset $B$ of the range:

$$
P(X \in B) = \sum_{x \in B} P(X = x).
$$

This follows because the events $(X = x)$ for distinct $x$ are mutually exclusive and exhaustive.

### 2. Functions of a Random Variable

If $X = g(W)$, then the distribution of $X$ is derived from $W$:

$$
P(X = x) = P(g(W) = x) = \sum_{w:\, g(w) = x} P(W = w).
$$

The function $g$ may send multiple values of $w$ to the same $x$, so all such probabilities must be summed.

**Transforming events.** Convert the event about $g(X)$ back to a condition on $X$:

$$
P(2X \leq 5) = P(X \leq 5/2), \qquad P(X^2 \leq 5) = P(-\sqrt{5} \leq X \leq \sqrt{5}).
$$

Watch for: sign flips with negative multipliers, splitting into two branches when removing squares or absolute values.

### 3. Joint Distribution

For two random variables $X, Y$ defined on the same setting:

$$
P(x, y) = P(X = x,\, Y = y), \qquad P(x, y) \geq 0, \qquad \sum_{\text{all } (x,y)} P(x,y) = 1.
$$

**Marginal distributions** are obtained by summing out the other variable:

$$
P(X = x) = \sum_{y} P(x,y), \qquad P(Y = y) = \sum_{x} P(x,y).
$$

**Event probabilities from joint:**

$$
P(X < Y) = \sum_{(x,y):\, x < y} P(x,y), \qquad P(X + Y = z) = \sum_{x} P(x,\, z - x).
$$

> You cannot determine the distribution of $X + Y$ from the marginal distributions alone. The joint distribution is required. (Pitman Example 3 shows that the same marginals can produce different distributions of $X + Y$ under different dependence structures.)

### 4. Same Distribution vs. Equality

**Same distribution:** $P(X = v) = P(Y = v)$ for all $v$ in the common range.

**Equality:** $P(X = Y) = 1$.

Equality implies same distribution, but the converse is false. Classic example: sampling $\{1, 2, 3\}$ without replacement, the first draw $X$ and second draw $Y$ have the same uniform distribution, but $P(X = Y) = 0$.

**Change of variable principle:** if $X$ and $Y$ have the same distribution, then $g(X)$ and $g(Y)$ have the same distribution for any function $g$.

### 5. Conditional Distribution

Given event $A$ with $P(A) > 0$:

$$
P(Y = y \mid A) = \frac{P(Y = y \text{ and } A)}{P(A)}.
$$

Given $X = x$:

$$
P(Y = y \mid X = x) = \frac{P(X = x,\, Y = y)}{P(X = x)}.
$$

This is the column of the joint table at $X = x$, renormalized by the column sum.

**Multiplication rule:**

$$
P(X = x,\, Y = y) = P(X = x) \cdot P(Y = y \mid X = x).
$$

### 6. Independence

$X$ and $Y$ are independent iff

$$
P(X = x,\, Y = y) = P(X = x) \cdot P(Y = y) \quad \text{for all } x, y.
$$

Equivalent: the conditional distribution of $Y$ given $X = x$ does not depend on $x$ (and vice versa).

To check from a joint table: verify the product rule for every cell. One failure means dependent.

**$n$ variables:** $X_1, \ldots, X_n$ are independent iff

$$
P(X_1 = x_1, \ldots, X_n = x_n) = \prod_{i=1}^{n} P(X_i = x_i) \quad \text{for all } (x_1, \ldots, x_n).
$$

Three consequences of independence:

1. Functions of independent variables are independent: if $X_j$ are independent, so are $f_j(X_j)$.
2. Disjoint blocks are independent: if $X_1, \ldots, X_6$ are independent, then $(X_1, X_2)$ and $(X_3, X_4, X_5)$ are independent.
3. Combine 1 and 2: functions of disjoint blocks are independent.

### 7. Multinomial Distribution

Generalization of the binomial. With $m$ categories, probability $p_i$ for category $i$ ($\sum p_i = 1$), and $n$ independent trials:

$$
P(N_1 = n_1, \ldots, N_m = n_m) = \frac{n!}{n_1! \cdots n_m!}\, p_1^{n_1} \cdots p_m^{n_m}, \quad \sum n_i = n.
$$

The factor $p_1^{n_1} \cdots p_m^{n_m}$ is the probability of one specific ordering; $n!/(n_1! \cdots n_m!)$ counts the number of such orderings.

> Since $N_1 + \cdots + N_m = n$ is a constraint, the $N_i$ are not independent.

### 8. Symmetry of Distributions

$X$ is symmetric about 0 iff $P(X = -x) = P(X = x)$ for all $x$, equivalently $-X$ has the same distribution as $X$. Consequence: $P(X \geq a) = P(X \leq -a)$.

$X$ is symmetric about $b$ iff $X - b$ is symmetric about 0.

**Sums:** if $X_1, \ldots, X_n$ are independent and each $X_i$ is symmetric about $b_i$, then $S_n = \sum X_i$ is symmetric about $\sum b_i$.

**Parity trick:** if $S_n$ takes integer values and is symmetric about a half integer (e.g., $454.5$), then $P(S_n \leq 454) = P(S_n \geq 455) = 1/2$. This works because no probability mass sits on the center.

---

## Section 3.2: Expectation

*Core idea: the expected value is a probability weighted average, and the linearity of expectation is the single most powerful computational tool in this course.*

### 1. Definition

$$
E(X) = \sum_{x} x \cdot P(X = x).
$$

Interpretation: the balance point (center of gravity) of the distribution histogram.

Key special cases:

$$
E(I_A) = P(A) \quad \text{(indicator of event } A\text{)}, \qquad E(c) = c \quad \text{(constant)}.
$$

### 2. Long Run Average

If $X$ represents a repeated measurement, then $E(X)$ approximates the average over many repetitions. (Made rigorous by the Law of Large Numbers in Section 3.3.)

### 3. Addition Rule (Linearity)

For any random variables $X, Y$ defined on the same setting:

$$
E(X + Y) = E(X) + E(Y).
$$

This holds regardless of dependence. More generally:

$$
E(a_1 X_1 + \cdots + a_n X_n + b) = a_1 E(X_1) + \cdots + a_n E(X_n) + b.
$$

### 4. Method of Indicators

If $X$ counts how many of the events $A_1, \ldots, A_n$ occur, write $X = I_1 + \cdots + I_n$ where $I_j = \mathbf{1}(A_j)$. Then:

$$
E(X) = P(A_1) + P(A_2) + \cdots + P(A_n).
$$

No information about dependence among the $A_j$ is needed.

**Binomial mean:** $S_n \sim \text{Binomial}(n, p)$, write $S_n = I_1 + \cdots + I_n$, each $E(I_j) = p$:

$$
E(S_n) = np.
$$

**Complement indicator pattern.** Sometimes $I_j = 1$ means "at least one item from group $j$ is selected." It is easier to compute $P(I_j = 1) = 1 - P(\text{none from group } j)$. Then:

$$
E(X) = \sum_{j=1}^{n} \bigl[1 - P(\text{none from group } j \text{ selected})\bigr].
$$

> This pattern appeared on Practice Quiz 2 Q3: $n$ families with 3 kids, $k$ kids selected from $3n$, $X$ = number of families with at least one kid selected. Here $P(\text{none from family } j) = \binom{3n - 3}{k} / \binom{3n}{k}$, so $E(X) = n\bigl[1 - \binom{3n-3}{k}/\binom{3n}{k}\bigr]$.

### 5. Tail Sum Formula

If $X$ takes values in $\{0, 1, \ldots, n\}$:

$$
E(X) = \sum_{j=1}^{n} P(X \geq j).
$$

This is a special case of the method of indicators with $A_j = (X \geq j)$.

Useful when $P(X \geq j)$ is simpler than $P(X = k)$. Example: $E(\min \text{ of 4 dice}) = \sum_{j=1}^{6} [(7-j)/6]^4$.

### 6. Expectation of a Function

$$
E[g(X)] = \sum_{x} g(x) \cdot P(X = x).
$$

> **Trap:** In general, $E[g(X)] \neq g(E(X))$. This equality holds only when $g$ is linear (affine). The most common mistake: $E(X^2) \neq [E(X)]^2$.

**$k$th moment:**

$$
E(X^k) = \sum_{x} x^k \, P(X = x).
$$

**Two variable version:**

$$
E[g(X, Y)] = \sum_{(x,y)} g(x,y) \, P(X = x, Y = y).
$$

### 7. Multiplication Rule for Expectation

If $X$ and $Y$ are **independent**:

$$
E(XY) = E(X) \cdot E(Y).
$$

> This requires independence. Contrast with the addition rule which requires nothing.

Counterexample: if $X = Y$, then $E(XY) = E(X^2) \neq [E(X)]^2 = E(X)E(Y)$ (unless $X$ is constant).

### 8. Variance of a Product of Independent Variables

If $X$ and $Y$ are **independent**:

$$
\text{Var}(XY) = \text{Var}(X)\,\text{Var}(Y) + \text{Var}(X)\,[E(Y)]^2 + [E(X)]^2\,\text{Var}(Y).
$$

Equivalently:

$$
\text{Var}(XY) = E(X^2)\,E(Y^2) - [E(X)]^2\,[E(Y)]^2.
$$

**Derivation.** By independence, $E[(XY)^2] = E(X^2)\,E(Y^2)$ and $[E(XY)]^2 = [E(X)]^2[E(Y)]^2$. Then $\text{Var}(XY) = E(X^2)E(Y^2) - [E(X)]^2[E(Y)]^2$. Expanding $E(X^2) = \text{Var}(X) + [E(X)]^2$ and similarly for $Y$ gives the first form.

> This formula appeared on Practice Quiz 2 Q2. With $\text{Var}(X) = 3$, $E(X) = 1$, $\text{Var}(Y) = 2$, $E(Y) = 0$: $\text{Var}(XY) = (3)(2) + (3)(0) + (1)(2) = 8$.

### 9. Boole's and Markov's Inequalities

**Boole's inequality:** if $X$ counts how many of $A_1, \ldots, A_n$ occur:

$$
P(X \geq 1) = P\!\left(\bigcup_j A_j\right) \leq \sum_j P(A_j) = E(X).
$$

**Markov's inequality:** for $X \geq 0$ and $a > 0$:

$$
P(X \geq a) \leq \frac{E(X)}{a}.
$$

The condition $X \geq 0$ is essential.

### 10. Properties of Expectation (Summary Box, p.181)

| Property | Formula | Condition |
| :--- | :--- | :--- |
| Definition | $E(X) = \sum_x x\,P(X=x)$ | |
| Constants | $E(c) = c$ | |
| Indicators | $E(I_A) = P(A)$ | |
| Functions | $E[g(X)] = \sum_x g(x)P(X=x)$ | $\neq g(E(X))$ in general |
| Constant factors | $E(cX) = cE(X)$ | |
| Addition | $E(X+Y) = E(X) + E(Y)$ | Always (dependent or not) |
| Multiplication | $E(XY) = E(X)E(Y)$ | Independent only |

---

## Section 3.3: Standard Deviation and Normal Approximation

*Core idea: variance measures spread around the mean, and the square root law governs how sums and averages of independent variables behave.*

### 1. Variance and Standard Deviation

$$
\text{Var}(X) = E[(X - \mu)^2], \qquad \text{SD}(X) = \sqrt{\text{Var}(X)}, \qquad \mu = E(X).
$$

$\text{SD}(X)$ measures the typical size of the deviation $|X - \mu|$.

$\text{Var}(X) \geq 0$ always, with equality iff $X$ is constant (i.e., $P(X = \mu) = 1$).

### 2. Computational Formula

$$
\text{Var}(X) = E(X^2) - [E(X)]^2.
$$

"Mean of the square minus square of the mean." This always gives:

$$
E(X^2) \geq [E(X)]^2,
$$

with equality iff $X$ is constant.

**Indicator:** $I_A^2 = I_A$, so $E(I_A^2) = p$, thus $\text{Var}(I_A) = p - p^2 = p(1-p)$, $\text{SD}(I_A) = \sqrt{p(1-p)}$.

**Fair die:** $E(X) = 3.5$, $E(X^2) = 91/6$, $\text{Var}(X) = 35/12$, $\text{SD}(X) \approx 1.71$.

### 3. Scaling and Shifting

$$
E(aX + b) = aE(X) + b, \qquad \text{SD}(aX + b) = |a| \cdot \text{SD}(X).
$$

Adding a constant shifts the mean but does not change the SD. Multiplying by $a$ scales the SD by $|a|$.

### 4. Standardization

For $\mu = E(X)$ and $\sigma = \text{SD}(X) > 0$:

$$
X^* = \frac{X - \mu}{\sigma}, \qquad E(X^*) = 0, \qquad \text{SD}(X^*) = 1.
$$

$X^*$ measures how many standard deviations $X$ is from its mean.

### 5. Chebyshev's Inequality

For any random variable $X$ with $E(X) = \mu$ and $\text{SD}(X) = \sigma$:

$$
P\!\left(|X - \mu| \geq k\sigma\right) \leq \frac{1}{k^2}.
$$

Proof: apply Markov's inequality to $(X - \mu)^2$ with threshold $k^2\sigma^2$.

This bound is crude but universal (works for any distribution).

**One sided application template.** To bound $P(X \geq a)$ where $a > \mu$:

$$
P(X \geq a) \leq P(|X - \mu| \geq a - \mu) \leq \frac{\sigma^2}{(a - \mu)^2}.
$$

Set $k = (a - \mu)/\sigma$ and apply $1/k^2$.

> **Inverse problem template (Practice Quiz 2 Q1b).** Given target bound $1/k^2 = c$, solve $k = 1/\sqrt{c}$. Then $a - \mu = k\sigma$ gives $\mu = a - k\sigma$.

| Deviation | Chebyshev bound | Normal actual |
| :---: | :---: | :---: |
| $\geq 1\sigma$ | $\leq 1$ (trivial) | 0.3173 |
| $\geq 2\sigma$ | $\leq 1/4$ | 0.0455 |
| $\geq 3\sigma$ | $\leq 1/9$ | 0.0027 |
| $\geq 4\sigma$ | $\leq 1/16$ | 0.00006 |

### 6. Variance Addition Rule

If $X$ and $Y$ are **independent**:

$$
\text{Var}(X + Y) = \text{Var}(X) + \text{Var}(Y).
$$

For $n$ independent variables:

$$
\text{Var}(X_1 + \cdots + X_n) = \text{Var}(X_1) + \cdots + \text{Var}(X_n).
$$

> This requires independence. The cross term $2E[(X - E(X))(Y - E(Y))]$ vanishes under independence but not in general. If $X = Y$: $\text{Var}(2X) = 4\text{Var}(X) \neq 2\text{Var}(X)$.

### 7. Square Root Law

For i.i.d. $X_1, \ldots, X_n$ with $E(X_i) = \mu$ and $\text{SD}(X_i) = \sigma$, let $S_n = \sum X_i$ and $\bar{X}_n = S_n / n$:

$$
E(S_n) = n\mu, \qquad \text{SD}(S_n) = \sigma\sqrt{n},
$$

$$
E(\bar{X}_n) = \mu, \qquad \text{SD}(\bar{X}_n) = \frac{\sigma}{\sqrt{n}}.
$$

The sum's SD grows as $\sqrt{n}$ (not $n$) because positive and negative deviations partially cancel. The average's SD shrinks as $1/\sqrt{n}$.

**Binomial SD:** $S_n \sim \text{Binomial}(n, p)$, each indicator has $\text{SD} = \sqrt{pq}$, so $\text{SD}(S_n) = \sqrt{npq}$.

### 8. Law of Averages (Weak Law of Large Numbers)

For i.i.d. $X_1, X_2, \ldots$ with $E(X_i) = \mu$ and finite variance:

$$
P(|\bar{X}_n - \mu| < \epsilon) \to 1 \quad \text{as } n \to \infty, \quad \text{for every } \epsilon > 0.
$$

Proof via Chebyshev: $P(|\bar{X}_n - \mu| \geq \epsilon) \leq \sigma^2 / (n\epsilon^2) \to 0$.

### 9. Central Limit Theorem (Normal Approximation)

For i.i.d. $X_i$ with $E(X_i) = \mu$, $\text{SD}(X_i) = \sigma$, and $n$ large:

$$
P\!\left(a \leq \frac{S_n - n\mu}{\sigma\sqrt{n}} \leq b\right) \approx \Phi(b) - \Phi(a).
$$

Equivalently, $S_n$ is approximately $\text{Normal}(n\mu,\; n\sigma^2)$.

**Procedure:** (1) compute $\mu$ and $\sigma$ of one $X_i$, (2) get $E(S_n) = n\mu$ and $\text{SD}(S_n) = \sigma\sqrt{n}$, (3) standardize, (4) use $\Phi$ table.

**Continuity correction:** if $X_i$ takes consecutive integer values, replace $b$ with $b + 1/2$ and $a$ with $a - 1/2$ for better accuracy.

---

## Section 3.4: Discrete Distributions

*Core idea: everything from Sections 3.1 through 3.3 extends to infinite ranges by replacing finite sums with convergent series. The geometric distribution is the central new object.*

### 1. Discrete Distribution on Infinite Sets

A distribution on $\{0, 1, 2, \ldots\}$ is a sequence $p_0, p_1, p_2, \ldots$ with

$$
p_i \geq 0 \quad \text{for all } i, \qquad \sum_{i=0}^{\infty} p_i = 1.
$$

### 2. Infinite Sum Rule

If $A_1, A_2, \ldots$ are mutually exclusive with $A = \bigcup A_i$:

$$
P(A) = \sum_{i=1}^{\infty} P(A_i).
$$

All finite rules (conditional probability, independence, Bayes, expectation, variance) extend to infinite ranges by replacing finite sums with convergent series.

### 3. Geometric Distribution

**Definition.** Waiting time $T$ to first success in Bernoulli$(p)$ trials:

$$
P(T = k) = (1-p)^{k-1}\,p, \qquad k = 1, 2, 3, \ldots
$$

Sum to 1: $\sum_{k=1}^{\infty} q^{k-1}p = p/(1-q) = 1$.

**Tail probability:** $P(T > n) = (1-p)^n$.

**Moments:**

$$
E(T) = \frac{1}{p}, \qquad \text{Var}(T) = \frac{1-p}{p^2}, \qquad \text{SD}(T) = \frac{\sqrt{1-p}}{p}.
$$

**Derivation of $E(T)$ via shift and subtract.** Let $\Sigma_1 = \sum_{n=1}^{\infty} n\,q^{n-1} = 1 + 2q + 3q^2 + \cdots$. Then:

$$
q\,\Sigma_1 = q + 2q^2 + 3q^3 + \cdots
$$

$$
(1-q)\,\Sigma_1 = 1 + q + q^2 + \cdots = \frac{1}{1-q} = \frac{1}{p}
$$

$$
\Sigma_1 = \frac{1}{p^2}, \qquad E(T) = p \cdot \Sigma_1 = \frac{1}{p}.
$$

### 4. The Craps Principle

**Condition:** each round is independent with the same probabilities $a, b, d$ throughout.

Repeated game with outcomes: A wins (prob $a$), B wins (prob $b$), draw (prob $d = 1 - a - b$). The overall winner is determined by the first decisive game:

$$
P(\text{A wins overall}) = \frac{a}{a + b}.
$$

The total number of games $G \sim \text{Geometric}(1 - d)$, and $G$ is independent of who wins.

### 5. Negative Binomial Distribution

Waiting time to the $r$th success: $T_r$ on $\{r, r+1, \ldots\}$:

$$
P(T_r = t) = \binom{t-1}{r-1}\,p^r\,(1-p)^{t-r}.
$$

Key decomposition: $T_r = W_1 + W_2 + \cdots + W_r$ where $W_i$ are independent Geometric$(p)$ on $\{1, 2, \ldots\}$:

$$
E(T_r) = \frac{r}{p}, \qquad \text{SD}(T_r) = \frac{\sqrt{r(1-p)}}{p}.
$$

### 6. The Collector's Problem

Collecting all $n$ types, where each draw is uniform:

$$
E(\text{total draws}) = n\!\left(1 + \frac{1}{2} + \frac{1}{3} + \cdots + \frac{1}{n}\right) = n\,H_n.
$$

Decompose into geometric waiting times: after collecting $k$ types, the next new type requires Geometric$((n-k)/n)$ draws with mean $n/(n-k)$.

---

## Section 3.5: The Poisson Distribution

*Core idea: Poisson arises as the limit of Binomial when $n$ is large and $p$ is small with $np = \mu$ fixed. It also arises exactly from random scatter models.*

### 1. Definition

$$
P(N = k) = e^{-\mu}\,\frac{\mu^k}{k!}, \qquad k = 0, 1, 2, \ldots
$$

Parameter $\mu > 0$.

### 2. Mean and Variance

$$
E(N) = \mu, \qquad \text{Var}(N) = \mu, \qquad \text{SD}(N) = \sqrt{\mu}.
$$

**Mean derivation:**

$$
E(N) = \sum_{k=1}^{\infty} k \cdot e^{-\mu}\frac{\mu^k}{k!} = e^{-\mu}\,\mu \sum_{k=1}^{\infty} \frac{\mu^{k-1}}{(k-1)!} = e^{-\mu}\,\mu\,e^{\mu} = \mu.
$$

**Variance derivation via factorial moment:**

$$
E[N(N-1)] = \sum_{k=2}^{\infty} k(k-1)\,e^{-\mu}\frac{\mu^k}{k!} = e^{-\mu}\,\mu^2 \sum_{k=2}^{\infty} \frac{\mu^{k-2}}{(k-2)!} = \mu^2.
$$

$$
E(N^2) = E[N(N-1)] + E(N) = \mu^2 + \mu.
$$

$$
\text{Var}(N) = \mu^2 + \mu - \mu^2 = \mu.
$$

> Trap: $E[N(N-1)] = \mu^2$, but $E(N^2) = \mu^2 + \mu$. Do not confuse these.

### 3. Sum of Independent Poissons

If $N_1, \ldots, N_j$ are independent with $N_i \sim \text{Poisson}(\mu_i)$:

$$
N_1 + \cdots + N_j \sim \text{Poisson}(\mu_1 + \cdots + \mu_j).
$$

Independent Poisson variables sum to Poisson; the parameters add.

> Independence is required. Counts on overlapping regions of a Poisson scatter are not independent.

### 4. Poisson Scaling Template

When a Poisson process has rate $\lambda$ per unit of time (or space), the count over duration $t$ (or area $A$) is:

$$
N \sim \text{Poisson}(\lambda \cdot t) \quad \text{or} \quad N \sim \text{Poisson}(\lambda \cdot A).
$$

> Practice Quiz 2 Q5: 2 moths per 12 hour night. Rate $= 2$ per night. Over 3 nights: $\mu = 2 \times 3 = 6$. Then $P(N > 7) = 1 - \sum_{k=0}^{7} e^{-6}\,6^k/k!$.

### 5. "Approximately" vs. "Exactly" Poisson

Binomial approximation: write "approximately Poisson$(\mu)$." Poisson scatter/process model: write "has Poisson$(\mu)$ distribution." This wording distinction affects grading.

### 6. Poisson Random Scatter

**Two assumptions:** (1) No multiple hits at the same point. (2) For each partition of the unit square into $n$ equal subsquares, each subsquare is hit independently with the same probability.

**Theorem.** Under these assumptions, there exists an intensity $\lambda > 0$ such that:

(i) For any region $B$: $N(B) \sim \text{Poisson}(\lambda \cdot \text{area}(B))$.

(ii) For disjoint regions $B_1, \ldots, B_j$: $N(B_1), \ldots, N(B_j)$ are mutually independent.

### 7. Thinning

Start with Poisson scatter of intensity $\lambda$. Keep each point independently with probability $p$.

$$
\text{Kept points: Poisson scatter, intensity } \lambda p.
$$

$$
\text{Removed points: Poisson scatter, intensity } \lambda(1 - p).
$$

The kept and removed scatters are independent.

**Superposition (reverse of thinning):** two independent Poisson scatters with intensities $\alpha, \beta$ combine to give Poisson scatter with intensity $\alpha + \beta$.

### 8. Small $\mu$ Approximations

When $\mu$ is very small:

$$
P(N = 0) \approx 1 - \mu, \qquad P(N = 1) \approx \mu, \qquad P(N \geq 2) \approx 0.
$$

### 9. Normal Approximation for Poisson

For large $\mu$:

$$
\frac{N - \mu}{\sqrt{\mu}} \;\xrightarrow{d}\; \text{Standard Normal}.
$$

Convergence is slower than for the binomial because Poisson skewness $= 1/\sqrt{\mu}$ decays slowly.

---

## Section 3.6: Symmetry (Exchangeability)

*Core idea: exchangeability lets you replace "the $k$th draw" with "the first draw" in any calculation, massively simplifying problems involving sampling without replacement.*

### 1. Exchangeability

$(X, Y)$ has a **symmetric joint distribution** iff $P(x, y) = P(y, x)$ for all $(x, y)$. Equivalently, $(X, Y)$ and $(Y, X)$ have the same joint distribution. We say $X$ and $Y$ are **exchangeable**.

For $n$ variables: $X_1, \ldots, X_n$ are exchangeable iff

$$
P(x_1, \ldots, x_n) = P(x_{\pi(1)}, \ldots, x_{\pi(n)})
$$

for every permutation $\pi$.

Consequences: all $X_i$ share the same marginal distribution, and every subset of size $m$ has the same joint distribution.

> Exchangeable does NOT imply independent. Sampling without replacement is exchangeable but not independent.

### 2. Independent Trials Are Exchangeable

If $X_1, \ldots, X_n$ are i.i.d., then $P(x_1, \ldots, x_n) = \prod p(x_i)$, which is symmetric because multiplication is commutative.

### 3. Sampling Without Replacement Is Exchangeable

**Theorem.** Drawing $n$ items without replacement from $\{b_1, \ldots, b_N\}$ produces an exchangeable sequence $X_1, \ldots, X_n$.

In particular, any subset $X_{i_1}, \ldots, X_{i_m}$ has the same joint distribution as the first $m$ draws $X_1, \ldots, X_m$.

**Application pattern:** to compute $P(\text{event about the } k\text{th draw})$, replace it with the equivalent event about the 1st draw.

**Example (Pitman 3.6.1).** 52 cards, deal 5.

$P(\text{5th card is King}) = P(\text{1st card is King}) = 4/52$.

$P(\text{3rd and 5th are black}) = P(\text{1st and 2nd are black}) = (26/52)(25/51)$.

**Example (Pitman 3.6.2).** 100 balls (50 red, 50 black), draw 20.

$$
P(X_{10} = r \mid X_{18} = r,\, X_{19} = r) = P(X_3 = r \mid X_1 = r,\, X_2 = r) = \frac{48}{98}.
$$

> On exams, write "by symmetry of sampling without replacement" as a one line justification, then proceed with the simpler first/second draw calculation.

### 4. Hypergeometric Mean and Variance

Population $N$ with $G$ good, $B = N - G$ bad. Sample $n$ without replacement. $S_n$ = number of good. Let $p = G/N$, $q = 1 - p$.

**Mean via indicators + symmetry:**

$$
S_n = I_1 + \cdots + I_n, \qquad I_j = \mathbf{1}(\text{draw } j \text{ is good}).
$$

By exchangeability, each $I_j$ has Bernoulli$(G/N)$ distribution:

$$
E(S_n) = n \cdot \frac{G}{N} = np.
$$

This is the same as the binomial mean.

**Variance derivation.** Expand $E(S_n^2) = E[(\sum I_j)^2]$:

$$
E(S_n^2) = \sum_j E(I_j^2) + 2\sum_{j < k} E(I_j I_k).
$$

Since $I_j^2 = I_j$: $\sum_j E(I_j^2) = n \cdot G/N$.

By exchangeability, every pair $(I_j, I_k)$ has the same joint distribution as $(I_1, I_2)$:

$$
E(I_j I_k) = P(\text{1st good}) \cdot P(\text{2nd good} \mid \text{1st good}) = \frac{G}{N} \cdot \frac{G-1}{N-1}.
$$

There are $\binom{n}{2}$ such pairs. So:

$$
E(S_n^2) = n\frac{G}{N} + n(n-1)\frac{G}{N}\cdot\frac{G-1}{N-1}.
$$

After algebra: $\text{Var}(S_n) = E(S_n^2) - (np)^2$ simplifies to

$$
\text{Var}(S_n) = npq \cdot \frac{N - n}{N - 1}.
$$

$$
\text{SD}(S_n) = \sqrt{npq} \cdot \sqrt{\frac{N-n}{N-1}}.
$$

### 5. Finite Population Correction Factor

$$
\sqrt{\frac{N - n}{N - 1}}.
$$

This factor multiplies the binomial SD $\sqrt{npq}$ to give the hypergeometric SD.

Key properties:

| Condition | Factor value | Meaning |
| :--- | :--- | :--- |
| $N \gg n$ | $\approx 1$ | Nearly identical to binomial |
| $n = N$ | $= 0$ | No randomness (entire population sampled) |
| Always | $\leq 1$ | Without replacement has less variability |

> Common mistake: the denominator is $N - 1$, not $N$.

### 6. Normal Approximation for Hypergeometric

$$
S_n \approx \text{Normal}\!\left(np,\; npq \cdot \frac{N-n}{N-1}\right)
$$

when $\text{SD}(S_n)$ is sufficiently large. Same procedure as binomial normal approximation, but use the corrected SD.

---

## Appendix 2: Series Identities

All geometric series must be simplified to closed form. Leaving unsimplified series loses points.

**Geometric series** ($|R| < 1$):

$$
\sum_{k=0}^{\infty} R^k = \frac{1}{1 - R}, \qquad \sum_{k=0}^{n} R^k = \frac{1 - R^{n+1}}{1 - R}.
$$

**First derivative** (shift and subtract):

$$
\sum_{k=1}^{\infty} k\,R^{k-1} = \frac{1}{(1-R)^2}.
$$

**Second derivative:**

$$
\sum_{k=2}^{\infty} k(k-1)\,R^{k-2} = \frac{2}{(1-R)^3}.
$$

**Exponential series:**

$$
\sum_{k=0}^{\infty} \frac{\mu^k}{k!} = e^{\mu}.
$$

**Arithmetic series:**

$$
1 + 2 + \cdots + n = \frac{n(n+1)}{2}.
$$

**General properties of sums** (from Pitman Appendix 2):

$$
\sum_i c\,x_i = c \sum_i x_i, \qquad \sum_i (x_i + y_i) = \sum_i x_i + \sum_i y_i.
$$

If $x_i \leq y_i$ for every $i$, then $\sum_i x_i \leq \sum_i y_i$.

---

## Exam Templates

### Template 1: Chebyshev One Sided Bound

**Given:** $E(X) = \mu$, $\text{SD}(X) = \sigma$. **Find:** upper bound on $P(X \geq a)$ where $a > \mu$.

$$
P(X \geq a) \leq P(|X - \mu| \geq a - \mu) \leq \frac{\sigma^2}{(a - \mu)^2}.
$$

**Inverse:** given target bound $c$, find $\mu$ such that bound equals $c$:

$$
\frac{\sigma^2}{(a - \mu)^2} = c \implies a - \mu = \frac{\sigma}{\sqrt{c}} \implies \mu = a - \frac{\sigma}{\sqrt{c}}.
$$

### Template 2: Var(XY) for Independent Variables

$$
\text{Var}(XY) = \text{Var}(X)\text{Var}(Y) + \text{Var}(X)[E(Y)]^2 + [E(X)]^2\text{Var}(Y).
$$

If $E(Y) = 0$, this simplifies to $\text{Var}(XY) = \text{Var}(X)\text{Var}(Y) + [E(X)]^2\text{Var}(Y)$.

### Template 3: Indicator Complement Method

To find $E(\text{number of groups with at least one member selected})$:

$$
E(X) = n \cdot \bigl[1 - P(\text{no member from a single group is selected})\bigr].
$$

Use hypergeometric or combinatorial counting for the "none selected" probability.

### Template 4: Geometric Waiting Time

**Condition:** trials must be independent with the same success probability $p$ on each trial.

Repeated independent trials until a desired outcome with probability $p$:

$$
E(\text{number of trials}) = \frac{1}{p}.
$$

First find $p$ (often using counting), then apply.

### Template 5: Poisson Scaling

**Condition:** arrivals must be independent of one another and conditions must be uniform across the time/space interval (Poisson process assumption).

Rate $\lambda$ per unit $\times$ duration/area $t$ $=$ parameter $\mu = \lambda t$.

$$
P(N > c) = 1 - \sum_{k=0}^{c} e^{-\mu}\frac{\mu^k}{k!}.
$$

---

## Exam Trap Checklist

**Expectation traps:**

1. $E[g(X)] \neq g(E(X))$ unless $g$ is linear. Most common: $E(X^2) \neq [E(X)]^2$.
2. Addition rule $E(X + Y) = E(X) + E(Y)$ requires NO independence.
3. Multiplication rule $E(XY) = E(X)E(Y)$ requires independence.
4. Markov's inequality requires $X \geq 0$.

**Variance traps:**

5. $\text{Var}(X + Y) = \text{Var}(X) + \text{Var}(Y)$ requires independence. Do not use without checking.
6. $\text{SD}(aX + b) = |a|\,\text{SD}(X)$: the absolute value on $a$ matters; shifts do not affect SD.
7. $\text{Var}$ has squared units; $\text{SD}$ has original units.
8. Sum SD grows as $\sqrt{n}$; average SD shrinks as $1/\sqrt{n}$. Directions are opposite.

**Distribution traps:**

9. Geometric: check whether support starts at 1 (waiting time) or 0 (failure count). Mean is $1/p$ vs. $(1-p)/p$.
10. Negative binomial: $T_r \geq r$. If $t < r$, the probability is 0.
11. Poisson: "approximately Poisson" (binomial approximation) vs. "has Poisson distribution" (scatter model).
12. Poisson: $E[N(N-1)] = \mu^2$ but $E(N^2) = \mu^2 + \mu$.
13. Independent Poisson sum is Poisson (parameters add). Independence is required.

**Hypergeometric traps:**

14. Finite population correction: denominator is $N - 1$, not $N$.
15. Mean is the same as binomial ($np$); only the SD differs.
16. "By symmetry" is a valid one line justification for replacing draw $k$ with draw 1.

**Series traps:**

17. Always simplify geometric series to closed form. Leaving $\sum q^k$ unsimplified loses points.
18. Same distribution $\neq$ equality. Joint distribution is needed for $P(X + Y = z)$; marginals alone are insufficient.

---

## References

[1] J. Pitman, "Ch. 3: Random Variables," in *Probability*, corrected 6th printing. New York, NY: Springer, 1997, pp. 139--257.

[2] J. Pitman, "Distribution Summaries," in *Probability*, corrected 6th printing. New York, NY: Springer, 1997, pp. 475--487.

[3] J. Pitman, "Appendix 2: Sums," in *Probability*, corrected 6th printing. New York, NY: Springer, 1997, pp. 515--516.