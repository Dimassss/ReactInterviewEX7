import { useEffect, useState } from "react"
import { Country } from "../../api/countries"

type Props = {
    country: Country | null,
    onSubmit: (c: Country) => void,
    onCancle: () => void
}

export default function CountryForm({country, onSubmit, onCancle}: Props) {
    const [editCountry, setEditCountry] = useState(country)

    useEffect(() => {
      setEditCountry(country)
    }, [country])

    if(!editCountry) return <></>

    return (<form>
        <label htmlFor="symbol">Symbol</label>
        <input 
          id="symbol" 
          value={editCountry.Symbol}
          onChange={
            e => setEditCountry({...editCountry, Symbol: e.currentTarget.value})
          }
        />
        <br/>

        <label htmlFor="nazwa">Nazwa</label>
        <input 
          id="nazwa" 
          value={editCountry.Nazwa} 
          onChange={
            e => setEditCountry({...editCountry, Nazwa: e.currentTarget.value})
          }
        />
        <br/>

        <button onClick={() => onSubmit(editCountry)} >Zapish</button>
        <button onClick={() => onCancle()}>Anuluj</button>
      </form>)
}