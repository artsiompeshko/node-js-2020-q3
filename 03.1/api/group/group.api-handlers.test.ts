import { NextFunction, Request, Response } from 'express';

import { Group, CreateGroupInputDto } from '03.1/interfaces/group/group.interface';
import { groupService } from '03.1/services/group/group.service';

import httpMocks, { MockRequest, MockResponse } from 'node-mocks-http';

import { mockGroups } from '03.1/mocks/groups';

import * as handlers from './group.api-handlers';

describe('group.api-handlers', () => {
  describe('GET /list', () => {
    it('should return json list of groups', async () => {
      // given
      groupService.findAll = jest.fn().mockReturnValue(mockGroups);

      const mockReq: MockRequest<Request> = httpMocks.createRequest({
        method: 'GET',
        url: '/group/list',
      });
      const mockRes: MockResponse<Response> = httpMocks.createResponse();
      const mockNext: jest.Mocked<NextFunction> = jest.fn();

      // when
      await handlers.findAll(mockReq, mockRes, mockNext);

      // then
      expect(mockRes._getJSONData()).toEqual(mockGroups);
    });

    it('should call next middleware in case of errors thrown during extracting groups', async () => {
      // given
      const mockError = new Error('no db connection');

      groupService.findAll = jest.fn(() => {
        throw mockError;
      });

      const mockReq: MockRequest<Request> = httpMocks.createRequest({
        method: 'GET',
        url: '/group/list',
      });
      const mockRes: MockResponse<Response> = httpMocks.createResponse();
      const mockNext: jest.Mocked<NextFunction> = jest.fn();

      // when
      await handlers.findAll(mockReq, mockRes, mockNext);

      // then
      expect(mockNext).toHaveBeenCalledWith(mockError);
    });
  });

  describe('POST /create', () => {
    it('should return created group', async () => {
      // given
      const mockCreateGroupDto: CreateGroupInputDto = {
        name: 'test',
        permissions: 'WRITE',
      };

      const mockGroup: Group = {
        ...mockCreateGroupDto,
        permissions: ['WRITE'],
        id: 1,
      };

      groupService.add = jest.fn(
        async (): Promise<Group> => {
          return mockGroup;
        },
      );
      const mockBody = {
        ...mockCreateGroupDto,
      };

      const mockReq: MockRequest<Request> = httpMocks.createRequest({
        method: 'POST',
        url: '/user/',
        body: mockBody,
      });
      const mockRes: MockResponse<Response> = httpMocks.createResponse();
      const mockNext: jest.Mocked<NextFunction> = jest.fn();

      // when
      await handlers.createGroup(mockReq, mockRes, mockNext);

      // then
      expect(groupService.add).toHaveBeenCalledWith(mockCreateGroupDto);
      expect(mockRes._getJSONData()).toEqual(mockGroup);
    });

    it('should call next middleware in case of errors thrown during creating a group', async () => {
      // given
      const mockError = new Error('error while creating the group');

      const mockCreateGroupDto: CreateGroupInputDto = {
        name: 'test',
        permissions: 'WRITE',
      };

      groupService.add = jest.fn(
        async (): Promise<Group> => {
          throw mockError;
        },
      );
      const mockBody = {
        ...mockCreateGroupDto,
      };

      const mockReq: MockRequest<Request> = httpMocks.createRequest({
        method: 'POST',
        url: '/user/',
        body: mockBody,
      });
      const mockRes: MockResponse<Response> = httpMocks.createResponse();
      const mockNext: jest.Mocked<NextFunction> = jest.fn();

      // when
      await handlers.createGroup(mockReq, mockRes, mockNext);

      // then
      expect(groupService.add).toHaveBeenCalledWith(mockCreateGroupDto);
      expect(mockNext).toHaveBeenCalledWith(mockError);
    });
  });

  // [NOTE]:
  // The idea of the further tests are the same, because of the modules separation.
  // Do not see a reason to write all of them in educational purposes. Just waste of time.
});
