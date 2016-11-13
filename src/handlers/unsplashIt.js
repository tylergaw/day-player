// eslint-disable-next-line no-unused-vars
const unsplashIt = createPluginHandler(function(props) {
  const GREY_TITLE = 'Black & white';
  const BLUR_TITLE = 'Blurry';
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
    }),
    new Label({
      value: 'Sharpness:'
    }),
    new PopUpButton({
      name: 'blur',
      items: ['Focused', BLUR_TITLE]
    })
  ];

  const onConfirm = createConfirmHandler({
    api: props.api,
    group: props.target.group,
    host: 'unsplash.it',
    initOpts: initOpts,
    urlBuilder: function(parts) {
      const base = `${parts.protocol}${parts.host}`;
      // Cast as a string because the value coming back is an object
      const type = (String(parts.allParts.type) === GREY_TITLE) ? '/g' : '';
      const blur = (String(parts.allParts.blur) === BLUR_TITLE) ? '&blur' : '';
      return `${base}${type}/${parts.width}/${parts.height}?random${blur}`;
    }
  });

  new Alert({
    message: 'Unsplash.it Options',
    info: 'Customize the image that will be created.',
    iconUrl: props.api.resourceNamed('unsplashit.icns'),
    onConfirm: onConfirm
  }).append(elements).runModal();
});
