# Riddler Classic - Sept. 6, 2019

The code for my simulation of a tennis match is in this directory.

This code is for the [Riddler Classic](https://fivethirtyeight.com/tag/the-riddler/) from [Sept. 6, 2019.](https://fivethirtyeight.com/features/what-are-your-chances-of-winning-the-u-s-open/)

The web application is [here](tennis.html).

All source code is at [this repository](https://github.com/Prof-Sears/prof-sears.github.io/tree/main/Riddler/Classic-2019-09-06).

The .html and .js files are the simulation. 
I wrote the simulation in JavaScript to practice coding in the language.
A JavaScript expert would probably cry at my code.
The simulation runs entirely in a web browser.

The .csv files shows the probability of winning a game, set, match, and seven-match tournament based on the probability of winning one point.
The simulation started with a probability of winning one point as 0.5.
Then, it increased the probability by 0.01 until it reached 1.0.
At each probability level, the simulation ran 25000 tournaments.

For fun, at each probability value I calculated the proportion of games, sets, and matches won.
I expected the probabilities to decrease as I simulated games, sets, and then matches.
Amazingly, the probabilities of winning increased.

I also calculated the proportion of tournaments that ended in 0 through 7 sets.
At a point-winning probability of winning a point at 0.68, you are virtually guaranteed to win all tournaments.

This was fun. Thanks for the Riddler.
