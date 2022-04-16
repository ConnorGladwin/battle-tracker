import { useEffect, useState } from 'react'
import {add, remove, dead} from '../utils/SvgPaths'
import '../App.css'

// TODO: Add element enter transitions, add red background for downed items, sort list items by initiative

export default function List() {
  let initialList = []
  const [list, setList] = useState(initialList);
  const [id, setId] = useState(0);
  const [count, setCount] = useState(0);
  const [inputClassNames, setInputClassNames] = useState('inputs');
  const [initialClassNames] = useState('inputs')

  function handleAdd(e) {
    e.preventDefault()
    const initiative = e.target.initiative.value;
    const name = e.target.name.value;
    const health = e.target.health.value;
    if (initiative == '' || name == '' || health == '') {
      console.log('nope');
    } else {
      const newListItem = {
        id,
        initiative: initiative,
        name: name,
        health: health
      }
      setList([...list, newListItem]);
      setId(id + 1);
      resetValues()
    }
    setInputClassNames(initialClassNames);
  }

  function handleRemove(id) {
    console.log(id);
    const newList = list.filter((item) => item.id !== id)
    setList(newList);
  }

  function resetValues() {
    const inputArray = document.querySelectorAll('.value');
    inputArray.forEach(input => input.value = null);
  }

  function checkHealth(item, value) {
    const newHealth = value.target.value
    const element = document.getElementById(item.id)
    if (newHealth == 0 && newHealth !== '') {
      console.log('ded');
      element.classList.add('dead');
    }  else if (element.classList.contains('dead') && newHealth < 0) {
      element.classList.remove('dead');
    } else {
      console.log('not dead');
    }
    setCount(count + 1);
  }

  return (
    <div className='listContainer'>
      <form className={inputClassNames} onSubmit={(e) => handleAdd(e)}>
        <input className='initiative value' id='initiative' type="number" name='initiative' placeholder='Init' />
        <input className='name value' id='name' type="text" name='name' autoComplete='off' placeholder='name' />
        <input className='health value' id='health' type="number" name='health' placeholder='health' />
        <button className='addBtn value' type='submit'>{add}</button>
      </form>
      <ul>
        {list.map((item) => (
          <li className='listItem' id={item.id} key={item.id}>
            <div className='initiative' id='initiative'>{item.initiative}</div>
            <div className='name' id='name'>{item.name}</div>
            <input className='health' id='health' onChange={(value) => checkHealth(item, value)} placeholder={item.health} />
            <div className='remove' onClick={() => handleRemove(item.id)}>{remove}</div>
          </li>
        ))}
      </ul>
    </div>
  )
}