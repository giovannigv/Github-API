import { Repository } from "../domain/entity/repository/Repository";
import { RepositoriesResponse } from "../domain/entity/response/RespositoriesResponse";
import GithubService from "../service/GithubService";
import { Branch } from "../domain/entity/branch/Branch";


class RepositoryController {

    async getRepositories(id: string){
        // Receive all Repositories from an user
        const result: Repository[] = await GithubService.getRepositoriesById(id);

        // For Each Repository in array, will complete with the branchs name and last commit
        const response : RepositoriesResponse[] = await Promise.all(result.map(async (repo: Repository) => {
            if (!repo.fork) {
                return {
                    repositoryName: repo.name,
                    owner: repo.owner.login,
                    branch: await this.getBranch(repo.branches_url)
                }
            }
        }))
        // Remove null spaces from array because of map function
        return response.filter(obj => obj != null)
    }

    // Get all branch and return in a format necessary for branchs
    async getBranch(branchUrl: string) {
        const response = await GithubService.getBranchsByUrl(branchUrl)
        return response.map((branch: Branch) => {
            return {
                name: branch.name,
                lastCommit: branch.commit.sha
            }
        });
    }
}

export default new RepositoryController();