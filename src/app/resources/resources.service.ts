import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateResourceDto } from './dto/create-resource.dto';
import { UpdateResourceDto } from './dto/update-resource.dto';
import { Resource } from './entities/resource.entity';
import { ResourceRepository } from './repositories/resource.repository';

@Injectable()
export class ResourcesService {
  constructor(private readonly resourceRepository: ResourceRepository) {}
  async create(createResourceDto: CreateResourceDto) {
    const newItem = this.resourceRepository.create(createResourceDto);
    await this.resourceRepository.save(newItem);
    return newItem;
  }

  findAll() {
    return this.resourceRepository.find();
  }

  async findOneById(id: number): Promise<Resource> {
    const resource = await this.resourceRepository.findOne(id);

    if (!resource) {
      throw new BadRequestException('Item should exist');
    }

    return resource;
  }

  async updateOne(id: number, updateResourceDto: UpdateResourceDto) {
    await this.findOneById(id);

    await this.resourceRepository.update({ id }, updateResourceDto);

    return this.findOneById(id);
  }

  async deleteOne(id: number) {
    await this.findOneById(id);
    try {
      await this.resourceRepository.delete({ id });
      return { deleted: true };
    } catch (err) {
      return { deleted: false, message: err.message };
    }
  }
}
