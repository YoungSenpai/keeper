#!/usr/bin/env bash


if [[ $1 = 'POST' ]]
  then
    curl -H "Content-Type: application/json" \
      -d '{"phrase" :  "Test"}' \
      http://localhost:3000/
fi

if [[ $1 = 'PUT' ]]
  then
    curl -X PUT -H "Content-Type: application/json" \
    -d '{"phrase":"SUCC"}' \
    http://localhost:3000/$2
fi

if [[ $1 = 'DEL' ]]
  then
    curl -X "DELETE" http://localhost:3000/$2
fi

printf "\n"
