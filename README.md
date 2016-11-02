# Day Player [![Build Status](https://travis-ci.org/tylergaw/day-player.svg)](https://travis-ci.org/tylergaw/day-player)
A Sketch Plugin for creating placeholder images from online services.

## Installation

[![](https://cl.ly/3E05283y3t0m/download/dayplayer-download.jpg) Download the latest version (3.0.0-rc.1)](http://day-player.s3-website-us-east-1.amazonaws.com/releases/DayPlayer-3.0.0-rc.1.zip)
- Unzip the file
- Double-click Day Player.sketchplugin to install

## What Does It Do?
It allows you to insert a customized placeholder image into any Sketch document from a number
of different placeholder image services.

 - [unsplash.it](http://unsplash.it/)
 - [placehold.it](http://placehold.it/)
 - [fillmurray.com](http://www.fillmurray.com/)
 - [placecage.com](http://www.placecage.com/)
 - [placekitten.com](http://placekitten.com/)

## Usage
 - Open a new or existing Sketch document
 - Plugins > Day Player > service...
 - Update the options to your liking, hit OK
 - The image is created on the canvas

If you want the image created on a specific artboard or within a group, select
that artboard or group before running the plugin.

-------

## Contributing to this project

As with most open source projects, pull requests for bug fixes, and new functionality are always welcome.

Prerequisites

- Node `5.x.x`+

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
