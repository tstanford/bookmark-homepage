#!/bin/sh

for var in `env | grep ^BMS_ | cut -d= -f1` 
do
    echo $var
    sed -Ei "s|($var: )\\\".*\\\"|\\1\\\"$(printenv $var)\\\"|g" /usr/share/nginx/html/vars.js
done

