library(ggplot2)

bo.df <- read.csv("~/Box Office/LegsData.csv")
cy.df <- read.csv("~/Box Office/2023.csv")

w1.model <- lm (Legs.Coefficient ~ WE1.to.WE2.Drop, data=bo.df)

print(summary(w1.model))

ggplot(data = bo.df, mapping=aes(x=WE1.to.WE2.Drop, y=Legs.Coefficient)) +
  theme(panel.background = element_rect(fill="lightgray", color="black")) +
  labs(x="Weekend 1 to Weekend 2 Drop", y="Legs Coefficent", title = "Predicting Legs of a Movie After One Week") +
  geom_point(color = "blue") +
  geom_smooth(method=lm, color="red", level=0.95)
ggsave("./Box Office/Legs_v1.png", plot=last_plot(), device="png", width=1920, height=1080, units="px")

legs.df <- predict(w1.model, newdata=cy.df, level=0.95, interval="confidence")

cy.df$Predicted.Legs <- legs.df[,1]
cy.df$Lower.Legs <- legs.df[,2]
cy.df$Upper.Legs <- legs.df[,3]
cy.df$Predicted.Final <- legs.df[,1] * cy.df$Opening.Weekend / 1000000
cy.df$Lower.Final <- legs.df[,2] * cy.df$Opening.Weekend / 1000000
cy.df$Upper.Final <- legs.df[,3] * cy.df$Opening.Weekend / 1000000

# ggplot(data = cy.df, mapping=aes(y=Title, x=Predicted.Final)) +
#   geom_col(color="black", fill="blue")

write.csv(cy.df, "~/Box Office/2023_output.csv")