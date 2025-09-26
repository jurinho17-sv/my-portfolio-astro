---
title: "[CS 61A] Week 5"
publishDate: 2025-09-27
description: "Sequences, Containers, Data Abstraction"
tags: ["Sequences", "Containers", "Data Abstraction", "Python", "CS 61A: Structure and Interpretation of Computer Programs"]
draft: True
pin: 0
---

# [CS 61A] Week 5

Hi, I'm Ju Ho Kim and thank you very much for taking your time to visit my website!

In Week5, we learned about **Sequences**, **Containers**, and **Data Abstraction**.

This post is a kind of class notes about what I learned this week to make it useful for reviewing before the upcoming midterm2.

<br />

Let's go.

---

## 1. Lecture 11 - Sequences (Sep 22nd, 2025)

### List Indexing

```Python
x = [3, 1, [4, 1, [5, 2], 6, 5], 3, 5]
```

An expression to get the 2: `x[2][2][1]`

One thing that's useful with **list** is to get a single element out of the list.

### `for` loops

It's also useful to loop over all of the elements in a list.

### `range`

A range is a sequence of consecutive integers.

```Python
>>> list(range(-2, 2))  # List constructor
[-2, -1, 0, 1]
>>> list(range(4))      # Range with a 0 starting value
[0, 1, 2, 3]
```

The `range` just keeps track of what the starting and ending values are.

But the reason that we use `range` is that it's a convenient way to get a bunch of integers in a row and it's also a more efficient way of storing those than to actually create the list.

### List Comprehensions

```Python
>>> digits = [1, 8, 0, 8]

>>> [100 * d for d in digits]
[100, 800, 0, 800]

>>> [100 * d for d in digits if d < 5]
[100, 0]
```

#### Example 1: Evens

```Python
def evens(n: int) -> list[int]:
    """Return a list of the first n even numbers

    >>> evens(0)
    []
    >>> evens(3)
    [0, 2, 4]
    """
    return __________________
```

```Python
    return [2 * i for i in range(n)]
```

Or we can also come up with an another way

```Python
    return [i for i in range(n * 2) if i % 2 == 0]
```

<br />

#### Example 2: Two Lists

```Python
"""
Given these two related lists of the same length:
`xs = list(range(-10, 11))`,
`ys = [x*x - 2*x + 1 for x in xs]`

Write a list comprehension that evaluates to:
A list of all the x values (from xs) for which the corresponding y (from ys) is below 10.
"""
__________________
```

```Python
[xs[i] for i in range(len(xs)) if ys[i] < 10]
```

This confused me during the class. The thing is, we always need to remember what we're even trying to do.

We want a **list of all the x values** for which the corresponding y is below ten. That's why it begins with `[xs[i]]`.

`for i in range(len(xs))`: this iterates through all of the indices of `xs`.

And we want it if the thing in `ys` at index `i` is less than ten. So, it's followed by `if ys[i] < 10`.

```Python
>>> xs = list(range(-10, 11))
>>> ys = [x*x - 2*x + 1 for x in xs]
>>> [xs[i] for i in range(len(xs)) if ys[i] < 10]
[-2, -1, 0, 1, 2, 3, 4]
```

As shown above, these are the two ways that we're using to pull the elements out when we're writing list comprehensions:
1. we're going to walk through all of the elements in a list with something like `for x in xs` or
2. we're going to walk over all of the possible indices like `for i in range(len(xs))`

#### Example 3: Promoted

```Python
"""
Implement `promoted`, which takes a sequence `s` and a one-argument function `f`. It returns a
list with the same elements as `s`, but with all elements `e` for which `f(e)` is a true value
ordered first. Among those placed first and those placed after, the order stays the same.
"""

def promoted(s, f):
    """Return a list with the same elements as s, but with all
    elements e for which f(e) is a true value placed first.
    >>> promoted(range(10), odd) # odds in front
    [1, 3, 5, 7, 9, 0, 2, 4, 6, 8]
    """
    # Hint: two list comprehensions
    return ____________
```

```Python
    return [e for e in s if f(e)] + [e for e in s if not f(e)]
```

The boolean expression `not f(e)` is the same thing as saying only the things for which `f(e)` returned `False`.

### Slices & Recursion

> "Slices of lists are useful for making recursive calls"

