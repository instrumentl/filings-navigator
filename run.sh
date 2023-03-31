#!/bin/bash

if [ -n "$NODE_ENV" ]; then
  npm run start
else
  rails s -p $PORT
fi
