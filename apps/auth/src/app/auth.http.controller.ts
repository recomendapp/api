import { All, Controller, Get, Req, Res } from '@nestjs/common';
import { toNodeHandler } from 'better-auth/node';
import { auth } from '../lib/auth';

@Controller()
export class AuthHttpController {

	@Get('health')
	getHealth() {
		return { status: 'ok', timestamp: Date.now() };
	}
  
	@All('*')
	async handleAuth(@Req() req, @Res() res) {
		return toNodeHandler(auth)(req, res);
	}
}