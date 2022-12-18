#!/bin/bash

echo "Starting SSH ..."
/usr/sbin/sshd

# Get environment variables to show up in SSH session
eval $(printenv | sed -n "s/^\([^=]\+\)=\(.*\)$/export \1=\2/p" | sed 's/"/\\\"/g' | sed '/=/s//="/' | sed 's/$/"/' >> /etc/profile)

echo "============== ENV VARS ==================="
printenv
echo "==========================================="

echo "Starting APP ..."
npm run start