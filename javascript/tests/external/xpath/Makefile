# Currently, this Makefile has only a "dist" target.

PACKAGE = ajaxslt
VERSION = 0.2

DIST_FILES = README AUTHORS ChangeLog COPYING Makefile TODO dom.js \
	misc.js test-xpath.html test-xpath.js test-xslt.html test-xslt.js \
	xpathdebug.js xpath.js xslt.js

DIST_NAME = $(PACKAGE)-$(VERSION)
DIST_DIR = /tmp/$(DIST_NAME)

dist: clobber $(DIST_FILES)
	rm -rf $(DIST_DIR)
	mkdir $(DIST_DIR)
	cp -pr $(DIST_FILES) $(DIST_DIR)
	chmod -R a+r $(DIST_DIR)
	chmod -R u+w $(DIST_DIR)
	chmod -R go-w $(DIST_DIR)
	cd $(DIST_DIR)/.. ; tar cvf $(DIST_NAME).tar $(DIST_NAME) ; gzip $(DIST_NAME).tar
	mv $(DIST_DIR).tar.gz .
	rm -rf $(DIST_DIR)


clobber:

