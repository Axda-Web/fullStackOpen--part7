import { useState, useEffect } from 'react';
import countryServices from './services/country';

function useField(type) {
  const [value, setValue] = useState('');

  const onChange = (event) => setValue(event.target.value);

  return {
    type,
    value,
    onChange,
  };
}

function useCountry(name) {
  const [country, setCountry] = useState(null);

  useEffect(() => {
    if (name) {
      countryServices.getCountry(name)
        .then((response) => setCountry(response))
        .catch((exception) => {
          console.log(exception);
          setCountry(null);
        });
    }
  }, [name]);

  return country;
}

function Country({ country }) {
  if (!country) {
    return <div>not found...</div>;
  }

  return (
    <div>
      <h3>{country.name.common}</h3>
      <div>population {country.population}</div>
      <div>capital {country.capital}</div>
      <img src={country.flags.png} height='100' alt={`flag of ${country.name.common}`} />
    </div>
  );
}

function App() {
  const nameInput = useField('text');
  const [name, setName] = useState('');
  const country = useCountry(name);

  function fetch(e) {
    e.preventDefault();
    setName(nameInput.value);
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button type='submit'>find</button>
      </form>

      <Country country={country} />
    </div>
  );
}

export default App;