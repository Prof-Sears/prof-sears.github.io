# Riddler Express - October 15, 2021
This week's Riddler Express is about baseball.
>The American League Championship Series of Riddler League Baseball determines one of the teams that will compete in the Riddler World Series. This year’s teams — the Tampa Bay Lines and the Minnesota Twin Primes — are evenly matched. In other words, both teams are equally likely to win each game of the best-of-seven series.

>On average, how many games will the series last? (Note that the series ends as soon as one team has won four games.)

[Problem Statement](https://fivethirtyeight.com/features/can-you-hit-these-riddles-out-of-the-park/)

This is my second stab at a solution.

## Recursive Function
The quickest and most fun way to code a solution is to use recursion. The first thing we'll do is define the recursive function.


```python
def recursiveSearch(arr, sym):
    myArr = arr.copy()
    myArr.append(sym)
    if(myArr.count("L") == 4) or (myArr.count("P") == 4):
        print(myArr)
        return len(myArr) * 0.5 ** len(myArr) # This is what I flubbed in my first attempt.
    else:
        return recursiveSearch(myArr, "L") + recursiveSearch(myArr, "P")
```

## Ready to Search
Now we will run the recursive function to get the expected value.


```python
arr = []
print("Expected value of series length: {0}".format(recursiveSearch(arr, "L") + recursiveSearch(arr, "P")))
```

    ['L', 'L', 'L', 'L']
    ['L', 'L', 'L', 'P', 'L']
    ['L', 'L', 'L', 'P', 'P', 'L']
    ['L', 'L', 'L', 'P', 'P', 'P', 'L']
    ['L', 'L', 'L', 'P', 'P', 'P', 'P']
    ['L', 'L', 'P', 'L', 'L']
    ['L', 'L', 'P', 'L', 'P', 'L']
    ['L', 'L', 'P', 'L', 'P', 'P', 'L']
    ['L', 'L', 'P', 'L', 'P', 'P', 'P']
    ['L', 'L', 'P', 'P', 'L', 'L']
    ['L', 'L', 'P', 'P', 'L', 'P', 'L']
    ['L', 'L', 'P', 'P', 'L', 'P', 'P']
    ['L', 'L', 'P', 'P', 'P', 'L', 'L']
    ['L', 'L', 'P', 'P', 'P', 'L', 'P']
    ['L', 'L', 'P', 'P', 'P', 'P']
    ['L', 'P', 'L', 'L', 'L']
    ['L', 'P', 'L', 'L', 'P', 'L']
    ['L', 'P', 'L', 'L', 'P', 'P', 'L']
    ['L', 'P', 'L', 'L', 'P', 'P', 'P']
    ['L', 'P', 'L', 'P', 'L', 'L']
    ['L', 'P', 'L', 'P', 'L', 'P', 'L']
    ['L', 'P', 'L', 'P', 'L', 'P', 'P']
    ['L', 'P', 'L', 'P', 'P', 'L', 'L']
    ['L', 'P', 'L', 'P', 'P', 'L', 'P']
    ['L', 'P', 'L', 'P', 'P', 'P']
    ['L', 'P', 'P', 'L', 'L', 'L']
    ['L', 'P', 'P', 'L', 'L', 'P', 'L']
    ['L', 'P', 'P', 'L', 'L', 'P', 'P']
    ['L', 'P', 'P', 'L', 'P', 'L', 'L']
    ['L', 'P', 'P', 'L', 'P', 'L', 'P']
    ['L', 'P', 'P', 'L', 'P', 'P']
    ['L', 'P', 'P', 'P', 'L', 'L', 'L']
    ['L', 'P', 'P', 'P', 'L', 'L', 'P']
    ['L', 'P', 'P', 'P', 'L', 'P']
    ['L', 'P', 'P', 'P', 'P']
    ['P', 'L', 'L', 'L', 'L']
    ['P', 'L', 'L', 'L', 'P', 'L']
    ['P', 'L', 'L', 'L', 'P', 'P', 'L']
    ['P', 'L', 'L', 'L', 'P', 'P', 'P']
    ['P', 'L', 'L', 'P', 'L', 'L']
    ['P', 'L', 'L', 'P', 'L', 'P', 'L']
    ['P', 'L', 'L', 'P', 'L', 'P', 'P']
    ['P', 'L', 'L', 'P', 'P', 'L', 'L']
    ['P', 'L', 'L', 'P', 'P', 'L', 'P']
    ['P', 'L', 'L', 'P', 'P', 'P']
    ['P', 'L', 'P', 'L', 'L', 'L']
    ['P', 'L', 'P', 'L', 'L', 'P', 'L']
    ['P', 'L', 'P', 'L', 'L', 'P', 'P']
    ['P', 'L', 'P', 'L', 'P', 'L', 'L']
    ['P', 'L', 'P', 'L', 'P', 'L', 'P']
    ['P', 'L', 'P', 'L', 'P', 'P']
    ['P', 'L', 'P', 'P', 'L', 'L', 'L']
    ['P', 'L', 'P', 'P', 'L', 'L', 'P']
    ['P', 'L', 'P', 'P', 'L', 'P']
    ['P', 'L', 'P', 'P', 'P']
    ['P', 'P', 'L', 'L', 'L', 'L']
    ['P', 'P', 'L', 'L', 'L', 'P', 'L']
    ['P', 'P', 'L', 'L', 'L', 'P', 'P']
    ['P', 'P', 'L', 'L', 'P', 'L', 'L']
    ['P', 'P', 'L', 'L', 'P', 'L', 'P']
    ['P', 'P', 'L', 'L', 'P', 'P']
    ['P', 'P', 'L', 'P', 'L', 'L', 'L']
    ['P', 'P', 'L', 'P', 'L', 'L', 'P']
    ['P', 'P', 'L', 'P', 'L', 'P']
    ['P', 'P', 'L', 'P', 'P']
    ['P', 'P', 'P', 'L', 'L', 'L', 'L']
    ['P', 'P', 'P', 'L', 'L', 'L', 'P']
    ['P', 'P', 'P', 'L', 'L', 'P']
    ['P', 'P', 'P', 'L', 'P']
    ['P', 'P', 'P', 'P']
    Expected value of series length: 5.8125


## Conclusion
The expected series length is 5.8125 games.
