'use strict';

// eslint-disable-next-line no-unused-vars
const placeCage = createPluginHandler(function(props) {
  const alert = new Alert({
    message: 'PlaceCage Options',
    info: 'Customize the image of the best actor of all time that will be created.',
    iconUrl: props.api.resourceNamed('placecage.icns')
  });

  alert.runModal();
});
