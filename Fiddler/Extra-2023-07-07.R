library(ggplot2)

# The Euclidean Algorithm in recursive form
gcd <- function(x, y) {
  r <- x%%y;
  return(ifelse(r, gcd(y, r), y))
}

# Returns a the average number of unique edges
get_averages <- function(inputs) {
  return(mean(gcd(1:inputs,inputs)))
}

# Main part of the program
inputs <- 1:1000
results <- sapply(inputs,get_averages)

df <- data.frame(inputs,results)
colnames(df) <- c("N", "Average")

# Find the maximum of the averages
max_avg <- max(df$Average)
print(max_avg)
print(df[df$Average == max_avg,])
# Prints the number of edges for the top 10 averages
print(df[order(-df$Average),][1:10,])

# Plots the data
ggplot(df, mapping = aes(x=N, y=Average)) +
  theme(panel.background = element_rect(fill="lightgray", color="black")) +
  geom_point(color="royalblue", size=1) +
  ggtitle("Average Unique Faces vs. Number of Edges") +
  xlab("Number of Edges") +
  ylab("Average Number of Unique Faces")
ggsave("Fiddler-2023-07-07.png", plot=last_plot(), device="png", width=2350,
       height=1000, units="px")
