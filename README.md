# Day Player
A collection of Sketch Plugins for creating placeholder images.

## What Does It Do?
It allows you to insert a customized placeholder image into any Sketch document from a number
of different placeholder image services.

 - [placehold.it](http://placehold.it/)
 - [lorempixel.com](http://lorempixel.com/)
 - [fillmurray.com](http://www.fillmurray.com/)
 - [placecage.com](http://www.placecage.com/)
 - [placekitten.com](http://placekitten.com/)
 - [unsplash.it](http://unsplash.it/)

![Screenshots of Day Player in use](http://f.cl.ly/items/0Q1x2l0k371C173X3U0g/dayplayer-screens.jpg)

## Installation
There are two different ways to install Day Player. Official Sketch Plugin installation
documentation can be found in the [plugin docs](http://bohemiancoding.com/sketch/support/developer/01-introduction/01.html).

### Git clone (best way to go)
 - Using a command line app (Terminal, iTerm, etc) navigate to the Sketch Plugins
 directory. This is different depending on your set up. If you're unsure, open
 Sketch and go to the Plugins menu > Reveal Plugins Folder
 - Once you're in the Plugins directory `git clone https://github.com/tylergaw/day-player.git` or your fork.
 - You can find the plugins in the Plugins Menu > day-player

### Zip download
 - If you're reading this on GitHub, there should be a Download Zip button to the
 right of this text. Download the zip file.
 - Open your Sketch Plugins folder by going to the Plugins menu > Reveal Plugins Folder
 - Unzip the Day Player zip file. Place the entire folder in the Sketch plugins folder
 - You can change the name of that folder to anything you want.
 - You can find the plugins in the Plugins Menu > day-player (or the name you gave it)

## Usage

 - Open a new or existing Sketch document
 - Plugins > Menu > day-player > Choose the service you want an image from
 - Update the options to your liking, hit OK
 - The image should be created on the canvas

If you want the image created on a specific artboard or within a group, select
the artboard or group before running the plugin.

## Sketch Requirements

Day Player 2.x works with Sketch 3.3+ only. If you are using an earlier version of Sketch, use Day Player 1.1.0.

You'll need the latest release of Sketch 3, version 3.0.2. It's in the App Store.
This version is needed because I'm making use of features that are available now
that they've switched from JSTalk to CocoaScript. Mainly the
[COSAlertWindow](https://github.com/ccgus/CocoaScript/tree/master/src/framework) class.
