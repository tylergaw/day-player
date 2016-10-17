/**
 * createPluginHandler - Creates a handler function that takes the context
 * parameter required by Sketch plugins and enhances it with a number of
 * helpful properties.
 *
 * @param {Function} func
 * @return {Function} A function suitable to be used as a Plugin handler
 */
// eslint-disable-next-line no-unused-vars
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
    };

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
 * createConfirmHandler - Creates a standard Day Player alert confirmation handler
 * function that takes a single param, the Alert being used at the time.
 *
 * @param {Object} props Configuration for the handler
 * @param {Function} func Optional function to run after all standard bits
 * @return {Function} A function suitable to be used as an Alert.onConfirm
 */
// eslint-disable-next-line no-unused-vars
const createConfirmHandler = function(props, func) {
  const urlBuilder = props.urlBuilder || function(parts) {
    return `${parts.protocol}${parts.host}/${parts.width}/${parts.height}`;
  };

  return function(alert) {
    const userChosenOptions = alert.views.filter(function(view) {
      return view.is('input');
    }).reduce(function(obj, view, i) {
      obj[view.name] = view.val();
      return obj;
    }, {});

    const opts = Object.assign({}, props.initOpts, userChosenOptions);
    const sizeDisplay = `${opts.width}x${opts.height}`;
    props.api.message(`Creating a ${sizeDisplay}px image from ${props.host}...`);

    const url = urlBuilder({
      protocol: 'https://',
      host: props.host,
      width: opts.width,
      height: opts.height
    });

    // const protocol = 'https://';
    // const url = `${protocol}${props.host}/${opts.width}/${opts.height}`;
    const img = props.group.newImage({
      frame: props.api.rectangle(opts.x, opts.y, opts.width, opts.height),
      name: `${props.host}-${sizeDisplay}`
    });

    // NOTE: Currently, image.imageURL does not seem to work or I'm just
    // trying to use it incorrectly. For now, I abstracted the underlying
    // function to utils as lowLevelSetImage.
    // TODO: img.imageURL(url);
    lowLevelSetImage(img, url);
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
// eslint-disable-next-line no-unused-vars
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
// eslint-disable-next-line no-unused-vars
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
