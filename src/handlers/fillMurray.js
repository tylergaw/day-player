// eslint-disable-next-line no-unused-vars
const fillMurray = createPluginHandler(function(props) {
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
    host: 'fillmurray.com',
    initOpts: initOpts
  });

  new Alert({
    message: 'Fill Murray Options',
    info: 'Customize the wonderful Bill Murray image that will be created.',
    iconUrl: props.api.resourceNamed('fillmurray.icns'),
    onConfirm: onConfirm
  }).append(elements).runModal();
});
