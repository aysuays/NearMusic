#!/usr/bin/env bash

[ -z "$NEAR_ENV" ] && echo "Missing \$NEAR_ENV environment variable" && exit 1
[ -z "$USER" ] && echo "Missing \$USER environment variable" && exit 1

# exit on first error after this point
set -e

echo "completing raffle by $USER and setting $USER as beneficiary"
echo \$USER is $USER
echo \$subscriberId is [ $subscriberId ] '(the subscriber Id)'
echo \$songId is [ $songId ] '(the song Id)'
echo
near call $CONTRACT playSong '{"subscriberId":'$subscriberId',"songId":'$songId'}' --accountId $USER