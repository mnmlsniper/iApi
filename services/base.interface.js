import got from 'got';
import pino from 'pino';
// todo вынести логгер
const logger = pino({
    transport: {
        target: 'pino-pretty',
        options: {
            colorize: true
        }
    }
})

export class BaseHttpRequest {
    options = {
        http2: true,
        //todo отменяем exeption
        throwHttpErrors: false,
    };

    prefixUrl(url) {
        this.options.prefixUrl = url;
        return this;
    }

    /**
     * @param url Can be full url, but only in case prefixUrl is not set
     */
    url(url) {
        this.options.url = url;
        return this;
    }

    method(method) {
        this.options.method = method;
        return this;
    }

    headers(headers) {
        this.options.headers = this.options.headers ?? {};
        this.options.headers = {
            ...this.options.headers,
            ...headers
        };
        return this;
    }
//todo надо ли передавать nameRequest?
    async send(nameRequest) {
        // Логгируем запрос
        logger.info(`${nameRequest} request: method is ${this.options.method}, url is ${this.options.url}, body is ${JSON.stringify(this.options.data, null, 4)}`);


        // Patching async stacktrace that leads to nowhere
        const
            stack = new Error().stack
        try {
            const response = await got ( this.options );
            //[Symbol(body)]:
// todo доделать логгирование тела
            // некорректный проброс кода? в связке         throwHttpErrors: false,
            logger.info(`${nameRequest} response: status is ${response.statusCode}, body is ${JSON.stringify(response.data, null, 4)}`);
            return response;
        } catch
            (err) {
            err.stack = stack
            if (err instanceof got.HTTPError) {
                err.message = `
                [${err?.options?.method}]: ${err?.options?.url} => ${err?.response?.statusCode}
                ${err.message}
                ${err?.response?.rawBody?.toString()}
                `
            }
            throw err
        }
    }
}

export class JsonRequest extends BaseHttpRequest {
    constructor() {
        super()
        this.options = {
            ...this.options,
            responseType: "json"
        }
    }

     body(body)  {
       // console.log(body);
        this.options.json = body;
        return this;
    }
}
