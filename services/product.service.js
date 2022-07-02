import {JsonRequest} from './base.interface';
import urls from '../config/urls';
import {loadAPIspec, validate} from '../lib/validator';

class ProductService {
    async post(token, item) {
        console.log(item);
        const r = await new JsonRequest().prefixUrl(urls.dev).url('product').headers({"Authorization": `Bearer ${token}`}).method('POST').body(item).send('product');
        // todo убрать загрузку спеки и сделать передачу пути
        const apiSpec = await loadAPIspec('http://localhost/v3/api-docs');
        const schema = apiSpec.paths['/product'].post.responses['200'].content['application/json'].schema;
        validate(schema, r.body);
        return r;
    };
}

export {ProductService};
