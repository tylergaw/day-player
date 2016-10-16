/**
 * Alert A facade for NSAlert. Includes a number of convenience methods and a
 * chainable interface.
 *
 * @param {Object} props Options for building the Alert and handling user input
 * @return {Object} alert
 */
// eslint-disable-next-line no-unused-vars
const Alert = function(props) {
  // eslint-disable-next-line no-unused-vars
  const propTypes = {
    message: String,
    info: String,
    iconUrl: String,
    onConfirm: Function,
    onCancel: Function
  };

  const alert = {
    views: [],
    el: NSAlert.alloc().init()
  };

  const buttons = props.buttons || ['OK', 'Cancel'];

  alert.layout = function() {
    var containerHeight = 1;
    const container = NSView.alloc().initWithFrame(
      NSMakeRect(25, 100, 350, containerHeight)
    );

    alert.views.forEach(function(view) {
      const el = view.el;
      const bounds = el.bounds();
      bounds.origin.y = containerHeight;
      containerHeight += bounds.size.height + 8;
      el.setFrame(bounds);
      container.addSubview(el);
    });

    const containerFrame = container.frame();
    containerFrame.size.height = containerHeight;
    container.setFrame(containerFrame);

    alert.el.setAccessoryView(container);
  };

  alert.runModal = function() {
    // Call layout before running opening the modal to account for any
    // dynamic layout
    alert.layout();

    const onConfirm = props.onConfirm || function() {};
    const onCancel = props.onCancel || function() {};
    const res = parseInt(alert.el.runModal(), 10);
    const resHandler = (res === 1000) ? onConfirm : onCancel;
    resHandler(alert);

    return alert;
  };

  /**
   * append Adds an element or elements to the Alert
   *
   * @param {Object|Array} newEl Either a single element or an array of elements.
   * @return {Object} alert
   */
  alert.append = function(newEl) {
    const newViews = Array.isArray(newEl) ? newEl.reverse() : [newEl];

    newViews.forEach(function(el) {
      alert.views.push(el);
    });

    return alert;
  };

  if (buttons.length) {
    for (var i = 0; i < buttons.length; i += 1) {
      alert.el.addButtonWithTitle(buttons[i]);
    }
  }

  if (props.message) {
    alert.el.setMessageText(props.message);
  }

  if (props.info) {
    alert.el.setInformativeText(props.info);
  }

  if (props.iconUrl) {
    alert.el.setIcon(NSImage.alloc().initByReferencingURL(props.iconUrl));
  }

  return alert;
};
