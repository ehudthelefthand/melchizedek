import { AxiosInstance } from "axios";
import { TransactionResponse } from "./response/transaction";
import { Store } from "../service/service";

export default function createTransactionAPI(store: Store, axios: AxiosInstance) {
    return {
        getOne: (id: string): Promise<TransactionResponse> => {
            return axios.get(`/transactions/${id}`)
            .then((response) => response.data)
        },
        getAll: (): Promise<TransactionResponse> => {
            return axios.get(`/transactions/`)
            .then((response) => response.data)
        }
    }
}