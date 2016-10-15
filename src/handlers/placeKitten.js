const placeKitten = createPluginHandler(function(props) {
  const alert = new Alert({
    message: 'Place Kitten Options',
    info: 'Customize the kewl kitten image that will be created.',
    iconUrl: props.api.resourceNamed('placekitten.icns')
  });

  alert.runModal();
});
