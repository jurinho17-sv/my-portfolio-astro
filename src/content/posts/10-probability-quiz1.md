---
title: "Conditional Probability, Bayes' Rule, Binomial, Poisson & Normal Approximations, Hypergeometric Sampling"
publishDate: 2026-02-10
description: "Probability (1)"
tags: ["Conditional Probability", "Bayes' Rule", "Binomial", "Poisson Approximation", "Normal Approximation", "Hypergeometric Sampling"]
draft: false
pin: 0
---

# Conditional Probability, Bayes' Rule, Binomial, Poisson & Normal Approximations, Hypergeometric Sampling

## Section 1.1: Equally Likely Outcomes

### 1. Outcome Space

The outcome space $\Omega$ is the set of all possible outcomes of an experiment.

$$
\Omega = \{1, 2, 3, 4, 5, 6\} \quad \text{(rolling a die)}
$$

An event $A$ is any subset of $\Omega$. Example: "rolling an even number"

$$
A = \{2, 4, 6\}.
$$

### 2. Equally Likely Probability Formula

When all outcomes in a finite $\Omega$ are equally likely:

$$
P(A) = \frac{|A|}{|\Omega|}.
$$

Key boundary values: $P(\Omega) = 1$, $P(\emptyset) = 0$.

Quick example: draw a ticket from a box of 100 tickets labeled $1, \ldots, 100$.
Event "number has one digit" is $A = \{1, \ldots, 9\}$, so $P(A) = 9/100$.

### 3. Counting with Pairs (Two Dice)

Rolling two dice: each outcome is an ordered pair $(i, j)$ where $i, j \in \{1, \ldots, 6\}$.

$$
|\Omega| = 6 \cdot 6 = 36.
$$

Example: "sum is 5"

$$
A = \{(1,4), (2,3), (3,2), (4,1)\} \implies P(A) = \frac{4}{36} = \frac{1}{9}.
$$

For a general $n$-sided die, $|\Omega| = n^2$.
Number of pairs where the second number exceeds the first (above the diagonal):

$$
|\text{above}| = 1 + 2 + \cdots + (n-1) = \frac{n(n-1)}{2}.
$$

So

$$
P(\text{second} > \text{first}) = \frac{\frac{n(n-1)}{2}}{n^2} = \frac{1}{2}\left(1 - \frac{1}{n}\right).
$$

### 4. Odds

Odds in favor of $A$:

$$
\text{Odds in favor of } A = \frac{P(A)}{1 - P(A)}.
$$

Odds against $A$ is the inverse.

Example: $P(\text{red at roulette}) = 18/38$, so odds against red are $20:18$ (or $10:9$).

### 5. Fair Odds Rule & House Percentage

Fair Odds Rule: in a fair bet, payoff odds = chance odds.

If you bet \$1 on event $A$ at payoff odds $r_{\text{pay}}$ to 1 against, total stake is $(r_{\text{pay}} + 1)$.
A fair price for your bet would be $P(A)(r_{\text{pay}} + 1)$.
House percentage:

$$
\text{House \%} = \left[1 - P(A)(r_{\text{pay}} + 1)\right] \cdot 100\%.
$$

Example (straight play at roulette): $P(A) = 1/38$, $r_{\text{pay}} = 35$.

$$
\text{House \%} = \left[1 - \frac{1}{38} \cdot 36\right] \cdot 100\% = \frac{2}{38} \cdot 100\% = 5.26\%.
$$

Interpretation: for every \$1 bet, the house keeps about 5.26 cents on average.

---

## Section 1.3: Distributions — Key Concepts

### 1. Events as Sets

An outcome space $\Omega$ is the set of all possible outcomes. Every event is a subset of $\Omega$.

| Event | Set notation |
| --- | --- |
| not $A$ | $A^c$ |
| $A$ or $B$ (or both) | $A \cup B$ |
| both $A$ and $B$ | $A \cap B$ (or $AB$) |
| $A, B$ mutually exclusive | $AB = \emptyset$ |

