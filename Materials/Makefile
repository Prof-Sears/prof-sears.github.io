FOUNDATIONS := MAT061-17-Lesson17.html

all: $(FOUNDATIONS)

$(FOUNDATIONS): %.html: %.docx footer-foundations.html materials.css
	pandoc -o $@ -s --mathjax --extract-media=$* -A footer-foundations.html --css=materials.css $<
