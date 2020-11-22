# Riddler Express Solution - November 20, 2020

## Problem Statement

The full text of this week's Riddler Express can be found at [this link](https://fivethirtyeight.com/features/can-you-pass-the-cranberry-sauce/).

>Depending on the year, there can be one, two or three Friday the 13ths. Last week happened to be the second Friday the 13th of 2020.
>
>What is the greatest number of Friday the 13ths that can occur over the course of four consecutive calendar years?
>
>Extra credit: What’s the greatest number of Friday the 13ths that can occur over a four-year period (i.e., a period that doesn’t necessarily begin on January 1)?

## Solving the Problem
To solve the problem, I used Microsoft Excel. An HTML version is [here](Riddler_Express.htm). The workbook can be found [here](Riddler_Express.xlsx).

For the first part, I started by counting days after January 1st of the first year. I had to go through this count four times, as any one of the four years could be a leap year. To save space, I just counted the 13th of each month. This required to track the number of days in each month, including leap years. I used a formula similar to the following.
`=C2+IF(B3=1,OFFSET($P$3,MOD($A2-1,12),0),OFFSET($O$3,MOD($A2-1,12),0))`

For each count, I converted the day numbers to modulo 7 to see which day of the week the 13th or each month fell. 
