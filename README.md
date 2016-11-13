# Day Player [![Build Status](https://travis-ci.org/tylergaw/day-player.svg)](https://travis-ci.org/tylergaw/day-player)
A Sketch Plugin for creating placeholder images from online services.

## Installation

[![](https://cl.ly/3E3y0L291G2C/dayplayer-sketch.png) Download the latest version (3.0.0-rc.2)](http://day-player.s3-website-us-east-1.amazonaws.com/releases/DayPlayer-3.0.0-rc.2.zip)
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
 - Plugins > Day Player > Service...
 - Update the options to your liking, OK/Enter
 - The image is created on the canvas

![Animated gif showing basic Day Player usage](https://d3vv6lp55qjaqc.cloudfront.net/items/1q2S3E2B333G2m382A1v/Screen%20Recording%202016-11-13%20at%2001.52%20PM.gif)

### Appending images to an Artboard or Group
- Open a new or existing Sketch document
- Select the Artboard or Group
- Plugins > Day Player > Service...
- Update the options to your liking, OK/Enter
- The image is created within the Artboard or Group
- Image will be placed in the top left corner of the Artboard or Group

**Artboard:**

![Animated gif showing Day Player usage on Artboard](https://d3vv6lp55qjaqc.cloudfront.net/items/2P1n0t0H1o0y0E1J1I3t/Screen%20Recording%202016-11-13%20at%2001.58%20PM.gif)

**Group:**

![Animated gif showing Day Player usage on Group](https://d3vv6lp55qjaqc.cloudfront.net/items/3W0l0d0t322B1n0p1a3V/Screen%20Recording%202016-11-13%20at%2002.00%20PM.gif)

### Creating images with dimensions and position of existing Layers
- Open a new or existing Sketch document
- Select the desired Layer
- Plugins > Day Player > Service...
- Update the options to your liking, OK/Enter
- The image is created in the parent group of the selected layer
- Image will inherit the x, y, width, and height of the selected layer

![Animated gif showing Day Player existing layer usage](https://d3vv6lp55qjaqc.cloudfront.net/items/0c1x3l0m1r473F1s0q1h/Screen%20Recording%202016-11-13%20at%2002.10%20PM.gif)

### Advanced Service Options

All services offer width, height, and black & white / color options. Unsplash.it and Placehold.it offer further options to customize the placeholder images.

**Unsplash.it:**

![Animated gif showing Day Player Unsplash.it usage](https://d3vv6lp55qjaqc.cloudfront.net/items/3a1g161P1S0r0J2g030Y/Screen%20Recording%202016-11-13%20at%2002.15%20PM.gif)

**Placehold.it:**

![Animated gif showing Day Player Placehold.it usage](https://d3vv6lp55qjaqc.cloudfront.net/items/2H2w0o3U2A1U3D2Q3B1t/Screen%20Recording%202016-11-13%20at%2002.18%20PM.gif)

-------

## Contributing to this project

As with most open source projects, pull requests for bug fixes, and new functionality are always welcome.

Prerequisites

- Node `5.x.x`+

Fork this repo and clone a local copy of your fork.

Install dependencies:

```
npm install
```

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
