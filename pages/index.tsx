import { useEffect, useState } from 'react'
import CountryAPI, { Country } from '../api/countries'
import CountryForm from '../components/forms/CountryForm'
import ModalContainer from '../components/modal/ModalContainer'
import TableCountries from '../components/tables/TableCoutries'
import styles from '../styles/Home.module.css'
import { BeatLoader } from 'react-spinners'

let allowLoad = true;     // in strict mode React create element twice. This variable helps to stop this in useEffect bellow

export default function Home() {
  const [countries, setCountries] = useState([] as Country[])
  const [editCountry, setEditCountry] = useState(null as Country | null)
  const [isTablePending, setIsTablePending] = useState(true)

  useEffect(() => {
    if(!allowLoad) return;

    CountryAPI.get()
      .then(countries => setCountries(countries))
      .catch((e) => {
        console.error(e)
        alert("Can not load countries")
      })
      .finally(() => {
        setIsTablePending(false)
      })
    
      allowLoad = false
  }, [])

  return (
    <div className={styles.container}>
      <div style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
        <h3>Kraje</h3>
        <button onClick={() => {
          setEditCountry({Symbol: "", Nazwa: ""})
        }}>
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
          onDelete={(el: Country) => {
            if(confirm("Na pewno usuwamy")) {
              setIsTablePending(true)

              CountryAPI.delete(el)
                .then(() => {
                  setCountries(countries.filter(c => el.Id != c.Id))
                })
                .catch((e) => {
                  console.error(e)
                  alert("Cannot delete country")
                })
                .finally(() => {
                  setIsTablePending(false)
                })
            }
          }}
        />
      </div>
      <div>
        { isTablePending
          ? <BeatLoader color="#36d7b7" />
          : ""
        }
      </div>

      <ModalContainer show={!!editCountry}>
          {
            editCountry 
            ? <CountryForm 
              country={editCountry}
              onSubmit={c => {
                if('Id' in c) {
                  setIsTablePending(true)

                  CountryAPI.update(c)
                    .then(() => {
                      let newCountries = countries.map(el => {
                        return el && el.Id == c.Id ? c : el
                      })

                      setCountries(newCountries)
                    })
                    .catch(e => {
                      console.error(e)
                      alert("Can not update country")
                    })
                    .finally(() => {
                      setIsTablePending(false)
                    })
                } else {
                  setIsTablePending(true)

                  CountryAPI.create(c)
                    .then((createdCountry) => {
                      setCountries([...countries, createdCountry])
                    })
                    .catch((e) => {
                      console.error(e)
                      alert("Can not create country")
                    })
                    .finally(() => {
                      setIsTablePending(false)
                    })
                }
                
                setEditCountry(null)
              }}
              onCancle={() => {
                setEditCountry(null)
              }}
            />
            : ""
          }
      </ModalContainer>
    </div>
  )
}
