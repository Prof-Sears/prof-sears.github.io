# include the ggplot2 library for plotting results.
library(ggplot2)

# This function updates the row in Pascal's Triangle. Since we are only worried
# about the parity of the number, only the modulo 2 values matter.
update_row <- function(current_row) {
  updated_row <- c(1,1)
  updated_row <- append(updated_row, head(current_row,length(current_row)-1) + tail(current_row,length(current_row)-1),1)
  updated_row[length(updated_row)] <- 1
  updated_row %% 2
}

# These numbers help with calculating the number of values and number of odds
# in the current row an all rows above.
total_elements = 1
total_ones = 1

# Tells the number of rows in Pascal's Triangle to use.
num_rows <- 8192

# Creates three vectors to store the data. Each is twice as large as the number
# of rows because doesn't like to nicely plot line graphs for two separate data
# sets.
rows <- rep(1,2*num_rows)
percents <- rep(1,2*num_rows)
calc_type <- rep(c("calculated", "formula"), 2*num_rows)

# This first row of Pascal's Triange. Just a single "1".
triangle_row = c(1)

# Iterate through each row and count the numbers of "1"'s in each row. Add
# that to the current total and store the relavant information.
for(i in 2:num_rows) {
  triangle_row <- update_row(triangle_row)
  # print(triangle_row)
  total_elements <- total_elements + length(triangle_row)
  total_ones <- total_ones + sum(triangle_row)
  rows[2*i-1] <- i
  rows[2*i] <- i
  percents[2*i-1] <- total_ones / total_elements
  
  # This value is stored from the algebraic solution. This solution is only valid
  # when the row number is a power of 2.
  percents[2*i] <- (2 * i ^ (log(3,2) - 1))/(i+1)
}

# Convert the vectors to a data frame for better plotting.
output <- data.frame(rows, percents, calc_type)

# Plot the data. ggplot2 is still a mystery to me. Thank goodness for StackExchange.
ggplot(data=output, mapping=aes(x=rows, y=percents, color=calc_type), color=c("blue", "orange")) +
  geom_line() +
  labs(title="Percent of Ones", x="Rows", y="Percent of Ones", fill="Source") +
  scale_color_brewer(palette="Set1") +
  scale_x_continuous(trans = 'log2')

