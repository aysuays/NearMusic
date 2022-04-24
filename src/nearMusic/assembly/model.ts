import { Context } from "near-sdk-as";
import { AccountId, Timestamp, Money} from "../../utils";


@nearBindgen
export class Song {
    owner: AccountId = Context.sender;
    artist: String;
    songName: String;
    description: String;
    albumName: String;
    genre: String;
    label: String;
    country: String;
    //dateReleased: Timestamp;
    isActive: bool = true;
    createdDate: Timestamp = Context.blockTimestamp;
    modifiedDate: Timestamp;
    deletedDate: Timestamp;

    constructor(_artist: String,
                _songName: String,
                _description: String,
                _albumName: String,
                _genre: String,
                _label: String,
                _country: String) {
        this.artist = _artist;
        this.songName = _songName;
        this.description = _description;
        this.albumName = _albumName;
        this.genre = _genre;
        this.label = _label;
        this.country = _country;
    };
}

@nearBindgen
export class Subscriber {
    owner: AccountId = Context.sender;
    subscriptionType: i32 = 0;
    remainingListenCount: i32 = 0;
    createdDate: Timestamp = Context.blockTimestamp;
    modifiedDate: Timestamp;

    constructor(/*_subscriptionType: i32,
                _remainingListenCount: i32*/){
        // this.subscriptionType = _subscriptionType;
        // this.remainingListenCount = _remainingListenCount;
    };
}

@nearBindgen
export class SubscriptionType {
    owner: AccountId = Context.sender;
    typeCode: String;
    price: Money;
    listenSongCount: i32;
    isActive: bool = true;
    createdDate: Timestamp = Context.blockTimestamp;
    modifiedDate: Timestamp;
    deletedDate: Timestamp;

    constructor(_typeCode: String,
                _price: Money,
                _listenSongCount: i32,
                ){
        this.typeCode = _typeCode;
        this.price = _price;
        this.listenSongCount = _listenSongCount;
    };
}