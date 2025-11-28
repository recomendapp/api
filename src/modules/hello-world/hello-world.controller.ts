import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TypedSupabaseClient } from '../../common/supabase/typed-supabase-client';
import { ApiBearerAuth } from '@nestjs/swagger';
import type { FastifyRequest } from 'fastify';

@Controller({
  path: 'hello-world',
  version: '1',
})
export class HelloWorldController {
  constructor(private readonly supabaseClient: TypedSupabaseClient) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('access-token')
  getHello(@Request() req: FastifyRequest): string {
    const user = req.user;

    if (!user) {
      throw new Error('User not found.');
    }

    return `Hello, ${user.email}! This is a protected route.`;
  }
}
