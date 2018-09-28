#!/bin/bash
set -e

# Remove the previous build in _site directory
rm -rf _site
# Execute the Jekyll server
bundle exec jekyll server JEKYLL_ENV=development jekyll build --drafts --future --incremental --host 192.168.1.100
#bundle exec jekyll server JEKYLL_ENV=development jekyll build --future --incremental --host 10.25.100.147
