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
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags
} from "@nestjs/swagger";
import { Resource } from "./entities/resource.entity";
import { DeleteResponse } from "../commons/dto/delete-response.dto";

@ApiTags("Resources")
@Controller({ version: "1", path: "resources" })
export class ResourcesController {
  constructor(private readonly resourcesService: ResourcesService) {}

  @Post()
  @ApiBody({ type: CreateResourceDto, isArray: false })
  @ApiOperation({
    summary: "Create new resource",
    description: "Creates a new resource."
  })
  @ApiResponse({ status: 200, type: Resource, isArray: false })
  create(@Body() createResourceDto: CreateResourceDto) {
    return this.resourcesService.create(createResourceDto);
  }

  @Get()
  @ApiOperation({
    summary: "Get list of resources",
    description: "Retrieves a list of resources."
  })
  @ApiResponse({ status: 200, type: Resource, isArray: true })
  findAll() {
    return this.resourcesService.findAll();
  }

  @Get(":id")
  @ApiParam({ name: "id", type: "number" })
  @ApiOperation({
    summary: "Get resource",
    description: "Retrieves one resource object"
  })
  @ApiResponse({ status: 200, type: Resource, isArray: false })
  findOne(@Param("id") id: string) {
    return this.resourcesService.findOneById(+id);
  }

  @Patch(":id")
  @ApiParam({ name: "id", type: "number" })
  @ApiOperation({
    summary: "Update resource",
    description: "Updates one resource object"
  })
  @ApiBody({ type: UpdateResourceDto, isArray: false })
  @ApiResponse({ status: 200, type: Resource, isArray: false })
  update(
    @Param("id") id: string,
    @Body() updateResourceDto: UpdateResourceDto
  ) {
    return this.resourcesService.updateOne(+id, updateResourceDto);
  }

  @Delete(":id")
  @ApiParam({ name: "id", type: "number" })
  @ApiOperation({
    summary: "Delete resource",
    description: "Deletes one resource object"
  })
  @ApiResponse({ status: 200, type: DeleteResponse, isArray: false })
  remove(@Param("id") id: string) {
    return this.resourcesService.deleteOne(+id);
  }
}
