---
title: "Trees, Mutability, Iterators"
publishDate: 2025-10-04
description: "[CS 61A] Study Notes - 6"
tags: ["Trees", "Mutability", "Iterators", "CS 61A", "Structure and Interpretation of Computer Programs"]
draft: False
pin: 0
---

# Trees, Mutability, Iterators

Hi, I'm Ju Ho Kim and thank you very much for taking your time to visit my website!

<br />

In Week6, we learned about **Trees**, **Mutability**, and **Iterators**.

This post is study notes about what I learned this week to make it useful for reviewing.

<br />

---

## 1. Trees

> "The core idea behind **tree recursion** is to make a really small choice, and then for each of those choices recurse."

For a lot of other problems, it's gonna be helpful to think about what is the smallest choice that I can possibly make before punting the rest of the work to another recursive call.

### Understanding Functional Tree Abstraction

The fundamental idea here is **Data Abstraction**.

A tree is defined not by how it's actually stored (which is a list of lists), but by the functions we use to interact with it.

This **abstraction barrier** means we don't care about the implementation. We only use the provided functions.

The two most important functions that define the structure of a tree `t` are:
- `label(t)`: This returns the **label** at the root of the tree.
- `branches(t)`: This returns **a list of sub-trees** that are immediately connected to the root. The items in this list are themselves trees.

We also have helper functions:
- `tree(label, branches)`: This is the **constructor** that builds a new tree.
- `is_leaf(t)`: This returns `True` if a tree `t` has no branches (i.e., `branches(t)` returns an empty list)

```python
t1=tree(3,[tree(4),tree(5,[tree(6),tree(7)])])
```

![](./_images/07-cs61a-week6/disc05-00.png)

### Q1: Warm Up

Find the value of `result`:

```python
result = label(min(branches(max([t1, t2], key=label)), key=label))
```

We need to work from the innermost part of the expression outward.

#### `max([t1, t2], key=label)`

The `key` function tells `max` which property of the items in the list to compare.

The property we are comparing here is the `label`.
- `label(t1)`: 3
- `label(t2)`: 5

So,
```python
max([t1, t2], key=label)    # returns `t2`
```

Substitute that result back into the main expression:
```python
result = label(min(branches(t2), key=label))
```

#### `branches(t2)`

- `t2` is tree `tree(5,[tree(6),tree(7)])`
- `branches(t2)` is the list of its sub-trees: `[tree(6),tree(7)]`

Substitute that result back in:
```python
result = label(min([tree(6),tree(7)], key=label))
```

#### `min([tree(6),tree(7)], key=label)`

Now, we're minimizing over the list, again using the `label` as the key.

`6` and `7` are the labels of the two trees in the list.

So,

```python
min([tree(6),tree(7)], key=label)   # returns `tree(6)`
```

Substitute that result back in:
```python
result = label(tree(6))
```

#### label(tree(6))

- Final value of `result`: 6

![final value of `result` is 6](./_images/07-cs61a-week6/disc05-01.jpg)

<br />

### Q2: Has Path (recursion on trees)

Skeleton Code:
```python
def has_path(t, p):
    """Return whether tree t has a path from the root with labels p.

    >>> t2 = tree(5, [tree(6), tree(7)])
    >>> t1 = tree(3, [tree(4), t2])
    >>> has_path(t1, [5, 6])        # This path is not from the root of t1
    False
    >>> has_path(t2, [5, 6])        # This path is from the root of t2
    True
    >>> has_path(t1, [3, 5])        # This path does not go to a leaf, but that's ok
    True
    >>> has_path(t1, [3, 5, 6])     # This path goes to a leaf
    True
    >>> has_path(t1, [3, 4, 5, 6])  # There is no path with these labels
    False
    """
    if p == ____:  # when len(p) is 1
        return True
    elif label(t) != ____:
        return False
    else:
        "*** YOUR CODE HERE ***"
```

For tree recursion problems, there are three things we need to care about:
- **Recursive Step**
- **Failure Base Case**
- **Success Base Case**

#### Recursive Step: breaking down the problem

Assume it's not a base case yet.

1. **check the current label**: The very first thing we must check is whether `label(t)` matches the first label we are looking for, `p[0]`. If it doesn't match, we immediately fail (that's one of our Failure Base Cases).

2. **propagate the problem**: If `label(t)` does match `p[0]`, it means the path starts correctly here. Now, the rest of the problem is:
- Do any of the branches, `b` (from `branches(t)`), contain a path that matches the rest of the path list, `p[1:]`? This is the point where we need to make a recursive call `has_path(b,p[1:])`.

```python
    else:
        "*** YOUR CODE HERE ***"
        for b in branches(t):
            if has_path(b, p[1:]):  # check if any branch has the rest of the path
                return True         # if one succeeds, then we're done
        return False                # if the loop finishes w/o finding a path
```

- Another way to write the `else` statement:
    - using a list comprehension
    - `any` returns `True` if at least 1 element in the list is Truthy

```python
    else:
        "*** YOUR CODE HERE ***"
        return any([has_path(b, p[1:]) for b in branches(t)])
```

#### Failure Base Case:

```python
    # The current node's label doesn't match the path's next label.
    elif label(t) != p[0]:
        return False
```

#### Success Base Case:

```python
    # We've matched everything in the path list.
    # remember, `p` is a list
    if p == [label(t)]:  # when len(p) is 1
        return True
```

