import { ChecklistItem } from './checklist-item.entity';

describe('ChecklistItemEntity', () => {
  it('Item NOT null', () => {
    const checklistItem = new ChecklistItem();
    expect(checklistItem).toBeTruthy();
    expect(checklistItem.item).toBeUndefined();
  });
});
