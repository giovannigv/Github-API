import GithubService from './GithubService';
import axios from 'axios';
import { Repository } from '../domain/entity/repository/Repository';
import { Branch } from '../domain/entity/branch/Branch';

jest.mock('axios')


test('should fetch Branchs', async () => {
    const url = "https://branch.com";
    const branchs: Branch[] = [{
        name: 'master',
        commit:{
            sha: 'ssad123d12asx1wx12x',
            url: 'commitUrl'
        }
    }];
    const resp = {data: branchs};
    jest.spyOn(axios,'get').mockResolvedValue(resp);

    return await GithubService.getBranchsByUrl(url)
        .then(data => expect(data).toBe(branchs))
});

test('should fetch error Branchs', async () => {
    const url = "https://branch.com";
    const resp = {response: {
        status:500,
        statusText:'Internal Error'
    }};
    jest.spyOn(axios,'get').mockRejectedValue(resp)
    try {
        await GithubService.getBranchsByUrl(url)
    } catch (error) {
        expect(error).toEqual( {
              "Message": "Internal Error",
              "status": 500,
            })
    }
});

test('should fetch Repositories', async () => {
    const id = "user";
    const repositories: Repository[] = [{
        name : 'repo',
        full_name: 'User/respo',
        owner: {
            login:'user',
            id:12
        },
        fork: false,
        branches_url: 'url'
    }];
    const resp = {data: repositories};
    jest.spyOn(axios,'get').mockResolvedValue(resp);

    return await GithubService.getRepositoriesById(id)
        .then(data => expect(data).toBe(repositories))
});

test('should fetch error Repositories', async () => {
    const id = "user";
    const resp = {response: {
        status:500,
        statusText:'Internal Error'
    }};
    jest.spyOn(axios,'get').mockRejectedValue(resp);
    try {
        await GithubService.getRepositoriesById(id)
    } catch (error) {
        expect(error).toEqual( {
              "Message": "Internal Error",
              "status": 500,
            })
    }
});
