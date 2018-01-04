import { ReimbursementRequest, User } from '../interfaces/model/model.interfaces';
// import { ReimbursementRequestBundle } from '../interfaces/app/app.interfaces';

interface MockReimbursementData {
    ReimbursementType : ReimbursementType[],
    ReimbursementStatus : ReimbursementStatus[],
    ReimbursementRequestBundle : ReimbursementRequestBundle[]
}

interface ReimbursementStatus {
    statusId : number;
    name : string;
}

interface ReimbursementType {
    typeId : number;
    name : string;
}

interface ReimbursementRequestBundle {
    requestId : number;
    amount : number;
    description : string;
    submitDate : string;
    processedDate : string;
    receipt : string | number | null;
    author : User;
    processor : User | number | null;
    status : ReimbursementStatus | number;
    type : ReimbursementType | number;
}

export function initMockData() : MockReimbursementData {
    let m:MockReimbursementData = { 
        ReimbursementType : initMockRequestType(), 
        ReimbursementStatus : initMockRequestStatus(), 
        ReimbursementRequestBundle : initMockRequests()
    };

    return m;
}

export function initMockRequestType() : ReimbursementType[] {
    
    return [
        {
            typeId: 1000000000,
            name: "HOUSING"
        },
        {
            typeId: 1000000001,
            name: "LODGING"
        },
        {
            typeId: 1000000002,
            name: "TRAVEL"
        },
        {
            typeId: 1000000003,
            name: "FOOD"
        }
    ];
}

export function initMockRequestStatus() : ReimbursementStatus[] {
    
    return [
        {
            statusId: 1000000000,
            name: "PENDING"
        },
        {
            statusId: 1000000001,
            name: "APPROVED"
        },
        {
            statusId: 1000000002,
            name: "DENIED"
        }
    ];
}

// userId : number;
// roleId : number;
// username : string;
// password : string;
// firstname : string;
// lastname : string;
// email : string;

