/**
 * TextField A facade for NSTextField. Includes a number of convenience
 * methods and a chainable interface.
 *
 * @param {Object} props Options for building the TextField
 * @return {Object} textField
 */
const TextField = function(props) {
  const propTypes = {
    frame: Object,
    value: String
  };

  /**
   * createTextField Internal method for creating new NSTextField
   *
   * @return {Object} NSTextField
   */
  const createTextField = function(frame) {
    const f = frame || {
      x: 25,
      y: 100,
      width: 350,
      height: 25
    };

    return NSTextField.alloc().initWithFrame(
      NSMakeRect(f.x, f.y, f.width, f.height));
  };

  const textField = {
    el: createTextField(props.frame)
  };

  /**
   * setStringValue Sets the string value for the textField.
   *
   * @param {String} value
   * @return {Object} textField
   */
  textField.setStringValue = function(value) {
    textField.el.setStringValue(value);
    return textField;
  };

  if (props.value) {
    textField.setStringValue(props.value);
  }

  return textField;
};
