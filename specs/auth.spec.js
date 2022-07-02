import chai from 'chai';
import {app} from '../services/index';
import {loadAPIspec, validate} from '../variant2/validator';
const assert = chai.assert;
describe ('Авторизация', () => {
    it ('Администратор может авторизоваться в системе', async () => {
        const {body, statusCode} = await app.Auth.signIn({
            "username": "admin",
            "password": "admin"
        });
        //  const apiSpec = await loadAPIspec('http://localhost/v3/api-docs');
        // const schema = apiSpec.paths['/user/token'].post.responses['200'].content['application/json'].schema;
        //  validate(schema, body);
        assert.strictEqual(statusCode, 200, 'statusCode не 200');
        // todo jwt не пустой
    });
    it ('Администратор может добавить продукт', async () => {
        let {body, statusCode} = await app.Auth.signIn({
            "username": "admin",
            "password": "admin"
        });
        const item = {
            "name": "string",
            "description": "string",
            "price": 0.1
        };
        ({body, statusCode} = await app.ProductService.post(body.jwt, item));
     //   console.log(body.jwt);
        //  const apiSpec = await loadAPIspec('http://localhost/v3/api-docs');
        // const schema = apiSpec.paths['/user/token'].post.responses['200'].content['application/json'].schema;
        //  validate(schema, body);
        assert.strictEqual(statusCode, 200, 'statusCode не 200');
        // todo проверка для тела
    });

});