export function initMockRequests() : ReimbursementRequestBundle[] {

    return [
        {
            requestId: 1000000000,
            amount: 350,
            description: "New purchase for housing",
            submitDate: "09/21/2017",
            processedDate: null,
            receipt: null,
            author: {
                userId : 1000000000,
                roleId : 1000000000,
                username : "ntsadu",
                password : "red123",
                firstname : "Nahom",
                lastname : "Tsadu",
                email : "nahomtsadu@gmail.com"
            },
            processor: null,
            status: {
                statusId: 1000000000,
                name: "PENDING"
            },
            type: {
                typeId: 1000000000,
                name: "HOUSING"
            }
        },
        {
            requestId: 1000000001,
            amount: 4003.93,
            description: "Ya'll owe me money!",
            submitDate: "10/29/2017",
            processedDate: null,
            receipt: null,
            author: {
                userId : 1000000000,
                roleId : 1000000000,
                username : "ntsadu",
                password : "red123",
                firstname : "Nahom",
                lastname : "Tsadu",
                email : "nahomtsadu@gmail.com"
            },
            processor: null,
            status: {
                statusId: 1000000000,
                name: "PENDING"
            },
            type: {
                typeId: 1000000002,
                name: "TRAVEL"
            }
        },
        {
            requestId: 1000000002,
            amount: 28.46,
            description: "Had to call and Uber to class everyday this week",
            submitDate: "10/01/2017",
            processedDate: null,
            receipt: null,
            author: {
                userId : 1000000000,
                roleId : 1000000000,
                username : "ntsadu",
                password : "red123",
                firstname : "Nahom",
                lastname : "Tsadu",
                email : "nahomtsadu@gmail.com"
            },
            processor: null,
            status: {
                statusId: 1000000000,
                name: "PENDING"
            },
            type: {
                typeId: 1000000002,
                name: "TRAVEL"
            }
        },
        {
            requestId: 1000000003,
            amount: 13.08,
            description: "Had some of that Mission BBQ ya heard",
            submitDate: "11/12/2017",
            processedDate: null,
            receipt: null,
            author: {
                userId : 1000000000,
                roleId : 1000000000,
                username : "ntsadu",
                password : "red123",
                firstname : "Nahom",
                lastname : "Tsadu",
                email : "nahomtsadu@gmail.com"
            },
            processor: null,
            status: {
                statusId: 1000000000,
                name: "PENDING"
            },
            type: {
                typeId: 1000000003,
                name: "FOOD"
            }
        },
        {
            requestId: 1000000003,
            amount: 13.08,
            description: "Had some of that Mission BBQ ya heard",
            submitDate: "11/12/2017",
            processedDate: null,
            receipt: null,
            author: {
                userId : 1000000000,
                roleId : 1000000000,
                username : "ntsadu",
                password : "red123",
                firstname : "Nahom",
                lastname : "Tsadu",
                email : "nahomtsadu@gmail.com"
            },
            processor: null,
            status: {
                statusId: 1000000000,
                name: "PENDING"
            },
            type: {
                typeId: 1000000003,
                name: "FOOD"
            }
        },
        {
            requestId: 1000000003,
            amount: 13.08,
            description: "Had some of that Mission BBQ ya heard",
            submitDate: "11/12/2017",
            processedDate: null,
            receipt: null,
            author: {
                userId : 1000000000,
                roleId : 1000000000,
                username : "ntsadu",
                password : "red123",
                firstname : "Nahom",
                lastname : "Tsadu",
                email : "nahomtsadu@gmail.com"
            },
            processor: null,
            status: {
                statusId: 1000000000,
                name: "PENDING"
            },
            type: {
                typeId: 1000000003,
                name: "FOOD"
            }
        },
        {
            requestId: 1000000003,
            amount: 13.08,
            description: "Had some of that Mission BBQ ya heard",
            submitDate: "11/12/2017",
            processedDate: null,
            receipt: null,
            author: {
                userId : 1000000000,
                roleId : 1000000000,
                username : "ntsadu",
                password : "red123",
                firstname : "Nahom",
                lastname : "Tsadu",
                email : "nahomtsadu@gmail.com"
            },
            processor: null,
            status: {
                statusId: 1000000000,
                name: "PENDING"
            },
            type: {
                typeId: 1000000003,
                name: "FOOD"
            }
        },
        {
            requestId: 1000000003,
            amount: 13.08,
            description: "Had some of that Mission BBQ ya heard",
            submitDate: "11/12/2017",
            processedDate: null,
            receipt: null,
            author: {
                userId : 1000000000,
                roleId : 1000000000,
                username : "ntsadu",
                password : "red123",
                firstname : "Nahom",
                lastname : "Tsadu",
                email : "nahomtsadu@gmail.com"
            },
            processor: null,
            status: {
                statusId: 1000000000,
                name: "PENDING"
            },
            type: {
                typeId: 1000000003,
                name: "FOOD"
            }
        },
        {
            requestId: 1000000003,
            amount: 13.08,
            description: "Had some of that Mission BBQ ya heard",
            submitDate: "11/12/2017",
            processedDate: null,
            receipt: null,
            author: {
                userId : 1000000000,
                roleId : 1000000000,
                username : "ntsadu",
                password : "red123",
                firstname : "Nahom",
                lastname : "Tsadu",
                email : "nahomtsadu@gmail.com"
            },
            processor: null,
            status: {
                statusId: 1000000000,
                name: "PENDING"
            },
            type: {
                typeId: 1000000003,
                name: "FOOD"
            }
        },
        {
            requestId: 1000000003,
            amount: 13.08,
            description: "Had some of that Mission BBQ ya heard",
            submitDate: "11/12/2017",
            processedDate: null,
            receipt: null,
            author: {
                userId : 1000000000,
                roleId : 1000000000,
                username : "ntsadu",
                password : "red123",
                firstname : "Nahom",
                lastname : "Tsadu",
                email : "nahomtsadu@gmail.com"
            },
            processor: null,
            status: {
                statusId: 1000000000,
                name: "PENDING"
            },
            type: {
                typeId: 1000000003,
                name: "FOOD"
            }
        },
        {
            requestId: 1000000003,
            amount: 13.08,
            description: "Had some of that Mission BBQ ya heard",
            submitDate: "11/12/2017",
            processedDate: null,
            receipt: null,
            author: {
                userId : 1000000000,
                roleId : 1000000000,
                username : "ntsadu",
                password : "red123",
                firstname : "Nahom",
                lastname : "Tsadu",
                email : "nahomtsadu@gmail.com"
            },
            processor: null,
            status: {
                statusId: 1000000000,
                name: "PENDING"
            },
            type: {
                typeId: 1000000003,
                name: "FOOD"
            }
        },
        {
            requestId: 1000000003,
            amount: 13.08,
            description: "Had some of that Mission BBQ ya heard",
            submitDate: "11/12/2017",
            processedDate: null,
            receipt: null,
            author: {
                userId : 1000000000,
                roleId : 1000000000,
                username : "ntsadu",
                password : "red123",
                firstname : "Nahom",
                lastname : "Tsadu",
                email : "nahomtsadu@gmail.com"
            },
            processor: null,
            status: {
                statusId: 1000000000,
                name: "PENDING"
            },
            type: {
                typeId: 1000000003,
                name: "FOOD"
            }
        },
        {
            requestId: 1000000003,
            amount: 13.08,
            description: "Had some of that Mission BBQ ya heard",
            submitDate: "11/12/2017",
            processedDate: null,
            receipt: null,
            author: {
                userId : 1000000000,
                roleId : 1000000000,
                username : "ntsadu",
                password : "red123",
                firstname : "Nahom",
                lastname : "Tsadu",
                email : "nahomtsadu@gmail.com"
            },
            processor: null,
            status: {
                statusId: 1000000000,
                name: "PENDING"
            },
            type: {
                typeId: 1000000003,
                name: "FOOD"
            }
        },
        {
            requestId: 1000000003,
            amount: 13.08,
            description: "Had some of that Mission BBQ ya heard",
            submitDate: "11/12/2017",
            processedDate: null,
            receipt: null,
            author: {
                userId : 1000000000,
                roleId : 1000000000,
                username : "ntsadu",
                password : "red123",
                firstname : "Nahom",
                lastname : "Tsadu",
                email : "nahomtsadu@gmail.com"
            },
            processor: null,
            status: {
                statusId: 1000000000,
                name: "PENDING"
            },
            type: {
                typeId: 1000000003,
                name: "FOOD"
            }
        },
        {
            requestId: 1000000003,
            amount: 13.08,
            description: "Had some of that Mission BBQ ya heard",
            submitDate: "11/12/2017",
            processedDate: null,
            receipt: null,
            author: {
                userId : 1000000000,
                roleId : 1000000000,
                username : "ntsadu",
                password : "red123",
                firstname : "Nahom",
                lastname : "Tsadu",
                email : "nahomtsadu@gmail.com"
            },
            processor: null,
            status: {
                statusId: 1000000000,
                name: "PENDING"
            },
            type: {
                typeId: 1000000003,
                name: "FOOD"
            }
        },
        {
            requestId: 1000000003,
            amount: 13.08,
            description: "Had some of that Mission BBQ ya heard",
            submitDate: "11/12/2017",
            processedDate: null,
            receipt: null,
            author: {
                userId : 1000000000,
                roleId : 1000000000,
                username : "ntsadu",
                password : "red123",
                firstname : "Nahom",
                lastname : "Tsadu",
                email : "nahomtsadu@gmail.com"
            },
            processor: null,
            status: {
                statusId: 1000000000,
                name: "PENDING"
            },
            type: {
                typeId: 1000000003,
                name: "FOOD"
            }
        },
        {
            requestId: 1000000003,
            amount: 13.08,
            description: "Had some of that Mission BBQ ya heard",
            submitDate: "11/12/2017",
            processedDate: null,
            receipt: null,
            author: {
                userId : 1000000000,
                roleId : 1000000000,
                username : "ntsadu",
                password : "red123",
                firstname : "Nahom",
                lastname : "Tsadu",
                email : "nahomtsadu@gmail.com"
            },
            processor: null,
            status: {
                statusId: 1000000000,
                name: "PENDING"
            },
            type: {
                typeId: 1000000003,
                name: "FOOD"
            }
        },
        {
            requestId: 1000000003,
            amount: 13.08,
            description: "Had some of that Mission BBQ ya heard",
            submitDate: "11/12/2017",
            processedDate: null,
            receipt: null,
            author: {
                userId : 1000000000,
                roleId : 1000000000,
                username : "ntsadu",
                password : "red123",
                firstname : "Nahom",
                lastname : "Tsadu",
                email : "nahomtsadu@gmail.com"
            },
            processor: null,
            status: {
                statusId: 1000000000,
                name: "PENDING"
            },
            type: {
                typeId: 1000000003,
                name: "FOOD"
            }
        },
        {
            requestId: 1000000003,
            amount: 13.08,
            description: "Had some of that Mission BBQ ya heard",
            submitDate: "11/12/2017",
            processedDate: null,
            receipt: null,
            author: {
                userId : 1000000000,
                roleId : 1000000000,
                username : "ntsadu",
                password : "red123",
                firstname : "Nahom",
                lastname : "Tsadu",
                email : "nahomtsadu@gmail.com"
            },
            processor: null,
            status: {
                statusId: 1000000000,
                name: "PENDING"
            },
            type: {
                typeId: 1000000003,
                name: "FOOD"
            }
        },
        {
            requestId: 1000000003,
            amount: 13.08,
            description: "Had some of that Mission BBQ ya heard",
            submitDate: "11/12/2017",
            processedDate: null,
            receipt: null,
            author: {
                userId : 1000000000,
                roleId : 1000000000,
                username : "ntsadu",
                password : "red123",
                firstname : "Nahom",
                lastname : "Tsadu",
                email : "nahomtsadu@gmail.com"
            },
            processor: null,
            status: {
                statusId: 1000000000,
                name: "PENDING"
            },
            type: {
                typeId: 1000000003,
                name: "FOOD"
            }
        },
        {
            requestId: 1000000003,
            amount: 13.08,
            description: "Had some of that Mission BBQ ya heard",
            submitDate: "11/12/2017",
            processedDate: null,
            receipt: null,
            author: {
                userId : 1000000000,
                roleId : 1000000000,
                username : "ntsadu",
                password : "red123",
                firstname : "Nahom",
                lastname : "Tsadu",
                email : "nahomtsadu@gmail.com"
            },
            processor: null,
            status: {
                statusId: 1000000000,
                name: "PENDING"
            },
            type: {
                typeId: 1000000003,
                name: "FOOD"
            }
        },
        {
            requestId: 1000000003,
            amount: 13.08,
            description: "Had some of that Mission BBQ ya heard",
            submitDate: "11/12/2017",
            processedDate: null,
            receipt: null,
            author: {
                userId : 1000000000,
                roleId : 1000000000,
                username : "ntsadu",
                password : "red123",
                firstname : "Nahom",
                lastname : "Tsadu",
                email : "nahomtsadu@gmail.com"
            },
            processor: null,
            status: {
                statusId: 1000000000,
                name: "PENDING"
            },
            type: {
                typeId: 1000000003,
                name: "FOOD"
            }
        },
        {
            requestId: 1000000003,
            amount: 13.08,
            description: "Had some of that Mission BBQ ya heard",
            submitDate: "11/12/2017",
            processedDate: null,
            receipt: null,
            author: {
                userId : 1000000000,
                roleId : 1000000000,
                username : "ntsadu",
                password : "red123",
                firstname : "Nahom",
                lastname : "Tsadu",
                email : "nahomtsadu@gmail.com"
            },
            processor: null,
            status: {
                statusId: 1000000000,
                name: "PENDING"
            },
            type: {
                typeId: 1000000003,
                name: "FOOD"
            }
        },
        {
            requestId: 1000000003,
            amount: 13.08,
            description: "Had some of that Mission BBQ ya heard",
            submitDate: "11/12/2017",
            processedDate: null,
            receipt: null,
            author: {
                userId : 1000000000,
                roleId : 1000000000,
                username : "ntsadu",
                password : "red123",
                firstname : "Nahom",
                lastname : "Tsadu",
                email : "nahomtsadu@gmail.com"
            },
            processor: null,
            status: {
                statusId: 1000000000,
                name: "PENDING"
            },
            type: {
                typeId: 1000000003,
                name: "FOOD"
            }
        },
        {
            requestId: 1000000003,
            amount: 13.08,
            description: "Had some of that Mission BBQ ya heard",
            submitDate: "11/12/2017",
            processedDate: null,
            receipt: null,
            author: {
                userId : 1000000000,
                roleId : 1000000000,
                username : "ntsadu",
                password : "red123",
                firstname : "Nahom",
                lastname : "Tsadu",
                email : "nahomtsadu@gmail.com"
            },
            processor: null,
            status: {
                statusId: 1000000000,
                name: "PENDING"
            },
            type: {
                typeId: 1000000003,
                name: "FOOD"
            }
        },
        {
            requestId: 1000000003,
            amount: 13.08,
            description: "Had some of that Mission BBQ ya heard",
            submitDate: "11/12/2017",
            processedDate: null,
            receipt: null,
            author: {
                userId : 1000000000,
                roleId : 1000000000,
                username : "ntsadu",
                password : "red123",
                firstname : "Nahom",
                lastname : "Tsadu",
                email : "nahomtsadu@gmail.com"
            },
            processor: null,
            status: {
                statusId: 1000000000,
                name: "PENDING"
            },
            type: {
                typeId: 1000000003,
                name: "FOOD"
            }
        },
        {
            requestId: 1000000003,
            amount: 13.08,
            description: "Had some of that Mission BBQ ya heard",
            submitDate: "11/12/2017",
            processedDate: null,
            receipt: null,
            author: {
                userId : 1000000000,
                roleId : 1000000000,
                username : "ntsadu",
                password : "red123",
                firstname : "Nahom",
                lastname : "Tsadu",
                email : "nahomtsadu@gmail.com"
            },
            processor: null,
            status: {
                statusId: 1000000000,
                name: "PENDING"
            },
            type: {
                typeId: 1000000003,
                name: "FOOD"
            }
        },
        {
            requestId: 1000000003,
            amount: 13.08,
            description: "Had some of that Mission BBQ ya heard",
            submitDate: "11/12/2017",
            processedDate: null,
            receipt: null,
            author: {
                userId : 1000000000,
                roleId : 1000000000,
                username : "ntsadu",
                password : "red123",
                firstname : "Nahom",
                lastname : "Tsadu",
                email : "nahomtsadu@gmail.com"
            },
            processor: null,
            status: {
                statusId: 1000000000,
                name: "PENDING"
            },
            type: {
                typeId: 1000000003,
                name: "FOOD"
            }
        },
        {
            requestId: 1000000003,
            amount: 13.08,
            description: "Had some of that Mission BBQ ya heard",
            submitDate: "11/12/2017",
            processedDate: null,
            receipt: null,
            author: {
                userId : 1000000000,
                roleId : 1000000000,
                username : "ntsadu",
                password : "red123",
                firstname : "Nahom",
                lastname : "Tsadu",
                email : "nahomtsadu@gmail.com"
            },
            processor: null,
            status: {
                statusId: 1000000000,
                name: "PENDING"
            },
            type: {
                typeId: 1000000003,
                name: "FOOD"
            }
        },
        {
            requestId: 1000000003,
            amount: 13.08,
            description: "Had some of that Mission BBQ ya heard",
            submitDate: "11/12/2017",
            processedDate: null,
            receipt: null,
            author: {
                userId : 1000000000,
                roleId : 1000000000,
                username : "ntsadu",
                password : "red123",
                firstname : "Nahom",
                lastname : "Tsadu",
                email : "nahomtsadu@gmail.com"
            },
            processor: null,
            status: {
                statusId: 1000000000,
                name: "PENDING"
            },
            type: {
                typeId: 1000000003,
                name: "FOOD"
            }
        },
        {
            requestId: 1000000003,
            amount: 13.08,
            description: "Had some of that Mission BBQ ya heard",
            submitDate: "11/12/2017",
            processedDate: null,
            receipt: null,
            author: {
                userId : 1000000000,
                roleId : 1000000000,
                username : "ntsadu",
                password : "red123",
                firstname : "Nahom",
                lastname : "Tsadu",
                email : "nahomtsadu@gmail.com"
            },
            processor: null,
            status: {
                statusId: 1000000000,
                name: "PENDING"
            },
            type: {
                typeId: 1000000003,
                name: "FOOD"
            }
        },
        {
            requestId: 1000000003,
            amount: 13.08,
            description: "Had some of that Mission BBQ ya heard",
            submitDate: "11/12/2017",
            processedDate: null,
            receipt: null,
            author: {
                userId : 1000000000,
                roleId : 1000000000,
                username : "ntsadu",
                password : "red123",
                firstname : "Nahom",
                lastname : "Tsadu",
                email : "nahomtsadu@gmail.com"
            },
            processor: null,
            status: {
                statusId: 1000000000,
                name: "PENDING"
            },
            type: {
                typeId: 1000000003,
                name: "FOOD"
            }
        },
        {
            requestId: 1000000003,
            amount: 13.08,
            description: "Had some of that Mission BBQ ya heard",
            submitDate: "11/12/2017",
            processedDate: null,
            receipt: null,
            author: {
                userId : 1000000000,
                roleId : 1000000000,
                username : "ntsadu",
                password : "red123",
                firstname : "Nahom",
                lastname : "Tsadu",
                email : "nahomtsadu@gmail.com"
            },
            processor: null,
            status: {
                statusId: 1000000000,
                name: "PENDING"
            },
            type: {
                typeId: 1000000003,
                name: "FOOD"
            }
        },
        {
            requestId: 1000000003,
            amount: 13.08,
            description: "Had some of that Mission BBQ ya heard",
            submitDate: "11/12/2017",
            processedDate: null,
            receipt: null,
            author: {
                userId : 1000000000,
                roleId : 1000000000,
                username : "ntsadu",
                password : "red123",
                firstname : "Nahom",
                lastname : "Tsadu",
                email : "nahomtsadu@gmail.com"
            },
            processor: null,
            status: {
                statusId: 1000000000,
                name: "PENDING"
            },
            type: {
                typeId: 1000000003,
                name: "FOOD"
            }
        },
        {
            requestId: 1000000003,
            amount: 13.08,
            description: "Had some of that Mission BBQ ya heard",
            submitDate: "11/12/2017",
            processedDate: null,
            receipt: null,
            author: {
                userId : 1000000000,
                roleId : 1000000000,
                username : "ntsadu",
                password : "red123",
                firstname : "Nahom",
                lastname : "Tsadu",
                email : "nahomtsadu@gmail.com"
            },
            processor: null,
            status: {
                statusId: 1000000000,
                name: "PENDING"
            },
            type: {
                typeId: 1000000003,
                name: "FOOD"
            }
        },
        {
            requestId: 1000000003,
            amount: 13.08,
            description: "Had some of that Mission BBQ ya heard",
            submitDate: "11/12/2017",
            processedDate: null,
            receipt: null,
            author: {
                userId : 1000000000,
                roleId : 1000000000,
                username : "ntsadu",
                password : "red123",
                firstname : "Nahom",
                lastname : "Tsadu",
                email : "nahomtsadu@gmail.com"
            },
            processor: null,
            status: {
                statusId: 1000000000,
                name: "PENDING"
            },
            type: {
                typeId: 1000000003,
                name: "FOOD"
            }
        },
        {
            requestId: 1000000003,
            amount: 13.08,
            description: "Had some of that Mission BBQ ya heard",
            submitDate: "11/12/2017",
            processedDate: null,
            receipt: null,
            author: {
                userId : 1000000000,
                roleId : 1000000000,
                username : "ntsadu",
                password : "red123",
                firstname : "Nahom",
                lastname : "Tsadu",
                email : "nahomtsadu@gmail.com"
            },
            processor: null,
            status: {
                statusId: 1000000000,
                name: "PENDING"
            },
            type: {
                typeId: 1000000003,
                name: "FOOD"
            }
        },
        {
            requestId: 1000000003,
            amount: 13.08,
            description: "Had some of that Mission BBQ ya heard",
            submitDate: "11/12/2017",
            processedDate: null,
            receipt: null,
            author: {
                userId : 1000000000,
                roleId : 1000000000,
                username : "ntsadu",
                password : "red123",
                firstname : "Nahom",
                lastname : "Tsadu",
                email : "nahomtsadu@gmail.com"
            },
            processor: null,
            status: {
                statusId: 1000000000,
                name: "PENDING"
            },
            type: {
                typeId: 1000000003,
                name: "FOOD"
            }
        },
        {
            requestId: 1000000003,
            amount: 13.08,
            description: "Had some of that Mission BBQ ya heard",
            submitDate: "11/12/2017",
            processedDate: null,
            receipt: null,
            author: {
                userId : 1000000000,
                roleId : 1000000000,
                username : "ntsadu",
                password : "red123",
                firstname : "Nahom",
                lastname : "Tsadu",
                email : "nahomtsadu@gmail.com"
            },
            processor: null,
            status: {
                statusId: 1000000000,
                name: "PENDING"
            },
            type: {
                typeId: 1000000003,
                name: "FOOD"
            }
        },
        {
            requestId: 1000000003,
            amount: 13.08,
            description: "Had some of that Mission BBQ ya heard",
            submitDate: "11/12/2017",
            processedDate: null,
            receipt: null,
            author: {
                userId : 1000000000,
                roleId : 1000000000,
                username : "ntsadu",
                password : "red123",
                firstname : "Nahom",
                lastname : "Tsadu",
                email : "nahomtsadu@gmail.com"
            },
            processor: null,
            status: {
                statusId: 1000000000,
                name: "PENDING"
            },
            type: {
                typeId: 1000000003,
                name: "FOOD"
            }
        },
        {
            requestId: 1000000003,
            amount: 13.08,
            description: "Had some of that Mission BBQ ya heard",
            submitDate: "11/12/2017",
            processedDate: null,
            receipt: null,
            author: {
                userId : 1000000000,
                roleId : 1000000000,
                username : "ntsadu",
                password : "red123",
                firstname : "Nahom",
                lastname : "Tsadu",
                email : "nahomtsadu@gmail.com"
            },
            processor: null,
            status: {
                statusId: 1000000000,
                name: "PENDING"
            },
            type: {
                typeId: 1000000003,
                name: "FOOD"
            }
        },
        {
            requestId: 1000000003,
            amount: 13.08,
            description: "Had some of that Mission BBQ ya heard",
            submitDate: "11/12/2017",
            processedDate: null,
            receipt: null,
            author: {
                userId : 1000000000,
                roleId : 1000000000,
                username : "ntsadu",
                password : "red123",
                firstname : "Nahom",
                lastname : "Tsadu",
                email : "nahomtsadu@gmail.com"
            },
            processor: null,
            status: {
                statusId: 1000000000,
                name: "PENDING"
            },
            type: {
                typeId: 1000000003,
                name: "FOOD"
            }
        },
        {
            requestId: 1000000003,
            amount: 13.08,
            description: "Had some of that Mission BBQ ya heard",
            submitDate: "11/12/2017",
            processedDate: null,
            receipt: null,
            author: {
                userId : 1000000000,
                roleId : 1000000000,
                username : "ntsadu",
                password : "red123",
                firstname : "Nahom",
                lastname : "Tsadu",
                email : "nahomtsadu@gmail.com"
            },
            processor: null,
            status: {
                statusId: 1000000000,
                name: "PENDING"
            },
            type: {
                typeId: 1000000003,
                name: "FOOD"
            }
        },
        {
            requestId: 1000000003,
            amount: 13.08,
            description: "Had some of that Mission BBQ ya heard",
            submitDate: "11/12/2017",
            processedDate: null,
            receipt: null,
            author: {
                userId : 1000000000,
                roleId : 1000000000,
                username : "ntsadu",
                password : "red123",
                firstname : "Nahom",
                lastname : "Tsadu",
                email : "nahomtsadu@gmail.com"
            },
            processor: null,
            status: {
                statusId: 1000000000,
                name: "PENDING"
            },
            type: {
                typeId: 1000000003,
                name: "FOOD"
            }
        },
        {
            requestId: 1000000003,
            amount: 13.08,
            description: "Had some of that Mission BBQ ya heard",
            submitDate: "11/12/2017",
            processedDate: null,
            receipt: null,
            author: {
                userId : 1000000000,
                roleId : 1000000000,
                username : "ntsadu",
                password : "red123",
                firstname : "Nahom",
                lastname : "Tsadu",
                email : "nahomtsadu@gmail.com"
            },
            processor: null,
            status: {
                statusId: 1000000000,
                name: "PENDING"
            },
            type: {
                typeId: 1000000003,
                name: "FOOD"
            }
        },
        {
            requestId: 1000000003,
            amount: 13.08,
            description: "Had some of that Mission BBQ ya heard",
            submitDate: "11/12/2017",
            processedDate: null,
            receipt: null,
            author: {
                userId : 1000000000,
                roleId : 1000000000,
                username : "ntsadu",
                password : "red123",
                firstname : "Nahom",
                lastname : "Tsadu",
                email : "nahomtsadu@gmail.com"
            },
            processor: null,
            status: {
                statusId: 1000000000,
                name: "PENDING"
            },
            type: {
                typeId: 1000000003,
                name: "FOOD"
            }
        },
        {
            requestId: 1000000003,
            amount: 13.08,
            description: "Had some of that Mission BBQ ya heard",
            submitDate: "11/12/2017",
            processedDate: null,
            receipt: null,
            author: {
                userId : 1000000000,
                roleId : 1000000000,
                username : "ntsadu",
                password : "red123",
                firstname : "Nahom",
                lastname : "Tsadu",
                email : "nahomtsadu@gmail.com"
            },
            processor: null,
            status: {
                statusId: 1000000000,
                name: "PENDING"
            },
            type: {
                typeId: 1000000003,
                name: "FOOD"
            }
        },
        {
            requestId: 1000000003,
            amount: 13.08,
            description: "Had some of that Mission BBQ ya heard",
            submitDate: "11/12/2017",
            processedDate: null,
            receipt: null,
            author: {
                userId : 1000000000,
                roleId : 1000000000,
                username : "ntsadu",
                password : "red123",
                firstname : "Nahom",
                lastname : "Tsadu",
                email : "nahomtsadu@gmail.com"
            },
            processor: null,
            status: {
                statusId: 1000000000,
                name: "PENDING"
            },
            type: {
                typeId: 1000000003,
                name: "FOOD"
            }
        },
        {
            requestId: 1000000003,
            amount: 13.08,
            description: "Had some of that Mission BBQ ya heard",
            submitDate: "11/12/2017",
            processedDate: null,
            receipt: null,
            author: {
                userId : 1000000000,
                roleId : 1000000000,
                username : "ntsadu",
                password : "red123",
                firstname : "Nahom",
                lastname : "Tsadu",
                email : "nahomtsadu@gmail.com"
            },
            processor: null,
            status: {
                statusId: 1000000000,
                name: "PENDING"
            },
            type: {
                typeId: 1000000003,
                name: "FOOD"
            }
        },
        {
            requestId: 1000000003,
            amount: 13.08,
            description: "Had some of that Mission BBQ ya heard",
            submitDate: "11/12/2017",
            processedDate: null,
            receipt: null,
            author: {
                userId : 1000000000,
                roleId : 1000000000,
                username : "ntsadu",
                password : "red123",
                firstname : "Nahom",
                lastname : "Tsadu",
                email : "nahomtsadu@gmail.com"
            },
            processor: null,
            status: {
                statusId: 1000000000,
                name: "PENDING"
            },
            type: {
                typeId: 1000000003,
                name: "FOOD"
            }
        },
        {
            requestId: 1000000003,
            amount: 13.08,
            description: "Had some of that Mission BBQ ya heard",
            submitDate: "11/12/2017",
            processedDate: null,
            receipt: null,
            author: {
                userId : 1000000000,
                roleId : 1000000000,
                username : "ntsadu",
                password : "red123",
                firstname : "Nahom",
                lastname : "Tsadu",
                email : "nahomtsadu@gmail.com"
            },
            processor: null,
            status: {
                statusId: 1000000000,
                name: "PENDING"
            },
            type: {
                typeId: 1000000003,
                name: "FOOD"
            }
        },
        {
            requestId: 1000000003,
            amount: 13.08,
            description: "Had some of that Mission BBQ ya heard",
            submitDate: "11/12/2017",
            processedDate: null,
            receipt: null,
            author: {
                userId : 1000000000,
                roleId : 1000000000,
                username : "ntsadu",
                password : "red123",
                firstname : "Nahom",
                lastname : "Tsadu",
                email : "nahomtsadu@gmail.com"
            },
            processor: null,
            status: {
                statusId: 1000000000,
                name: "PENDING"
            },
            type: {
                typeId: 1000000003,
                name: "FOOD"
            }
        },
        {
            requestId: 1000000003,
            amount: 13.08,
            description: "Had some of that Mission BBQ ya heard",
            submitDate: "11/12/2017",
            processedDate: null,
            receipt: null,
            author: {
                userId : 1000000000,
                roleId : 1000000000,
                username : "ntsadu",
                password : "red123",
                firstname : "Nahom",
                lastname : "Tsadu",
                email : "nahomtsadu@gmail.com"
            },
            processor: null,
            status: {
                statusId: 1000000000,
                name: "PENDING"
            },
            type: {
                typeId: 1000000003,
                name: "FOOD"
            }
        },
        {
            requestId: 1000000003,
            amount: 13.08,
            description: "Had some of that Mission BBQ ya heard",
            submitDate: "11/12/2017",
            processedDate: null,
            receipt: null,
            author: {
                userId : 1000000000,
                roleId : 1000000000,
                username : "ntsadu",
                password : "red123",
                firstname : "Nahom",
                lastname : "Tsadu",
                email : "nahomtsadu@gmail.com"
            },
            processor: null,
            status: {
                statusId: 1000000000,
                name: "PENDING"
            },
            type: {
                typeId: 1000000003,
                name: "FOOD"
            }
        },
        {
            requestId: 1000000003,
            amount: 13.08,
            description: "Had some of that Mission BBQ ya heard",
            submitDate: "11/12/2017",
            processedDate: null,
            receipt: null,
            author: {
                userId : 1000000000,
                roleId : 1000000000,
                username : "ntsadu",
                password : "red123",
                firstname : "Nahom",
                lastname : "Tsadu",
                email : "nahomtsadu@gmail.com"
            },
            processor: null,
            status: {
                statusId: 1000000000,
                name: "PENDING"
            },
            type: {
                typeId: 1000000003,
                name: "FOOD"
            }
        },
        {
            requestId: 1000000003,
            amount: 13.08,
            description: "Had some of that Mission BBQ ya heard",
            submitDate: "11/12/2017",
            processedDate: null,
            receipt: null,
            author: {
                userId : 1000000000,
                roleId : 1000000000,
                username : "ntsadu",
                password : "red123",
                firstname : "Nahom",
                lastname : "Tsadu",
                email : "nahomtsadu@gmail.com"
            },
            processor: null,
            status: {
                statusId: 1000000000,
                name: "PENDING"
            },
            type: {
                typeId: 1000000003,
                name: "FOOD"
            }
        },
        {
            requestId: 1000000003,
            amount: 13.08,
            description: "Had some of that Mission BBQ ya heard",
            submitDate: "11/12/2017",
            processedDate: null,
            receipt: null,
            author: {
                userId : 1000000000,
                roleId : 1000000000,
                username : "ntsadu",
                password : "red123",
                firstname : "Nahom",
                lastname : "Tsadu",
                email : "nahomtsadu@gmail.com"
            },
            processor: null,
            status: {
                statusId: 1000000000,
                name: "PENDING"
            },
            type: {
                typeId: 1000000003,
                name: "FOOD"
            }
        },
        {
            requestId: 1000000003,
            amount: 13.08,
            description: "Had some of that Mission BBQ ya heard",
            submitDate: "11/12/2017",
            processedDate: null,
            receipt: null,
            author: {
                userId : 1000000000,
                roleId : 1000000000,
                username : "ntsadu",
                password : "red123",
                firstname : "Nahom",
                lastname : "Tsadu",
                email : "nahomtsadu@gmail.com"
            },
            processor: null,
            status: {
                statusId: 1000000000,
                name: "PENDING"
            },
            type: {
                typeId: 1000000003,
                name: "FOOD"
            }
        },
        {
            requestId: 1000000003,
            amount: 13.08,
            description: "Had some of that Mission BBQ ya heard",
            submitDate: "11/12/2017",
            processedDate: null,
            receipt: null,
            author: {
                userId : 1000000000,
                roleId : 1000000000,
                username : "ntsadu",
                password : "red123",
                firstname : "Nahom",
                lastname : "Tsadu",
                email : "nahomtsadu@gmail.com"
            },
            processor: null,
            status: {
                statusId: 1000000000,
                name: "PENDING"
            },
            type: {
                typeId: 1000000003,
                name: "FOOD"
            }
        },
        {
            requestId: 1000000003,
            amount: 13.08,
            description: "Had some of that Mission BBQ ya heard",
            submitDate: "11/12/2017",
            processedDate: null,
            receipt: null,
            author: {
                userId : 1000000000,
                roleId : 1000000000,
                username : "ntsadu",
                password : "red123",
                firstname : "Nahom",
                lastname : "Tsadu",
                email : "nahomtsadu@gmail.com"
            },
            processor: null,
            status: {
                statusId: 1000000000,
                name: "PENDING"
            },
            type: {
                typeId: 1000000003,
                name: "FOOD"
            }
        },
        {
            requestId: 1000000003,
            amount: 13.08,
            description: "Had some of that Mission BBQ ya heard",
            submitDate: "11/12/2017",
            processedDate: null,
            receipt: null,
            author: {
                userId : 1000000000,
                roleId : 1000000000,
                username : "ntsadu",
                password : "red123",
                firstname : "Nahom",
                lastname : "Tsadu",
                email : "nahomtsadu@gmail.com"
            },
            processor: null,
            status: {
                statusId: 1000000000,
                name: "PENDING"
            },
            type: {
                typeId: 1000000003,
                name: "FOOD"
            }
        },
        {
            requestId: 1000000003,
            amount: 13.08,
            description: "Had some of that Mission BBQ ya heard",
            submitDate: "11/12/2017",
            processedDate: null,
            receipt: null,
            author: {
                userId : 1000000000,
                roleId : 1000000000,
                username : "ntsadu",
                password : "red123",
                firstname : "Nahom",
                lastname : "Tsadu",
                email : "nahomtsadu@gmail.com"
            },
            processor: null,
            status: {
                statusId: 1000000000,
                name: "PENDING"
            },
            type: {
                typeId: 1000000003,
                name: "FOOD"
            }
        },
        {
            requestId: 1000000003,
            amount: 13.08,
            description: "Had some of that Mission BBQ ya heard",
            submitDate: "11/12/2017",
            processedDate: null,
            receipt: null,
            author: {
                userId : 1000000000,
                roleId : 1000000000,
                username : "ntsadu",
                password : "red123",
                firstname : "Nahom",
                lastname : "Tsadu",
                email : "nahomtsadu@gmail.com"
            },
            processor: null,
            status: {
                statusId: 1000000000,
                name: "PENDING"
            },
            type: {
                typeId: 1000000003,
                name: "FOOD"
            }
        },
        {
            requestId: 1000000003,
            amount: 13.08,
            description: "Had some of that Mission BBQ ya heard",
            submitDate: "11/12/2017",
            processedDate: null,
            receipt: null,
            author: {
                userId : 1000000000,
                roleId : 1000000000,
                username : "ntsadu",
                password : "red123",
                firstname : "Nahom",
                lastname : "Tsadu",
                email : "nahomtsadu@gmail.com"
            },
            processor: null,
            status: {
                statusId: 1000000000,
                name: "PENDING"
            },
            type: {
                typeId: 1000000003,
                name: "FOOD"
            }
        },
        {
            requestId: 1000000003,
            amount: 13.08,
            description: "Had some of that Mission BBQ ya heard",
            submitDate: "11/12/2017",
            processedDate: null,
            receipt: null,
            author: {
                userId : 1000000000,
                roleId : 1000000000,
                username : "ntsadu",
                password : "red123",
                firstname : "Nahom",
                lastname : "Tsadu",
                email : "nahomtsadu@gmail.com"
            },
            processor: null,
            status: {
                statusId: 1000000000,
                name: "PENDING"
            },
            type: {
                typeId: 1000000003,
                name: "FOOD"
            }
        }
    ];
}