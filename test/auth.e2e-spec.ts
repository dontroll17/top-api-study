import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import * as request from 'supertest';
import { disconnect } from 'mongoose';
import { AuthDto } from 'src/auth/dto/auth.dto';


const loginDto: AuthDto = {
	login: 'a1@a.ru',
	password: '1'
};

const loginDtoFail: AuthDto = {
	login: 'a1@a.ru',
	password: '100'
};

const loginDtoFail2: AuthDto = {
	login: 'a3@a.ru',
	password: '1'
};


describe('AuthController (e2e)', () => {
  let app: INestApplication;
  let createdId: string;
  let token: string;

  beforeEach(async () => {
	const moduleFixture: TestingModule = await Test.createTestingModule({
		imports: [AppModule],
	}).compile();

	app = moduleFixture.createNestApplication();
	await app.init();

  });

  it('/auth/login (POST) - success', async () => {
    return request(app.getHttpServer())
        .post('/auth/login')
        .send(loginDto)
        .expect(200)
        .then(({body}: request.Response) => {
            expect(body.access_token).toBeDefined();
        });
  });

  it('/auth/login (POST) - fail pass', async () => {
    return request(app.getHttpServer())
        .post('/auth/login')
        .send(loginDtoFail)
        .expect(401, {
            statusCode: 401,
            message: "password not right",
            error: "Unauthorized"
        });
  });

  it('/auth/login (POST) - fail login', async () => {
    return request(app.getHttpServer())
        .post('/auth/login')
        .send(loginDtoFail2)
        .expect(401, {
            statusCode: 401,
            message: "user not found",
            error: "Unauthorized"
        });
  });

  afterAll(() => {
	disconnect();
  });
});
