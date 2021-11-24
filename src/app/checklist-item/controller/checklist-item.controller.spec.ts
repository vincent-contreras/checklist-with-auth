import { Test, TestingModule } from "@nestjs/testing";
import { ChecklistItemController } from "./checklist-item.controller";
import { ChecklistItemDto } from "../dto/checklist-item.dto";
import { ChecklistItemService } from "../services/checklist-item/checklist-item.service";
import { ChecklistItem } from "../entities/checklist-item.entity";
import { BadRequestException } from "@nestjs/common";

jest.mock("../service/checklist-item/checklist-item.service");

const inputDto = new ChecklistItemDto("Go to school");
const resultItem = new ChecklistItem();
resultItem.id = 1;
resultItem.item = "Go to school";

const wrongInput1 = new ChecklistItemDto("");
const wrongInput2 = new ChecklistItemDto("");

const updatedItem = new ChecklistItem();
updatedItem.id = 1;
updatedItem.item = "Go to hell";

const listResult = [resultItem];

describe("--- ChecklistItemController ---", () => {
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

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("Item 입력이 Valid 되야 된다", async () => {
    return controller
      .create(wrongInput1)
      .then((result: ChecklistItem) => {
        expect(service.create).toHaveBeenCalled();
      })
      .catch((error) => {
        expect(error).toBeInstanceOf(BadRequestException);
      });
  });

  it("Item을 추가할 수 있다", async () => {
    service.create = jest.fn().mockResolvedValue(resultItem);

    return controller.create(resultItem).then((result: ChecklistItem) => {
      expect(service.create).toHaveBeenCalled();
      expect(result).toBe(resultItem);
    });
  });

  it("Item을 한개 조회", async () => {
    service.findOne = jest.fn().mockResolvedValue(resultItem);

    return controller.getOne(resultItem.id).then((result: ChecklistItem) => {
      expect(service.findOne).toHaveBeenCalledWith({ id: resultItem.id });
      expect(result).toBe(resultItem);
    });
  });

  it("Item이 존재해야 된다", async () => {
    return controller
      .getOne(100)
      .then((result: ChecklistItem) => {
        expect(service.findOne).toHaveBeenCalled();
      })
      .catch((error) => {
        expect(error).toBeInstanceOf(BadRequestException);
      });
  });

  it("리스트 조회 할 수 있다", async () => {
    service.findAll = jest.fn().mockResolvedValue(listResult);

    return controller.getAll().then((result: []) => {
      expect(service.findAll).toHaveBeenCalled();
      expect(result).toBe(listResult);
    });
  });

  it("Item을 수정할 수 있다", async () => {
    service.updateOne = jest.fn().mockResolvedValue(updatedItem);

    return controller
      .update(resultItem.id, updatedItem)
      .then((result: ChecklistItem) => {
        expect(service.updateOne).toHaveBeenCalled();
        expect(result).toBe(updatedItem);
      });
  });

  it("삭제할 Item이 존재해야 된다", async () => {
    service.deleteOne = jest.fn().mockResolvedValue({ deleted: false });

    return controller.deleteOne(resultItem.id).then((result) => {
      expect(service.deleteOne).toHaveBeenCalled();
      expect(result.deleted).toBe(false);
    });
  });

  it("Item을 삭제할 수 있다", async () => {
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
