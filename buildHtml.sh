#!/bin/bash

# ctw // 2024-07-30
# builds html from a template file and multiple pages

set -eu

[ ! -f "$1" ]             && echo "$1 does not exist"                 && exit 1
[ ! "${1##*.}" = 'html' ] && echo "$1 is not an HTML file"            && exit 2
[ ! -d "$2" ]             && echo "$2 is not a directory"             && exit 3
[ "$2" = "$3" ]           && echo "target directory cannot be source" && exit 4

BASE="$(IFS=''; cat "$1")"
DESTINATION="$(realpath "$3")"

[ ! -d "$DESTINATION" ] && mkdir "$DESTINATION"

cd "$2"

for SOURCE in $(ls *'.html' | grep -v "^$(basename "$1")$")
do
  echo "${BASE//'{{body}}'/$(cat $SOURCE)}" > "$DESTINATION/$SOURCE"
done
