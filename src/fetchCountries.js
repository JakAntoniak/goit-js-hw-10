import Notiflix from 'notiflix';

export function fetchCountries(name) {
  fetch(
    `https://restcountries.com/v2/name/${name}?fields=name,capital,population,flags,languages`
  )
    .then(r => r.json())
    .then(r => {
      console.log(r);

      if (r.status === 404) {
        Notiflix.Notify.failure('Oops, there is no country with that name');
      }

      if (r.length > 10) {
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      } else if (r.length > 1) {
        const countryList = document.querySelector('.country-list');
        countryList.classList.remove('is-hidden');

        r.forEach(el => {
          const li = document.createElement('li');
          li.classList.add('country-list__item');
          li.textContent = el.name;

          const flag = document.createElement('img');
          flag.src = el.flags.svg;

          li.insertAdjacentElement('afterbegin', flag);
          countryList.insertAdjacentElement('beforeend', li);
        });
      } else if (r.length === 1) {
        const countryList = document.querySelector('.country-list');
        countryList.classList.add('is-hidden');
        const countryInfo = document.querySelector('.country-info');
        countryInfo.classList.remove('is-hidden');
        const languages = [];

        r[0].languages.forEach(el => {
          if (el.iso639_1) {
            languages.push(el.name);
          }
        });

        const countryHeader = document.createElement('h3');
        countryHeader.textContent = r[0].name;

        const flag = document.createElement('img');
        flag.src = r[0].flags.svg;

        const countryData = `
        <p><b>Capital:</b> ${r[0].capital}</p>
        <p><b>Population:</b> ${r[0].population}</p>
        <p><b>Languages:</b> ${languages.join(', ')}</p>
        `;

        countryHeader.insertAdjacentElement('afterbegin', flag);
        countryInfo.insertAdjacentElement('beforeend', countryHeader);
        countryInfo.insertAdjacentHTML('beforeend', countryData);
      }

      return r;
    })
    .catch(err => {
      Notiflix.Notify.failure('Oops, something went wrong, please try again');
    });
}
