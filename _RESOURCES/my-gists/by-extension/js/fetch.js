fetch('https://example.com/api/people')
  .then(response => response.json())
  .then(people => {
    const html = '<ul>';
    for (let person of people) {
      html += `<li>${person.lastName}, ${person.firstName}</li>`;
    }
    html += '</ul>';
    document.querySelector('#people-list').innerHTML = html;
  });