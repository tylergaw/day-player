/**
 * createPluginHandler - Creates a handler function that takes the single context
 * parameter required by Sketch plugins and enhances it with a number of helpful
 * properties.
 *
 * @param {Function} func
 * @return {Function} A function suitable to be used as a Plugin handler
 */
const createPluginHandler = function(func) {
  return function(context) {
    const sketch = context.api();
    const document = sketch.selectedDocument;

    const props = {
      api: context.api(),
      document: document,
      selection: document.selectedLayers,
      page: document.selectedPage,
      context: context
    };

    func(props);
  };
};

/**
 * Determine if we're appending image to an artboard, group, or page.
 */
// const getElToAppendTo = function() {
//   var app = NSApplication.sharedApplication();
//   var el = null;
//   var s = sketch.selection;
//
//   if (s.count() == 0) {
//     el = context.document.currentPage();
//   }
//   else {
//     var type = s[0].className();
//
//     if (type == 'MSArtboardGroup' || type == 'MSLayerGroup') {
//       el = s[0];
//     }
//     else {
//       app.displayDialog_withTitle("You'll need to select an artboard or a group or you can select nothing and we'll add the image to the current page.", "Invalid Selection");
//     }
//   }
//
//   return el;
// };

/**
 * dumpObj - Introspect objects
 * @param {Object} obj
 */
const dumpObj = function(obj) {
  log('######################################################################');
  log('## Dumping object ' + obj);
  log('######################################################################');
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
