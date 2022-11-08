import { Country } from "../../api/countries"

type headerElement = {
    key: keyof Country,        // key in coutries object
    value: string       // its name in table header
}

type Props = {
    idKey: keyof Country,      // key of id column in countries
    header: headerElement[],
    countries: Country[],
    onEdit: (el: Country) => void
}

export default function TableCountries({header, countries, idKey, onEdit}: Props){
    return (<table>
        <thead>
          <tr>
            {header.map((headerEl: headerElement) => {
                return <th key={headerEl.key}>{headerEl.value}</th>
            })}
          </tr>
        </thead>
        <tbody>
          {
            countries.map((el: Country) => {
              if(!el) return ""
              return (<tr key={el[idKey]}>
                  {header.map((h: headerElement) => {
                    return (<td key={h.key}>{el[h.key]}</td>)
                  })}
                  <td>
                    <a href="#" className='with-underline' onClick={() => {
                        onEdit(el)
                    }}>EDYCJA</a>
                  </td>
                </tr>)
            })
          }
        </tbody>
      </table>)
}