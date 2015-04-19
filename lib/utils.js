// sketch.scriptPath is an absolute path from ~ to the parent directory of the .sketchplugin
var pluginPath = sketch.scriptPath.substring(0, sketch.scriptPath.lastIndexOf('/'));

// We're going to use the main thread dictionary to store values that the user
// sets for any field and use those to "remember" their settings across multiple
// uses of the plugin.
var mainThreadDict = NSThread.mainThread().threadDictionary();

// If this is the first use of the plugin we create an empty dict to store
// user values.

if (!mainThreadDict["dayPlayer"]) {
  mainThreadDict["dayPlayer"] = JSON.stringify({});
}

// When storing a user value, use this storage dict We're going to have a key
// for each service like fillmurray.width: 300, placecage.height: 400, etc
var pluginStorage = JSON.parse(mainThreadDict["dayPlayer"]);

// Look for an object with the given serivce name in pluginStorage. If it's not
// there, create an empty object for it with the service name as the key.
function getServiceStorage (service) {
  if (!pluginStorage[service]) {
    pluginStorage[service] = {};
  }

  return pluginStorage[service];
}

function storeUserValuesForService (values, serviceStorage) {
  for (key in values) {
    // Casting all the values to strings. This doesn't feel like a good thing to
    // do. What if you need to store an array?
    // Doing this because JSON.stringify was choking on the values. It would
    // convert each value to an empty dict {}. Not sure what the difference
    // is with JSON in CocoaScript, but it seems a little fishy.
    serviceStorage[key] = String(values[key]);
  }

  mainThreadDict["dayPlayer"] = JSON.stringify(pluginStorage);
}

// Determine if we're appending the image to an artboard, group, or the page.
function getElToAppendTo () {
  var app = NSApplication.sharedApplication();
  var el = null;
  var s = sketch.selection;

  if (s.count() == 0) {
    el = context.document.currentPage();
  }
  else {
    var type = s[0].className();

    if (type == 'MSArtboardGroup' || type == 'MSLayerGroup') {
      el = s[0];
    }
    else {
      app.displayDialog_withTitle("You'll need to select an artboard or a group or you can select nothing and we'll add the image to the current page.", "Invalid Selection");
    }
  }

  return el;
}

// A quick way to get the value of text fields in the alerts
function valAtIndex (view, index) {
  return view.viewAtIndex(index).stringValue()
}

function createAndPlaceImg (url, size, el) {
  var image = NSImage.alloc().initWithContentsOfURL(NSURL.URLWithString(url));
  var layerName = size + ' Placeholder Img';
  var doc = context.document;
  var layer = MSBitmapLayer.new();
  doc.currentPage().currentArtboard().addLayers([layer]);

  layer.setConstrainProportions(false);
  layer.setRawImage_convertColourspace_collection(image, false, doc.documentData().images());
  layer.setName(layerName);
  layer.frame().setWidth(image.size().width);
  layer.frame().setHeight(image.size().height);
  layer.setConstrainProportions(true);
}

function createSelect (items, selectedItemIndex) {
  selectedItemIndex = (selectedItemIndex > -1) ? selectedItemIndex : 0);
  var comboBox = NSComboBox.alloc().initWithFrame(NSMakeRect(0, 0, 300, 25));
  comboBox.addItemsWithObjectValues(items);
  comboBox.selectItemAtIndex(selectedItemIndex);
  return comboBox;
}

// Creates an alert using the CocoaScript COSAlertWindow class
function createAlertBase (service) {
  var alert = COSAlertWindow.new();

  // This is how we set the custom icon in the alert.
  // I used http://iconverticons.com/online/ to create the .icns file from
  // a 1024x1024px PNG of the logo. Since it has multiple sizes, NSImage picks
  // the correct size needed for the alert. Pretty cool
  var icon = NSImage.alloc().initByReferencingFile(pluginPath + '/lib/' + service + '.icns');
  alert.setIcon(icon);

  alert.addButtonWithTitle('OK');
  alert.addButtonWithTitle('Cancel');

  return alert;
}

// This is a convenience. Since all the current services–as of 1.0.2–have width
// and height fields, creating those here to DRY.
// The 2nd param is the service's storage object...
function addDimensionFieldsToAlert (alert, store) {
  var s = store || {};

  alert.addTextLabelWithValue("Width:");
  alert.addTextFieldWithValue(s.width || "300");

  alert.addTextLabelWithValue("Height:");
  alert.addTextFieldWithValue(s.height || "200");
}

// Only used for debugging. Very helpful for object introspection
function dump (obj) {
  log("#####################################################################################")
  log("## Dumping object " + obj )
  log("## obj class is: " + [obj className])
  log("#####################################################################################")
  log("obj.properties:")
  log([obj class].mocha().properties())
  log("obj.propertiesWithAncestors:")
  log([obj class].mocha().propertiesWithAncestors())
  log("obj.classMethods:")
  log([obj class].mocha().classMethods())
  log("obj.classMethodsWithAncestors:")
  log([obj class].mocha().classMethodsWithAncestors())
  log("obj.instanceMethods:")
  log([obj class].mocha().instanceMethods())
  log("obj.instanceMethodsWithAncestors:")
  log([obj class].mocha().instanceMethodsWithAncestors())
  log("obj.protocols:")
  log([obj class].mocha().protocols())
  log("obj.protocolsWithAncestors:")
  log([obj class].mocha().protocolsWithAncestors())
  log("obj.treeAsDictionary():")
  log(obj.treeAsDictionary())
}
