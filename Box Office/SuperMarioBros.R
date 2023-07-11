library(ggplot2)
library(reshape2)

smb.df <- read.csv("smb.csv")

model <- lm(SuperMario ~ Minions, data=smb.df)
summary(model)

smb.df$SMB.Pred <- predict(model, newdata=smb.df)

smb.long <- melt(smb.df, id="Days.in.Theater")
names(smb.long) <- c("Days.in.Theater", "Movie", "Box.Office")

ggplot(data = smb.long, aes(x=Days.in.Theater, y=Box.Office, color=Movie)) +
  scale_color_manual(values=c("yellow", "red", "blue")) +
  theme(panel.background = element_rect(fill="lightgray", color="black")) +
  geom_line(size=1.25) +
  labs(title = "Movie Box Office vs. Days in Theater", x="Days in Theater", y="Domestic Box Office")
ggsave("SMB_Chart.png", plot=last_plot(), device="png", width=1920, height=1080, units="px")