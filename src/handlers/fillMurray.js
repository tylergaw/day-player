const fillMurray = createPluginHandler(function(props) {
  const host = 'fillmurray.com';

  const api = props.api;
  const group = props.target.group;
  const frame = props.newImgFrame;

  const alert = new Alert({
    message: 'Fill Murray Options',
    info: 'Customize the wonderful Bill Murray image that will be created.',
    iconUrl: api.resourceNamed('fillmurray.icns'),
    onConfirm: function(a) {
      log(a.views);
      const sizeDisplay = `${frame.width}x${frame.height}`;
      const protocol = 'https://';
      const url = `${protocol}${host}/${frame.width}/${frame.height}`;
      api.message(`Creating a ${sizeDisplay}px image from ${host}...`);

      const img = group.newImage({
        frame: api.rectangle(frame.x, frame.y, frame.width, frame.height),
        name: `${host}-${sizeDisplay}`
      });

      // NOTE: Currently, image.imageURL does not seem to work or I'm just
      // trying to use it incorrectly. For now, I abstracted the underlying
      // function to utils as lowLevelSetImage.
      // TODO: img.imageURL(url);
      lowLevelSetImage(img, url);
    }
  });

  const elements = [
    new Label({
      value: 'Width:'
    }),
    new TextField({
      value: frame.width
    }),
    new Label({
      value: 'Height:'
    }),
    new TextField({
      value: frame.height
    })
  ];

  alert.append(elements).runModal();
});
