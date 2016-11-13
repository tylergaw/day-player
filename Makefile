PLUGIN_PATH := ~/Library/Application\ Support/com.bohemiancoding.sketch3/Plugins/
PLUGIN_DIR := Day\ Player.sketchplugin
PLUGIN_NAME := Day Player
ZIP_NAME := DayPlayer.zip
S3_BUCKET := s3://day-player

SRC_DIR := ./src
RESOURCES_DIR := ./resources
LICENSE := LICENSE.md
MANIFEST := manifest.json

clean:
	@rm -rf $(PLUGIN_DIR)
	@rm -f $(ZIP_NAME)
	@rm -rf $(PLUGIN_PATH)$(PLUGIN_DIR)

build:
	@make clean
	@mkdir $(PLUGIN_DIR)
	@mkdir $(PLUGIN_DIR)/Contents
	@cp $(LICENSE) $(PLUGIN_DIR)/Contents/$(LICENSE)
	@cp -r $(RESOURCES_DIR) $(PLUGIN_DIR)/Contents/Resources
	@cp -r $(SRC_DIR) $(PLUGIN_DIR)/Contents/Sketch
	@cp -r $(MANIFEST) $(PLUGIN_DIR)/Contents/Sketch/$(MANIFEST)

install:
	@make clean
	@echo "Installing $(PLUGIN_NAME)..."
	@make build
	@mv $(PLUGIN_DIR) $(PLUGIN_PATH)
	@echo "$(PLUGIN_NAME) installed"

package:
	make build
	@zip -rm $(ZIP_NAME) $(PLUGIN_DIR)
	@echo "$(ZIP_NAME) created"

changed:
	@echo "Changes detected..."
	@make install

lint:
	@echo "Linting with eslint..."
	@./node_modules/.bin/eslint ./src/**/*.js

watch:
	@echo "Watching src directory for changes..."
	@./node_modules/.bin/watch 'make changed' ./src ./resources

release:
	@node scripts/release.js

publish:
	@make package
	@aws s3 cp $(ZIP_NAME) $(S3_BUCKET)/releases/DayPlayer-$(TRAVIS_TAG).zip
