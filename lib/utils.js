// I don't know where it is defined, but scriptPath is available here
// and is a absolute path from ~ to the parent directory of the .sketchplugin
var pluginPath = scriptPath.substring(0, scriptPath.lastIndexOf('/'));

var removeGroupOnCancel = null;

// Determine if we're appending the image to an artboard, group, or the page.
function getElToAppendTo () {
  var app = NSApplication.sharedApplication();
  var el = null;

  if (selection.count() == 0) {
    el = doc.currentPage();
  }
  else {
    var type = selection[0].className();

    if (type == 'MSArtboardGroup' || type == 'MSLayerGroup') {
      el = selection[0];
    }
    else {
      app.displayDialog_withTitle("You'll need to select an artboard or a group or you can select nothing and we'll add the image to the current page.", "Invalid Selection");
    }
  }

  return el;
}

function createGridFunc (jribbbleMethod) {
  return function (listType, shotsGroup, settings) {
    var margin = settings.margin;

    if (isNaN(margin)) {
      margin = parseInt(defaultMargin, 10);
    }

    var opts = {
      listType: listType,
      jribbbleMethod: jribbbleMethod,
      shotSize: settings.shotSize,
      grid: settings.grid,
      margin: parseInt(margin, 10),
      shotsGroup: shotsGroup
    }

    createGrid(opts);
  }
}

// Using a little currying here so we don't have to repeat code.
var createPlayerShotsGrid = createGridFunc('getShotsByPlayerId');
var createShotsGrid = createGridFunc('getShotsByList');

function createGrid (opts) {
  var cols = parseInt(opts.grid.cols, 10);
  var rows = parseInt(opts.grid.rows, 10);
  var curCol = 1;
  var curRow = 1;
  var numOfShots = cols * rows;

  if (opts.shotSize == 'full size') {
    var shotWidth = 400;
    var shotHeight = 300;
  }
  else {
    var shotWidth = 200;
    var shotHeight = 150;
  }

  doc.showMessage('Creating ' + numOfShots + ' shots in "' + opts.shotsGroup.name() + '"...');

  // See lib/jribbble-cocoa.js if you're interested in what is going on with the
  // jribbble methods. All they really is make an HTTP Request to the Dribbble API
  // and return a JSON object.
  var json = jribbble[opts.jribbbleMethod](opts.listType, {page: 1, per_page: numOfShots});

  for (var i = 0; i < json.shots.length; i += 1) {
    var shot = json.shots[i];
    var shotUrl = null;

    if (opts.shotSize == 'full size') {
      shotUrl = shot.image_url;
    }
    else {
      shotUrl = shot.image_teaser_url;
    }

    var res = get(shotUrl);

    var img = NSImage.alloc().initWithData(res);
    var layerName = shot.title + " by " + shot.player.name;
    var layer = addImgToGroup(opts.shotsGroup, img, layerName);
    var frame = layer.frame();

    // You can upload 800 x 600 shots to Dribbble, but it causes issues when
    // some are 400x300 and some are larger. Brute force them to not go past
    // 400x300. This may need a setting later.
    if (frame.width() > 400) {
      frame.width = shotWidth;
      frame.height = shotHeight;
    }

    frame.setX(0);
    frame.setY(0);
    frame.addX((shotWidth + opts.margin) * (curCol - 1));
    frame.addY((shotHeight + opts.margin) * (curRow - 1));

    if (curCol == cols) {
      curCol = 1;
      curRow += 1;
    }
    else {
      curCol += 1;
    }
  }
}

// A quick way to get the value of text fields in the alerts
function valAtIndex (view, index) {
  return view.viewAtIndex(index).stringValue()
}

// Creates a new bitmap image and adds it to the Layer group
function addImgToGroup (group, img, layerName) {
  var imageCollection = group.documentData().images();
  var imageData = imageCollection.addImage_name_convertColourspace(img, layerName, false);
  var newImage = MSBitmapLayer.alloc().initWithImage_parentFrame_name(imageData, group.frame(), layerName);
  group.addLayer(newImage);
  return newImage;
}

function createSelect (items, selectedItemIndex) {
  selectedItemIndex = selectedItemIndex || 0
  var comboBox = NSComboBox.alloc().initWithFrame(NSMakeRect(0, 0, 300, 25));
  comboBox.addItemsWithObjectValues(items);
  comboBox.selectItemAtIndex(selectedItemIndex);
  return comboBox;
}

// Creates an alert using the CocoaScript COSAlertWindow class
function createAlertBase () {
  var alert = COSAlertWindow.new();

  // This is how we set the custom icon in the alert.
  // I used http://iconverticons.com/online/ to create the .icns file from
  // a 1024x1024px PNG of the logo. Since it has multiple sizes, NSImage picks
  // the correct size needed for the alert. Pretty cool
  var icon = NSImage.alloc().initByReferencingFile(pluginPath + '/lib/dribbble-icon.icns');
  alert.setIcon(icon);

  alert.addButtonWithTitle('OK');
  alert.addButtonWithTitle('Cancel');

  alert.setMessageText("Skribbble Grid Settings");
  alert.setInformativeText("Customize the grid of shots that will be created.");
  return alert;
}

function addGridSettingsToAlert(alert) {
  var sizes = ['Teaser', 'Full size'];
  var sizeSelect = createSelect(sizes, 0);

  alert.addTextLabelWithValue("Shot Size:");
  alert.addAccessoryView(sizeSelect);

  alert.addTextLabelWithValue("Columns:");
  alert.addTextFieldWithValue("4");

  alert.addTextLabelWithValue("Rows:");
  alert.addTextFieldWithValue("3");

  alert.addTextLabelWithValue("Margin between shots:");
  alert.addTextFieldWithValue("8");

  return alert;
}

function handleAlertResponse(alert, responseCode, group, createMethod) {
  // The OK button will return a code of 1000
  // Cancel is 1001.
  // The codes are odd. They are based off the button's position in the view.
  // They are explain in more detail in the NSAlert docs
  // https://developer.apple.com/library/mac/documentation/cocoa/reference/applicationkit/classes/NSAlert_Class/Reference/Reference.html#//apple_ref/doc/constant_group/Button_Return_Values
  // There's no anchor to it, but search for "Button Return Values" in the page
  if (responseCode == "1000") {
    var list = valAtIndex(alert, 1);

    var gridSettings = {
      shotSize: valAtIndex(alert, 3).toLowerCase(),
      grid: {
        cols: valAtIndex(alert, 5),
        rows: valAtIndex(alert, 7)
      },
      margin: valAtIndex(alert, 9)
    }

    createMethod(list, group, gridSettings);
  }
  else {
    if (removeGroupOnCancel != null) {
      removeGroupOnCancel.removeLayer(group);
    }
  }
}

// Make an HTTP GET Request to url.
function get (url) {
  var request = NSURLRequest.requestWithURL(NSURL.URLWithString(url));
  var response = NSURLConnection.sendSynchronousRequest_returningResponse_error(request, null, null);
  return response;
}
