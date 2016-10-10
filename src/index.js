@import './components/Alert.js';

const defaultButtons = ['OK', 'Cancel'];

const fillMurray = function(context) {
  const alert = new Alert({
    buttons: defaultButtons,
    message: 'Fill Murray Options',
    info: 'Customize the wonderful Bill Murray image that will be created.',
    icon: 'fillmurray.icns'
  }, context);

  alert.runModal();
};

const loremPixel = function(context) {
  const alert = new Alert({
    buttons: defaultButtons,
    message: 'Lorem Pixel Options',
    info: 'Customize the image that will be created.',
    icon: 'lorempixel.icns'
  }, context);

  alert.runModal();
};

const placeCage = function(context) {
  const alert = new Alert({
    buttons: defaultButtons,
    message: 'PlaceCage Options',
    info: 'Customize the image of the best actor of all time that will be created.',
    icon: 'placecage.icns'
  }, context);

  alert.runModal();
};

const placeHoldIt = function(context) {
  const alert = new Alert({
    buttons: defaultButtons,
    message: 'Placehold.it Options',
    info: 'Customize the image that will be created.',
    icon: 'placeholdit.icns'
  }, context);

  alert.runModal();
};

const placeKitten = function(context) {
  const alert = new Alert({
    buttons: defaultButtons,
    message: 'Place Kitten Options',
    info: 'Customize the kewl kitten image that will be created.',
    icon: 'placekitten.icns'
  }, context);

  alert.runModal();
};

const unsplashIt = function(context) {
  const alert = new Alert({
    buttons: defaultButtons,
    message: 'Unsplash.it Options',
    info: 'Customize the image that will be created.',
    icon: 'unsplashit.icns'
  }, context);

  alert.runModal();
};
