export interface IPolicy {
    policy_id?: string;
    product_id?: string;
    plan_id?: string;
    cover_type?: string;
    status_policy?: string;
    efective_from?: string;
    id_type?: string;
    id_number?: string;
    name?: string;
    last_name_1?: string;
    last_name_2?: string;
    dob?: string;
    sex?: string;
    phone_1?: string;
    phone_2?: string;
    address_1?: string;
    address_2?: string;
    zip_code?: string;
    city?: string;
    civil_status?: string;
    ocupation?: string;
    email?: string;
    payment_method_desc?: string;
    premium?: string;
    user_id?: string;
    user_name?: string;
    user_branch?: string
    cancelation_date?: string;
    reason_cancelation?: string;
    certificate_data?: ICertificateData;
    sponsor_policy?: string;
    broker_name?: string;
    broker_code?: string;
    assists?: string;
    dependents?: Array<IDependent>;
    coverage?: Array<ICoverage>;
    birth_date?: string;
}

export interface ICoverage {
    description: string;
    capital_insured: string;
    net_policy_premium: string;
    tax_financial_operations: string;
    total_policy_premium: string
}

export interface IDependent {
    person_id: string;
    process_id?: string;
    is_insured: string;
    is_beneficiary: string;
    insured_type: string;
    beneficiary_type: string;
    id_type: string;
    id_number: string;
    first_name: string;
    last_name_1: string;
    last_name_2: string;
    last_name_3?: string;
    sex: string;
    dob: string;
    benefit_ammount: string;
    age?: number
}

export interface ICertificateData {
    sponsor_policy: string;
    broker_name: string;
    broker_code: string;
    assists: Array<IAssist>;
    stimulant: IStimulant
}

export interface IStimulant {
    name: string;
    code: string;
    address: string;
    neighborhood: string;
    city: string;
    postal_code: string;
    phone: string;
    remuneration: string
}

export interface IAssist {
    description: string;
    limits: string;
    actions: string;
}