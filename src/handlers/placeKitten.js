// eslint-disable-next-line no-unused-vars
const placeKitten = createPluginHandler(function(props) {
  const initOpts = props.newImgFrame;

  const elements = [
    new Label({
      value: 'Width:'
    }),
    new TextField({
      name: 'width',
      value: initOpts.width
    }),
    new Label({
      value: 'Height:'
    }),
    new TextField({
      name: 'height',
      value: initOpts.height
    })
  ];

  const onConfirm = createConfirmHandler({
    api: props.api,
    group: props.target.group,
    host: 'placekitten.com',
    initOpts: initOpts
  });

  new Alert({
    message: 'Place Kitten Options',
    info: 'Customize the kewl kitten image that will be created.',
    iconUrl: props.api.resourceNamed('placekitten.icns'),
    onConfirm: onConfirm
  }).append(elements).runModal();
});
