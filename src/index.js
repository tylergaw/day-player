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

/*
{
  "name": "Placehold.it",
  "script": "src/index.js",
  "handler": "placeHoldIt",
  "identifier": "place-hold-it"
},
{
  "name": "Placekitten",
  "script": "src/index.js",
  "handler": "placeKitten",
  "identifier": "place-kitten"
},
{
  "name": "Unsplash.it",
  "script": "src/index.js",
  "handler": "unsplashIt",
  "identifier": "unsplash-it"
}
*/