### 2. Partition

Event $B$ is partitioned into $B_1, \ldots, B_n$ if

$$
B = B_1 \cup \cdots \cup B_n, \qquad B_i \cap B_j = \emptyset \ \text{for } i \ne j.
$$

Every outcome in $B$ belongs to exactly one $B_i$.

### 3. Three Axioms of Probability

A distribution on $\Omega$ is a function $P$ satisfying:

$$
P(B) \ge 0,
$$

$$
\text{If } B_1, \ldots, B_n \text{ partition } B, \text{ then } P(B) = P(B_1) + \cdots + P(B_n),
$$

$$
P(\Omega) = 1.
$$

### 4. Derived Rules

**Complement Rule**

$$
P(A^c) = 1 - P(A).
$$

(Implies $P(\emptyset) = 0$ and $0 \le P(A) \le 1$.)

**Difference Rule.** If $A \subseteq B$, then

$$
P(B \cap A^c) = P(B) - P(A),
$$

since $A$ and $B \cap A^c$ partition $B$.

**Inclusion–Exclusion (2 events)**

$$
P(A \cup B) = P(A) + P(B) - P(AB).
$$

If $A, B$ mutually exclusive, then $P(AB) = 0$ and this reduces to $P(A \cup B) = P(A) + P(B)$.

**Inclusion–Exclusion (3 events)**

$$
P(A \cup B \cup C) = P(A) + P(B) + P(C) - P(AB) - P(AC) - P(BC) + P(ABC).
$$

Quick example: 10% rich, 5% famous, 3% both $\Rightarrow$
$P(\text{rich or famous}) = 10\% + 5\% - 3\% = 12\%$.

### 5. Named Distributions

**Bernoulli($p$):** distribution on $\{0, 1\}$ with $P(1) = p$, $P(0) = 1 - p$. (Indicator of event $A$ with $p = P(A)$.)

**Uniform on a finite set:** if $\Omega = \{1, 2, \ldots, n\}$ equally likely, then $P(i) = 1/n$ and

$$
P(B) = \frac{|B|}{n}.
$$

**Uniform($a, b$):** point picked at random from $(a, b)$; probability proportional to length:

$$
P((x, y)) = \frac{y - x}{b - a} \qquad (a < x < y < b).
$$

### 6. Independence (Preview)

Two events $A, B$ are independent if

$$
P(AB) = P(A)P(B).
$$

---

## Section 1.4: Conditional Probability and Independence

### 1. Conditional Probability

$$
P(A \mid B) = \frac{P(A \cap B)}{P(B)}, \qquad P(B) > 0.
$$

Equally likely outcomes version:

$$
P(A \mid B) = \frac{|A \cap B|}{|B|}.
$$

Quick example: 3 fair coin tosses. Let $A = \{\text{2+ heads}\}$, $H = \{\text{first toss is heads}\}$.
$H = \{hhh, hht, hth, htt\}$, $A \cap H = \{hhh, hht, hth\}$, so $P(A \mid H) = 3/4$.

### 2. Multiplication Rule

$$
P(A \cap B) = P(A \mid B) \, P(B) = P(B \mid A) \, P(A).
$$

### 3. Rule of Average Conditional Probabilities (Law of Total Probability)

If $B_1, \ldots, B_n$ partition $\Omega$, then

$$
P(A) = \sum_{i=1}^{n} P(A \mid B_i) \, P(B_i).
$$

Quick example: $P(\text{second card black})$ from a 52-card deck; condition on first card color:

$$
P(\text{2nd black}) = \frac{25}{51} \cdot \frac{1}{2} + \frac{26}{51} \cdot \frac{1}{2} = \frac{1}{2}.
$$

### 4. Independence

$A$ and $B$ are independent iff

$$
P(A \cap B) = P(A)P(B).
$$

Equivalent statements (when probabilities are positive):

- $P(A \mid B) = P(A)$
- $P(B \mid A) = P(B)$
- $P(A \mid B) = P(A \mid B^c)$