For any list `s`, the expression `s[1:]` is called a **slice** from index 1 to the end. Just chopped off the 0th element of `s`, which is `s[0]`.

But, slicing  **does not** impact the original list.

```Python
>>> s = [2, 3, 6, 4]
>>> s[1:]
[3, 6, 4]
>>> s
[2, 3, 6, 4]    # slicing `s` doesn't affect `s`
```

So, `s = s[0] + s[1:]`.

#### Recursion Example: Reverse

```Python
# def reverse(s: list) -> list:
def reverse(s):
    """Return `s` in reverse order.

    >>> reverse([4, 6, 2])
    [2, 6, 4]
    """
    if not s:   # Note: The False value of a list is an empty list
        return []   # if the list `s` is empty, just return the empty list
    return _________
```

One way to do this is to reverse everything from the first element on and then take the thing that was formerly the first element and stick it at the end:

```Python
    return reverse(s[1:]) + [s[0]]
```

Another way of writing this is the opposite of the first one we just did. Take the last thing and stick it on the beginning:

```Python
    return [s[-1]] + reverse(s[:-1])
```

```Python
# might get confused
reverse(s[1:])  # reverse elements including s[1]
reverse(s[:-1]) # reverse elements excluding s[-1]
```

![Sequences and Iteration in Python](./_images/06-cs61a-week5/MindMap-sequences.png)

## 2. Lecture 12 - Containers (Sep 24th, 2025)

## 3. Lecture 13 - Data Abstraction (Sep 26th, 2025)

---

## Assignments

### Lab 03: Recursion, Python Lists

#### Q1: WWPD: Lists & Ranges

![](./_images/06-cs61a-week5/lab03-01.png)

#### Q2: Print If

Implement `print_if`, which takes a list `s` and a one-argument function `f`. It prints each element `x` of `s` for which `f(x)` returns a true value.

```Python
# --------------------------
# Q2: Print If
def print_if(s, f):
    """Print each element of s for which f returns a true value.

    >>> print_if([3, 4, 5, 6], lambda x: x > 4)
    5
    6
    >>> result = print_if([3, 4, 5, 6], lambda x: x % 2 == 0)
    4
    6
    >>> print(result)  # print_if should return None
    None
    """
    for x in s:
        "*** YOUR CODE HERE ***"
        if f(x):
            print(x)
```

![Terminal output](./_images/06-cs61a-week5/lab03-02.png)

#### Q3: Close

Implement `close`, which takes a list of integers `s` and a non-negative integer `k`. It returns how many of the elements of `s` are within `k` of their index. That is, the absolute value of the difference between the element and its index is less than or equal to `k`. (Remember that list is "zero-indexed"; the index of the first element is `0`.)

```Python
# --------------------------
# Q3: Close
def close(s: list[int], k: int) -> int:
    """Return how many elements of s are within k of their index.

    >>> t = [6, 2, 4, 3, 5]
    >>> close(t, 0)  # Only 3 is equal to its index
    1
    >>> close(t, 1)  # 2, 3, and 5 are within 1 of their index
    3
    >>> close(t, 2)  # 2, 3, 4, and 5 are all within 2 of their index
    4
    >>> close(list(range(10)), 0)
    10
    """
    assert k >= 0
    count = 0
    for i in range(len(s)):  # Use a range to loop over indices
        "*** YOUR CODE HERE ***"
        if abs(s[i] - i) <= k:
            count += 1
    return count
```

![Terminal output](./_images/06-cs61a-week5/lab03-03.png)

#### Q4: WWPD: List Comprehensions

![Terminal output](./_images/06-cs61a-week5/lab03-04.png)

#### Q5: Close List

Implement `close_list`, which takes a list of integers `s` and a non-negative integer `k`. It returns a list of the elements of `s` that are within `k` of their index. That is, the absolute value of the difference between the element and its index is less than or equal to `k`.

```Python
# Q5: Close List
def close_list(s: list[int], k: int) -> list[int]:
    """Return a list of the elements of s that are within k of their index.

    >>> t = [6, 2, 4, 3, 5]
    >>> close_list(t, 0)  # Only 3 is equal to its index
    [3]
    >>> close_list(t, 1)  # 2, 3, and 5 are within 1 of their index
    [2, 3, 5]
    >>> close_list(t, 2)  # 2, 3, 4, and 5 are all within 2 of their index
    [2, 4, 3, 5]
    """
    assert k >= 0
    return [s[i] for i in range(len(s)) if abs(s[i] - i) <= k]
```

