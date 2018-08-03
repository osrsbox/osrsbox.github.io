#!/bin/bash

set -e
rm -rf _site
bundle exec jekyll server --future --incremental --trace --host 0.0.0.0
