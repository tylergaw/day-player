const Alert = function(props) {
  const alert = {
    views: [],
    // Cocoa element
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
    alert.layout();
    alert.el.runModal();
  };

  alert.append = function(newEl) {
    alert.views.push(newEl);
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
