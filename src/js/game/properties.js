var npmProperties = require('../../../package.json');

module.exports = {
  title: 'Busyville',
  description: npmProperties.description,
  port: 3017,
  liveReloadPort: 3018,
  mute: false,
  showStats: false,
  size: {
    x: 800,
    y: 600
  }
};
