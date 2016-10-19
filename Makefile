PLUGIN_PATH := ~/Library/Application\ Support/com.bohemiancoding.sketch3/Plugins/
PLUGIN_DIR := Day\ Player.sketchplugin
PLUGIN_FULL_PATH := $(PLUGIN_PATH)$(PLUGIN_DIR)
PLUGIN_NAME := Day Player
ZIP_NAME := Day\ Player.zip

SRC_DIR := ./src
RESOURCES_DIR := ./resources
LICENSE := LICENSE.md
MANIFEST := manifest.json

clean:
	@rm -rf $(PLUGIN_DIR)
	@rm -f $(ZIP_NAME)
	@rm -rf $(PLUGIN_PATH)$(PLUGIN_DIR)

install:
	@make clean
	@echo "Installing $(PLUGIN_NAME)..."
	@mkdir $(PLUGIN_FULL_PATH)
	@mkdir $(PLUGIN_FULL_PATH)/Contents
	@cp $(LICENSE) $(PLUGIN_PATH)$(PLUGIN_DIR)/Contents/$(LICENSE)
	@cp -r $(RESOURCES_DIR) $(PLUGIN_PATH)$(PLUGIN_DIR)/Contents/Resources
	@cp -r $(SRC_DIR) $(PLUGIN_PATH)$(PLUGIN_DIR)/Contents/Sketch
	@cp -r $(MANIFEST) $(PLUGIN_PATH)$(PLUGIN_DIR)/Contents/Sketch/$(MANIFEST)
	@echo "$(PLUGIN_NAME) installed"

build:
	make clean
	@mkdir $(PLUGIN_DIR)
	@mkdir $(PLUGIN_DIR)/Contents
	@cp $(LICENSE) $(PLUGIN_DIR)/Contents/$(LICENSE)
	@cp -r $(RESOURCES_DIR) $(PLUGIN_DIR)/Contents/Resources
	@cp -r $(SRC_DIR) $(PLUGIN_DIR)/Contents/Sketch
	@cp -r $(MANIFEST) $(PLUGIN_DIR)/Contents/Sketch/$(MANIFEST)
	@zip -rm $(ZIP_NAME) $(PLUGIN_DIR)
	@echo "$(PLUGIN_NAME).zip created"

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
