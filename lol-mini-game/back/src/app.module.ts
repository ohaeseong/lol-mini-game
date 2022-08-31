import { Module } from '@nestjs/common';
import { RankModule } from './object-rank/object-rank.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ObjectRank } from './object-rank/entities/object-rank.entity';
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_USER } from 'config';
import { join } from 'path';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: DB_HOST,
      port: 3306,
      username: DB_USER,
      password: DB_PASSWORD,
      database: DB_NAME,
      synchronize: true,
      entities: [ObjectRank],
      logging: true,
    }),
    RankModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
