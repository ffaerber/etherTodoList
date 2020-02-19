const {
  expect
} = require('chai');

const {
  accounts,
  contract
} = require('@openzeppelin/test-environment');

const {
  BN,
  constants,
  expectEvent,
  expectRevert
} = require('openzeppelin-test-helpers');

const TodoList = contract.fromArtifact('TodoList');


describe('todoList', function () {
  const [ owner, user1, user2, user3 ] = accounts;
  let todoList

  beforeEach( async () => {
    todoList = await TodoList.new({ from: owner });
    await todoList.initialize(owner, { from: owner });
  });

  it('deployer is owner', async () => {
    expect(await todoList.owner()).to.equal(owner);
  });

  it('should have 0 lists after deploy', async () => {
    expect(await todoList.getTotalLists()).to.bignumber.equal(new BN(0));
  });

  it('should not be able to create list without name', async () => {
    await expectRevert(
      todoList.createList(''), 'name is not valid'
    );
  });

  it('should be able to create and update list as listowner', async () => {
    await todoList.createList('myList1', { from: user1 });
    await todoList.createList('myList2', { from: user1 });
    expect(await todoList.getTotalLists()).to.bignumber.equal(new BN(2));
    const listIds = (await todoList.getListIds(1, 5)).filter(
      item => parseInt(item) !== 0
    );
    await todoList.updateList(listIds[0], 'myNewList1', { from: user1 });
    expect(await todoList.getList(listIds[0])).to.have.property('name').with.equal('myNewList1');
  });


  it('should not be able to delete list as foreign', async () => {
    await todoList.createList('myList1', { from: user2 });
    await todoList.createList('myList2', { from: user2 });
    const rawListIds = await todoList.getListIds(1, 5);
    const listIds = rawListIds.filter(item => parseInt(item) !== 0);

    await expectRevert(
      todoList.deleteList(listIds[0], { from: user1 }),'you are not allowed to do that'
    );
  });


  it('should be able to delete foreign list as owner', async () => {
    await todoList.createList('myList1', { from: user2 });
    await todoList.createList('myList2', { from: user2 });
    expect(await todoList.getTotalLists()).to.bignumber.equal(new BN(2));
    const listIds = (await todoList.getListIds(1, 10)).filter(item => parseInt(item) !== 0 );
    expect(listIds).to.have.lengthOf(2);

    await todoList.deleteList(listIds[0], { from: owner });
    expect(await todoList.getTotalLists()).to.bignumber.equal(new BN(1));
    const newListIds = (await todoList.getListIds(1, 10)).filter(item => parseInt(item) !== 0 );
    expect(newListIds).to.have.lengthOf(1);
  });

  it('should be able to create todo', async () => {
    await todoList.createList('myList1', { from: user1 });

    const listIds = (await todoList.getListIds(1, 5)).filter( item => parseInt(item) !== 0);
    expect(await todoList.getList(listIds[0])).to.have.property('totalTodos').to.bignumber.equal(new BN(0));

    const msg = 'hello this is a todo!';
    await todoList.createTodo(listIds[0], msg, { from: user1});
    expect(await todoList.getTodo(listIds[0], 0)).to.have.property('body').to.equal(msg)
  });

  it('should not be able to delete todo as foreigner', async () => {
    await todoList.createList('myList1', { from: user2 });

    const listIds = (await todoList.getListIds(1, 5)).filter( item => parseInt(item) !== 0);
    const msg = 'hello this is a todo!';
    await todoList.createTodo(listIds[0], msg, { from: user1 });

    await expectRevert(
      todoList.deleteTodo(listIds[0], 0, { from: user3 }), 'you are not allowed to do that.'
    );
  });

  it('should be able to delete todo as owner', async () => {
    await todoList.createList('myList1', { from: user2 });
    const listIds = (await todoList.getListIds(1, 5)).filter(item => item !== 0);
    const msg = 'hello this is a todo!';
    await todoList.createTodo(listIds[0], msg, { from: user1});
    await todoList.deleteTodo(listIds[0], 0, {from: user1});

    expect(await todoList.getTodo(listIds[0], 0)).to.have.property('body').to.equal('deleted')
  });
});
