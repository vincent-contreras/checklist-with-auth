import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ChecklistItemDto } from '../dto/checklist-item.dto';
import { ChecklistItem } from '../entities/checklist-item.entity';
import { ChecklistItemService } from './checklist-item.service';

const expectedResult = new ChecklistItem();
expectedResult.id = 0;
expectedResult.item = 'Test';

const existingItem = new ChecklistItem();
existingItem.id = 1;
existingItem.item = 'Go to heaven';

const resultArray = [expectedResult];

describe('--- ChecklistItemService ---', () => {
  let service: ChecklistItemService;
  let repo: Repository<ChecklistItem>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ChecklistItemService,
        {
          provide: getRepositoryToken(ChecklistItem),
          useValue: {
            find: jest.fn().mockResolvedValue(resultArray),
            findOne: jest.fn().mockResolvedValue(expectedResult),
            create: jest.fn().mockResolvedValue(expectedResult),
            save: jest.fn(),
            update: jest.fn().mockResolvedValue(null),
            delete: jest.fn().mockResolvedValue(null)
          }
        }
      ]
    }).compile();

    service = module.get<ChecklistItemService>(ChecklistItemService);
    repo = module.get<Repository<ChecklistItem>>(
      getRepositoryToken(ChecklistItem)
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Item을 추가할 수 있다', async () => {
    // const result = await service.create(expectedResult)
    // expect(result).toEqual(expectedResult);

    return service.create(expectedResult).then((result: ChecklistItem) => {
      expect(repo.create).toHaveBeenCalled();
      expect(repo.save).toHaveBeenCalled();
      expect(result).toBe(expectedResult);
    });
  });

  it('List를 조회 할 수 있다', async () => {
    const returnList = await service.findAll();
    expect(returnList).toEqual(resultArray);
  });

  it('아이템 한개 조회', async () => {
    return service
      .findOne({ id: expectedResult.id })
      .then((result: ChecklistItem) => {
        expect(repo.findOne).toHaveBeenCalledWith({
          id: expectedResult.id
        });
        expect(result).toBe(expectedResult);
      });
  });

  it('Item을 수정할 수 있다', async () => {
    const updatedItem = new ChecklistItemDto('Go to Hell');

    // override original find one function
    repo.findOne = jest.fn().mockResolvedValue(updatedItem);

    return service
      .updateOne(existingItem.id, updatedItem)
      .then((result: ChecklistItem) => {
        expect(repo.update).toHaveBeenCalled();
        expect(result).toBe(updatedItem);
      });
  });
  it('Item을 삭제할 수 있다', async () => {
    await expect(service.deleteOne(expectedResult.id)).resolves.toEqual({
      deleted: true
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });
});
