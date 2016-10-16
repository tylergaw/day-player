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

    const newImgFrame = (target.frame) ? {
      x: target.frame.x,
      y: target.frame.y,
      width: target.frame.width,
      height: target.frame.height
    } : {
      x: 0,
      y: 0,
      width: 400,
      height: 300
    }

    const props = {
      api: api,
      document: document,
      page: document.selectedPage,
      selection: selection,
      target: target,
      newImgFrame: newImgFrame
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

  return target;
};

/**
 * Set the image contents for a give Image object
 *
 * @param {Image} img A valid Image object
 * @param {String} url A valid URL to an image
 * @return {Image} img Return the modified Image object
 *
 * NOTE: In the future, this should not be necessary. Currently, we're using it
 * to get around the Image.setImage method not working:
 * https://github.com/BohemianCoding/SketchAPI/blob/release/40/Source/Image.js#L45
 */
const lowLevelSetImage = function(img, url) {
  const _nsImage = NSImage.alloc().initWithContentsOfURL_(
    NSURL.URLWithString(url)
  );
  const _msImageData = MSImageData.alloc()
    .initWithImage_convertColorSpace_(_nsImage, true);

  img._object.setImage_(_msImageData);
  return img;
};

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
