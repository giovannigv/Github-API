import RepositoryController from "./RepositoryController";
import GithubService from "../service/GithubService";
import { Repository } from "../domain/entity/repository/Repository";
import { Branch } from "../domain/entity/branch/Branch";

GithubService.getRepositoriesById = jest.fn();
GithubService.getBranchsByUrl = jest.fn();
describe("RepositoryController", () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("getBranch - Good Scenery", async () => {
        const url = "https://branch.com";
        const mockGetBranch: Branch[] = [{
            name: 'master',
            commit: {
                sha: 'ssad123d12asx1wx12x',
                url: 'commitUrl'
            }
        }];

        jest.spyOn(GithubService, 'getBranchsByUrl').mockResolvedValue(mockGetBranch);

        const result = await RepositoryController.getBranch(url);
        expect(result).toStrictEqual([{
            name: "master",
            lastCommit: "ssad123d12asx1wx12x"
        }])
    });

    test("getBranch - Error Scenery", async () => {

        const url = "https://branch.com";
        const mockError = {
            response: {
                status: 500,
                statusText: 'Internal Error'
            }
        };

        jest.spyOn(GithubService, 'getBranchsByUrl').mockRejectedValue(mockError);

        try {
            await RepositoryController.getBranch(url);
        } catch (error) {
            expect(error).toEqual({
                "response": {
                    "statusText": "Internal Error",
                    "status": 500,
                }
            })
        }
    });

    test("getRepositories - Good Scenery without fork repo", async () => {
        const id = "user"
        const url = "https://branch.com";
        const mockGetBranch: Branch[] = [{
            name: 'master',
            commit: {
                sha: 'ssad123d12asx1wx12x',
                url: 'commitUrl'
            }
        }];
        const mockGetRepositories: Repository[] = [{
            name: 'repo',
            full_name: 'User/respo',
            owner: {
                login: 'user',
                id: 12
            },
            fork: false,
            branches_url: url
        }];

        jest.spyOn(GithubService, 'getBranchsByUrl').mockResolvedValue(mockGetBranch);
        jest.spyOn(GithubService, 'getRepositoriesById').mockResolvedValue(mockGetRepositories);

        const result = await RepositoryController.getRepositories(id);
        expect(result).toStrictEqual([{
            "branch": [{
                "lastCommit": "ssad123d12asx1wx12x",
                "name": "master",
            }],
            "owner": "user",
            "repositoryName": "repo"
        }])
    });

    test("getRepositories - Good Scenery with fork repo", async () => {
        const id = "user"
        const url = "https://branch.com";
        const mockGetBranch: Branch[] = [{
            name: 'master',
            commit: {
                sha: 'ssad123d12asx1wx12x',
                url: 'commitUrl'
            }
        }];
        const mockGetRepositories: Repository[] = [{
            name: 'repo',
            full_name: 'User/respo',
            owner: {
                login: 'user',
                id: 12
            },
            fork: true,
            branches_url: url
        }];

        jest.spyOn(GithubService, 'getBranchsByUrl').mockResolvedValue(mockGetBranch);
        jest.spyOn(GithubService, 'getRepositoriesById').mockResolvedValue(mockGetRepositories);

        const result = await RepositoryController.getRepositories(id);
        expect(result).toStrictEqual([])
    });

    test("getRepositories - Error Scenery with error from getRepositoriesById", async () => {
        const id = "user";
        const mockGetBranch: Branch[] = [{
            name: 'master',
            commit: {
                sha: 'ssad123d12asx1wx12x',
                url: 'commitUrl'
            }
        }];

        const mockError = {
            response: {
                status: 500,
                statusText: 'Internal Error'
            }
        };

        jest.spyOn(GithubService, 'getBranchsByUrl').mockResolvedValue(mockGetBranch);
        jest.spyOn(GithubService, 'getRepositoriesById').mockRejectedValue(mockError);

        try {
            await RepositoryController.getRepositories(id);
        } catch (error) {
            expect(error).toEqual({
                "response": {
                    "statusText": "Internal Error",
                    "status": 500,
                }
            })
        }
    });

    test("getRepositories - Error Scenery with error from getBranchByUrl", async () => {
        const id = "user";
        const url = "https://branch.com";
        const mockGetRepositories: Repository[] = [{
            name: 'repo',
            full_name: 'User/respo',
            owner: {
                login: 'user',
                id: 12
            },
            fork: true,
            branches_url: url
        }];

        const mockError = {
            response: {
                status: 500,
                statusText: 'Internal Error'
            }
        };

        jest.spyOn(GithubService, 'getBranchsByUrl').mockRejectedValue(mockError);
        jest.spyOn(GithubService, 'getRepositoriesById').mockResolvedValue(mockGetRepositories);

        try {
            await RepositoryController.getRepositories(id);
        } catch (error) {
            expect(error).toEqual({
                "response": {
                    "statusText": "Internal Error",
                    "status": 500,
                }
            })
        }
    });

})