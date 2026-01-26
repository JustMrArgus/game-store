import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHealth() {
    return {
      status: 'ok',
      currentDate: new Date().toISOString(),
    };
  }
}
