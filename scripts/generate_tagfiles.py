#!/usr/bin/env python

import glob
import os

print(">>> Starting...")

post_dir = '../_posts/'
tag_dir = '../blog/tags/'

filenames = glob.glob(post_dir + '*.md')

total_tags = []
for filename in filenames:
    print(">>> Processing: %s" % filename)
    current_tags = []
    f = open(filename, 'r')
    crawl = ""
    for line in f:
        line = line.strip()
        if line == 'tags:':
            crawl = "Start" 
            continue
        if crawl == "Start":
            if line.startswith("-"):
                tag = line.replace("- ", "")
                print("  > Found tag:", tag)
                current_tags.append(tag)
                total_tags.extend(current_tags)
            else:
                crawl = "Stop"
        if crawl == "Stop":
            break
    f.close()
total_tags = set(total_tags)

print(">>> Found the following tags:")
for tag in total_tags:
    print("  > %s" %tag)

old_tags = glob.glob(tag_dir + '*.md')

print(">>> Removing old tagfiles...")
for tag in old_tags:
    os.remove(tag)
    
if not os.path.exists(tag_dir):
    print(">>> Making tags directory in root blog folder...")
    os.makedirs(tag_dir)

print(">>> Generating new tagfiles...")
for tag in total_tags:
    tag_filename = tag_dir + tag + '.md'
    print("  > %s" % tag_filename)
    f = open(tag_filename, 'a')
    write_str = '---\nlayout: tagpage\ntitle: \"Blog Tags: ' + tag + '\"\ntag: ' + tag + '\nsitemap: false\nrobots: noindex\n---\n'
    f.write(write_str)
    f.close()
print(">>> Finished generating tagfiles...")
print("  > %d tagfiles made!" % total_tags.__len__())
