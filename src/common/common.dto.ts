import { ApiProperty } from "@nestjs/swagger";

export class FindOneDto {
    @ApiProperty()
    id: number
}