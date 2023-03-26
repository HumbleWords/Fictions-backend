export class FindAllFandomsDto {
  skip: number;
  take: number;
  where: { name: string };
  orderBy: {
    name: 'asc' | 'desc';
  };
}

export class CreateFandomDto {
  name: string;
}

export class UpdateFandomDto {
  name: string;
}
