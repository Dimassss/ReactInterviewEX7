import { Country } from "../../api/countries"

export type CountryTableHeaderElement = {
    key: keyof Country,        // key in coutries object
    value: string       // its name in table header
}

type Props = {
    idKey?: keyof Country,      // key of id column in countries
    header?: CountryTableHeaderElement[],
    countries: Country[],
    onEdit: (el: Country) => void,
    onDelete: (el: Country) => void,
}

const tableCountriesHeaders: CountryTableHeaderElement[] = [
  {
    key: 'Id',
    value: 'Id'
  },
  {
    key: "Symbol",
    value: "Symbol"
  },
  {
    key: "Nazwa",
    value: "Nazwa"
  }
]

export default function TableCountries({header = tableCountriesHeaders, countries = [], idKey = 'Id', onEdit, onDelete}: Props){
    return (<table>
        <thead>
          <tr>
            {header.map((headerEl: CountryTableHeaderElement) => {
                return <th key={headerEl.key}>{headerEl.value}</th>
            })}
          </tr>
        </thead>
        <tbody>
          {
            countries.map((el: Country) => {
              if(!el) return ""
              return (<tr key={el[idKey]}>
                  {header.map((h: CountryTableHeaderElement) => {
                    return (<td key={h.key}>{el[h.key]}</td>)
                  })}
                  <td>
                    <a href="#" onClick={() => {
                        onEdit(el)
                    }}>[EDYCJA]</a>
                    <a href="#" onClick={() => {
                        onDelete(el)
                    }}>[USUŃ]</a>
                  </td>
                </tr>)
            })
          }
        </tbody>
      </table>)
}