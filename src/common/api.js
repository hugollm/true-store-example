/*
    This Api abstraction is a fake.
    It just uses setTimout to simulate real requests.
*/

class FakeApi {

    request(method, url, data) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                var getResponseData = this.responseMap(url);
                var response = {status: 200, data: getResponseData(data)};
                resolve(response);
            }, 1000);
        });
    }

    responseMap(url) {
        var map = {
            '/login': this.loginResponse,
            '/get-current-user': this.getCurrentUserResponse,
        };
        return map[url];
    }

    loginResponse(data) {
        if (data.username == 'johndoe' && data.password == '123456')
            return { ok: true, token: 'pg1p6grzgg4orjzqg4vejgobilxt4ifyxrjr799r' };
        else
            return { ok: false, error: 'Wrong username or password' };
    }

    getCurrentUserResponse(data) {
        return {
            user: {
                name: 'John Doe',
                email: 'john.doe@example.com',
            }
        };
    }
}

var api = new FakeApi();
export default api;
