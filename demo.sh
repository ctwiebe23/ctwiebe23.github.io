#!/bin/bash

# ctw | 2024-06-30
# starts a python3 webserver and opens it in firefox

DATE="$(date -Iseconds | tr ':' '\-')"  # current date

FILES=(
  'index.js'
  'index.css'
  'utils/d3Utils.js'
  'utils/hasseUtils.js'
)

# js and css are not always updated with html; by putting the time in their
# filename we can ensure they are always up to date
for FILE in "${FILES[@]}"
do
  NAME="${FILE%.*}"; EXT="${FILE#*.}"  # name and file extension

  OLD="$(ls $NAME*.$EXT)"
  NEW="$NAME.${DATE::-6}.$EXT"         # trim the last 6 chars from the date

  # rename file and update references
  mv "$OLD" "$NEW"
  sed -i "s%$NAME.*[.]$EXT%$NEW%" 'index.html' 'index'*'.js'
done

python3 -m 'http.server' 3000 &  # open python3 webserver on localhost 3000
sleep 0.2                        # wait for html to load
firefox 'http://0.0.0.0:3000/'   # open localhost in firefox

# the id of the python3 webserver
ID="$(ps | grep 'python3' | xargs | cut -d ' ' -f 1)"

trap "kill $ID" EXIT  # on exit kill webserver

for ((;;))  # loop until program is killed
do
  sleep 0.1
done
