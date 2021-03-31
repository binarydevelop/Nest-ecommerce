import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModuleAsyncOptions, TypeOrmModuleOptions } from "@nestjs/typeorm";

export default class typeOrmConfig {
    static getOrmConfig(configService: ConfigService): TypeOrmModuleOptions {
        return {
            type: 'postgres',
            host: configService.get('DB_HOST'),
            port: configService.get('DB_PORT'),
            username: configService.get('DB_USERNAME'),
            password: configService.get('DB_PASSWORD'),
            database: configService.get('DATABASE'),
            entities: [__dirname + '/../**/*.entity{.ts,.js}'],
            autoLoadEntities: true,
            synchronize: true,
            logging: true, 
        };
    }
}
export const typeOrmConfigAsync: TypeOrmModuleAsyncOptions = {
    imports:[ConfigModule],
    inject: [ConfigService],
    useFactory: async (configService: ConfigService): Promise<TypeOrmModuleAsyncOptions> => typeOrmConfig.getOrmConfig(configService)

}   