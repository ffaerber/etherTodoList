pragma solidity ^0.5.0;

import {Validate} from "../libraries/Validate.sol";

import "@openzeppelin/upgrades/contracts/Initializable.sol";
import "@openzeppelin/contracts-ethereum-package/contracts/ownership/Ownable.sol";

contract TodoList is Initializable, Ownable {
    struct Todo {
        string title;
        bool active;
        uint256 date;
        address owner;
        bool exists;
    }

    struct List {
        uint256 id;
        string title;
        uint256 totalTodos;
        bool active;
        uint256 date;
        address owner;
        bool exists;
        mapping(uint256 => Todo) todos;
    }

    uint256 totalLists;
    uint256[] listIds;
    mapping(uint256 => List) lists;

    event ListCreated(uint256 listId);
    event ListUpdatet(uint256 listId);
    event ListDeleted(uint256 listId);

    function initialize(address sender) public initializer {
        Ownable.initialize(sender);
    }

    function createList(string calldata name) external {
        require(Validate.title(name), "name is not valid");
        uint256 listId = uint256(
            keccak256(abi.encodePacked(now, msg.sender, name))
        ) %
            9000000;
        List memory newList = List({
            id: listId,
            title: name,
            totalTodos: 0,
            active: true,
            date: now,
            owner: msg.sender,
            exists: true
        });
        listIds.push(listId);
        emit ListCreated(listId);
        lists[listId] = newList;
        totalLists++;
    }

    function getList(uint256 listId)
        external
        view
        returns (
            uint256 id,
            string memory name,
            uint256 totalTodos,
            uint256 date,
            address owner
        )
    {
        List storage list = lists[listId];
        require(list.exists, "List does not exist.");
        return (list.id, list.title, list.totalTodos, list.date, list.owner);
    }

    function getTotalLists() external view returns (uint256 count) {
        count = totalLists;
    }

    function getListIds(uint256 page, uint256 resultsPerPage)
        external
        view
        returns (uint256[] memory)
    {
        /*
            ex: page 1, resultsPerPage 20 | 1 * 20 - 20 = 0
            ex2: page 2, resultsPerPage 20 | 2 * 20 - 20 = 20
            starting point for listing items in array
            */
        uint256 _squareIndex = resultsPerPage * page - resultsPerPage;

        // return emptry array if already empty or _squareIndex is out of bounds
        if (listIds.length == 0 || _squareIndex > listIds.length) {
            return new uint256[](0);
        }

        // need to create fixed length array because we cannot push to array in memory
        uint256[] memory _ids = new uint256[](resultsPerPage);

        // start starting counter for return array
        uint256 _returnCounter = 0;

        // loop through array from starting point to end point
        // ex page 2, resultsPerPage 20 | 2 * 40
        for (
            _squareIndex;
            _squareIndex < resultsPerPage * page;
            _squareIndex++
        ) {
            /*
                add array item unless out of bounds
                if so add uninitialized value (0 in the case of uint256)
                */
            if (_squareIndex < listIds.length) {
                _ids[_returnCounter] = listIds[_squareIndex];
            } else {
                _ids[_returnCounter] = 0;
            }
            _returnCounter++;
        }
        return _ids;
    }

    function updateList(uint256 listId, string calldata newName) external {
        List storage list = lists[listId];
        require(list.exists, "List does not exist.");
        require(
            list.owner == msg.sender || owner() == msg.sender,
            "you are not allowed to do that."
        );
        require(Validate.title(newName), "newName is not valid");
        list.title = newName;
        emit ListUpdatet(listId);
    }

    function deleteList(uint256 listId) external {
        List memory list = lists[listId];
        require(list.exists, "List does not exist.");
        require(
            list.owner == msg.sender || owner() == msg.sender,
            "you are not allowed to do that."
        );
        for (uint256 i = 0; i < listIds.length; i++) {
            if (listIds[i] == listId) delete listIds[i];
        }
        delete lists[listId];
        totalLists--;
        emit ListDeleted(listId);
    }

    function createTodo(uint256 listId, string calldata title) external {
        List storage list = lists[listId];
        require(list.exists, "List does not exist.");
        require(Validate.title(title), "title is not valid");
        Todo memory newTodo = Todo(title, true, now, msg.sender, true);
        uint256 todoId = list.totalTodos++;
        list.todos[todoId] = newTodo;
    }

    function getTodo(uint256 listId, uint256 todoIndex)
        external
        view
        returns (string memory body, uint256 date, address owner)
    {
        List storage list = lists[listId];
        require(list.exists, "List does not exist.");
        require(list.todos[todoIndex].exists, "todo does not exist.");
        Todo memory todo = list.todos[todoIndex];
        return (todo.title, todo.date, todo.owner);
    }

    function deleteTodo(uint256 listId, uint256 todoIndex)
        external
        returns (bool success)
    {
        List storage list = lists[listId];
        require(list.exists, "List does not exist.");
        require(list.todos[todoIndex].exists, "todo does not exist.");
        Todo storage todo = list.todos[todoIndex];
        require(
            todo.owner == msg.sender || owner() == msg.sender,
            "you are not allowed to do that."
        );
        todo.title = "deleted";
        return true;
    }

}
