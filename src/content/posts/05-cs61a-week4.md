---
title: "[CS 61A] Week 4"
publishDate: 2025-09-20
description: "Recursion, Tree Recursion"
tags: ["Recursion", "Tree Recursion", "Python", "CS 61A: Structure and Interpretation of Computer Programs"]
draft: true
pin: 0
---

# [CS 61A] Week 4

Hi, I'm Ju Ho Kim and thank you very much for taking your time to visit my website!

In week 4, we covered "Recursion".

<br />

Let's get right into it.

---

## Recursive Functions

> "A function is called **recursive** if the body of that function calls itself, either directly or indirectly."

### example: The Sum of the Digits

```python
def sum_digits(n):
    """Return the sum of the digits of positive integer n."""
    if n < 10:
        return n
    else:
        all_but_last, last = n // 10, n % 10
        return sum_digits(all_but_last) + last

sum_digits(738)
```

```python
>>> sum_digits(9)
9
>>> sum_digits(18117)
18
>>> sum_digits(9437184)
36
```

![The Sum of the Digits (Environment Diagram)](./_images/05-cs61a-week4/02.jpg)

#### In-class Example 1: Play Twenty-One

- With a `while` loop:

```python
def play(strategy0, strategy1, goal = 21):
    """Play twenty-one and return the winner.

    >>> play (two_strat, two_strat)
    1
    """
    n = 0
    who = 0 # Player 0 goes first

    while n < goal:     # telling us when we want to keep going
        if who == 0:
            n = n + strategy0(n)
            who = 1
        elif who == 1:
            n = n + strategy1(n)
            who = 0
    return who
```

- As a recursive Function **without** a `while` loop:

```python
def play(strategy0, strategy1, goal = 21):
    """Play twenty-one and return the winner.

    >>> play (two_strat, two_strat)
    1
    """
    n = 0
    who = 0     # Player 0 goes first

    # while n < goal:
    def f(n, who):
        if n >= goal:   # Adding a base case, telling us when we want to stop
            return who
        if who == 0:
            n = n + strategy0(n)
            who = 1
        elif who == 1:
            n = n + strategy1(n)
            who = 0
        return f(n, who)    # already updated n and who from the `if` / `elif` statements above
    # return who
    return f(0, 0)  # Player 0 goes first
```

As we can see, the snippet below was used the same in both cases:

```python
        if who == 0:
            n = n + strategy0(n)
            who = 1
        elif who == 1:
            n = n + strategy1(n)
            who = 0
```

---

#### Order of Recursive calls


---
### 1. The Anatomy of Recursive Functions

- **Base case**: A conditional statement that defines the behavior of the function for the inputs that are simplest to process.

- **Recursive call**: The base cases are followed by one or more **recursive calls**.

#### example: Factorial Function

Using a `while` statement:

```python
def fact_iter(n):
    total, k = 1, 1
    while k <= n:
        total, k = total * k, k + 1
    return total

fact_iter(4)    # 24
```

Using a Recursive function:

```python
def fact(n):
    if n == 1:
        return 1
    else:
        return n * fact(n-1)

fact(4)
```

### 2. Mutual Recursion

> "When a recursive procedure is divided among two functions that call each other, the functions are said to be **mutually recursive**."

#### example: A Function that determines whether a number is even or odd:

```python
def is_even(n):
    if n == 0:
        return True
    else:
        return is_odd(n-1)

def is_odd(n):
    if n == 0:
        return False
    else:
        return is_even(n-1)

result = is_even(4)
```

![Environment Diagram (Mutual Recursion)](./_images/05-cs61a-week4/03.jpg)

### 3. Printing in Recursive Functions

```python
def cascade(n):
    """Print a cascade of prefixes of n."""
    if n < 10:
        print(n)
    else:
        print(n)
        cascade(n // 10)
        print(n)
```

is equivalent to (doesn't really matter tho):

```python
def cascade(n):
    """Print a cascade of prefixes of n."""
    print(n)
    if n >= 10:
        cascade(n // 10)
        print(n)
```

```python
cascade(2013)
```

![`cascade` that prints all prefixes of a number from largest to smallest to largest](./_images/05-cs61a-week4/04.png)

### 4. Tree Recursion

**Tree Recursion** occurs when a function calls itself more than once.

To put it differently,

> A function with multiple recursive calls is said to be **tree recursive**

#### example: Fibonacci Sequence

```
fib(n): 0, 1, 1, 2, 3, 5, 8, 13, 21, ...
     n: 0, 1, 2, 3, 4, 5, 6,  7,  8, ...
```

```
fib(9): fib(8) + fib(7)
fib(n): fib(n-1) + fib(n-2)
```

```python
def fib(n):
    if n == 1:
        return 0
    if n == 2:
        return 1
    else:
        return fib(n-2) + fib(n-1)

result = fib(6)
```

#### example: Partitions

`count_partitions(n, m)` calculates the number of ways a number `n` can be expressed as a sum of parts no larger than `m`.

For example, ```count_partitions(6, 4)``` (the number of partitions of `6` using parts up to `4`) is 9.

```
1. 6 = 2 + 4
2. 6 = 1 + 1 + 4
3. 6 = 3 + 3
4. 6 = 1 + 2 + 3
5. 6 = 1 + 1 + 1 + 3
6. 6 = 2 + 2 + 2
7. 6 = 1 + 1 + 2 + 2
8. 6 = 1 + 1 + 1 + 1 + 2
9. 6 = 1 + 1 + 1 + 1 + 1 + 1
```

```python
def count_partitions(n, m):
    """Count the ways to partition n using parts up to m."""
    if n == 0:
        return 1
    elif n < 0:
        return 0
    elif m == 0:
        return 0
    else:
        return count_partitions(n - m, m) + count_partitions(n, m - 1)
```

```python
>>> count_partitions(6, 4)
9
>>> count_partitions(5, 5)
7
>>> count_partitions(10, 10)
42
>>> count_partitions(15, 15)
176
>>> count_partitions(20, 20)
627
```

### 5. Iteration Is Just a Special Case of Recursion

Any iterative process that uses a `while` statement can be converted into a recursive function.

I think it's also one of the developers' ability to select the better approach that best aligns with the problem's demands.

### 6. Mind Map of Recursion

![A Mind Map of Recursive Functions, generated by NotebookLM](./_images/05-cs61a-week4/01-Recursion-MindMap.png)

---

## Assignments

<br />

### [Lab 03: Recursion, Python Lists](https://cs61a.org/lab/lab03/)

#### Q1: WWPD: 

<br />

### [HW 03: Recursion, Tree Recursioin](https://cs61a.org/hw/hw03/)

#### Q1: Num Eights

---
## References

[1] DeNero, J., Klein, D., & Abbeel, P. (2025). "Recursive Functions." In *Composing Programs*. Retrieved from https://www.composingprograms.com/pages/17-recursive-functions.html

[2] NotebookLM, used for generating Mind Map image