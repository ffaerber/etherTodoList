pragma solidity ^0.5.0;

import {Validate} from "../libraries/Validate.sol";

import "@openzeppelin/upgrades/contracts/Initializable.sol";
import "@openzeppelin/contracts-ethereum-package/contracts/ownership/Ownable.sol";

contract EtherTodoList is Initializable, Ownable {
    struct Todo {
        uint256 id;
        string title;
        bool done;
        bool active;
        uint256 date;
        address owner;
        bool exists;
    }

    struct List {
        uint256 id;
        string title;
        bool active;
        uint256 date;
        address owner;
        bool exists;
        uint256 totalTodos;
        uint256[] todoIds;
        mapping(uint256 => Todo) todos;
    }

    uint256 public totalLists;
    uint256[] public listIds;
    mapping(uint256 => List) public lists;

    event ListCreated(uint256 listId);
    event ListUpdatet(uint256 listId);

    event TodoCreated(uint256 listId, uint256 todoId);
    event TodoUpdatet(uint256 listId, uint256 todoId);

    function initialize(address sender) public initializer {
        Ownable.initialize(sender);
    }

    function getList(uint256 listId)
        external
        view
        returns (
            uint256 id,
            string memory title,
            uint256 totalTodos,
            uint256[] memory todoIds,
            uint256 date,
            address owner
        )
    {
        List storage list = lists[listId];
        require(list.exists, "List does not exist.");
        return (
            list.id,
            list.title,
            list.totalTodos,
            list.todoIds,
            list.date,
            list.owner
        );
    }

    function createList(string calldata title) external {
        require(Validate.title(title), "title is not valid");
        uint256 listId = uint256(
            keccak256(abi.encodePacked(now, msg.sender, title))
        ) %
            9000000;
        List memory list = List({
            id: listId,
            title: title,
            totalTodos: 0,
            todoIds: new uint256[](0),
            active: true,
            date: now,
            owner: msg.sender,
            exists: true
        });
        listIds.push(listId);
        lists[listId] = list;
        totalLists++;

        emit ListCreated(listId);
    }

    function updateList(uint256 listId, string calldata title)
        external
        returns (bool success)
    {
        List storage list = lists[listId];
        require(list.exists, "List does not exist.");
        require(
            list.owner == msg.sender || owner() == msg.sender,
            "you are not allowed to do that."
        );
        require(Validate.title(title), "title is not valid");
        list.title = title;
        emit ListUpdatet(listId);
        return true;
    }

    function getTodo(uint256 listId, uint256 todoId)
        external
        view
        returns (
            uint256 id,
            string memory title,
            bool done,
            uint256 date,
            address owner
        )
    {
        List storage list = lists[listId];
        require(list.exists, "List does not exist.");
        require(list.todos[todoId].exists, "todo does not exist.");
        Todo memory todo = list.todos[todoId];
        return (todo.id, todo.title, todo.done, todo.date, todo.owner);

    }

    function createTodo(uint256 listId, string calldata title) external {
        List storage list = lists[listId];
        require(list.exists, "List does not exist.");
        require(Validate.title(title), "title is not valid");

        uint256 todoId = uint256(
            keccak256(abi.encodePacked(now, msg.sender, title))
        ) %
            9000000;

        Todo memory todo = Todo({
            id: todoId,
            title: title,
            done: false,
            active: true,
            date: now,
            owner: msg.sender,
            exists: true
        });
        list.todos[todoId] = todo;
        list.todoIds.push(todoId);
        list.totalTodos++;
        emit TodoCreated(listId, todoId);
    }

    function updateTodo(
        uint256 listId,
        uint256 todoId,
        string calldata title,
        bool done
    ) external returns (bool success) {
        List storage list = lists[listId];
        require(list.exists, "List does not exist.");
        require(Validate.title(title), "title is not valid");
        require(
            list.owner == msg.sender || owner() == msg.sender,
            "you are not allowed to do that."
        );
        list.todos[todoId].title = title;
        list.todos[todoId].done = done;
        emit TodoUpdatet(listId, todoId);
        return true;
    }

}
