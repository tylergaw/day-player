// eslint-disable-next-line no-unused-vars
const loremPixel = createPluginHandler(function(props) {
  const alert = new Alert({
    message: 'Lorem Pixel Options',
    info: 'Customize the image that will be created.',
    iconUrl: props.api.resourceNamed('lorempixel.icns')
  });

  alert.runModal();
});
