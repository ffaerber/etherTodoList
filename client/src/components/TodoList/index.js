import React, { useState, useEffect } from 'react';
import { PublicAddress, Button } from 'rimble-ui';
import styles from './TodoList.module.scss';

import { solidityLoaderOptions } from '../../../config/webpack';

export default function TodoList(props) {
  const hotLoaderDisabled = solidityLoaderOptions.disabled;
  const { web3 } = props;
  const { accounts, networkId, networkName, providerName, lib, connected } = props.web3;

  const [contract, setContract] = useState()
  useEffect(() => {
    let TodoList = {};
    let deployedNetwork = null;
    async function fetchContract() {
      try {
        TodoList = require('../../../../contracts/TodoList.sol');
      } catch (e) {
        console.log(e);
      }
      const networkId = await web3.lib.eth.net.getId();
      if(TodoList.networks){
        deployedNetwork = TodoList.networks[networkId.toString()];
        if (deployedNetwork) {
          const todoList = new web3.lib.eth.Contract(TodoList.abi, deployedNetwork && deployedNetwork.address);

          todoList.events.allEvents((error, result) => {
            if (!error){

              switch (result.event) {
                case "updateEvent":
                  getTotalLists()
                case "deleteEvent":
                  // Anweisungen werden ausgeführt,
                  // falls expression mit value2 übereinstimmt
              }
            }
           });

          setContract(todoList)
        }
      }

    }
    fetchContract()
  }, [networkId]);



  async function getTotalLists() {
    if(contract){
      const response = await contract.methods.getTotalLists().call();
      setTotalLists(response)
    }
  }
  const [totalLists, setTotalLists] = useState();
  useEffect(() => {
    getTotalLists()
  }, [contract]);




  async function getListIds() {
    if(contract){
      const response = await contract.methods.getListIds(1,5).call();
      setListIds(response)
    }
  }
  const [listIds, setListIds] = useState([]);
  useEffect(() => {
    getListIds()
  }, [contract]);




  function createList() {
    if(contract){
      contract.methods
        .createList(name)
        .send({ from: accounts[0] }, (err, result) => {
          console.log(result)
        })
    }
  }




  const handleSubmit = (evt) => {
    evt.preventDefault();
    createList(name)
  }

  const [name, setName] = useState("");


  return (
      <div >
        <div>Network: {networkId ? `${networkId} – ${networkName}` : 'No connection'}</div>

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
