# Day Player [![Build Status](https://travis-ci.org/tylergaw/day-player.svg)](https://travis-ci.org/tylergaw/day-player)
A Sketch Plugin for creating placeholder images from online services.

## Installation

- [Download the latest version (3.0.0-alpha.6)](http://day-player.s3-website-us-east-1.amazonaws.com/releases/DayPlayer-3.0.0-alpha.6.zip)
- Unzip the file
- Double-click Day Player.sketchplugin to install

## What Does It Do?
It allows you to insert a customized placeholder image into any Sketch document from a number
of different placeholder image services.

 - [placehold.it](http://placehold.it/)
 - [fillmurray.com](http://www.fillmurray.com/)
 - [placecage.com](http://www.placecage.com/)
 - [placekitten.com](http://placekitten.com/)
 - [unsplash.it](http://unsplash.it/)

![Screenshots of Day Player in use](http://f.cl.ly/items/0Q1x2l0k371C173X3U0g/dayplayer-screens.jpg)

## Installation

## Usage
 - Open a new or existing Sketch document
 - Plugins > Day Player > service...
 - Update the options to your liking, hit OK
 - The image should be created on the canvas

If you want the image created on a specific artboard or within a group, select
that artboard or group before running the plugin.

-------

## Contributing to this project

As with most open source projects, pull requests for bug fixes, and new functionality are always welcome.

Prerequisites

- Node `5.x.x`+
- npm `3.x.x`+

Fork this repo and clone a local copy of your fork.

Create necessary application bundle from source by running:

```
make install
```

Watch the `src` and `resources` directories and recompile when changes are made by running:

```
make watch
```

`make install` and `make watch` will copy the application bundle to the default Sketch plugins location `~/Library/Application Support/com.bohemiancoding.sketch3/Plugins/` as `Day Player.sketchplugin`.

See the `Makefile` for further details on the build process.
