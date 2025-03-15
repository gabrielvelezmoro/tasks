import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

config({
  path: `.env.${process.env.NODE_ENV}`,
});

const configService = new ConfigService();
const logger = new Logger('DataSource');

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  // url: <url> -> If you are using a URL to connect to DB
  host: configService.get('localhost'),
  port: configService.get('5432'),
  username: configService.get('gabriel'),
  password: configService.get('123456'),
  database: configService.get('tasks'),
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  // synchronize is true in dev env , please make it FALSE in production env and use migrations, use this link: https://orkhan.gitbook.io/typeorm/docs/migrations
  // genrating and runnning migration files scripts are provided in package.json file , you can change migrations path as desired.
  synchronize: true,
  // default migrations path
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
};

export const dataSource = new DataSource(dataSourceOptions);
dataSource
  .initialize()
  .then(() => {
    logger.log('Data Source has been initialized!');
  })
  .catch((err) => {
    logger.error('Error during Data Source initialization', err);
  });

// export dataSource;
