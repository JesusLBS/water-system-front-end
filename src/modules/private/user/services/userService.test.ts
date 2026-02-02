import { describe, it, expect, vi } from 'vitest';
import UserService from './userService';

vi.mock('../../../../shared/services/api/httpRequestService', () => ({
  default: {
    get: vi.fn(),
  },
}));

import httpRequestService from '../../../../shared/services/api/httpRequestService';

describe('UserService', () => {
  it('calls index endpoint with correct URL', async () => {
    (httpRequestService.get as any).mockResolvedValue({});

    const service = new UserService();

    await service.index({
      limit: 10,
      page: 1,
      sort: 'id',
      direction: 'asc',
      withTrashed: "",
      search: null,
    });

    expect(httpRequestService.get).toHaveBeenCalledTimes(1);

    const calledUrl = (httpRequestService.get as any).mock.calls[0][0];

    expect(calledUrl).toContain('admin/user/');
    expect(calledUrl).toContain('10/1/id/asc/false');
  });
});
