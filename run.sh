#!/bin/bash

if [ -n "$NODE_ENV" ]; then
  npm run start
else
  rake db:migrate
  rails s -p $PORT
fi
