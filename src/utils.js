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
    const selection = document.selectedLayers;
    const target = (selection.isEmpty) ? {group: document.selectedPage} :
      getTargetLayer(selection, context);

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
      return view.is('input') || view.is('select');
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
      height: opts.height,
      allParts: opts
    });

    const img = props.group.newImage({
      frame: new props.api.Rectangle(opts.x, opts.y, opts.width, opts.height),
      name: `${props.host}-${sizeDisplay}`
    });

    img.imageURL = NSURL.URLWithString(url);
  };
};

/**
 * Determine if appending image to an artboard, group, layer, or none.
 *
 * @param {Selection} selection The current Selection
 * @param {Object} context The current context
 * @return {Object} target The selected layers
 */
const getTargetLayer = function(selection, context) {
  var layers = [];

  selection.iterate(function(layer) {
    layers.push(layer);
  });

  // TODO: Currently we'll only create an image for a single layer selected. We
  // only grab the first one off the list of selections. In the future, we should
  // create an image for each selection.
  const firstLayer = layers[0];
  
  var target = {
    selection: selection,
    frame: (firstLayer.isShape) ? firstLayer.frame : null
  };

  if (firstLayer.isGroup) {
    target.group = firstLayer;
  } else {
    // FIXME: If the user has selected layer(s) that do not count as a group;
    // (shape, text, line, etc) we need to set the target.group to the parent
    // group of the selected layer(s).
    // The JS API does not currently offer a way to access the parentGroup of
    // a Layer object. To get around this, we use the low-level _object and
    // parentGroup() method.
    // Doing so gives us an unwrapped Sketch Object. We must use wrapObject to
    // ensure we return a wrapped object for the target.group.
    // In the future, it would be good to have a Layer.parentGroup getter.
    const api = context.api();
    const document = api.selectedDocument;
    target.group = api.wrapObject(firstLayer._object.parentGroup(), document);
  }

  return target;
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
