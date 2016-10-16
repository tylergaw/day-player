/**
 * PopUpButton A facade for NSPopUpButton. Includes a number of convenience
 * methods and a chainable interface.
 *
 * @param {Object} props Options for building the PopUpButton
 * @return {Object} popUpButton
 */
const PopUpButton = function(props) {
  const propTypes = {
    items: Array
  };

  const popUpButton = {
    // NOTE: The documented signature is initWithFrame:pullsDown: but that
    // is undefined here. Think that's maybe a difference in CocoaScript?
    el: NSPopUpButton.alloc().initWithFrame(
      NSMakeRect(25, 100, 350, 25)
    )
  };

  if (props.items) {
    popUpButton.el.addItemsWithTitles(props.items);
  }

  return popUpButton;
};
