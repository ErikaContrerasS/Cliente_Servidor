import { ref, computed } from "vue"
import { tryGetKorsaPolicyById, tryGetIexPolicyById, tryGetSuperNovaPolicyById, tryGetBRCertificate, tryGetHospitalCardPolicyById, tryGetNemaPolicyById, tryGetUelloPolicyById, tryGetSolloPolicyById, tryGetQualividaPolicyById, tryGetPaxPolicyById, tryGetJamesPolicyById } from '/@src/services/usercore'
import {
    formatDate,
    calculateAge,
    addYear,
} from '../utils/date'
import { ICoverage, IDependent, IPolicy } from '../utils/interfaces/policy'

export const usePolicy = () => {
    const policy = ref<IPolicy>({
        policy_id: "",
        product_id: "",
        plan_id: "",
        cover_type: "",
        status_policy: "",
        efective_from: "",
        id_type: "",
        id_number: "",
        name: "",
        last_name_1: "",
        last_name_2: "",
        dob: "",
        sex: "",
        phone_1: "",
        phone_2: "",
        address_1: "",
        address_2: "",
        zip_code: "",
        city: "",
        civil_status: "",
        ocupation: "",
        email: "",
        payment_method_desc: "",
        premium: "",
        user_id: "",
        user_name: "",
        user_branch: "",
        cancelation_date: "",
        reason_cancelation: "",
        sponsor_policy: "",
        broker_name: "",
        broker_code: "",
        assists: "",
        dependents: [],
        coverage: [],
        birth_date: "",

    })
    const holders = ref<Array<IDependent>>([])
    const beneficiaries = ref<Array<IDependent>>([])
    const additionalInsured = ref<Array<IDependent>>([])
    const coverage = computed(() => policy.value.coverage?.map((element: ICoverage) => ({
        ...element,
        capital_insured: formatCapitalInsured(element.capital_insured)
    })))

    const consultPolicy = async (product: String, processId: String, productId = null) => {
        let response = null
        switch (product) {
            case "IEX":
                response = await tryGetIexPolicyById(processId)
                break;
            case "UELLO":
                response = await tryGetUelloPolicyById(processId)
                break
            case "KORSA":
                response = await tryGetKorsaPolicyById(processId)
                break
            case "NOVA":
                response = await tryGetSuperNovaPolicyById(processId)
                break;
            case "HOSPITALCARD":
                response = await tryGetHospitalCardPolicyById(processId)
                break;
            case "NEMA":
                response = await tryGetNemaPolicyById(processId, productId)
                break;
            case "SOLLO":
                response = await tryGetSolloPolicyById(processId)
                break;
            case "QUALIVIDA":
                response = await tryGetQualividaPolicyById(processId)
                break;
            case "PAX":
                response = await tryGetPaxPolicyById(processId)
                break;
            case "JAMES":
                response = await tryGetJamesPolicyById(processId)
                break;
        }

        if (response) {
            classifyInsured(response.dependents)
            policy.value = {
                ...response,
                dob: formatDate(response.dob, "YYYY/MM/DD"),
                age: calculateAge(response.dob),
                efective_from: formatDate(response.efective_from, "YYYY/MM/DD"),
                efective_until: addYear(response.efective_from),
                cancelation_date: formatDate(response.cancelation_date, "YYYY/MM/DD"),
                sex: response.sex === "M" ? "Masculino" : "Femenino",
                status_policy: response.status_policy === 'A' ? "Ativa" : "Cancelada",
                status_policy_color: response.status_policy === 'A' ? "success" : "danger",
                nmsponsor: formatNMSponsor(response.product_id.slice(-3))
            }
        }
    }

    const formatInsured = (insured: IDependent) => {
        return {
            dob: formatDate(insured.dob, "YYYY/MM/DD"),
            benefit_ammount: `${insured.benefit_ammount}%`,
            sex: insured.sex === "M" ? "Masculino" : "Femenino",
            age: calculateAge(insured.dob),
        }
    }

    const classifyInsured = (data: Array<IDependent>) => {
        for (const insured of data) {
            let aux = {
                ...insured,
                ...formatInsured(insured)
            }
            if (aux.is_beneficiary == "S") beneficiaries.value.push(aux)
            else if (aux.is_beneficiary == "N" && aux.insured_type == "1") holders.value.push(aux)
            else additionalInsured.value.push(aux)
        }
    }

    const getCertificateBRA = (initiative: string, processId: string) => {
        return tryGetBRCertificate({ processId, initiative })
            .then((response: any) => {
                var fileURL = window.URL.createObjectURL(
                    new Blob([response.data], {
                        type: 'application/vnd.ms-pdf',
                    })
                )
                var fileLink = document.createElement('a')

                fileLink.href = fileURL
                fileLink.setAttribute('download', `Certificado_${initiative}_${processId}.pdf`)
                document.body.appendChild(fileLink)
                fileLink.click()
            })
    }

    const formatCapitalInsured = (data: string) => {
        if (data == "") return "N/A"
        return !data.includes("$") ? `$${data}` : data
    }

    const formatNMSponsor = (data: string) => {
        if (data === 'CSA') return 'Club Simples'
        if (data === 'ECA') return 'Carioca'
        if (data === 'IGU') 'Assoc. Iguatuense'
        return 'N/A'
    }

    return {
        policy,
        coverage,
        beneficiaries,
        additionalInsured,
        holders,
        consultPolicy,
        getCertificateBRA,
    }
}
