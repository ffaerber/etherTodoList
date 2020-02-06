import React, { useState, useEffect } from 'react';
import { PublicAddress, Button } from 'rimble-ui';
import styles from './EtherTodoList.module.scss';
import { solidityLoaderOptions } from '../../../config/webpack';
import MyContext from '../../MyContext';

export default function EtherTodoList() {
  const { totalLists, listIds, createList } = React.useContext(MyContext);

  const hotLoaderDisabled = solidityLoaderOptions.disabled;

  const handleSubmit = (evt) => {
    evt.preventDefault();
    createList(name)
  }

  const [name, setName] = useState("");


  return (
      <div >
        <div>{totalLists}</div>

        <form onSubmit={handleSubmit}>
          <label>
            List Name:
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          </label>
          <input type="submit" value="Submit" />
        </form>

        <ul>
          {listIds.map(function(item) {
            return <li key={item}>{item}</li>;
          })}
        </ul>


      </div>
  )

}
