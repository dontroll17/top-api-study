import { ConfigService } from "@nestjs/config";
import { TypegooseModuleOptions } from "nestjs-typegoose";

export const getMongoConfig = async (configService: ConfigService): Promise<TypegooseModuleOptions> => {
    return {
        uri: getMongoSting(configService),
        ...getMongoOptions()
    };
};

const getMongoSting = (configService: ConfigService) => 
    'mongodb://' +
    configService.get('MONGO_LOGIN') +
    ':' + 
    configService.get('MONGO_PASSWORD') +
    '@' +
    configService.get('MONGO_HOST') +
    ':' +
    configService.get('MONGO_PORT') +
    '/' +
    configService.get('MONGO_AUTHDATABASE');

const getMongoOptions = () => ({
    useNewUrlParser: true,
//    useCreateIndex: true,
//MongoParseError: option usecreateindex is not supported
    useUnifiedTopology: true
});