#!/bin/bash

echo ">>> Removing content from osrsbox.github.io"
rm -rf ~/osrsbox.github.io/*

echo ">>> Copying site content to osrsbox.github.io"
cp -R ./* ~/osrsbox.github.io/

echo ">>> Removing drafts from osrsbox.github.io"
rm -rf ~/osrsbox.github.io/_drafts
