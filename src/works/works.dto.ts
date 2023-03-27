export class FindAllWorksDto {
  skip: number;
  take: number;
  where: {
    title: string | null;
    author: {
      username: string | null;
    };
    tags: {
      some: {
        name: string | null;
      };
    };
    fandoms: {
      some: {
        name: string | null;
      };
    };
  };
  orderBy: {
    title: 'asc' | 'desc';
  };
}

export class CreateWorkDto {
  title: string;
  author: { connect: { id: number } };
  description: string;
  note: string | null;
  status: 'DRAFT' | 'PUBLISHED' | 'HIDDEN';
  lang:
    | 'zh_ch'
    | 'nl'
    | 'en'
    | 'fr'
    | 'de'
    | 'it'
    | 'ja'
    | 'no'
    | 'pl'
    | 'pt'
    | 'ru'
    | 'es'
    | 'sv'
    | 'vi'
    | null;
  rating: 'G' | 'PG' | 'PG_13' | 'R' | 'NC_17' | null;
  category: 'GEN' | 'F_M' | 'M_M' | 'F_F' | 'OTHER' | null;
  tags: {
    connect: {
      id: number;
    }[];
  };
  fandoms: {
    connect: {
      id: number;
    }[];
  };
}

export class UpdateWorkDto {
  title: string;
  description: string;
  note: string | null;
  status: 'DRAFT' | 'PUBLISHED' | 'HIDDEN';
  lang:
    | 'zh_ch'
    | 'nl'
    | 'en'
    | 'fr'
    | 'de'
    | 'it'
    | 'ja'
    | 'no'
    | 'pl'
    | 'pt'
    | 'ru'
    | 'es'
    | 'sv'
    | 'vi'
    | null;
  rating: 'G' | 'PG' | 'PG_13' | 'R' | 'NC_17' | null;
  category: 'GEN' | 'F_M' | 'M_M' | 'F_F' | 'OTHER' | null;
  tags: {
    connect: {
      id: number;
    }[];
  };
  fandoms: {
    connect: {
      id: number;
    }[];
  };
}