![Terminal output](./_images/06-cs61a-week5/lab03-05.png)

#### Q6: Squares Only

Implement the function `squares`, which takes in a list of positive integers. It returns a list that contains the square roots of the elements of the original list that are perfect squares. Use a list comprehension. (To find if `x` is a perfect square, you can check if `sqrt(x)` equals `round(sqrt(x))`.)

```Python
# Q6: Squares Only
from math import sqrt

def squares(s: list[int]) -> list[int]:
    """Returns a new list containing square roots of the elements of the
    original list that are perfect squares.

    >>> seq = [8, 49, 8, 9, 2, 1, 100, 102]
    >>> squares(seq)
    [7, 3, 1, 10]
    >>> seq = [500, 30]
    >>> squares(seq)
    []
    """
    return [int(sqrt(n)) for n in s if sqrt(n) == round(sqrt(n))]
            # the reason why I use `int()` is to convert float `sqrt(n)` to integers
```

![Terminal output](./_images/06-cs61a-week5/lab03-06.png)

#### Q7: Double Eights

Write a recursive function that takes in a positive integer `n` and determines if its digits contain two adjacent `8`s (that is, two `8`s right next to each other).

```Python
# Q7: Double Eights
def double_eights(n: int) -> bool:
    """Returns whether or not n has two digits in row that
    are the number 8.

    >>> double_eights(1288)
    True
    >>> double_eights(880)
    True
    >>> double_eights(538835)
    True
    >>> double_eights(284682)
    False
    >>> double_eights(588138)
    True
    >>> double_eights(78)
    False
    >>> # ban iteration
    >>> from construct_check import check
    >>> check(SOURCE_FILE, 'double_eights', ['While', 'For'])
    True
    """
    "*** YOUR CODE HERE ***"
    # Base Case: if n is a single digit or less to contain "88", we need to stop
    if n < 10:
        return False
    # check the last two digits (using % 100) for the '88' pattern
    elif n % 100 == 88:
        return True
    # Recursive Step: remove the last digit then check the rest of the number
    else:
        return double_eights(n // 10)
```

![Terminal output](./_images/06-cs61a-week5/lab03-07.png)

#### Q8: Making Onions

Write a function `make_onion` that takes in two one-argument functions, `f` and `g`. It returns a function that takes in three arguments: `x`, `y`, and `limit`. The returned function returns `True` if it is possible to reach `y` from `x` using up to `limit` calls to `f` and `g`, and `False` otherwise. For example, if `f` adds 1 and `g` doubles, then it is possible to reach 25 from 5 in four calls: `f(g(g(f(5))))`.

```Python
# Q8: Making Onions
def make_onion(f, g):
    """Return a function can_reach(x, y, limit) that returns
    whether some call expression containing only f, g, and x with
    up to limit calls will give the result y.

    >>> up = lambda x: x + 1
    >>> double = lambda y: y * 2
    >>> can_reach = make_onion(up, double)
    >>> can_reach(5, 25, 4)      # 25 = up(double(double(up(5))))
    True
    >>> can_reach(5, 25, 3)      # Not possible
    False
    >>> can_reach(1, 1, 0)      # 1 = 1
    True
    >>> add_ing = lambda x: x + "ing"
    >>> add_end = lambda y: y + "end"
    >>> can_reach_string = make_onion(add_ing, add_end)
    >>> can_reach_string("cry", "crying", 1)      # "crying" = add_ing("cry")
    True
    >>> can_reach_string("un", "unending", 3)     # "unending" = add_ing(add_end("un"))
    True
    >>> can_reach_string("peach", "folding", 4)   # Not possible
    False
    """
    def can_reach(x, y, limit):
        if limit < 0:
            return False
        elif x == y:
            return True
        else:
            return can_reach(f(x), y, limit - 1) or can_reach(g(x), y, limit - 1)
    return can_reach
```

![Terminal output](./_images/06-cs61a-week5/lab03-08.png)

---

## References

[1] J. DeNero, D. Klein, P. Abbeel, "2.3 Sequences," in *Composing Programs*. [Online]. Available: https://www.composingprograms.com/pages/23-sequences.html. Accessed: Sep. 25, 2025. (Originally published 2016)