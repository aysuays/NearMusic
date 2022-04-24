import { PersistentVector, storage, context, RNG, logging, u128, ContractPromiseBatch } from "near-sdk-as";
import { AccountId, Money } from "../../utils";
import { Song, Subscriber, SubscriptionType } from "./model";

@nearBindgen
export class Contract {
  private songs: PersistentVector<Song> = new PersistentVector<Song>('s99');
  private subscribers: PersistentVector<Subscriber> = new PersistentVector<Subscriber>('sb99');
  private subscriptionTypes: PersistentVector<SubscriptionType> = new PersistentVector<SubscriptionType>('t99');

  @mutateState()
  init(): void {
    this.assert_init()
    storage.set<AccountId>("owner", context.sender.toString())
    logging.log(`Init Success. Owner is ${storage.getSome<AccountId>("owner")}`)
  }

  /****************Song Functions******************/
  @mutateState()
  addSong(artist: String, songName: String, description: String, albumName: String, genre: String, label: String, country: String): Song {
    let newSong = new Song(artist, songName, description, albumName, genre, label, country);
    let index = this.songs.push(newSong);
    logging.log(`Success. New song id: ${index} added by ${storage.getSome<AccountId>("owner")}`);
    return newSong;
  }

  @mutateState()
  modifySong(songId:i32, artist: String, songName: String, description: String, albumName: String, genre: String, label: String, country: String): Song {
    this.assert_songOwner(this.songs[songId]);
    this.assert_songId(songId);
    this.assert_song_is_active(this.songs[songId]);
    let newSong = new Song(artist, songName, description, albumName, genre, label, country);
    newSong.modifiedDate = context.blockTimestamp;
    this.songs.replace(songId,newSong);
    logging.log(`Success. Modified song id: ${songId} modified by ${storage.getSome<AccountId>("owner")}`);
    return this.songs[songId];
  }

  @mutateState()
  inactivateSong(songId:i32): Song{
    this.assert_songOwner(this.songs[songId]);
    this.assert_songId(songId);
    this.assert_song_is_active(this.songs[songId]);
    let element = this.songs[songId];
    element.isActive = false;
    element.deletedDate = context.blockTimestamp;
    this.songs.replace(songId,element);
    logging.log(`Success. inactivate song id: ${songId} inactivated by ${storage.getSome<AccountId>("owner")}`);
    return this.songs[songId];
  }

  getSongsBySongId(songId:i32): Song | null{
    this.assert_songId(songId);
    return this.songs[songId];
  }

  getSongsByArtistName(artistName:String): Array<Song>{
    let result = new Array<Song>();
    for (let i = 0; i < this.songs.length; i++) {
      const element = this.songs[i];
      if(element.artist==artistName){
        result.push(element);
      }
    }
    return result;
  }

  getSongsBySongName(songName:String): Array<Song>{
    let result = new Array<Song>();
    for (let i = 0; i < this.songs.length; i++) {
      const element = this.songs[i];
      if(element.songName==songName){
        result.push(element);
      }
    }
    return result;
  }

  getSongsByAlbumName(albumName:String): Array<Song>{
    let result = new Array<Song>();
    for (let i = 0; i < this.songs.length; i++) {
      const element = this.songs[i];
      if(element.albumName==albumName){
        result.push(element);
      }
    }
    return result;
  }

  getAllSongs(): Array<Song>{
    let result = new Array<Song>();
    for (let i = 0; i < this.songs.length; i++) {
      const entry = this.songs[i];
      result.push(entry);
    }
    return result;
  }

/*****************Subscription Functions*****************/
  @mutateState()
  createSubscriber(): Subscriber {
    let newSubscriber = new Subscriber();
    let index = this.subscribers.push(newSubscriber);
    logging.log(`Success. New Subscriber id: ${index} added by ${storage.getSome<AccountId>("owner")}`);
    return newSubscriber;
  }

  @mutateState()
  buySubscription(subscriberId:i32,subscriptionTypeId:i32): Subscriber {
    this.assert_enoughDeposit(this.subscriptionTypes[subscriptionTypeId].price)
    this.assert_subscriberId(subscriberId);
    this.assert_subscriptionTypeId(subscriptionTypeId);
    const sOwner: AccountId = storage.getSome<AccountId>("owner")
    ContractPromiseBatch.create(sOwner).transfer(this.subscriptionTypes[subscriptionTypeId].price);
    let buyyerSubscriber = this.subscribers[subscriberId];
    let listenSongCount = this.subscriptionTypes[subscriptionTypeId].listenSongCount;
    buyyerSubscriber.remainingListenCount = buyyerSubscriber.remainingListenCount + listenSongCount;
    buyyerSubscriber.modifiedDate = context.blockTimestamp;
    this.subscribers.replace(subscriberId,buyyerSubscriber);
    logging.log(`Success. New subscriber id: ${subscriberId} added by ${storage.getSome<AccountId>("owner")}`);
    return buyyerSubscriber;
  }

