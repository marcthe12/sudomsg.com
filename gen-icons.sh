#!/bin/sh

convert -background none favicon/icon.svg -define icon:auto-resize favicon.ico
for i in 192 512
do 
    inkscape favicon/icon.svg --export-background="#8b0000" --export-width="$i" --export-filename="favicon/$i.png"
done