import React from 'react'
import matchSorter from 'match-sorter'

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

const spellsColumns = [
  {
    Header: 'Spell',
    accessor: 'spell',
    filterMethod: (filter, rows) => matchSorter(rows, filter.value, { keys: ['spell'] }),
    filterAll: true,
  },
  {
    Header: 'Type',
    accessor: 'type',
    filterMethod: (filter, row) => {
      if (filter.value === 'all') {
        return true
      }
      if (filter.value === 'Charm') {
        return row[filter.id] === 'Charm'
      }
      if (filter.value === 'Curse') {
        return row[filter.id] === 'Curse'
      }
      if (filter.value === 'Enchantment') {
        return row[filter.id] === 'Enchantment'
      }
      if (filter.value === 'Hex') {
        return row[filter.id] === 'Hex'
      }
      if (filter.value === 'Jinx') {
        return row[filter.id] === 'Jinx'
      }
      if (filter.value === 'Spell') {
        return row[filter.id] === 'Spell'
      }
    },
    Filter: ({ filter, onChange }) => (
      <select
        onChange={(event) => onChange(event.target.value)}
        style={{ width: '100%' }}
        value={filter ? filter.value : 'all'}
      >
        <option value="all">Show All</option>
        <option value="Charm">Charm</option>
        <option value="Curse">Curse</option>
        <option value="Enchantment">Enchantment</option>
        <option value="Hex">Hex</option>
        <option value="Jinx">Jinx</option>
        <option value="Spell">Spell</option>
      </select>
    ),
  },
  {
    Header: 'Effect',
    accessor: 'effect',
    filterMethod: (filter, rows) => matchSorter(rows, filter.value, { keys: ['effect'] }),
    filterAll: true,
  },
]

const charsColumns = [
  {
    Header: 'Name',
    accessor: 'name',
    filterMethod: (filter, rows) => matchSorter(rows, filter.value, { keys: ['name'] }),
    filterAll: true,
  },
  {
    Header: 'Role',
    accessor: 'role',
    Cell: ({ value }) => (value === null ? '' : value === 'student' ? 'Student' : value),
    filterMethod: (filter, rows) => matchSorter(rows, filter.value, { keys: ['role'] }),
    filterAll: true,
  },
  {
    Header: 'House',
    id: 'house',
    accessor: 'house.name',
    width: 120,
    Cell: ({ value }) => (value === null ? '' : value),
    filterMethod: (filter, row) => {
      if (filter.value === 'all') {
        return true
      }
      if (filter.value === 'Gryffindor') {
        return row[filter.id] === 'Gryffindor'
      }
      if (filter.value === 'Hufflepuff') {
        return row[filter.id] === 'Hufflepuff'
      }
      if (filter.value === 'Ravenclaw') {
        return row[filter.id] === 'Ravenclaw'
      }
      if (filter.value === 'Slytherin') {
        return row[filter.id] === 'Slytherin'
      }
    },
    Filter: ({ filter, onChange }) => (
      <select
        onChange={(event) => onChange(event.target.value)}
        style={{ width: '100%' }}
        value={filter ? filter.value : 'all'}
      >
        <option value="all">All</option>
        <option value="Gryffindor">Gryffindor</option>
        <option value="Hufflepuff">Hufflepuff</option>
        <option value="Ravenclaw">Ravenclaw</option>
        <option value="Slytherin">Slytherin</option>
      </select>
    ),
  },
  {
    Header: 'Alias',
    accessor: 'alias',
    filterMethod: (filter, rows) => matchSorter(rows, filter.value, { keys: ['alias'] }),
    filterAll: true,
    width: 200,
  },
  {
    Header: 'Patronus',
    accessor: 'patronus',
    Cell: ({ value }) => (value === null ? '' : capitalize(value)),
    filterMethod: (filter, rows) => matchSorter(rows, filter.value, { keys: ['patronus'] }),
    filterAll: true,
    width: 160,
  },
  {
    Header: 'OotP',
    accessor: 'orderOfThePhoenix',
    width: 90,
    Cell: ({ value }) => (value === true ? 'Yes' : 'No'),
    filterMethod: (filter, row) => {
      if (filter.value === 'all') {
        return true
      }
      if (filter.value === 'Yes') {
        return row[filter.id] === true
      }
      if (filter.value === 'No') {
        return row[filter.id] === false
      }
    },
    Filter: ({ filter, onChange }) => (
      <select
        onChange={(event) => onChange(event.target.value)}
        style={{ width: '100%' }}
        value={filter ? filter.value : 'all'}
      >
        <option value="all">All</option>
        <option value="Yes">Yes</option>
        <option value="No">No</option>
      </select>
    ),
  },
  {
    Header: 'DA',
    accessor: 'dumbledoresArmy',
    width: 80,
    Cell: ({ value }) => (value === true ? 'Yes' : 'No'),
    filterMethod: (filter, row) => {
      if (filter.value === 'all') {
        return true
      }
      if (filter.value === 'Yes') {
        return row[filter.id] === true
      }
      if (filter.value === 'No') {
        return row[filter.id] === false
      }
    },
    Filter: ({ filter, onChange }) => (
      <select
        onChange={(event) => onChange(event.target.value)}
        style={{ width: '100%' }}
        value={filter ? filter.value : 'all'}
      >
        <option value="all">All</option>
        <option value="Yes">Yes</option>
        <option value="No">No</option>
      </select>
    ),
  },
  {
    Header: 'Death Eater',
    accessor: 'deathEater',
    width: 110,
    Cell: ({ value }) => (value === true ? 'Yes' : 'No'),
    filterMethod: (filter, row) => {
      if (filter.value === 'all') {
        return true
      }
      if (filter.value === 'Yes') {
        return row[filter.id] === true
      }
      if (filter.value === 'No') {
        return row[filter.id] === false
      }
    },
    Filter: ({ filter, onChange }) => (
      <select
        onChange={(event) => onChange(event.target.value)}
        style={{ width: '100%' }}
        value={filter ? filter.value : 'all'}
      >
        <option value="all">All</option>
        <option value="Yes">Yes</option>
        <option value="No">No</option>
      </select>
    ),
  },
]

export { spellsColumns, charsColumns }
