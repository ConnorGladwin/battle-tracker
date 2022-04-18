import { useEffect, useState } from 'react';
import { add, remove, dead } from '../utils/SvgPaths';
import '../App.css';

// TODO: address a11ty issues with onclick event

export default function List() {
  const initialList = [];
  const [list, setList] = useState(initialList);
  const initialId = 0;
  const [id, setId] = useState(0);
  const [count, setCount] = useState(0);

  function resetValues() {
    const inputArray = document.querySelectorAll('.value');
    inputArray.forEach((input) => (input.value = null));
  }

  function handleAdd(e) {
    e.preventDefault();
    const initiative = e.target.initiative.value;
    const name = e.target.name.value;
    const health = e.target.health.value;
    if (initiative === '' || name === '' || health === '') {
      console.log('nope');
    } else {
      const newListItem = {
        id,
        initiative,
        name,
        health,
      };
      setList([...list, newListItem]);
      setId(id + 1);
      resetValues();
      localStorage.setItem('list', JSON.stringify(list));
    }
    setCount(count + 1);
  }

  function handleRemove(itemId) {
    console.log(itemId);
    const newList = list.filter((item) => item.id !== itemId);
    setList(newList);
    localStorage.setItem('list', JSON.stringify(list));
  }

  function checkHealth(item, value) {
    const newHealth = value.target.value;
    const element = document.getElementById(item.id);
    if (newHealth == 0 && newHealth !== '') {
      console.log('ded');
      element.classList.add('dead');
    } else if (newHealth > 0 && newHealth !== '') {
      element.classList = 'listItem';
    } else {
      console.log('not dead');
    }
    setCount(count + 1);
  }

  function sortList() {
    if (list?.length >= 1) {
      const sortedList = list.sort((a, b) => a.initiative - b.initiative);
      return sortedList;
    }
    return [];
  }

  function handleRemoveAll() {
    console.log('all removed');
    setList(initialList);
    setId(initialId);
  }

  // useEffect(() => {
  //   const items = JSON.parse(localStorage.getItem('list'));
  //   setList(items);
  // }, []);

  return (
    <div className="listContainer">
      <form className="listItem" onSubmit={(e) => handleAdd(e)}>
        <input
          className="initiative value"
          id="initiative"
          type="number"
          name="initiative"
          placeholder="Init"
        />
        <input
          className="name value"
          id="name"
          type="text"
          name="name"
          autoComplete="off"
          placeholder="name"
        />
        <input
          className="health value"
          id="health"
          type="number"
          name="health"
          placeholder="health"
        />
        <button className="addBtn value" type="submit">
          {add}
        </button>
      </form>
      <ul>
        {sortList().map((item) => (
          <li
            className="listItem"
            id={item.id}
            key={item.id}
            tabIndex={item.id}
          >
            <div className="initiative" id="initiative">
              {item.initiative}
            </div>
            <div className="name input" id="name">
              {item.name}
            </div>
            <input
              className="health"
              id="health"
              onChange={(value) => checkHealth(item, value)}
              placeholder={item.health}
            />
            <div
              className="remove"
              role="button"
              tabIndex="0"
              onKeyPress={() => handleRemove(item.id)}
              onClick={() => handleRemove(item.id)}
            >
              {remove}
            </div>
          </li>
        ))}
      </ul>
      <div
        className="removeAll"
        role="none"
        type="submit"
        onKeyPress={() => handleRemoveAll()}
        onClick={() => handleRemoveAll()}
      >
        Remove All
      </div>
    </div>
  );
}
