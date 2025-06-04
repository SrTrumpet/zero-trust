import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { AuthResolver } from './graphql/auth.resolver';
import { AccesControlService } from './graphql/acces-control.service';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql')
    })
  ],
  providers: [AuthResolver, AccesControlService],
})
export class AppModule {}
