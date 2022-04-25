#!/usr/bin/env bash
set -e

[ -z "$NEAR_ENV" ] && echo "Missing \$NEAR_ENV environment variable" && exit 1
[ -z "$CONTRACT" ] && echo "Missing \$CONTRACT environment variable" && exit 1

echo "These are the environment variables being used:"
echo
echo "CONTRACT is [ $CONTRACT ]"
echo
echo

echo "--------------------------------------------"
echo Report for $CONTRACT
echo "--------------------------------------------"
echo "near view \$CONTRACT getAllSongs '{}'"
near view $CONTRACT getAllSongs '{}'
echo

echo "near view \$CONTRACT getAllSubscribers '{}'"
near view $CONTRACT getAllSubscribers '{}'
echo
echo

echo "near view \$CONTRACT getAllSubscriptionTypes '{}'"
near view $CONTRACT getAllSubscriptionTypes '{}'
echo
echo