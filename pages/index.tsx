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
  const [isTablePending, setIsTablePending] = useState(0)

  const remainTablePending = () => setIsTablePending(isTablePending+1)
  const freeTablePending = () => setIsTablePending(isTablePending-1)

  useEffect(() => {
    if(!allowLoad) return;

    remainTablePending()

    CountryAPI.get()
      .then(countries => setCountries(countries))
      .catch((e) => {
        console.error(e)
        alert("Can not load countries")
      })
      .finally(() => {
        freeTablePending()
      })
    
      allowLoad = false
  }, [])

  const onCountryDelete = async (el: Country) => {
    if(confirm("Na pewno usuwamy")) {
      remainTablePending()

      try {
        await CountryAPI.delete(el)
        setCountries(countries.filter(c => el.Id != c.Id))
      } catch(e) {
        console.error(e)
        alert("Cannot delete country")
      } finally{
        freeTablePending()
      }
    }
  }

  const getUpdatedCountries = (c: Country) => {
    return countries.map(
      el => el && el.Id == c.Id ? c : el
    )
  }

  const onSubmitCountryForm = async (c: Country) => {
    remainTablePending()
    setEditCountry(null)

    try {
      if('Id' in c) {
        await CountryAPI.update(c)
        setCountries(getUpdatedCountries(c))
      } else {
        const createdCountry = await CountryAPI.create(c)
        setCountries([...countries, createdCountry])
      }
    } catch(e) {
      console.error(e)
      alert("Error occured. Try later")
    } finally {
      freeTablePending()
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles["container-top"]}>
        <h3>Kraje</h3>

        <button onClick={() => setEditCountry({Symbol: "", Nazwa: ""})}>
          Dodaj nowy kraj
        </button>
      </div>

      <div>
        <TableCountries 
          countries={countries}
          onEdit={setEditCountry}
          onDelete={onCountryDelete}
        />

        { isTablePending > 0
          ? <BeatLoader color="#36d7b7" />
          : ""
        }
      </div>

      <ModalContainer show={!!editCountry}>
        <CountryForm 
            country={editCountry}
            onSubmit={onSubmitCountryForm}
            onCancle={() => setEditCountry(null)}
          />
      </ModalContainer>
    </div>
  )
}