The complete implementation:
```python
def has_path(t, p):
    # Success Base Case
    if p == [label(t)]:
        return True
    
    # Failure Base Case
    elif label(t) != p[0]:
        return False
        
    # Recursive Step
    else:
        for b in branches(t):
            if has_path(b, p[1:]):
                return True
        return False
```

### Q3: Find Path

The goal of `find_path(t, x)` is to return a list of labels from the root of `t` down to the node labeled `x`. If `x` isn't in the tree, we return `None`.

Skeleton:
```python
def find_path(t, x):
    """
    >>> t2 = tree(5, [tree(6), tree(7)])
    >>> t1 = tree(3, [tree(4), t2])
    >>> find_path(t1, 5)
    [3, 5]
    >>> find_path(t1, 4)
    [3, 4]
    >>> find_path(t1, 6)
    [3, 5, 6]
    >>> find_path(t2, 6)
    [5, 6]
    >>> print(find_path(t1, 2))
    None
    """
    if _______________________________________:
        return _______________________________________
    _______________________________________:
        path = _______________________________________
        if path:
            return _______________________________________
    return None
```

We want to loop through all branches
```python
    for b in branches(t):
```

Make the recursive call on each branch
```python
    for b in branches(t):
        path = find_path(b, x)
```

If there exists a path, we're going to add our current label of the node to the path
```python
    for b in branches(t):
        path = find_path(b, x)
        if path:
            return [label(t)] + path
```

For our **base case**, if we meet the condition, we're just gonna return the label in a list
```python
    if label(t) == x:
        return [label(t)]
```

The complete implementation:
```python
def find_path(t, x):
    # if _______________________________________:
    if label(t) == x:
        # return _______________________________________
        return [label(t)]
    # _______________________________________:
    for b in branches(t):
        # path = _______________________________________
        path = find_path(b, x)
        if path:
            # return _______________________________________
            return [label(t)] + path
    return None
```

<br />

### Q4: Only Paths

The goal of `only_paths(t, n)` is to return a new tree containing only the nodes of `t` that are on a path from the root to a leaf whose labels sum up to `n`. If no such path exists, it returns `None`.

Skeleton:
```python
def only_paths(t, n):
    """Return a tree with only the nodes of t along paths from the root to a leaf of t
    for which the node labels of the path sum to n. If no paths sum to n, return None.

    >>> print_tree(only_paths(tree(5, [tree(2), tree(1, [tree(2)]), tree(1, [tree(1)])]), 7))
    5
      2
      1
        1
    >>> t = tree(3, [tree(4), tree(1, [tree(3, [tree(2)]), tree(2, [tree(1)]), tree(5), tree(3)])])
    >>> print_tree(only_paths(t, 7))
    3
      4
      1
        2
          1
        3
    >>> print_tree(only_paths(t, 9))
    3
      1
        3
          2
        5
    >>> print(only_paths(t, 3))
    None
    """
    if ____:
        return t
    new_branches = [____ for b in branches(t)]
    if ____(new_branches):
        return tree(label(t), [b for b in new_branches if ____])
```

For **recursive call**, we're basically including the node. If so, we are `label(t)` closer to our sum. 
```python
    # new_branches = [____ for b in branches(t)]
    new_branches = [only_paths(b, n - label(t)) for b in branches(t)]
```

We want to ensure that:
1. We have reached the sum - `n` == `label(t)`
2. We have reached a leaf: `is_leaf(t)`
```python
    # if ____:
    if n == label(t) and is_leaf(t):
```

We're saying that if as long as one of our new branches has a path, then we want to return a new tree. If not, we're just gonna return `None`.
```python
    # if ____(new_branches):
    if any(new_branches):
```

Something crucial here is if we're iterating over `new_branches`, we only want to include branches that are **not** `None`.
```python
    if any(new_branches):
        # return tree(label(t), [b for b in new_branches if ____])
        return tree(label(t), [b for b in new_branches if b is not None])
```

The complete implementation:
```python
def only_paths(t, n):
    if n == label(t) and is_leaf(t):
        return t
    new_branches = [only_paths(b, n - label(t)) for b in branches(t)]
    if any(new_branches):
        return tree(label(t), [b for b in new_branches if b is not None])
```

---

![](./_images/07-cs61a-week6/mutability.jpg)

## 2. Mutability

(to be updated)

---

## 3. Iterators

(to be updated)

---

## Assignments

### Lab 4: Tree Recursion, Data Abstraction

#### Q1: Dictionaries

![](./_images/07-cs61a-week6/lab04-q1.png)

#### Q2: Divide

![](./_images/07-cs61a-week6/lab04-q2.png)

#### Q4: Buying Fruit

![](./_images/07-cs61a-week6/lab04-q4.png)

#### Q4: Distance

![](./_images/07-cs61a-week6/lab04-q4.png)

#### Q5: Closer City

![](./_images/07-cs61a-week6/lab04-q5.png)

---

## Wrapping up

Honestly, I'm still struggling with "Trees", so I need to spend way more time figuring that out.

<br />
<br />

Thank you.

![](./_images/07-cs61a-week6/night_ggb.png)

---

## References

[1] J. DeNero, D. Klein, P. Abbeel, "2.3 Sequences," in *Composing Programs*. [Online]. Available: https://www.composingprograms.com/pages/23-sequences.html. Accessed: Oct. 3rd, 2025. (Originally published 2016)