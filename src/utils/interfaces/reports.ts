export interface SalesReportRequest {
    startDate: Date;
    endDate: Date;
    sponsor: String;
}

export interface ILiverpoolData {
    POLIZA_REFERENCIA: string;
    FECHA_EFECTIVA: string;
    CANCELACION_FECHA: string;
    NUMERO_DOCUMENTO: string;
    TITULAR_NOMBRES: string;
    TITULAR_APELLIDO1: string;
    TITULAR_APELLIDO2: string;
    TITULAR_GENERO: string;
    TITULAR_NACIMIENTO: string;
    TELEFONO_MOVIL: string;
    EMAIL: string;
    CODIGO_PRODUCTO: string;
    CODIGO_PLAN: string;
    PRIMA_NETA: string;
    IVA: string;
    ESTATUS: string;
    CICLO_COBRANZA: string;
}

export interface IColumn {
    label: string;
    field: string;
    width?: string;
    sortable: boolean;
    tdClass?: string;
    thClass?: string;
}