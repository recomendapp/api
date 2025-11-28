import { Controller, Get } from '@nestjs/common';
import { HelloWorldService } from './hello-world.service';

@Controller({
  path: 'hello-world',
  version: '1',
})
export class HelloWorldController {
  constructor(private readonly helloWorldService: HelloWorldService) {}

  @Get()
  getHello(): string {
    return this.helloWorldService.getHello();
  }
}