  @mutateState()
  playSong(subscriberId:i32, songId:i32): Song{
    this.assert_subscriberId(subscriberId);
    this.assert_songId(songId);
    this.assert_remainingListenCount(subscriberId);
    let element = this.subscribers[subscriberId];
    element.remainingListenCount = element.remainingListenCount-1;
    element.modifiedDate = context.blockTimestamp;
    this.subscribers.replace(subscriberId,element);
    logging.log(`Success. Playing song id: ${songId} played by ${storage.getSome<AccountId>("owner")}`);
    return this.songs[songId];
  }

  getSubscribersBySubscriberId(subscriberId:i32): Subscriber | null{
    this.assert_subscriberId(subscriberId);
    return this.subscribers[subscriberId];
  }

  getSubscribersByAccountId(AccountId:AccountId): Array<Subscriber>{
    let result = new Array<Subscriber>();
    for (let i = 0; i < this.subscribers.length; i++) {
      const element = this.subscribers[i];
      if(element.owner==AccountId){
        result.push(element);
      }
    }
    return result;
  }

  getAllSubscribers(): Array<Subscriber>{
    let result = new Array<Subscriber>();
    for (let i = 0; i < this.subscribers.length; i++) {
      const entry = this.subscribers[i];
      result.push(entry);
    }
    return result;
  }

/*****************Subscription Types Functions*****************/
  @mutateState()
  addSubscriptionType(typeCode: String, price: Money, listenSongCount: i32): SubscriptionType {
    let newSubscriptionType = new SubscriptionType(typeCode, price, listenSongCount);
    let index = this.subscriptionTypes.push(newSubscriptionType);
    logging.log(`Success. New Subscription Type id: ${index} added by ${storage.getSome<AccountId>("owner")}`);
    return newSubscriptionType;
  } 

  @mutateState()
  modifySubscriptionType(subscriptionTypeId:i32, typeCode: String, price: Money, listenSongCount: i32): SubscriptionType {
    // this.assert_subscriptionOwner(this.subscriptionTypes[subscriptionTypeId]);
    // this.assert_subscriptionTypeId(subscriptionTypeId);
    // this.assert_subscription_is_active(this.subscriptionTypes[subscriptionTypeId]);
    let newSubscriptionType = new SubscriptionType(typeCode, price, listenSongCount);
    newSubscriptionType.modifiedDate = context.blockTimestamp;
    this.subscriptionTypes.replace(subscriptionTypeId,newSubscriptionType);
    logging.log(`Success. Modified Subscription Type id: ${subscriptionTypeId} modified by ${storage.getSome<AccountId>("owner")}`);
    return this.subscriptionTypes[subscriptionTypeId];
  }

  @mutateState()
  inactivateSubscriptionType(subscriptionTypeId:i32): SubscriptionType{
    // this.assert_subscriptionOwner(subscriptionTypeId);
    // this.assert_subscriptionTypeId(subscriptionTypeId);
    // this.assert_subscription_is_active(subscriptionTypeId);
    let element = this.subscriptionTypes[subscriptionTypeId];
    element.isActive = false;
    element.deletedDate = context.blockTimestamp;
    this.subscriptionTypes.replace(subscriptionTypeId,element);
    logging.log(`Success. inactivate Subscription Type id: ${subscriptionTypeId} inactivated by ${storage.getSome<AccountId>("owner")}`);
    return this.subscriptionTypes[subscriptionTypeId];
  }

  getSubscriptionTypesByTypeID(subscriptionTypeId:i32): SubscriptionType | null{
    // this.assert_subscriptionTypeId(subscriptionTypeId);
    return this.subscriptionTypes[subscriptionTypeId];
  }

  getAllSubscriptionTypes(): Array<SubscriptionType>{
    let result = new Array<SubscriptionType>();
    for (let i = 0; i < this.subscriptionTypes.length; i++) {
      const entry = this.subscriptionTypes[i];
      result.push(entry);
    }
    return result;
  }

  /*****************Assert Functions*****************/
  private assert_init(): void {
    assert(!storage.contains("owner"), `Contract initialized before! storageOwner:${storage.getSome<AccountId>("owner")}`)
  }

  private assert_songOwner(song: Song): void {
    assert(storage.getSome<AccountId>("owner") == song.owner
      , `storageOwner:${storage.getSome<AccountId>("owner")}, song.owner:${song.owner} : Only the owner of this raffle may call this method`);
  }
  
  private assert_songId(id: i32): void {
    assert(this.songs.containsIndex(id), 'Song not exists');
  }

  private assert_song_is_active(song: Song): void {
    assert(song.isActive, 'Song is inactive');
  }

  private assert_subscriberId(id: i32): void {
    assert(this.subscribers.containsIndex(id), 'Subscriber not exists');
  }

  private assert_subscriptionTypeId(id: i32): void {
    assert(this.subscriptionTypes.containsIndex(id), 'Subscription Type not exists');
  }

  private assert_enoughDeposit(price: Money): void {
    assert(context.attachedDeposit >= price, `attachedDeposit:${context.attachedDeposit}, price:${price} Please send enough NEAR!`)
  }

  private assert_remainingListenCount(subscriberId: i32): void {
    assert(0 < this.subscribers[subscriberId].remainingListenCount, `You have no remaining listen count!!`)
  }

}