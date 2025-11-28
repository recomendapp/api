import { Module } from '@nestjs/common';
import { HelloWorldModule } from './hello-world/hello-world.module';
import { AuthModule } from './auth/auth.module';
import { SearchModule } from './search/search.module';

@Module({
  imports: [HelloWorldModule, AuthModule, SearchModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
