import { useEffect, useState } from 'react'
import CountryAPI, { Country } from '../api/countries'
import CountryForm from '../components/forms/CountryForm'
import ModalContainer from '../components/modal/ModalContainer'
import TableCountries from '../components/tables/TableCoutries'
import styles from '../styles/Home.module.css'

export default function Home() {
  const [countries, setCountries] = useState([] as Country[])
  const [editCountry, setEditCountry] = useState(null as Country | null)

  useEffect(() => {
    CountryAPI.get()
      .then(countries => setCountries(countries))
  }, [])

  return (
    <div className={styles.container}>
      <div style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
        <h3>Kraje</h3>
        <button>
          Dodaj nowy kraj
        </button>
      </div>
      <div>
        <TableCountries 
          header={[
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
          ]}
          countries={countries}
          idKey={"Id"}
          onEdit={(el: Country) => {
            setEditCountry(el)
          }}
        />
      </div>
      <ModalContainer show={!!editCountry}>
          {
            editCountry 
            ? <CountryForm 
              country={editCountry}
              onSubmit={c => {
                setCountries(countries.map(el => {
                  return el && el.Id == c.Id ? c : el
                }))
                CountryAPI.update(c)
                setEditCountry(null)
              }}
              onCancle={() => {
                setEditCountry(null)
              }}
            />
            : "dfasd"
          }

      </ModalContainer>
    </div>
  )
}
