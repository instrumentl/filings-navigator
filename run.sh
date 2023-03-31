#!/bin/bash

if [ -n "$NODE_ENV" ]; then
  npm run start
else
  rails s -p 3000
fi
