import { Module } from '@nestjs/common';
import { RankModule } from './rank/rank.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rank } from './rank/entities/rank.entity';
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_USER } from 'config';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: DB_HOST,
      port: 3306,
      username: DB_USER,
      password: DB_PASSWORD,
      database: DB_NAME,
      synchronize: true,
      entities: [Rank],
      logging: true,
    }),
    RankModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
