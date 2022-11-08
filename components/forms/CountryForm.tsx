import { useState } from "react"
import { Country } from "../../api/countries"

type Props = {
    country: Country,
    onSubmit: (c: Country) => void,
    onCancle: () => void
}

export default function CountryForm({country, onSubmit, onCancle}: Props) {
    const [editCountry, setEditCountry] = useState(country)

    return (<form>
        <label htmlFor="symbol">Symbol</label>
        <input 
          id="symbol" 
          defaultValue={country.Symbol}
          onChange={
            e => setEditCountry({...country, Symbol: e.currentTarget.value})
          }
        />
        <br/>

        <label htmlFor="nazwa">Nazwa</label>
        <input 
          id="nazwa" 
          defaultValue={country.Nazwa} 
          onChange={
            e => setEditCountry({...country, Nazwa: e.currentTarget.value})
          }
        />
        <br/>

        <button onClick={() => onSubmit(editCountry)} >Zapish</button>
        <button onClick={() => onCancle()}>Anuluj</button>
      </form>)
}