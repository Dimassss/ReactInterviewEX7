import axios from "../plugins/axios";

export type Country = {
    Id?: number,
    Symbol: string,
    Nazwa: string
}

const CountryAPI = {
    async get(){
        const res = await axios.get("kraje")
        const countries = res.data.value

        return countries
    },

    async update(country: Country) {
        await axios.patch(`kraje(${country.Id})`, country)
    },

    async create(country: Country) {
        const c = await axios.post("kraje", country)
        return c.data as Country
    },

    async delete(country: Country) {
        await axios.delete(`kraje(${country.Id})`)
    }
}

export default CountryAPI
