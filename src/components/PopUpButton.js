/**
 * PopUpButton A facade for NSPopUpButton. Includes a number of convenience
 * methods and a chainable interface.
 *
 * @param {Object} props Options for building the PopUpButton
 * @return {Object} popUpButton
 */
// eslint-disable-next-line no-unused-vars
const PopUpButton = function(props) {
  // eslint-disable-next-line no-unused-vars
  const propTypes = {
    items: Array
  };

  const popUpButton = {
    // NOTE: The documented signature is initWithFrame:pullsDown: but that
    // is undefined here. Think that's maybe a difference in CocoaScript?
    el: NSPopUpButton.alloc().initWithFrame(
      NSMakeRect(25, 100, 350, 25)
    ),
    is: function(type) {
      return type === 'select';
    }
  };

  if (props.items) {
    popUpButton.el.addItemsWithTitles(props.items);
  }

  return popUpButton;
};
