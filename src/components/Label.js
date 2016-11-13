/**
 * Label A facade for NSTextField without any editable styling. Includes a
 * number of convenience methods and a chainable interface.
 *
 * @param {Object} props Options for building the Label
 * @return {Object} label
 */
// eslint-disable-next-line no-unused-vars
const Label = function(props) {
  // eslint-disable-next-line no-unused-vars
  const propTypes = {
    frame: Object,
    value: String
  };

  /**
   * createLabel Internal method for creating new NSTextField
   *
   * @return {Object} NSTextField
   */
  const createLabel = function(frame) {
    const f = frame || {
      x: 4,
      y: 100,
      width: 350,
      height: 16
    };

    const textField = NSTextField.alloc().initWithFrame(
      NSMakeRect(f.x, f.y, f.width, f.height));

    textField.setDrawsBackground(false);
    textField.setEditable(false);
    textField.setBezeled(false);
    textField.setSelectable(true);

    return textField;
  };

  const label = {
    el: createLabel(props.frame),
    is: function(type) {
      return type === 'label';
    }
  };

  /**
   * setStringValue Sets the string value for the label.
   *
   * @param {String} value
   * @return {Object} label
   */
  label.setStringValue = function(value) {
    label.el.setStringValue(value);
    return label;
  };

  if (props.value) {
    label.setStringValue(props.value);
  }

  return label;
};
