@import './utils.js';
@import './components/Alert.js';

const fillMurray = createPluginHandler(function(props) {
  const alert = new Alert({
    message: 'Fill Murray Options',
    info: 'Customize the wonderful Bill Murray image that will be created.',
    iconUrl: props.api.resourceNamed('fillmurray.icns'),
    onConfirm: function(alert) {
      log('confirmed');
    }
  }).runModal();
});

const loremPixel = createPluginHandler(function(props) {
  const alert = new Alert({
    message: 'Lorem Pixel Options',
    info: 'Customize the image that will be created.',
    iconUrl: props.api.resourceNamed('lorempixel.icns')
  });

  alert.runModal();
});

const placeCage = createPluginHandler(function(props) {
  const alert = new Alert({
    message: 'PlaceCage Options',
    info: 'Customize the image of the best actor of all time that will be created.',
    iconUrl: props.api.resourceNamed('placecage.icns')
  });

  alert.runModal();
});

const placeHoldIt = createPluginHandler(function(props) {
  const alert = new Alert({
    message: 'Placehold.it Options',
    info: 'Customize the image that will be created.',
    iconUrl: props.api.resourceNamed('placeholdit.icns')
  });

  alert.runModal();
});

const placeKitten = createPluginHandler(function(props) {
  const alert = new Alert({
    message: 'Place Kitten Options',
    info: 'Customize the kewl kitten image that will be created.',
    iconUrl: props.api.resourceNamed('placekitten.icns')
  });

  alert.runModal();
});

const unsplashIt = createPluginHandler(function(props) {
  const alert = new Alert({
    message: 'Unsplash.it Options',
    info: 'Customize the image that will be created.',
    iconUrl: props.api.resourceNamed('unsplashit.icns')
  });

  alert.runModal();
});
