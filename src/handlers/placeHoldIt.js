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
    }),
    new Label({
      value: 'Text:'
    }),
    new TextField({
      name: 'text',
      value: 'placeholder'
    }),
    new Label({
      value: 'Background color:'
    }),
    new TextField({
      name: 'bgColor',
      value: 'aeaeae'
    }),
    new Label({
      value: 'Text color:'
    }),
    new TextField({
      name: 'color',
      value: '949494'
    })
  ];

  const onConfirm = createConfirmHandler({
    api: props.api,
    group: props.target.group,
    host: 'placehold.it',
    initOpts: initOpts,
    urlBuilder: function(parts) {
      var url = `${parts.protocol}${parts.host}/${parts.width}x${parts.height}/${parts.allParts.bgColor}/${parts.allParts.color}`;
      const text = parts.allParts.text;

      if (text.length) {
        url += `?text=${encodeURIComponent(text)}`;
      }

      return url;
    }
  });

  new Alert({
    message: 'Placehold.it Options',
    info: 'Customize the image that will be created.',
    iconUrl: props.api.resourceNamed('placeholdit.icns'),
    onConfirm: onConfirm
  }).append(elements).runModal();
});
