const placeHoldIt = createPluginHandler(function(props) {
  const alert = new Alert({
    message: 'Placehold.it Options',
    info: 'Customize the image that will be created.',
    iconUrl: props.api.resourceNamed('placeholdit.icns')
  });

  alert.runModal();
});
