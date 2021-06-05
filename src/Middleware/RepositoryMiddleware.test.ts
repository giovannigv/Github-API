import RepositoryMiddleware from "./RepositoryMiddleware";

describe("RepositoryMiddleware",() => {

    test("verifyAcceptHeader - Error Scenery", async () => {
        try {
           RepositoryMiddleware.verifyAcceptHeader('application/xml');
        } catch (error) {
            expect(error).toStrictEqual({
                "Message": "Invalid Accept Header",
                "status": 406,
              });
        }
    });

    test("verifyAcceptHeader - Good Scenery", async () => {
        try {
           RepositoryMiddleware.verifyAcceptHeader('application/json');
        } catch (error) {
            expect(error).toBeNull()
        }
    });

})