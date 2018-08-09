#!/bin/bash
set -e

# Remove the previous build in _site directory
rm -rf _site
# Execute the Jekyll server
bundle exec jekyll server JEKYLL_ENV=development jekyll build --future --incremental --host 0.0.0.0
