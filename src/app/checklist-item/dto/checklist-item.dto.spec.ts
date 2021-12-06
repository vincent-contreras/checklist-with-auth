import { NewChecklistItemDto } from './new-checklist-item.dto';

describe('NewChecklistItemDto', () => {
  it('should be defined', () => {
    expect(new NewChecklistItemDto('te')).toBeDefined();
  });
});
