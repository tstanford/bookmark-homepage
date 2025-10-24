#!/bin/sh

# This script is used in the docker image to dynamically set application environment variables and make them available on the client.
# See public/vars.js

for var in `env | grep ^BMS_ | cut -d= -f1` 
do
    echo $var
    sed -Ei "s|($var: )\\\".*\\\"|\\1\\\"$(printenv $var)\\\"|g" /usr/share/nginx/html/vars.js
done

