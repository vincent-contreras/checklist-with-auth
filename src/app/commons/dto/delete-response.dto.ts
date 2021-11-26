import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";

export class DeleteResponse {
  @ApiProperty({
    title: "Deleted",
    type: "boolean",
    description: "Specifies whether object has been deleted."
  })
  deleted: boolean;

  @ApiProperty({
    title: "Message",
    type: "string",
    description: "Error message, if any"
  })
  @IsOptional()
  message?: "string";

  constructor(deleted: boolean) {
    this.deleted = deleted;
  }
}
