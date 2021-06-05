import {env} from "../../environment/env";
import axios from "axios";
import { Repository } from "../domain/entity/repository/Repository";
import { Branch } from "../domain/entity/branch/Branch";

class GithubService {
    private baseRoute = 'https://api.github.com';

    public async getRepositoriesById(id:string) : Promise<Repository[]>{
        return await axios.get(`${this.baseRoute}/users/${id}/repos`)
            .then(r => r.data)
            .catch(err => {
                throw {
                    status: err.response.status,
                    Message: err.response.statusText
                }
            });
    }

    public async getBranchsByUrl(branchesUrl: string): Promise<Branch[]>{
        return await axios.get(branchesUrl.replace(/{\/branch}/i,''))
            .then(r => r.data)
            .catch(err => {
                throw {
                    status: err.response.status,
                    Message: err.response.statusText
                }
            });
    }
}

export default new GithubService();