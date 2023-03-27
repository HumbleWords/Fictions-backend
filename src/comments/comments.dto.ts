export class FindAllCommentsDto {
  skip: number;
  take: number;
  where: {
    workPartId: number;
    parentId: number | null;
  };
  orderBy: {
    createdAt: 'asc' | 'desc';
  };
}

export class CreateCommentDto {
  text: string;
  user: {
    connect: {
      id: number;
    };
  };
  workPart: {
    connect: {
      id: number;
    };
  };
  parent: {
    connect: {
      id: number;
    };
  } | null;
}

export class UpdateCommentDto {
  text: string;
}
