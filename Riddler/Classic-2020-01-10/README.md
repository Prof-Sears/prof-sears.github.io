# Alphanumeric Riddler

## Code to solve the Riddler Class on 1/9/2020.

The first step in solving the problem was to find an upper bound for the possible solutions.
This bound will tell the program where to stop searching.

If we take x to be a number, then w(x) will represent the word name for x, l(x) will represent the number of letters in w(x), and a(x) will represent the alphanumeric value of x.

Because each letter has a value less than 26, we have a(x) <= 26 x l(x).

To complete the estimate, we will find a bound for l(x). For numbers less than 1000, the longest word name possible contains 24 letters, e.g. "seven hundred seventy-seven." For numbers greater than 1000, the word name grows by at most 24 letters and a thousands group name, i.e. "thousand", "million", or "billion". Since the largest feasible thousands group name is “quintillion”, we can safely assume that there will be less than 36 letters added for each thousands group.

To count the number of thousands groups, use the logarithm base 1000.

Thus, our estimate for the alphanumeric value for x is:

26 * (36 * floor(log_1000 (x)) + 24) = 936 * floor ( log(x) / 3) + 624

Here, log(x) is the common logarithm.

By graphing both the upper bound function and x, we can see that the largest possible solution is 1560. This is a very reasonable bound for a computer.

The program I used was written in HTML/Javascript.

The files [alphanumeric.html](alphanumeric.html) and [alphanumeric.js](alphanumeric.js) loops through the whole numbers from 1 to 2000 and outputs the numbers that are less than their alphanumeric values.

The largest solution is 297. After the Riddler Classic from last week, this seems like a small number.

All solutions are given in the file [Alphanumeric_Values-Higher_Values.csv](Alphanumeric_Values-Higher_Values.csv).

A cleaner version of this writup is in [Alphanumeric-Riddler.pdf](Alphanumeric-Riddler.pdf).
