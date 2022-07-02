import {JsonRequest} from './base.interface';
import urls from '../config/urls';
import {loadAPIspec, validate} from '../lib/validator';

class AuthService {
    /**
     * Создает экземпляр AuthService.
     *
     * @this  {AuthService}
     **/


    /**
     * Авторизация в AuthService.
     *
     * @override
     * @this   {AuthService}
     * @parama  {user} user - Объект пользователя.
     * @return {object} http Ответ.
     **/
    async signIn(user) {
        const r = await new JsonRequest().prefixUrl(urls.dev).url('user/token').method('POST').body(user).send('user/token');
        // todo убрать загрузку спеки и сделать передачу пути
        const apiSpec = await loadAPIspec();
        const schema = apiSpec.paths['/user/token']['post']['responses']['200']['content']['application/json']['schema'];
       // const schema = apiSpec.paths['/user/token'].post.responses['200'].content['application/json'].schema;
        validate(schema, r.body);
        return r;
    };
}

export {AuthService};
