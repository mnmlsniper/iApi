import chai from 'chai';
import {app} from '../services/index';
import {loadAPIspec, validate} from '../variant2/validator';
const assert = chai.assert;
describe ('Авторизация', () => {
    it.skip ('Авторизоваться с верным паролем', async () => {
        const r = await app.Auth.signIn();
        // const apiSpec = await loadAPIspec('https://demo.sberds.com/auth-server/v2/api-docs');
        // console.log(apiSpec);
         //const schema = apiSpec.paths['/auth-server/oauth/token'].get.responses['200'].content['application/json'].schema;
        // validate(schema, r.body);
        assert.strictEqual(r.statusCode, 200, 'statusCode не 200');
    });
    it ('Администратор может авторизоваться в системе', async () => {
        const {body, statusCode} = await app.Auth.signIn({
            "username": "admin",
            "password": "admin"
        });
         const apiSpec = await loadAPIspec('http://localhost/v3/api-docs');
        const schema = apiSpec.paths['/user/token'].post.responses['200'].content['application/json'].schema;
         validate(schema, body);
        assert.strictEqual(statusCode, 200, 'statusCode не 200');
    });

});
