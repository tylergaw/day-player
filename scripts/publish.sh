#!/bin/bash
S3_BUCKET="s3://day-player"

make build
aws s3 cp ./DayPlayer.zip $S3_BUCKET/releases/DayPlayer-$TRAVIS_TAG.zip
