export class FindAllWorkPartsDto {
  skip: number;
  take: number;
  where: {
    workId: number;
  };
  orderBy: {
    order: 'asc' | 'desc';
  };
}

export class CreateWorkPartDto {
  title: string | null;
  description?: string | null;
  note?: string | null;
  text: string;
  order: number;
  status: 'DRAFT' | 'PUBLISHED' | 'HIDDEN';
  work: {
    connect: {
      id: number;
    };
  };
}

export class UpdateWorkPartDto {
  title: string | null;
  description?: string | null;
  note?: string | null;
  text: string;
  order: number;
  status: 'DRAFT' | 'PUBLISHED' | 'HIDDEN';
}
