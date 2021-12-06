import { Test, TestingModule } from '@nestjs/testing';
import { ChecklistItemController } from './checklist-item.controller';
import { NewChecklistItemDto } from '../dto/new-checklist-item.dto';
import { ChecklistItemService } from '../services/checklist-item.service';
import { ChecklistItem } from '../entities/checklist-item.entity';
import { BadRequestException } from '@nestjs/common';

jest.mock('../services/checklist-item.service.ts');

const resultItem = new ChecklistItem();
resultItem.id = 1;
resultItem.item = 'Go to school';

const wrongInput1 = new NewChecklistItemDto('');

const updatedItem = new ChecklistItem();
updatedItem.id = 1;
updatedItem.item = 'Go to hell';

const listResult = [resultItem];

describe('--- ChecklistItemController ---', () => {
  let controller: ChecklistItemController;
  let service: ChecklistItemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChecklistItemController],
      providers: [ChecklistItemService]
    }).compile();

    controller = module.get<ChecklistItemController>(ChecklistItemController);
    service = module.get<ChecklistItemService>(ChecklistItemService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('can validate items entered', async () => {
    return controller
      .create(wrongInput1)
      .then(() => {
        expect(service.create).toHaveBeenCalled();
      })
      .catch((error) => {
        expect(error).toBeInstanceOf(BadRequestException);
      });
  });

  it('can add new items', async () => {
    service.create = jest.fn().mockResolvedValue(resultItem);

    return controller.create(resultItem).then((result: ChecklistItem) => {
      expect(service.create).toHaveBeenCalled();
      expect(result).toBe(resultItem);
    });
  });

  it('can read one item', async () => {
    service.findOne = jest.fn().mockResolvedValue(resultItem);

    return controller.getOne(resultItem.id).then((result: ChecklistItem) => {
      expect(service.findOne).toHaveBeenCalledWith({ id: resultItem.id });
      expect(result).toBe(resultItem);
    });
  });

  it('can show error when item does not exist', async () => {
    return controller
      .getOne(100)
      .then(() => {
        expect(service.findOne).toHaveBeenCalled();
      })
      .catch((error) => {
        expect(error).toBeInstanceOf(BadRequestException);
      });
  });

  it('can show item list', async () => {
    service.findAll = jest.fn().mockResolvedValue(listResult);

    return controller.getAll().then((result: []) => {
      expect(service.findAll).toHaveBeenCalled();
      expect(result).toBe(listResult);
    });
  });

  it('can update an item', async () => {
    service.updateOne = jest.fn().mockResolvedValue(updatedItem);

    return controller
      .update(resultItem.id, updatedItem)
      .then((result: ChecklistItem) => {
        expect(service.updateOne).toHaveBeenCalled();
        expect(result).toBe(updatedItem);
      });
  });

  it('can not delete an item that does not exist', async () => {
    service.deleteOne = jest.fn().mockResolvedValue({ deleted: false });

    return controller.deleteOne(resultItem.id).then((result) => {
      expect(service.deleteOne).toHaveBeenCalled();
      expect(result.deleted).toBe(false);
    });
  });

  it('can delete an item', async () => {
    service.deleteOne = jest.fn().mockResolvedValue({ deleted: true });

    return controller.deleteOne(resultItem.id).then((result) => {
      expect(service.deleteOne).toHaveBeenCalled();
      expect(result.deleted).toBe(true);
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });
});
