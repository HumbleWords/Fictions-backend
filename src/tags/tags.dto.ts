export class FindAllTagsDto {
  skip: number;
  take: number;
  where: { name: string };
  orderBy: {
    name: 'asc' | 'desc';
  };
}

export class CreateTagDto {
  name: string;
}

export class UpdateTagDto {
  name: string;
}
