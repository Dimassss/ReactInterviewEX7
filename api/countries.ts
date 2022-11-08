import axios from "../plugins/axios";

export type Country = {
    Id: number,
    Symbol: string,
    Nazwa: string
}

const CountryAPI = {
    async get(){
        try {
            const res = await axios.get("kraje")
            const coutries = res.data.value

            return coutries
        } catch(e) {
            return []
        }
    },

    async update(country: Country) {
        try {
            // I have not installed that config for postman, but suppose that API will look like this
            await axios.patch("kraje")
        } catch(e) {
            console.error(e)
        }
    }
}

export default CountryAPI
