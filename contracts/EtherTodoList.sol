pragma solidity ^0.5.0;

import {Validate} from "../libraries/Validate.sol";

import "@openzeppelin/upgrades/contracts/Initializable.sol";
import "@openzeppelin/contracts-ethereum-package/contracts/ownership/Ownable.sol";

contract EtherTodoList is Initializable, Ownable {
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

    uint256 public totalLists;
    uint256[] public listIds;
    mapping(uint256 => List) public lists;

    event ListCreated(uint256 listId);
    event ListUpdatet(uint256 listId);

    event TodoCreated(uint256 listId, uint256 todoIndex);
    event TodoUpdatet(uint256 listId, uint256 todoIndex);

    function initialize(address sender) public initializer {
        Ownable.initialize(sender);
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

    function createTodo(uint256 listId, string calldata title) external {
        List storage list = lists[listId];
        require(list.exists, "List does not exist.");
        require(Validate.title(title), "title is not valid");
        Todo memory newTodo = Todo(title, true, now, msg.sender, true);
        uint256 todoIndex = list.totalTodos++;
        list.todos[todoIndex] = newTodo;
        emit TodoCreated(listId, todoIndex);
    }

    function updateTodo(
        uint256 listId,
        uint256 todoIndex,
        string calldata newName
    ) external returns (bool success) {
        List storage list = lists[listId];
        require(list.exists, "List does not exist.");
        require(Validate.title(newName), "newName is not valid");
        require(
            list.owner == msg.sender || owner() == msg.sender,
            "you are not allowed to do that."
        );
        list.todos[todoIndex].title = newName;
        emit TodoCreated(listId, todoIndex);
        return true;
    }

}
