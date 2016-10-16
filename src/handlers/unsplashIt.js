// eslint-disable-next-line no-unused-vars
const unsplashIt = createPluginHandler(function(props) {
  const alert = new Alert({
    message: 'Unsplash.it Options',
    info: 'Customize the image that will be created.',
    iconUrl: props.api.resourceNamed('unsplashit.icns')
  });

  alert.runModal();
});
