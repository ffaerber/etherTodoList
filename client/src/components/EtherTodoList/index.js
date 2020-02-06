import React, { useState, useEffect } from 'react';
import { PublicAddress, Button } from 'rimble-ui';
import styles from './EtherTodoList.module.scss';
import { solidityLoaderOptions } from '../../../config/webpack';
import MyContext from '../../MyContext';
import TodoList from '../TodoList';


export default function EtherTodoList() {
  const {getList, totalLists, lists, createList } = React.useContext(MyContext);

  const hotLoaderDisabled = solidityLoaderOptions.disabled;

  const handleSubmit = (evt) => {
    evt.preventDefault();
    createList(listName)
  }

  const [listName, setListName] = useState("");

  return (
      <div >
        <div>{totalLists}</div>

        <form onSubmit={handleSubmit}>
          <label>
            List Name:
          <input
            type="text"
            value={listName}
            onChange={e => setListName(e.target.value)}
          />
          </label>
          <input type="submit" value="Submit" />
        </form>

        <ul>
          { lists.map(list => <TodoList list={list} getList={getList}/> ) }
        </ul>


      </div>
  )

}
