library(ggplot2)
library(ggrepel)

df <- read.csv("RottenTomatoes.csv")
#ldat <- data.frame(c(50, 100), c(5.0, 10.0))
#colnames(ldat) <- c("Tomatometer", "Average.Rating")

ggplot(data=df, aes(x = Tomatometer, y=Average.Rating)) +
  theme(panel.background = element_rect(fill="lightgray", color="black")) +
  labs(title="Average Rating vs. Tomatometer") +
  geom_point(color = "blue", size = 2) +
  geom_smooth(method=lm) +
#  geom_line(data=ldat, color="red") +
  geom_label_repel(mapping = aes(label=Title), size=3)
ggsave("Tomatometer.png", plot=last_plot(), device="png", width=1920, height=1080, units="px")