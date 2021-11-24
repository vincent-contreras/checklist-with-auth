import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete
} from "@nestjs/common";
import { ResourcesService } from "./resources.service";
import { CreateResourceDto } from "./dto/create-resource.dto";
import { UpdateResourceDto } from "./dto/update-resource.dto";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Resources")
@Controller({ version: "1", path: "resources" })
export class ResourcesController {
  constructor(private readonly resourcesService: ResourcesService) {}

  @Post()
  create(@Body() createResourceDto: CreateResourceDto) {
    return this.resourcesService.create(createResourceDto);
  }

  @Get()
  findAll() {
    return this.resourcesService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.resourcesService.findOne(+id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateResourceDto: UpdateResourceDto
  ) {
    return this.resourcesService.updateOne(+id, updateResourceDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.resourcesService.deleteOne(+id);
  }
}
