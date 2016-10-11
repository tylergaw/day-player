/**
 * createPluginHandler - Creates a handler function that takes the context
 * parameter required by Sketch plugins and enhances it with a number of
 * helpful properties.
 *
 * @param {Function} func
 * @return {Function} A function suitable to be used as a Plugin handler
 */
const createPluginHandler = function(func) {
  return function(context) {
    const sketch = context.api();
    const document = sketch.selectedDocument;

    // NOTE: In future versions of the Sketch JS API, this commented out
    // document.selectedLayers will be the proper way to get an instance of
    // the Selection. It is currently in development. For the time being, we
    // can access the underlying object to get directly at what we need.
    // const selection = document.selectedLayers;
    const selection = document.selectedLayers._object.selectedLayers();
    const target = getTargetLayer(selection) || {};

    if (!target.group) {
      target.group = document.selectedPage;
    }

    const props = {
      api: sketch,
      document: document,
      page: document.selectedPage,
      selection: selection,
      target: target
    };

    func(props);
  };
};

/**
 * Determine if appending image to an artboard, group, layer, or none.
 *
 * @param {Object} selection The selected layers
 * @return {Object} target The selected layers
 */
const getTargetLayer = function(selection) {
  if (selection.length === 0) {
    return null;
  } else {
    const firstSelection = selection[0];
    const type = String(firstSelection.className());

    // Bail on these types of layers we can't append or replace them right now.
    // TODO: Could be smarter about this. Maybe the text could mask the image?
    if (type === 'MSTextLayer') {
      return null;
    }

    const target = {
      selection: selection,
      type: type
    };

    if (type === 'MSArtboardGroup' || type === 'MSLayerGroup') {
      target.group = firstSelection;
    } else {
      // TODO: When possible, switch to using JS api members and methods instead
      // of class methods.
      const frame = firstSelection.frame();
      target.group = firstSelection.parentGroup();
      target.frame = {
        x: frame.x(),
        y: frame.y(),
        width: frame.width(),
        height: frame.height()
      }
    }

    return target;
  }
};

/*
function createAndPlaceImg (url, size, el) {
  var image = NSImage.alloc().initWithContentsOfURL(NSURL.URLWithString(url));
  var layerName = size + ' Placeholder Img';
  var doc = context.document;
  var layer = MSBitmapLayer.alloc().initWithFrame_image(
    NSMakeRect(0, 0, image.size().width, image.size().height),
    MSImageProxy.proxyWithImage(image)
  );
  var page = doc.currentPage();
  var artboard = page.currentArtboard();
  var addTo = (artboard) ? artboard : page;
  addTo.addLayers([layer]);

  layer.setConstrainProportions(false);
  layer.setName(layerName);
  layer.frame().setWidth(image.size().width);
  layer.frame().setHeight(image.size().height);
  layer.setConstrainProportions(true);
}
*/

/**
 * dumpObj - Introspect objects
 * @param {Object} obj
 */
const dumpObj = function(obj) {
  log('------------------------');
  log('## Dumping object ' + obj);
  log('------------------------');
  log('obj.properties:');
  log(obj.class().mocha().properties());
  log('obj.propertiesWithAncestors:');
  log(obj.class().mocha().propertiesWithAncestors());
  log('obj.classMethods:');
  log(obj.class().mocha().classMethods());
  log('obj.classMethodsWithAncestors:');
  log(obj.class().mocha().classMethodsWithAncestors());
  log('obj.instanceMethods:');
  log(obj.class().mocha().instanceMethods());
  log('obj.instanceMethodsWithAncestors:');
  log(obj.class().mocha().instanceMethodsWithAncestors());
  log('obj.protocols:');
  log(obj.class().mocha().protocols());
  log('obj.protocolsWithAncestors:');
  log(obj.class().mocha().protocolsWithAncestors());
  log('obj.treeAsDictionary():');
  log(obj.treeAsDictionary());
};
