pragma solidity >=0.6.4;

import {Validate} from "../libraries/Validate.sol";

import "@openzeppelin/contracts-ethereum-package/contracts/Initializable.sol";
import "@openzeppelin/contracts-ethereum-package/contracts/access/Ownable.sol";


contract EtherTodoList is Initializable, OwnableUpgradeSafe {
    struct Todo {
        uint256 id;
        string title;
        bool done;
        bool active;
        uint256 date;
        address owner;
        bool exists;
        uint256 listId;
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

    event CreateList(
        uint256 id,
        string title,
        uint256 date,
        address owner,
        uint256 totalTodos,
        uint256[] todoIds
    );

    event UpdateList(
        uint256 id,
        string title,
        uint256 date,
        address owner,
        uint256 totalTodos,
        uint256[] todoIds
    );

    event CreateTodo(
        uint256 id,
        string title,
        bool done,
        uint256 date,
        address owner,
        uint256 listId
    );

    event UpdateTodo(
        uint256 id,
        string title,
        bool done,
        uint256 date,
        address owner,
        uint256 listId
    );

    function initialize() public initializer {}

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
        ) % 9000000;
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
        emit CreateList(
            list.id,
            list.title,
            list.date,
            list.owner,
            list.totalTodos,
            list.todoIds
        );
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
        emit UpdateList(
            list.id,
            list.title,
            list.date,
            list.owner,
            list.totalTodos,
            list.todoIds
        );
        return true;
    }

    function getTodo(uint256 _listId, uint256 _todoId)
        external
        view
        returns (
            uint256 id,
            string memory title,
            bool done,
            uint256 date,
            address owner,
            uint256 listId
        )
    {
        List storage list = lists[_listId];
        require(list.exists, "List does not exist.");
        require(list.todos[_todoId].exists, "todo does not exist.");
        Todo memory todo = list.todos[_todoId];
        return (
            todo.id,
            todo.title,
            todo.done,
            todo.date,
            todo.owner,
            todo.listId
        );
    }

    function createTodo(uint256 listId, string calldata title) external {
        List storage list = lists[listId];
        require(list.exists, "List does not exist.");
        require(Validate.title(title), "title is not valid");

        uint256 todoId = uint256(
            keccak256(abi.encodePacked(now, msg.sender, title))
        ) % 9000000;

        Todo memory todo = Todo({
            id: todoId,
            title: title,
            done: false,
            active: true,
            date: now,
            owner: msg.sender,
            exists: true,
            listId: listId
        });
        list.todos[todoId] = todo;
        list.todoIds.push(todoId);
        list.totalTodos++;
        emit CreateTodo(
            todo.id,
            todo.title,
            todo.done,
            todo.date,
            todo.owner,
            todo.listId
        );
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
        Todo memory todo = list.todos[todoId];
        emit UpdateTodo(
            todo.id,
            todo.title,
            todo.done,
            todo.date,
            todo.owner,
            todo.listId
        );
        return true;
    }
}