Key facts: if $A \perp B$, then also $A^c \perp B$, $A \perp B^c$, $A^c \perp B^c$.

**Mutual independence (3 events)**

For events $A, B, C$:

$$
\text{mutual independence} \iff
\begin{cases}
P(AB) = P(A)P(B), \quad P(AC) = P(A)P(C), \quad P(BC) = P(B)P(C), \\
P(ABC) = P(A)P(B)P(C).
\end{cases}
$$

**i.i.d. symmetry lemma**

If $X, Y$ are i.i.d. (independent and identically distributed), then

$$
P(X > Y) = P(Y > X) = \frac{1 - P(X = Y)}{2}.
$$

Series system (both must work; assume independence):

$$
P(W_1 \cap W_2) = P(W_1)P(W_2).
$$

Parallel system (at least one works; assume independence):

$$
P(W_1 \cup W_2) = 1 - P(F_1)P(F_2).
$$

---

## Section 1.5: Bayes' Rule

### What is Bayes' Rule?

Bayes' Rule reverses conditional probability: from $P(A \mid B_i)$ to $P(B_i \mid A)$.

### The Formula

For a partition $B_1, \ldots, B_n$:

$$
P(B_i \mid A) = \frac{P(A \mid B_i) \, P(B_i)}{\displaystyle\sum_{j=1}^{n} P(A \mid B_j) \, P(B_j)}.
$$

### Key Terminology

- **Prior:** $P(B_i)$
- **Likelihood:** $P(A \mid B_i)$
- **Posterior:** $P(B_i \mid A)$

### How to Derive It (3 steps)

1. Multiplication rule: $P(B_i \cap A) = P(A \mid B_i) \, P(B_i)$
2. Total probability: $P(A) = \sum_{i=1}^{n} P(A \mid B_i) \, P(B_i)$
3. Conditional probability: $P(B_i \mid A) = \dfrac{P(B_i \cap A)}{P(A)}$

### Bayes' Rule for Odds (shortcut)

For two hypotheses $B_1, B_2$:

$$
\text{posterior odds} = \text{prior odds} \times \text{likelihood ratio},
$$

$$
\frac{P(B_1 \mid A)}{P(B_2 \mid A)} = \frac{P(B_1)}{P(B_2)} \cdot \frac{P(A \mid B_1)}{P(A \mid B_2)}.
$$

### Quick Example

Prevalence $P(D) = 0.01$. Test: $P(+ \mid D) = 0.95$, $P(+ \mid D^c) = 0.02$.

$$
P(D \mid +) = \frac{(0.95)(0.01)}{(0.95)(0.01) + (0.02)(0.99)} = \frac{0.0095}{0.0293} = \frac{95}{293} \approx 32\%.
$$

### Diagnostic Testing Template

Let

$$
P(D) = \pi, \quad P(+ \mid D) = s, \quad P(+ \mid D^c) = f.
$$

Then

$$
P(D \mid +) = \frac{s\pi}{s\pi + f(1 - \pi)}.
$$

---

## Section 2.1: The Binomial Distribution

### What is this about?

Repeat the same experiment $n$ times independently. Each trial is success w.p. $p$, failure w.p. $q = 1 - p$.

### The Core Formula

$$
P(k \text{ successes in } n \text{ trials}) = \binom{n}{k} p^k q^{\,n-k},
$$

where

$$
\binom{n}{k} = \frac{n!}{k!(n-k)!} = \frac{n(n-1)\cdots(n-k+1)}{k(k-1)\cdots 1},
$$

and $k \in \{0, 1, \ldots, n\}$.

Quick example: exactly 2 sixes in 9 die rolls ($p = 1/6$, $q = 5/6$):

$$
\binom{9}{2}\left(\frac{1}{6}\right)^2\left(\frac{5}{6}\right)^7 = 36 \cdot \frac{5^7}{6^9} \approx 0.279.
$$

### Useful Properties

**Binomial expansion (sum to 1)**

