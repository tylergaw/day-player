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
    const api = context.api();
    const document = api.selectedDocument;

    // NOTE: Using the low-level _object.selectedLayers method because it seems
    // like document.selectedLayers isn't quite ready yet. OR maybe I'm just
    // trying to use it in unintended ways right now?
    // const selection = document.selectedLayers;
    const selection = document.selectedLayers._object.selectedLayers();
    const target = (selection.length !== 0) ?
      getTargetLayer(api.wrapObject(selection[0], document)) : {
        group: document.selectedPage
      };

    // TODO: Hopefully remove this when/if we're able to get the parent of a
    // Layer via the Sketch API.
    if (!target.group._object) {
      target.group = api.wrapObject(target.group, document);
    }

    const props = {
      api: api,
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
 * @param {WrappedObject} selection A single selected layer
 * @return {Object} target The selected layers
 */
const getTargetLayer = function(selection) {
  const target = {
    selection: selection,
    group: selection,
    frame: (selection.isShape) ? selection.frame : null
  };

  if (selection.isShape || selection.isText) {
    // TODO: Ask if we can get parent() into the JS API.
    target.group = selection._object.parentGroup();
  }

  log(target.group);

  return target;
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
