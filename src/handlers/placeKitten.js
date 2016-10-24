// eslint-disable-next-line no-unused-vars
const placeKitten = createPluginHandler(function(props) {
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
    host: 'placekitten.com',
    initOpts: initOpts,
    urlBuilder: function(parts) {
      const base = `${parts.protocol}${parts.host}`;
      // Cast as a string because the value coming back is an object
      const type = (String(parts.allParts.type) === GREY_TITLE) ? '/g' : '';
      return `${base}${type}/${parts.width}/${parts.height}`;
    }
  });

  new Alert({
    message: 'Place Kitten Options',
    info: 'Customize the kewl kitten image that will be created.',
    iconUrl: props.api.resourceNamed('placekitten.icns'),
    onConfirm: onConfirm
  }).append(elements).runModal();
});
