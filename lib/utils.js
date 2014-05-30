// sketch.scriptPath is an absolute path from ~ to the parent directory of the .sketchplugin
var pluginPath = sketch.scriptPath.substring(0, sketch.scriptPath.lastIndexOf('/'));

// Determine if we're appending the image to an artboard, group, or the page.
function getElToAppendTo () {
  var app = NSApplication.sharedApplication();
  var el = null;
  var s = sketch.selection;

  if (s.count() == 0) {
    el = sketch.doc.currentPage();
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

// Creates a new bitmap image and adds it to the Layer group
function addImgToCanvas (el, img, layerName) {
  var imageCollection = el.documentData().images();
  var imageData = imageCollection.addImage_name_convertColourspace(img, layerName, false);
  var newImage = MSBitmapLayer.alloc().initWithImage_parentFrame_name(imageData, el.frame(), layerName);
  el.addLayer(newImage);
  return newImage;
}

function createAndPlaceImg (url, size, el) {
  var res = get(url);
  var img = NSImage.alloc().initWithData(res);
  var layerName = size + ' Placholder Img';
  var layer = addImgToCanvas(el, img, layerName);
  var frame = layer.frame();
  frame.setX(0);
  frame.setY(0);
}

function createSelect (items, selectedItemIndex) {
  selectedItemIndex = selectedItemIndex || 0
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

// Make an HTTP GET Request to url.
function get (url) {
  var request = NSURLRequest.requestWithURL(NSURL.URLWithString(url));
  var response = NSURLConnection.sendSynchronousRequest_returningResponse_error(request, null, null);
  return response;
}
