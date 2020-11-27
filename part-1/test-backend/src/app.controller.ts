import { Controller, Get, Param } from '@nestjs/common';

import { AppService } from './app.service';

@Controller()
export class AppController {
  entries: object;

  constructor(private readonly appService: AppService) {
    this.entries = {
      '1' : {
        header: 'Jane Doe',
        title: 'CEO & Founder',
        content: 'Some text that describes me lorem ipsum ipsum lorem.',
        email: 'example@example.com',
        picture: 'http://test-url.com'
      },
      '2' : {
        header: 'Mike Ross',
        title: 'Art Director',
        content: 'Some text that describes me lorem ipsum ipsum lorem.',
        email: 'example@example.com',
        picture: 'http://test-url.com'
      },
      '3' : {
        header: 'John Doe',
        title: 'Designer',
        content: 'Some text that describes me lorem ipsum ipsum lorem.',
        email: '',
        picture: 'http://test-url.com'
      },
    }
  }

  @Get()
  findAll(): object {
    return this.entries;
  }

  @Get(':id')
  findById(@Param() param): string {
    return this.entries[param.id] || '';
  }
}