$$
\sum_{k=0}^{n} \binom{n}{k} p^k q^{\,n-k} = (p + q)^n = 1.
$$

**Fair coin special case** ($p = q = 1/2$):

$$
P(k \text{ heads in } n \text{ tosses}) = \frac{\binom{n}{k}}{2^n}.
$$

**Consecutive Odds Ratio**

$$
R(k) = \frac{P(k)}{P(k-1)} = \frac{n - k + 1}{k} \cdot \frac{p}{q}.
$$

Start with $P(0) = q^n$, then $P(1) = P(0) \cdot R(1)$, etc.

**Mode**

$$
m = \lfloor np + p \rfloor = \lfloor (n+1)p \rfloor.
$$

Probabilities increase up to $m$, then decrease after. If $(n+1)p \in \mathbb{Z}$, there are two modes: $m$ and $m - 1$.

**Mean**

$$
\mu = np.
$$

**Best-of-$(2n-1)$ series**

If Team A wins each game independently with probability $p$, then

$$
P(\text{A wins best-of-}(2n-1)) = \sum_{k=n}^{2n-1} \binom{k-1}{n-1} p^{\,n}(1-p)^{k-n}.
$$

---

## Section 2.4: Poisson Approximation

### When to Use It

Normal approximation to binomial is poor when $n$ is large but $p$ is very small (or very close to 1).
Poisson approximation depends mainly on $\mu = np$.

### The Key Formula

$$
P(k \text{ successes}) \approx e^{-\mu} \frac{\mu^k}{k!}, \qquad k = 0, 1, 2, \ldots,
$$

where $\mu = np$. Conditions: $n$ large, $p$ small, $\mu = np$ moderate.

### Why It Works

$$
P(0) = (1 - p)^n \approx (e^{-p})^n = e^{-np} = e^{-\mu}.
$$

Consecutive odds ratio:

$$
R(k) = \frac{P(k)}{P(k-1)} = \frac{n - k + 1}{k} \cdot \frac{p}{1 - p} \approx \frac{\mu}{k}.
$$

Thus

$$
P(k) = P(0) \prod_{j=1}^{k} R(j) \approx e^{-\mu} \cdot \frac{\mu^k}{k!}.
$$

### The Poisson($\mu$) Distribution

$$
P_\mu(k) = e^{-\mu} \frac{\mu^k}{k!}, \qquad k = 0, 1, 2, \ldots
$$

and $\displaystyle\sum_{k=0}^{\infty} P_\mu(k) = 1$.

Quick example: 200 items, 1% defective. Find $P(\ge 2)$.
$\mu = np = 200(0.01) = 2$.

$$
P(\ge 2) = 1 - P(0) - P(1) = 1 - e^{-2}\frac{2^0}{0!} - e^{-2}\frac{2^1}{1!} = 1 - 3e^{-2} \approx 0.594.
$$

---

## Section 2.2: Normal Approximation

### Method

#### 1. The Normal Curve

Normal density with mean $\mu$ and standard deviation $\sigma$:

$$
y = \frac{1}{\sqrt{2\pi}\,\sigma} \exp\!\left(-\frac{1}{2}\left(\frac{x - \mu}{\sigma}\right)^2\right), \qquad -\infty < x < \infty.
$$

$\mu$ controls center; $\sigma$ controls spread; total area is 1.

#### 2. Standard Units and the Standard Normal

Convert $X \sim N(\mu, \sigma^2)$ to $Z \sim N(0,1)$ via

$$
z = \frac{x - \mu}{\sigma}.
$$

Standard normal density:

$$
\phi(z) = \frac{1}{\sqrt{2\pi}} e^{-z^2/2}.
$$

#### 3. The Standard Normal CDF $\Phi(z)$

$$
\Phi(z) = \int_{-\infty}^{z} \phi(y) \, dy = P(Z \le z).
$$

Symmetry:

$$
\Phi(-z) = 1 - \Phi(z).
$$

Interval probability (notation):

$$
\Phi(a, b) = \Phi(b) - \Phi(a).
$$

