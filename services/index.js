import {AuthService} from './auth.service';
import {ProductService} from './product.service';


const app = {
    Auth: new AuthService(),
    ProductService: new ProductService(),
}

export {app};
