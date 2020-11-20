# Riddler Express Solution - November 20, 2020

## Problem Statement

The full text of this week's Riddler Express can be found at [this link](https://fivethirtyeight.com/features/can-you-pass-the-cranberry-sauce/).

>Depending on the year, there can be one, two or three Friday the 13ths. Last week happened to be the second Friday the 13th of 2020.
>
>What is the greatest number of Friday the 13ths that can occur over the course of four consecutive calendar years?
>
>Extra credit: What’s the greatest number of Friday the 13ths that can occur over a four-year period (i.e., a period that doesn’t necessarily begin on January 1)?

## General Strategy

To model the problem, we will take January 1st of the first year to be day 1.
We will calculate the day numbers for the 13th of each month for four years, and then take each day modulo 7.
Which ever modulo 7 equivalence class is the most frequent will be assigned to Friday.
We can then work backward to find the day of the week for January 1st gives the most Friday the 13ths.

## Days of the Year

To get the days of the year, I went to [miniwebtool.com](https://miniwebtool.com/day-of-year-calendar).
The days of the year for the 13th of each month is in the table below.
|Month|Non-Leap Year|Leap Year|
|---|---|---|
|Jan|13|13|
|Feb|44|44|
|Mar|72|73|
|Apr|103|104|
|May|133|134|
|Jun|164|165|
|Jul|194|195|
|Aug|225|226|
|Sep|256|257|
|Oct|286|287|
|Nov|317|318|
|Dec|344|345|