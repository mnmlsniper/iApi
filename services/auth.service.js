import { JsonRequest } from './base.interface';
import urls from '../config/urls';

class AuthService {
    async signIn(user) {
        return await new JsonRequest().prefixUrl(urls.dev).url('user/token').method('POST').body(user).send('user/token');
    };
    // async signIn1(token) {
    //     return await new JsonRequest().prefixUrl(urls.sds).url('auth-server/oauth/token').method('POST').send('auth-server/oauth/token');
    // }
}

export {AuthService};
