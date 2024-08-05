#!/bin/bash

# ctw // 2024-06-30
# starts a python3 webserver and opens it in firefox

[ ! -f 'index.html' ] && echo 'not a valid directory' && exit 1

./buildHtml.sh 'base-layout.html' 'pages' 'target' -c  # compile HTML

DATE="$(date -Iseconds | tr ':' '\-')"  # current date

FILES=(
  'javascript/index.js'
  'styles/index.css'
  'target/'*
  'images/'*
)

# js and css are not always updated with html; by putting the time in their
# filename we can ensure they are always up to date
for FILE in "${FILES[@]}"
do
  [ -d "$FILE" ] && continue  # skip directories

  NAME="${FILE%%.*}"; EXT="${FILE##*.}"  # name and file extension
  NEW="$NAME.${DATE::-6}.$EXT"          # trim the last 6 chars from the date

  if [ -f "$FILE" ]
  then
    OLD="$FILE"
  else
    OLD="$(ls "$NAME."*".$EXT")"
  fi

  # rename file and update references
  mv "$OLD" "$NEW"
  sed -i "s%$NAME[.].*$EXT%$NEW%" 'index.html' 'target/'*
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