Symmetric interval:

$$
\Phi(-z, z) = 2\Phi(z) - 1.
$$

Three values to memorize:

| Interval | Probability |
| --- | --- |
| $\Phi(-1, 1)$ | $\approx 68\%$ |
| $\Phi(-2, 2)$ | $\approx 95\%$ |
| $\Phi(-3, 3)$ | $\approx 99.7\%$ |

#### 4. Normal Approximation to the Binomial

For $S_n \sim \text{Binomial}(n, p)$, when $\sqrt{npq}$ is large enough:

$$
\mu = np, \qquad \sigma = \sqrt{npq}, \qquad q = 1 - p.
$$

Continuity correction:

$$
P(a \le S_n \le b) \approx \Phi\!\left(\frac{b + \tfrac{1}{2} - \mu}{\sigma}\right) - \Phi\!\left(\frac{a - \tfrac{1}{2} - \mu}{\sigma}\right).
$$

Quick example: $P(S_{100} = 50)$ for fair tosses.
$\mu = 50$, $\sigma = 5$, $a = b = 50$.

$$
P(50) \approx \Phi\!\left(\frac{50.5 - 50}{5}\right) - \Phi\!\left(\frac{49.5 - 50}{5}\right) = \Phi(0.1) - \Phi(-0.1) = 2\Phi(0.1) - 1 \approx 0.0796.
$$

#### 5. Square Root Law & Confidence Intervals

Success count fluctuates around $np$ on scale $\sqrt{n}$; proportion fluctuates around $p$ on scale $1/\sqrt{n}$.

Conservative 99.99% CI for unknown $p$, given observed $\hat{p}$ from $n$ trials:

$$
\hat{p} \pm \frac{2}{\sqrt{n}}.
$$

> **Why 99.99%?** Worst-case SD of $\hat{p}$ is $\sigma_{\max} = \frac{1}{2\sqrt{n}}$ (at $p = 1/2$). So $\frac{2}{\sqrt{n}} = 4\sigma_{\max}$, and $\pm 4\sigma$ under normal approximation covers $\approx 99.99\%$.

To halve the CI width, you must quadruple $n$.

---

## Section 2.5: Random Sampling

### 1. Setup

Population size $N$ contains $G$ good and $B$ bad, with $G + B = N$.
Sample size $n = g + b$, where $g$ = # good drawn, $b$ = # bad drawn.

### 2. Sampling WITH Replacement

Draws independent; $p = G/N$. Number of good follows $\text{Binomial}(n, p)$:

$$
P(g \text{ good and } b \text{ bad}) = \binom{n}{g} \frac{G^g B^b}{N^n} = \binom{n}{g} p^g q^b, \quad q = \frac{B}{N}.
$$

### 3. Sampling WITHOUT Replacement

Draws dependent. Hypergeometric:

$$
P(g \text{ good and } b \text{ bad}) = \frac{\binom{G}{g}\binom{B}{b}}{\binom{N}{n}}.
$$

Equivalent ordered form:

$$
P(g \text{ good and } b \text{ bad}) = \binom{n}{g} \frac{(G)_g \, (B)_b}{(N)_n},
$$

where $(M)_k = M(M-1)\cdots(M-k+1)$ (falling factorial, $k$ factors).

### 4. Binomial Approximation to Hypergeometric

When $N, G, B$ are large relative to $n$, sampling without replacement $\approx$ sampling with replacement:

$$
\frac{(N)_n}{N^n} \to 1 \quad \text{as } N \to \infty,
$$

so hypergeometric probability $\approx$ binomial probability.

### 5. Confidence Intervals (brief)

For large $n$, the sample proportion $\hat{p}$ satisfies:

$$
P\!\left(p - \frac{1}{\sqrt{n}} < \hat{p} < p + \frac{1}{\sqrt{n}}\right) \ge 95\%.
$$

So $\hat{p} \pm \dfrac{1}{\sqrt{n}}$ is an approximate 95% CI for unknown population proportion $p$.