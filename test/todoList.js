const {
  BN,
  constants,
  expectEvent,
  expectRevert
} = require('openzeppelin-test-helpers');

const should = require('chai').should();

const TodoList = artifacts.require('TodoList');

contract('todoList', async ([_, owner, ...otherAccounts]) => {
  let todoList;

  beforeEach(async function() {
    todoList = await TodoList.new();
    todoList.initialize(owner, { from: owner });
  });

  it('should have 0 lists after deploy', async () => {
    (await todoList.getTotalLists()).should.bignumber.equal(new BN(0));
  });

  it('should not be able to create list without name', async () => {
    await expectRevert(
      todoList.createList(''), 'name is not valid'
    );
  });


  it('should be able to create and update list as listowner', async () => {
    await todoList.createList('myList1', { from: otherAccounts[2] });
    await todoList.createList('myList2', { from: otherAccounts[2] });
    (await todoList.getTotalLists()).should.bignumber.equal(new BN(2));

    const listIds = (await todoList.getListIds(1, 5)).filter(
      item => parseInt(item) !== 0
    );
    await todoList.updateList(listIds[0], 'myNewList1', { from: otherAccounts[2] });
    (await todoList.getList(listIds[0])).name.should.equal('myNewList1');
  });


  it('should not be able to delete list as foreign', async () => {
    await todoList.createList('myList1', { from: otherAccounts[2] });
    await todoList.createList('myList2', { from: otherAccounts[2] });
    const rawListIds = await todoList.getListIds(1, 5);
    const listIds = rawListIds.filter(item => parseInt(item) !== 0);

    await expectRevert(
      todoList.deleteList(listIds[0], { from: otherAccounts[1] }),'you are not allowed to do that'
    );
  });

  it('should be able to delete foreign list as owner', async () => {
    await todoList.createList('myList1', { from: otherAccounts[2] });
    await todoList.createList('myList2', { from: otherAccounts[2] });
    (await todoList.getTotalLists()).should.bignumber.equal(new BN(2));
    (await todoList.getListIds(1, 10))
      .filter(item => parseInt(item) !== 0)
      .length.should.equal(2);
    const listIdsA = await todoList.getListIds(1, 10);
    await todoList.deleteList(listIdsA[0], { from: owner });
    (await todoList.getTotalLists()).should.bignumber.equal(new BN(1));
    (await todoList.getListIds(1, 10))
      .filter(item => parseInt(item) !== 0)
      .length.should.equal(1);
  });

  it('should be able to create todo', async () => {
    await todoList.createList('myList1', { from: otherAccounts[2] });
    const listIds = (await todoList.getListIds(1, 5)).filter(
      item => parseInt(item) !== 0
    );
    (await todoList.getList(listIds[0])).totalTodos.should.bignumber.equal(
      new BN(0)
    );
    const msg = 'hello this is a todo!';
    await todoList.createTodo(listIds[0], msg, {
      from: otherAccounts[1],
    });
    (await todoList.getTodo(listIds[0], 0)).body.should.equal(msg);
  });

  it('should not be able to delete todo as foreigner', async () => {
    await todoList.createList('myList1', { from: otherAccounts[2] });
    const listIds = (await todoList.getListIds(1, 5)).filter(
      item => parseInt(item) !== 0
    );
    const msg = 'hello this is a todo!';
    await todoList.createTodo(listIds[0], msg, { from: otherAccounts[1] });

    await expectRevert(
      todoList.deleteTodo(listIds[0], 0, { from: otherAccounts[3] }), 'you are not allowed to do that.'
    );

  });

  it('should be able to delete todo as owner', async () => {
    await todoList.createList('myList1', { from: otherAccounts[2] });
    const listIds = (await todoList.getListIds(1, 5)).filter(item => item !== 0);
    const msg = 'hello this is a todo!';
    await todoList.createTodo(listIds[0], msg, {
      from: otherAccounts[1],
    });
    await todoList.deleteTodo(listIds[0], 0, {
      from: otherAccounts[1],
    });
    (await todoList.getTodo(listIds[0], 0)).body.should.equal('deleted');
  });
});
