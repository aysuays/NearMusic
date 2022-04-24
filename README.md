# NearMusic - Near Protocol
Unlike classical music listening applications it is an app where you pay for the number of music listening without paying a monthly fee ...
# Roles
## Admin Usage
- Create songs with song name, artist name, genre, description etc. fields. Then may modify, inactivate them.
- EDetermines and creates membership types.

## User Usage
- Creates membership, buy subscription types so buys the right to play songs. Also may checks/list songs, account details.

# Models
## Song
| Name | Type |
| ------ | ------ |
| owner | AccountId |
| artist | String |
| songName | String |
| Description | String |
| albumName | String |
| genre | String |
| label | String |
| country | String |
| isActive | bool |
| CreatedDate | Timestamp |
| ModifiedDate | Timestamp |
| DeletedDate | Timestamp |
##  SubscriptionType
| Name | Type |
| ------ | ------ |
| owner | AccountId |
| typeCode | String |
| price | Money |
| listenSongCount | i32 |
| CreatedDate | Timestamp |
| ModifiedDate | Timestamp |
| DeletedDate | Timestamp |
##  Subscriber
| Name | Type |
| ------ | ------ |
| owner | AccountId |
| subscriptionType | i32 |
| remainingListenSongCount | i32 |
| CreatedDate | Timestamp |
| ModifiedDate | Timestamp |
# Build and devDeploy
```
yarn
yarn build:release
near dev-deploy ./build/release/nearMusic.wasm
export CONTRACT=<AccountId>
echo $CONTRACT
```
# Creating Accounts
```ts
near create-account <subAccName1>.<AccountName>.testnet --masterAccount <AccountName>.testnet --initialBalance 10
near create-account <subAccName2>.<AccountName>.testnet --masterAccount <AccountName>.testnet --initialBalance 10

near state <subAccName1>.<AccountName>.testnet
near state <subAccName2>.<AccountName>.testnet
near state <AccountName>.testnet

near send <AccountName>.testnet <subAccName1>.<AccountName>.testnet 10
near delete <subAccName1>.<AccountName>.testnet <AccountName>.testnet
near delete <subAccName2>.<AccountName>.testnet <AccountName>.testnet
```
# Functions Usage
Initializing
```ts
near call $CONTRACT init --accountId aysug.testnet
```
Adding Song
```ts
near call $CONTRACT addSong '{"artist":"Beyonce","songName":"Crazy in love","description":"feat JayZ","albumName":"Dangerous in love","genre":"R&B","label":"Sony Music","country":"USA"}' --accountId aysug.testnet
```
Modifying Song
```ts
near call $CONTRACT modifySong '{"songId":0,"artist":"Beyonce","songName":"Crazy in love","description":"feat JayZ MODIFIED","albumName":"Crazy in love","genre":"R&B","label":"Sony Music","country":"USA"}' --accountId aysug.testnet
```
Inactivating Song
```ts
near call $CONTRACT inactivateSong '{"songId":0}' --accountId aysug.testnet
```
Getting All Songs
```ts
near view $CONTRACT getAllSongs
```
Getting Songs With Parameters
```ts
near view $CONTRACT getSongsBySongId '{"songId":0}'
near view $CONTRACT getSongsByArtistName '{"artistName":"Beyonce"}'
near view $CONTRACT getSongsBySongName '{"songName":"Crazy in love"}'
near view $CONTRACT getSongsByAlbumName '{"albumName":"Crazy in love"}'
```
Creating Subscriber
```ts
near call $CONTRACT createSubscriber --accountId sub1.aysug.testnet
```
Buyying Subscription
```ts
near call $CONTRACT buySubscription '{"subscriberId":0,"subscriptionTypeId":0}' --accountId sub1.aysug.testnet --deposit 3
```
Getting All Subscribers
```ts
near view $CONTRACT getAllSubscribers
```
Getting Subscribers With Parameter
```ts
near view $CONTRACT getSubscribersBySubscriberId '{"subscriberId":0}'
near view $CONTRACT getSubscribersByAccountId '{"AccountId":"sub1.aysug.testnet"}'
```
Adding Subscription Type
```ts
near call $CONTRACT addSubscriptionType '{"typeCode":"Basic","price":"500000000000000000000000","listenSongCount":500}' --accountId aysug.testnet
```
Modifying Subscription Type
```ts
near call $CONTRACT modifySubscriptionType '{"subscriptionTypeId":3,"typeCode":"Old Type MODIFIED","price":"100000000000000000000000","listenSongCount":100}' --accountId aysug.testnet
```
Getting All Subscription Type
```ts
near view $CONTRACT getAllSubscriptionTypes '{}'
```
Getting All Subscription Type By Type Id
```ts
near view $CONTRACT getSubscriptionTypesByTypeID '{"subscriptionTypeId":2}'
```







