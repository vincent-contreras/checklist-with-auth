import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Resource } from './entities/resource.entity';
import { ResourcesService } from './resources.service';
import { UpdateResourceDto } from './dto/update-resource.dto';
import { ResourceRepository } from './repositories/resource.repository';

const expectedResult = new Resource();
expectedResult.id = 0;
expectedResult.name = 'Test';
expectedResult.koreanName = '테스트';
expectedResult.creatable = true;
expectedResult.readable = true;
expectedResult.updatable = true;
expectedResult.deletable = true;

const existingItem = new Resource();
existingItem.name = 'Test';
existingItem.koreanName = '테스트';
existingItem.creatable = true;
existingItem.readable = true;
existingItem.updatable = true;
existingItem.deletable = true;

const resultArray = [expectedResult];

describe('ResourcesService', () => {
  let service: ResourcesService;
  let repo: Repository<Resource>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ResourcesService,
        {
          provide: getRepositoryToken(ResourceRepository),
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

    service = module.get<ResourcesService>(ResourcesService);
    repo = module.get<ResourceRepository>(ResourceRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('can add a new resource', async () => {
    return service.create(expectedResult).then((result: Resource) => {
      expect(repo.create).toHaveBeenCalled();
      expect(repo.save).toHaveBeenCalled();
      expect(result).toBe(expectedResult);
    });
  });

  it('can view list of resources', async () => {
    const returnList = await service.findAll();
    expect(returnList).toEqual(resultArray);
  });

  it('can read one resource', async () => {
    return service.findOne(expectedResult.id).then((result: Resource) => {
      expect(repo.findOne).toHaveBeenCalledWith(expectedResult.id);
      expect(result).toBe(expectedResult);
    });
  });

  it('can update one resource', async () => {
    const updatedItem = new UpdateResourceDto();

    // override original find one function
    repo.findOne = jest.fn().mockResolvedValue(updatedItem);

    return service
      .updateOne(existingItem.id, updatedItem)
      .then((result: Resource) => {
        expect(repo.update).toHaveBeenCalled();
        expect(result).toBe(updatedItem);
      });
  });

  it('can delete one resource', async () => {
    await expect(service.deleteOne(expectedResult.id)).resolves.toEqual({
      deleted: true
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });
});
