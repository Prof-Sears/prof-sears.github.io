FOUNDATIONS := MAT061-17-Lesson17.html \
	MAT061-13-Lesson13.html

TRIGONOMETRY := MAT155-16-Law_of_Cosines.html

all: $(FOUNDATIONS) $(TRIGONOMETRY)

$(FOUNDATIONS): %.html: %.docx footer-foundations.html materials.css
	pandoc -o $@ -s --mathjax --extract-media=$* -A footer-foundations.html --css=materials.css $<

$(TRIGONOMETRY): %.html: %.docx footer-trigonometry.html materials.css
	pandoc -o $@ -s --mathjax --extract-media=$* -A footer-trigonometry.html --css=materials.css $<
