#!/usr/bin/env bash
set -e

[ -z "$NEAR_ENV" ] && echo "Missing \$NEAR_ENV environment variable" && exit 1
[ -z "$CONTRACT" ] && echo "Missing \$CONTRACT environment variable" && exit 1
[ -z "$OWNER" ] && echo "Missing \$OWNER environment variable" && exit 1

echo
echo 'About to call addSong() on the contract'
echo near call $CONTRACT addSong '{"artist":"$artist","songName":"$songName","description":"$description","albumName":"$albumName","genre":"$genre","label":"$label","country":"$country"}' --accountId $OWNER
echo
echo \$NEAR_ENV is $NEAR_ENV
echo \$CONTRACT is $CONTRACT
echo \$OWNER is $OWNER
echo \$artist is [ $artist ] '(the artist)'
echo \$songName is [ $songName ] '(the songName)'
echo \$description is [ $description ] '(the description)'
echo \$albumName is [ $albumName ] '(the albumName)'
echo \$genre is [ $genre ] '(the genre)'
echo \$label is [ $label ] '(the label)'
echo \$country is [ $country ] '(the country)'

echo
near call $CONTRACT addSong '{"artist":"'"$artist"'","songName":"'"$songName"'","description":"'"$description"'","albumName":"'"$albumName"'","genre":"'"$genre"'","label":"'"$label"'","country":"'"$country"'"}' --accountId $OWNER

echo
echo 'About to call addSubscriptionType() on the contract'
echo near call $CONTRACT addSubscriptionType '{"typeCode":"$typeCode","price":"$price","listenSongCount":$listenSongCount}' --accountId $OWNER
echo \$NEAR_ENV is $NEAR_ENV
echo \$CONTRACT is $CONTRACT
echo \$OWNER is $OWNER
echo \$typeCode is [ $typeCode ] '(type code like basic, premium,diamond )'
echo \$price is [ $price ] '(the price as yoctoNEAR)'
echo \$listenSongCount is [ $listenSongCount ] '(the listenSongCount like 500, 750 ,100)'

echo
near call $CONTRACT addSubscriptionType '{"typeCode":"'"$typeCode"'","price":"'"$price"'","listenSongCount":'$listenSongCount'}' --accountId $OWNER

exit 0
