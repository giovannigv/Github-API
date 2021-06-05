export class Repository {
    name: string;
    full_name: string;
    owner:{
        id: number,
        login: string
    };
    fork:boolean;
    branches_url: string
}