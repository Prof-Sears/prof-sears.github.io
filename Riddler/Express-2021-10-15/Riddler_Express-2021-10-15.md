# Riddler Express - October 15, 2021
## Counting the Possible Series
This problem can be solved by enumerating the number of possible series.


```python
lengths = [] # Record the lengths of each completed series
```

Probably the fastest, and most fun, way to code this is through recursion.

We'll start by defining the recursive function.


```python
def recursiveCount(arr, symbol):
    arr.append(symbol)
    if (arr.count("L") == 4) or (arr.count("P") == 4):
        lengths.append(len(arr) - 1) # We'll have an extra element for the root
        print(arr)
    else:
        recursiveCount(arr.copy(), "L");
        recursiveCount(arr.copy(), "P");
```

Next, we'll use the recursive function to enumerate all possibilities.


```python
arr = []
recursiveCount(arr, "");
```

    ['', 'L', 'L', 'L', 'L']
    ['', 'L', 'L', 'L', 'P', 'L']
    ['', 'L', 'L', 'L', 'P', 'P', 'L']
    ['', 'L', 'L', 'L', 'P', 'P', 'P', 'L']
    ['', 'L', 'L', 'L', 'P', 'P', 'P', 'P']
    ['', 'L', 'L', 'P', 'L', 'L']
    ['', 'L', 'L', 'P', 'L', 'P', 'L']
    ['', 'L', 'L', 'P', 'L', 'P', 'P', 'L']
    ['', 'L', 'L', 'P', 'L', 'P', 'P', 'P']
    ['', 'L', 'L', 'P', 'P', 'L', 'L']
    ['', 'L', 'L', 'P', 'P', 'L', 'P', 'L']
    ['', 'L', 'L', 'P', 'P', 'L', 'P', 'P']
    ['', 'L', 'L', 'P', 'P', 'P', 'L', 'L']
    ['', 'L', 'L', 'P', 'P', 'P', 'L', 'P']
    ['', 'L', 'L', 'P', 'P', 'P', 'P']
    ['', 'L', 'P', 'L', 'L', 'L']
    ['', 'L', 'P', 'L', 'L', 'P', 'L']
    ['', 'L', 'P', 'L', 'L', 'P', 'P', 'L']
    ['', 'L', 'P', 'L', 'L', 'P', 'P', 'P']
    ['', 'L', 'P', 'L', 'P', 'L', 'L']
    ['', 'L', 'P', 'L', 'P', 'L', 'P', 'L']
    ['', 'L', 'P', 'L', 'P', 'L', 'P', 'P']
    ['', 'L', 'P', 'L', 'P', 'P', 'L', 'L']
    ['', 'L', 'P', 'L', 'P', 'P', 'L', 'P']
    ['', 'L', 'P', 'L', 'P', 'P', 'P']
    ['', 'L', 'P', 'P', 'L', 'L', 'L']
    ['', 'L', 'P', 'P', 'L', 'L', 'P', 'L']
    ['', 'L', 'P', 'P', 'L', 'L', 'P', 'P']
    ['', 'L', 'P', 'P', 'L', 'P', 'L', 'L']
    ['', 'L', 'P', 'P', 'L', 'P', 'L', 'P']
    ['', 'L', 'P', 'P', 'L', 'P', 'P']
    ['', 'L', 'P', 'P', 'P', 'L', 'L', 'L']
    ['', 'L', 'P', 'P', 'P', 'L', 'L', 'P']
    ['', 'L', 'P', 'P', 'P', 'L', 'P']
    ['', 'L', 'P', 'P', 'P', 'P']
    ['', 'P', 'L', 'L', 'L', 'L']
    ['', 'P', 'L', 'L', 'L', 'P', 'L']
    ['', 'P', 'L', 'L', 'L', 'P', 'P', 'L']
    ['', 'P', 'L', 'L', 'L', 'P', 'P', 'P']
    ['', 'P', 'L', 'L', 'P', 'L', 'L']
    ['', 'P', 'L', 'L', 'P', 'L', 'P', 'L']
    ['', 'P', 'L', 'L', 'P', 'L', 'P', 'P']
    ['', 'P', 'L', 'L', 'P', 'P', 'L', 'L']
    ['', 'P', 'L', 'L', 'P', 'P', 'L', 'P']
    ['', 'P', 'L', 'L', 'P', 'P', 'P']
    ['', 'P', 'L', 'P', 'L', 'L', 'L']
    ['', 'P', 'L', 'P', 'L', 'L', 'P', 'L']
    ['', 'P', 'L', 'P', 'L', 'L', 'P', 'P']
    ['', 'P', 'L', 'P', 'L', 'P', 'L', 'L']
    ['', 'P', 'L', 'P', 'L', 'P', 'L', 'P']
    ['', 'P', 'L', 'P', 'L', 'P', 'P']
    ['', 'P', 'L', 'P', 'P', 'L', 'L', 'L']
    ['', 'P', 'L', 'P', 'P', 'L', 'L', 'P']
    ['', 'P', 'L', 'P', 'P', 'L', 'P']
    ['', 'P', 'L', 'P', 'P', 'P']
    ['', 'P', 'P', 'L', 'L', 'L', 'L']
    ['', 'P', 'P', 'L', 'L', 'L', 'P', 'L']
    ['', 'P', 'P', 'L', 'L', 'L', 'P', 'P']
    ['', 'P', 'P', 'L', 'L', 'P', 'L', 'L']
    ['', 'P', 'P', 'L', 'L', 'P', 'L', 'P']
    ['', 'P', 'P', 'L', 'L', 'P', 'P']
    ['', 'P', 'P', 'L', 'P', 'L', 'L', 'L']
    ['', 'P', 'P', 'L', 'P', 'L', 'L', 'P']
    ['', 'P', 'P', 'L', 'P', 'L', 'P']
    ['', 'P', 'P', 'L', 'P', 'P']
    ['', 'P', 'P', 'P', 'L', 'L', 'L', 'L']
    ['', 'P', 'P', 'P', 'L', 'L', 'L', 'P']
    ['', 'P', 'P', 'P', 'L', 'L', 'P']
    ['', 'P', 'P', 'P', 'L', 'P']
    ['', 'P', 'P', 'P', 'P']
    

Finally, let's average the elements in the lists.


```python
sum = 0
for l in lengths:
    sum += l
print("Average series length: {0}".format(sum/len(lengths)))
```

    Average series length: 6.4
    
