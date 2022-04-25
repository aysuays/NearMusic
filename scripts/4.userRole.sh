#!/usr/bin/env bash

[ -z "$NEAR_ENV" ] && echo "Missing \$NEAR_ENV environment variable" && exit 1
[ -z "$CONTRACT" ] && echo "Missing \$CONTRACT environment variable" && exit 1
[ -z "$USER" ] && echo "Missing \$USER environment variable" && exit 1


# exit on first error after this point
set -e

echo --------------------------------------------
echo
echo "creating Subscriber"
echo \$USER is $USER
echo
near call $CONTRACT createSubscriber '{}' --accountId $USER

echo --------------------------------------------
echo
echo "buy Subscription"
echo \$USER is $USER
echo \$subscriberId is [ $subscriberId ] '(the subscriber Id)'
echo \$subscriptionTypeId is [ $subscriptionTypeId ] '(the subscriptionType Id)'
echo \$attachmentDeposit is [ $attachmentDeposit ] '(the attachment deposit, like 3)'
echo
near call $CONTRACT buySubscription '{"subscriberId":'$subscriberId',"subscriptionTypeId":'$subscriptionTypeId'}' --accountId $USER --deposit $attachmentDeposit
exit 0
