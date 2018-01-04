
export interface User {
    userId : number;
    firstName : string;
    lastName : string;
    email : string;
    username : string;
    password : string;
}

export interface UserSubscription {
    userId : number;
    subscribingUserId : number;
}

export interface UserFavorite {
    userId : number;
    companyId : number;
}

export interface Company {
    companyId : number;
    exchange : string;
    symbol : string;
    name : string;
    sector : string;
    industry : string;
}