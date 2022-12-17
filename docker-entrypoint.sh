#!/bin/bash

echo "Starting SSH ..."
/usr/sbin/sshd

echo "Starting APP ..."
npm run start