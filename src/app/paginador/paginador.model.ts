class Paginador {
    constructor(
        public TotalItems: 100,
        public CurrentPage: 1,
        public PageSize: 10,
        public TotalPageLinkButtons: 5,
        public RowsPerPageOptions: [10, 50, 100]
    ) { }
}

class ItensPorPagina {
    constructor(public numero: number) { }
}
class ConsultaFiltro {
    offset: number; 
    limit: number; 
    sortField: string; 
    desc: boolean;
    field: string;
    param: string;
    vin?: string;
    year?: string;
    brand?: string;
    color?: string;
}

class Page {
    page: number;
    itemsPerPage: number;
}

export { Paginador, ItensPorPagina, Page, ConsultaFiltro }