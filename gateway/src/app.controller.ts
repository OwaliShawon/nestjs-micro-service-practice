// import { Controller, Get } from '@nestjs/common';
// import { AppService } from './app.service';

// @Controller()
// export class AppController {
//   constructor(private readonly appService: AppService) {}

//   @Get()
//   getHello(): string {
//     return this.appService.getHello();
//   }
// }

import { Controller, Get, Inject, Param } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller('hello')
export class AppController {
  constructor(
    @Inject('HELLO_SERVICE') private client: ClientProxy,
    @Inject('TEST_SERVICE') private test_client: ClientProxy,
  ) {}

  @Get(':name')
  getHelloByName(@Param('name') name = 'there') {
    // Forwards the name to our hello service, and returns the results
    console.log(
      'Forwards the name to our hello service, and returns the results',
    );
    return this.client.send({ cmd: 'hello' }, name);
  }

  @Get('test/me')
  getTest() {
    // Forwards the name to our test service, and returns the results
    console.log(
      'Forwards the name to our test service, and returns the results',
    );
    return this.test_client.send({ cmd: 'test' }, {});
  }
}
