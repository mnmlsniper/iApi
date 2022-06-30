import Ajv from 'ajv';
import SwaggerParser from '@apidevtools/swagger-parser';

export async function loadAPIspec(path){
    return SwaggerParser.dereference(path);
}

export function validate(schema, body){
    const ajv = new Ajv ({
        allErrors: true,
        verbose:true,
        strict: false,
        formats: {
            double: '[+-]?\\d*\\.?\\d+',
            int32: /^(-?\d{1,9}|-?1\d{9}|-?20\d{8}|-?21[0-3]\d{7}|-?214[0-6]\d{6}|-?2147[0-3]\d{5}|-?21474[0-7]\d{4}|-?214748[012]\d{4}|-?2147483[0-5]\d{3}|-?21474836[0-3]\d{2}|214748364[0-7]|-214748364[0-8])$/,
            int64: /^\d+$/,
            'date-time': /^\d\d\d\d-(0?[1-9]|1[0-2])-(0?[1-9]|[12][0-9]|3[01])T(00|[0-9]|1[0-9]|2[0-3]):([0-9]|[0-5][0-9]):([0-9]|[0-5][0-9])-([0-9]|[0-5][0-9]):([0-9]|[0-5][0-9])$/,
        },
    });
    const validate = ajv.compile(schema);
    const valid = validate(body);
    if (!valid) {
        throw new Error(`Error: ${JSON.stringify({
            validationErrors: validate.errors
        }, null, 2)}`)
    }
}
