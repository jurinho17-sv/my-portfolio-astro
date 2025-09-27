---
title: "Recursion, Tree Recursion"
publishDate: 2025-09-22
description: "[CS 61A] Week 4 - Study Notes"
tags: ["Recursion", "Tree Recursion", "Python", "CS 61A", "Structure and Interpretation of Computer Programs"]
draft: false
pin: 0
---

# Recursion, Tree Recursion

Hi, I'm Ju Ho Kim and thank you very much for taking your time to visit my website!

In Week4, we learned about **Recursion**.

<br />

Without further ado, let's get right into it.

---

## Recursive Functions

> "A function is called **recursive** if the body of that function calls itself, either directly or indirectly."

### 5 Steps to Solving a Recursive problem

1. What's the simplest possible input for the function. (**Base Case**)

2. Play around with examples and visualize.

3. Relate hard cases to simpler cases.

4. Generalize the pattern.

5. Write code by combining recursive pattern with the base case

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

<br />

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

Using a **Recursive function**:

```python
def fact(n):
    if n == 0:
        return 1
    else:
        return n * fact(n-1)

fact(4)
```

<br />

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

<br />

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

is equivalent to (doesn't really matter tho in this case):

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

<br />

### 4. Tree Recursion

**Tree Recursion** occurs when a function calls itself more than once in its body.

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
    if n == 0:
        return 0
    if n == 1:
        return 1
    else:
        return fib(n-2) + fib(n-1)

result = fib(6)
```

#### example: Partitions

Write a function `count_partitions(n, m)` that calculates the number of ways to partition the integer `n` using parts up to `m`, where `m >= 0`.

For example, `count_partitions(6, 4)` (the number of partitions of `6` using parts up to `4`) is 9.

```
6 = 2 + 4
6 = 1 + 1 + 4
6 = 3 + 3
6 = 1 + 2 + 3
6 = 1 + 1 + 1 + 3
6 = 2 + 2 + 2
6 = 1 + 1 + 2 + 2
6 = 1 + 1 + 1 + 1 + 2
6 = 1 + 1 + 1 + 1 + 1 + 1
```

Let's apply the five steps I mentioned at the beginning of this post.

1. What's the simplest possible input for the function. (**Base Case**)

`count_partitions(n, m)` -> `1` if `n = 0`

`count_partitions(n, m)` -> `0` if `m = 0`

2. Play around with examples and visualize.

![](./_images/05-cs61a-week4/05.png)

All `count_partitions(n, m - 1)` partitions are also in `count_partitions(n, m)`

![](./_images/05-cs61a-week4/06.png)

So,

$ \text{count\_partitions}(n, m-1) \subseteq \text{count\_partitions}(n, m) $

But, what about the remaining partitions?

![](./_images/05-cs61a-week4/07.png)

They all use *m* in the partitions!

![](./_images/05-cs61a-week4/08.png)

3. Relate hard cases to simpler cases.

![](./_images/05-cs61a-week4/09.png)

![](./_images/05-cs61a-week4/10.jpg)

4. Generalize the pattern.

`count_partitions(n, m)` = `count_partitions(n - m, m)` + `count_partitions(n, m - 1)`

5. Write code by combining recursive pattern with the base case

$$
\operatorname{count\_partitions}(n, m) =
\left\{
\begin{array}{c}
1 \quad \text{if } n = 0 \\[6pt]
0 \quad \text{if } m = 0 \\[6pt]
\operatorname{count\_partitions}(n - m, m) + \operatorname{count\_partitions}(n, m - 1)
\end{array}
\right.
$$

One of the recursive calls `count_partitions(n - m, m)` provides `n - m`.

What if *n* < *m* ?

To count for this, we have to include this corner case in one of our base cases.

$$
\operatorname{count\_partitions}(n, m) =
\left\{
\begin{array}{c}
1 \quad \text{if } n = 0 \\[6pt]
0 \quad \text{if } m = 0 \text{ or } n < 0 \\[6pt]
\operatorname{count\_partitions}(n - m, m) + \operatorname{count\_partitions}(n, m - 1)
\end{array}
\right.
$$

```python
def count_partitions(n, m):
    """Count the ways to partition n using parts up to m."""
    if n == 0:
        return 1
    elif m == 0 or n < 0:
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

<br />

### 5. Iteration Is Just a Special Case of Recursion

Any iterative process that uses a `while` statement can be converted into a recursive function.

#### example: Play Twenty-One

The following example demonstrates how the same logic can be implemented using both iteration and recursion:

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

- As a recursive Function, **without** a `while` loop:

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

As we can see from the above, the core game logic remains identical in both implementations:

```python
        if who == 0:
            n = n + strategy0(n)
            who = 1
        elif who == 1:
            n = n + strategy1(n)
            who = 0
```

I think it's a good habit to try our best to select the better approach that best aligns with the problem's demands each time.

<br />

### 6. A Mind Map of Recursion

![](./_images/05-cs61a-week4/01-Recursion-MindMap.png)

---

## Assignment

### HW 03: Recursion, Tree Recursioin

#### Q1: Num Eights

Write a recursive function `num_eights` that takes a positive integer `n` and returns how many times the digit 8 appears in `n`.

1. What's the simplest possible input for the function. (**Base Case**)

- If `n == 8`, return `1`.
- Else, return `0`.

2. Play around with examples and visualize.

- `num_eights(8)` -> `1`
- `num_eights(3)` -> `0`

3. Relate hard cases to simpler cases.

```
# pseudocode

num_eights(881) = num_eights(88) + (last digit is 8 ? 1 : 0)
                = num_eights(88) + 0
                = num_eights(8) + (last digit is 8 ? 1 : 0) + 0
                = (last digit is 8 ? 1 : 0) + 1 + 0
                = 1 + 1 + 0
                = 2
```

4. Generalize the pattern.

```python
num_eights(n) = num_eights(n // 10) + (1 if n % 10 == 8 else 0)
```

5. Write code by combining recursive pattern with the base case

```python
def num_eights(n):
    """Returns the number of times 8 appears as a digit of n.

    >>> num_eights(3)
    0
    >>> num_eights(8)
    1
    >>> num_eights(88888888)
    8
    >>> num_eights(2638)
    1
    >>> num_eights(86380)
    2
    >>> num_eights(12345)
    0
    >>> num_eights(8782089)
    3
    >>> from construct_check import check
    >>> # ban all assignment statements
    >>> check(SOURCE_FILE, 'num_eights',
    ...       ['Assign', 'AnnAssign', 'AugAssign', 'NamedExpr', 'For', 'While'])
    True
    """
    "*** YOUR CODE HERE ***"

    """Returns the number of 8's in the decimal representation of n."""
    if n < 10:  # base case
        return last_digit(n)
    else:       # recursive case
        return num_eights(n // 10) + last_digit(n)

def last_digit(n):
    """Return 1 if the last digit of n is 8, else 0."""
    if n % 10 == 8:
        return 1
    else:
        return 0
```

![](./_images/05-cs61a-week4/11-q1.png)

#### Q2: Digit Distance

For a given integer, the *digit distance* is the sum of the absolute differences between consecutive digits. For example:

- The digit distance of 61 is 5, as the absolute value of 6 - 1 is 5.
- The digit distance of 71253 is 12 (abs(7-1) + abs(1-2) + abs(2-5) + abs(5-3) = 6 + 1 + 3 + 2).
- The digit distance of 6 is 0 because there are no pairs of consecutive digits.

Write a function that determines the digit distance of a positive integer. You must use recursion or the tests will fail.

1. What's the simplest possible input for the function. (**Base Case**)

If `n` is only one digit (`n < 10`), there are no pairs, so distance is `0`

2. Play around with examples and visualize.

```python
>>> digit_distance(3)   # no pairs
0
>>> digit_distance(777) # 0 + 0
0
>>> digit_distance(314) # 2 + 3
5
```

`digit_distance(314)`

- last digit = 4, second last = 1 -> `abs(1 - 4) == 3`
- recurse on `31`

```python
digit_distance(314) = digit_distance(31) + abs(1 - 4)
                    = digit_distance(3) + abs(3 - 1) + abs(1 - 4)
                    = 0 + 2 + 3
                    = 5
```

3. Relate hard cases to simpler cases.

- Take the last two digits: `n % 10` and `(n // 10) % 10`
- Find their absolute difference: `abs(n % 10 - (n // 10) % 10)`
- Add it to the result of the smaller problem `digit_distance(n // 10)`.

4. Generalize the pattern.

`digit_distance(n) = abs(n % 10 - (n // 10) % 10) + digit_distance(n // 10)`

5. Write code by combining recursive pattern with the base case

```python
def digit_distance(n):
    """Determines the digit distance of n.

    >>> digit_distance(3)
    0
    >>> digit_distance(777) # 0 + 0
    0
    >>> digit_distance(314) # 2 + 3
    5
    >>> digit_distance(31415926535) # 2 + 3 + 3 + 4 + ... + 2
    32
    >>> digit_distance(3464660003)  # 1 + 2 + 2 + 2 + ... + 3
    16
    >>> from construct_check import check
    >>> # ban all loops
    >>> check(SOURCE_FILE, 'digit_distance',
    ...       ['For', 'While'])
    True
    """
    "*** YOUR CODE HERE ***"
    # Base Case
    if n < 10:      
        return 0

    # Recursive Case
    last = n % 10
    second_last = (n // 10) % 10
    return abs(last - second_last) + digit_distance(n // 10)
```

![](./_images/05-cs61a-week4/12-q2.png)

#### Q3: Interleaved Sum

Write a function `interleaved_sum`, which takes in a number `n` and two one-argument functions: `f_odd` and `f_even`. It returns the sum of applying `f_odd` to every odd number and `f_even` to every even number from `1` to `n` inclusive.

For example, executing `interleaved_sum(5, lambda x: x, lambda x: x * x)` returns `1 + 2*2 + 3 + 4*4 + 5 = 29`.

To clarify, the function `interleaved_sum` needs to return:

`odd_term(1)` + `even_term(2)` + `odd_term(3)` + `even_term(4)` + ... up to `n`

1. What's the simplest possible input for the function. (**Base Case**)

The simplest input is `n = 0`. An empty sum is `0`, so the base case is `interleaved_sum(0, f_odd, f_even)` returns `0`.

2. Play around with examples and visualize.

For `n = 3`, the sum is `f_odd(1) + f_even(2) + f_odd(3)`.

For `n = 4`, the sum is `f_odd(1) + f_even(2) + f_odd(3) + f_even(4)`.

3. Relate hard cases to simpler cases.

`interleaved_sum(n, f_odd, f_even)` = `interleaved_sum(n - 1, f_odd, f_even)` + `f_odd(n)` OR `f_even(n)`

Here, the challenge is that we cannot use conditional logic (according to the problem constraints) to check if `n` is odd or even. This is why we use **mutual recursion** with two helper functions.

4. Generalize the pattern.

We generalize the pattern using **mutual recursion** using two helper functions:

- `odd_helper(k)` calculates the sum starting from an odd number `k`. It adds `f_odd(k)` and calls `even_helper(k + 1)`.

- `even_helper(k)` calculates the sum starting from an even number `k`. It adds `f_even(k)` and calls `odd_helper(k + 1)`.

These two functions call each other, ensuring the correct function is applied to each number.

5. Write code by combining recursive pattern with the base case

$$
\operatorname{interleaved\_sum}(n, f\_odd, f\_even) =
\left\{
\begin{array}{c}
0 \quad \text{if } n = 0 \\[6pt]
odd\_helper(1)
\end{array}
\right.
$$

`odd_helper(k)` returns `f_odd(k) + even_helper(k+1)` if `k <= n` and `0` otherwise.

`even_helper(k)` returns `f_even(k) + odd_helper(k+1)` if `k <= n` and `0` otherwise.

```python
# Q3: Interleaved Sum

def interleaved_sum(n, f_odd, f_even):
    """Compute the sum f_odd(1) + f_even(2) + f_odd(3) + ..., up
    to n.

    >>> identity = lambda x: x
    >>> square = lambda x: x * x
    >>> triple = lambda x: x * 3
    >>> interleaved_sum(5, identity, square) # 1   + 2*2 + 3   + 4*4 + 5
    29
    >>> interleaved_sum(5, square, identity) # 1*1 + 2   + 3*3 + 4   + 5*5
    41
    >>> interleaved_sum(4, triple, square)   # 1*3 + 2*2 + 3*3 + 4*4
    32
    >>> interleaved_sum(4, square, triple)   # 1*1 + 2*3 + 3*3 + 4*3
    28
    >>> from construct_check import check
    >>> check(SOURCE_FILE, 'interleaved_sum', ['While', 'For', 'Mod']) # ban loops and %
    True
    >>> check(SOURCE_FILE, 'interleaved_sum', ['BitAnd', 'BitOr', 'BitXor']) # ban bitwise operators, don't worry about these if you don't know what they are
    True
    """
    "*** YOUR CODE HERE ***"
    def odd_helper(k):
        # Base Case
        if k > n:
            return 0
        else:
            # Recursive Call
            return f_odd(k) + even_helper(k + 1)

    def even_helper(k):
        # Base Case
        if k > n:
            return 0
        else:
            # Recursive Call
            return f_even(k) + odd_helper(k + 1)
        
    return odd_helper(1)    # start the recursion from 1, which is odd
```

![](./_images/05-cs61a-week4/13-q3.png)

#### Q4: Count Dollars

Write a recursive function `count_dollars` that takes a positive integer `total` and returns the number of ways to make change for `total` using 1, 5, 10, 20, 50, and 100 dollar bills.

1. What's the simplest possible input for the function. (**Base Case**)

The base cases for the helper function `constrained_count` are:

- if the `new_total == 0`, we have successfully made change for the original amount. This counts as `1` way.
- if the `new_total < 0`, we have overshot the amount. This is `0` ways.
- if the `largest_bill == None` (meaning we've run out of bills to try), there are `0` ways to make change.

2. Play around with examples and visualize.

`count_dollars(15)` can be thought of as:

- ways to make change **using a $10 bill**
- ways to make change **without using a $10 bill** (and moving to a smaller bill).

You might've noticed that it's almost the same with the **Partitions example** that we've seen already from the function `count_partitions(n, m)`.

3. Relate hard cases to simpler cases.

The number of ways to make change for a `new_total` using a specific `largest_bill` is the sum of:

- The number of ways to make change for `new_total - largest_bill` using the same `largest_bill`.
- The number of ways to make change for `new_total` using the `next_smaller_dollar` bill.

This creates a recursive tree. Yes this is a **Tree Recursion** one.

4. Generalize the pattern.

We generalize the pattern using **tree recursion** and `constrained_count`. The helper function `constrained_count` will take two arguments: the remaining `new_total` and the `largest_bill` to consider.

The main `count_dollars` function will make the initial call to the helper `constrained_count`, starting with the original `total` and the largest bill available, which is $100.

5. Write code by combining recursive pattern with the base case

$$
count\_dollars(total) = helper(total, 100)
$$

`constrained_count(new_total, largest_bill)` returns `constrained_count(new_total - largest_bill, largest_bill) + constrained_count(new_total, next_smaller_dollar(largest_bill))` if the base cases are not met.

```python
def next_smaller_dollar(bill):
    """Returns the next smaller bill in order."""
    if bill == 100:
        return 50
    if bill == 50:
        return 20
    if bill == 20:
        return 10
    elif bill == 10:
        return 5
    elif bill == 5:
        return 1

def count_dollars(total):
    """Return the number of ways to make change.

    >>> count_dollars(15)  # 15 $1 bills, 10 $1 & 1 $5 bills, ... 1 $5 & 1 $10 bills
    6
    >>> count_dollars(10)  # 10 $1 bills, 5 $1 & 1 $5 bills, 2 $5 bills, 10 $1 bills
    4
    >>> count_dollars(20)  # 20 $1 bills, 15 $1 & $5 bills, ... 1 $20 bill
    10
    >>> count_dollars(45)  # How many ways to make change for 45 dollars?
    44
    >>> count_dollars(100) # How many ways to make change for 100 dollars?
    344
    >>> count_dollars(200) # How many ways to make change for 200 dollars?
    3274
    >>> from construct_check import check
    >>> # ban iteration
    >>> check(SOURCE_FILE, 'count_dollars', ['While', 'For'])
    True
    """
    "*** YOUR CODE HERE ***"
    bill = 100

    def constrained_count(new_total, largest_bill):
        if new_total == 0:          # Base Case: Successfully made change.
            return 1
        elif new_total < 0:         # Base Case: Overshot the total or ran out of bills.
            return 0
        elif largest_bill == None:  # Base Case: Overshot the total or ran out of bills.
            return 0
        else:                       # Recursive Call
            return constrained_count(new_total - largest_bill, largest_bill) + constrained_count(new_total, next_smaller_dollar(largest_bill))
    
    return constrained_count(total, bill)
```

![](./_images/05-cs61a-week4/14-q4.png)

## Key Takeaways

Know how to:

- solve problems by breaking them into smaller, self-similar subproblems.

- identify **base cases** to stop the recursive process.

- use **tree recursion** to explore multiple possibilities.

## Wrapping up

Okay, this is it for Week4!

It's 2:30AM now already.

I'm going to get some sleep 😴

Cuz a new week is coming!

Night night 🌙

<br />
<br />

Thank you.

![](./_images/05-cs61a-week4/15.png)

---

## References

[1] J. DeNero, D. Klein, P. Abbeel, "1.7 Recursive Functions," in *Composing Programs*. [Online]. Available: https://www.composingprograms.com/pages/17-recursive-functions.html. Accessed: Sep. 22, 2025. (Originally published 2016)

[2] Reducible. (2019, December 11). 5 Simple Steps for Solving Any Recursive Problem [Video]. YouTube. Retrieved from https://youtu.be/ngCos392W4w?si=-ZY1C9HO1b1iBtOt (Accessed September 21, 2025)