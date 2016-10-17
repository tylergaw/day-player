// eslint-disable-next-line no-unused-vars
const placeHoldIt = createPluginHandler(function(props) {
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
    host: 'placehold.it',
    initOpts: initOpts,
    urlBuilder: function(parts) {
      return `${parts.protocol}${parts.host}/${parts.width}x${parts.height}`;
    }
  });

  new Alert({
    message: 'Placehold.it Options',
    info: 'Customize the image that will be created.',
    iconUrl: props.api.resourceNamed('placeholdit.icns'),
    onConfirm: onConfirm
  }).append(elements).runModal();
});
