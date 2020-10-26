import { NextFunction, Request, Response } from 'express';

import { userService } from '03.1/services/user/user.service';
import { User, CreateUserInputDto, UpdateUserInputDto } from '03.1/interfaces/user/user.interface';

import httpMocks, { MockRequest, MockResponse } from 'node-mocks-http';

import { mockUsers } from '03.1/mocks/users';

import * as handlers from './user.api-handlers';

describe('user.api-handlers', () => {
  describe('GET /list', () => {
    it('should return json list of users', async () => {
      // given
      userService.findAll = jest.fn().mockReturnValue(mockUsers);

      const mockReq: MockRequest<Request> = httpMocks.createRequest({
        method: 'GET',
        url: '/user/list',
      });
      const mockRes: MockResponse<Response> = httpMocks.createResponse();
      const mockNext: jest.Mocked<NextFunction> = jest.fn();

      // when
      await handlers.findAll(mockReq, mockRes, mockNext);

      // then
      expect(mockRes._getJSONData()).toEqual(mockUsers);
    });

    it('should call next middleware in case of errors thrown during extracting users', async () => {
      // given
      const mockError = new Error('no db connection');

      userService.findAll = jest.fn(() => {
        throw mockError;
      });

      const mockReq: MockRequest<Request> = httpMocks.createRequest({
        method: 'GET',
        url: '/user/list',
      });
      const mockRes: MockResponse<Response> = httpMocks.createResponse();
      const mockNext: jest.Mocked<NextFunction> = jest.fn();

      // when
      await handlers.findAll(mockReq, mockRes, mockNext);

      // then
      expect(mockNext).toHaveBeenCalledWith(mockError);
    });
  });

  describe('GET /suggest', () => {
    it('should return json list of users by suggestion', async () => {
      // given
      userService.suggest = jest.fn().mockReturnValue(mockUsers);
      const mockQuery = {
        loginSubstring: 'arts',
        limit: 1,
      };

      const mockReq: MockRequest<Request> = httpMocks.createRequest({
        method: 'GET',
        url: '/user/suggest',
        query: mockQuery,
      });
      const mockRes: MockResponse<Response> = httpMocks.createResponse();
      const mockNext: jest.Mocked<NextFunction> = jest.fn();

      // when
      await handlers.getSuggestions(mockReq, mockRes, mockNext);

      // then
      expect(userService.suggest).toHaveBeenCalledWith(mockQuery.loginSubstring, mockQuery.limit);
      expect(mockRes._getJSONData()).toEqual(mockUsers);
    });

    it('should call next middleware in case of errors thrown during extracting users', async () => {
      // given
      const mockError = new Error('Connection lost');
      const mockQuery = {
        loginSubstring: 'arts',
        limit: 1,
      };
      userService.suggest = jest.fn(() => {
        throw mockError;
      });

      const mockReq: MockRequest<Request> = httpMocks.createRequest({
        method: 'GET',
        url: '/user/suggest',
        query: mockQuery,
      });
      const mockRes: MockResponse<Response> = httpMocks.createResponse();
      const mockNext: jest.Mocked<NextFunction> = jest.fn();

      // when
      await handlers.getSuggestions(mockReq, mockRes, mockNext);

      // then
      expect(userService.suggest).toHaveBeenCalledWith(mockQuery.loginSubstring, mockQuery.limit);
      expect(mockNext).toHaveBeenCalledWith(mockError);
    });
  });

  describe('POST /create', () => {
    it('should return created user', async () => {
      // given
      const mockCreateUserDto: CreateUserInputDto = {
        login: 'artsiom',
        password: '123',
        age: 18,
      };

      const mockUser: User = {
        ...mockCreateUserDto,
        id: 1,
      };

      userService.add = jest.fn(
        async (): Promise<User> => {
          return mockUser;
        },
      );
      const mockBody = {
        ...mockCreateUserDto,
      };

      const mockReq: MockRequest<Request> = httpMocks.createRequest({
        method: 'POST',
        url: '/user/',
        body: mockBody,
      });
      const mockRes: MockResponse<Response> = httpMocks.createResponse();
      const mockNext: jest.Mocked<NextFunction> = jest.fn();

      // when
      await handlers.createUser(mockReq, mockRes, mockNext);

      // then
      expect(userService.add).toHaveBeenCalledWith(mockCreateUserDto);
      expect(mockRes._getJSONData()).toEqual(mockUser);
    });

    it('should call next middleware in case of errors thrown during creating a user', async () => {
      // given
      const mockError = new Error('error while creating the user');

      const mockCreateUserDto: CreateUserInputDto = {
        login: 'artsiom',
        password: '123',
        age: 18,
      };

      userService.add = jest.fn(
        async (): Promise<User> => {
          throw mockError;
        },
      );
      const mockBody = {
        ...mockCreateUserDto,
      };

      const mockReq: MockRequest<Request> = httpMocks.createRequest({
        method: 'POST',
        url: '/user/',
        body: mockBody,
      });
      const mockRes: MockResponse<Response> = httpMocks.createResponse();
      const mockNext: jest.Mocked<NextFunction> = jest.fn();

      // when
      await handlers.createUser(mockReq, mockRes, mockNext);

      // then
      expect(userService.add).toHaveBeenCalledWith(mockCreateUserDto);
      expect(mockNext).toHaveBeenCalledWith(mockError);
    });
  });

  // [NOTE]:
  // The idea of the further tests are the same, because of the modules separation.
  // Do not see a reason to write all of them in educational purposes. Just waste of time.
});
