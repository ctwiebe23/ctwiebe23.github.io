#!/bin/bash

for SHIT in $(find .)
do
  SHIT=$(realpath $SHIT)
  [ -f "$SHIT" ] && mv $SHIT ${SHIT%%.*}.${SHIT##*.}
done
