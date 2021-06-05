import { BranchsResponse } from "./BranchsResponse";

export class RepositoriesResponse {
    repositoryName: string;
    owner: string;
    branch: BranchsResponse[];
}