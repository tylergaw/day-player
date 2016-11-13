// eslint-disable-next-line no-unused-vars
const fillMurray = createPluginHandler(function(props) {
  const GREY_TITLE = 'Black & white';
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
    }),
    new Label({
      value: 'Type:'
    }),
    new PopUpButton({
      name: 'type',
      items: ['Color', GREY_TITLE]
    })
  ];

  const onConfirm = createConfirmHandler({
    api: props.api,
    group: props.target.group,
    host: 'fillmurray.com',
    initOpts: initOpts,
    urlBuilder: function(parts) {
      const base = `${parts.protocol}${parts.host}`;
      // Cast as a string because the value coming back is an object
      const type = (String(parts.allParts.type) === GREY_TITLE) ? '/g' : '';
      return `${base}${type}/${parts.width}/${parts.height}`;
    }
  });

  new Alert({
    message: 'Fill Murray Options',
    info: 'Customize the wonderful Bill Murray image that will be created.',
    iconUrl: props.api.resourceNamed('fillmurray.icns'),
    onConfirm: onConfirm
  }).append(elements).runModal();
});
