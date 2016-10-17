// eslint-disable-next-line no-unused-vars
const fillMurray = createPluginHandler(function(props) {
  const host = 'fillmurray.com';

  const api = props.api;
  const group = props.target.group;
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

  const alert = new Alert({
    message: 'Fill Murray Options',
    info: 'Customize the wonderful Bill Murray image that will be created.',
    iconUrl: api.resourceNamed('fillmurray.icns'),
    onConfirm: function(a) {
      const userChosenOptions = a.views.filter(function(view) {
        return view.is('input');
      }).reduce(function(obj, view, i) {
        obj[view.name] = view.val();
        return obj;
      }, {});

      const opts = Object.assign({}, initOpts, userChosenOptions);

      const sizeDisplay = `${opts.width}x${opts.height}`;
      const protocol = 'https://';
      const url = `${protocol}${host}/${opts.width}/${opts.height}`;
      api.message(`Creating a ${sizeDisplay}px image from ${host}...`);

      const img = group.newImage({
        frame: api.rectangle(opts.x, opts.y, opts.width, opts.height),
        name: `${host}-${sizeDisplay}`
      });

      // NOTE: Currently, image.imageURL does not seem to work or I'm just
      // trying to use it incorrectly. For now, I abstracted the underlying
      // function to utils as lowLevelSetImage.
      // TODO: img.imageURL(url);
      lowLevelSetImage(img, url);
    }
  });

  alert.append(elements).runModal();
});
