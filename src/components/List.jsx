import { useEffect, useState } from 'react';
import { add, remove, dead } from '../utils/SvgPaths';
import '../App.css';

// TODO:

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
    const inputBar = document.querySelector('.inputBar');
    const initiative = e.target.initiative.value;
    const name = e.target.name.value;
    const health = e.target.health.value;
    if (initiative === '' || name === '' || health === '') {
      inputBar.classList.add('infoMissing');
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
    setTimeout(() => {
      inputBar.classList = 'listItem inputBar';
    }, 500);
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
    if (newHealth <= 0 && newHealth !== '') {
      element.classList.add('dead');
    } else if (newHealth > 0 && newHealth !== '') {
      element.classList = 'listItem';
    } else {
      //
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
    localStorage.setItem('list', JSON.stringify(initialList));
  }

  useEffect(() => {
    if (localStorage.getItem(list)) {
      const items = JSON.parse(localStorage.getItem('list'));
      const maxId = Math.max(...items.map((o) => o.id), 0);
      setList(items);
      setId(maxId + 1);
    }
  }, []);

  return (
    <div className="listContainer">
      <form className="listItem inputBar" onSubmit={(e) => handleAdd(e)}>
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
          placeholder="Name"
        />
        <input
          className="health value"
          id="health"
          type="number"
          name="health"
          placeholder="HP"
        />
        <button className="addBtn value" type="submit">
          {add}
        </button>
      </form>
      <ul>
        {sortList()
          .reverse()
          .map((item) => (
            <li
              className="listItem"
              id={item.id}
              key={item.id}
              tabIndex={item.initiative}
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
                tabIndex="0"
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
