const { expect } = require('chai');
const _ = require('lodash');

const { accounts, contract } = require('@openzeppelin/test-environment');

const { BN, constants, expectEvent, expectRevert } = require('openzeppelin-test-helpers');

const EtherTodoList = contract.fromArtifact('EtherTodoList');

describe('etherTodoList', function() {
  const [owner, user1, user2, user3] = accounts;
  let etherTodoList;

  beforeEach(async () => {
    etherTodoList = await EtherTodoList.new();
    await etherTodoList.initialize({ from: owner });
  });

  it('should have 0 lists after deploy', async () => {
    expect(await etherTodoList.totalLists()).to.bignumber.equal(new BN(0));
  });

  it('should not be able to create list without title', async () => {
    await expectRevert(etherTodoList.createList(''), 'title is not valid');
  });

  it('should be able to create and update list as listowner', async () => {
    await etherTodoList.createList('myList1', { from: user1 });
    await etherTodoList.createList('myList2', { from: user1 });
    const totalLists = await etherTodoList.totalLists()

    expect(totalLists).to.bignumber.equal(new BN(2));
    const listIds = await Promise.all(_.times(totalLists, i => etherTodoList.listIds(i)))
    expect(await etherTodoList.getList(listIds[0])).to.have.property('title').with.equal('myList1');
    expect(await etherTodoList.getList(listIds[1])).to.have.property('title').with.equal('myList2');
    await etherTodoList.updateList(listIds[0], 'myNewList1', { from: user1 });
    expect(await etherTodoList.getList(listIds[0])).to.have.property('title').with.equal('myNewList1');
  });


  it('should be able to create and update todo as listowner', async () => {
    await etherTodoList.createList('Groceries', { from: user1 });
    const totalLists = await etherTodoList.totalLists()
    expect(totalLists).to.bignumber.equal(new BN(1));
    const listIds = await Promise.all(_.times(totalLists, i => etherTodoList.listIds(i)))
    expect(await etherTodoList.getList(listIds[0])).to.have.property('totalTodos').to.bignumber.equal(new BN(0));

    await etherTodoList.createTodo(listIds[0], 'Bread', { from: user1 });
    await etherTodoList.createTodo(listIds[0], 'Butter', { from: user1 });
    await etherTodoList.createTodo(listIds[0], 'Chese', { from: user1 });
    const groceriesList = await etherTodoList.getList(listIds[0])
    expect(groceriesList).to.have.property('totalTodos').to.bignumber.equal(new BN(3));

    expect(await etherTodoList.getTodo(listIds[0], groceriesList.todoIds[0])).to.have.property('title').to.equal('Bread');
    expect(await etherTodoList.getTodo(listIds[0], groceriesList.todoIds[1])).to.have.property('title').to.equal('Butter');
    expect(await etherTodoList.getTodo(listIds[0], groceriesList.todoIds[2])).to.have.property('title').to.equal('Chese');
    expect(await etherTodoList.getTodo(listIds[0], groceriesList.todoIds[2])).to.have.property('done').to.equal(false);

    await etherTodoList.updateTodo(listIds[0], groceriesList.todoIds[2], 'Cheese', true, { from: user1 })
    expect(await etherTodoList.getTodo(listIds[0], groceriesList.todoIds[0])).to.have.property('title').to.equal('Bread');
    expect(await etherTodoList.getTodo(listIds[0], groceriesList.todoIds[1])).to.have.property('title').to.equal('Butter');
    expect(await etherTodoList.getTodo(listIds[0], groceriesList.todoIds[2])).to.have.property('title').to.equal('Cheese');
    expect(await etherTodoList.getTodo(listIds[0], groceriesList.todoIds[2])).to.have.property('done').to.equal(true);
  });


  it('should not be able to update todo as foreigner', async () => {
    await etherTodoList.createList('myList1', { from: user2 });
    const totalLists = await etherTodoList.totalLists()
    const listIds = await Promise.all(_.times(totalLists, i => etherTodoList.listIds(i)))
    const title = 'hello this is a todo!';
    await etherTodoList.createTodo(listIds[0], title, { from: user1 });
    await expectRevert(etherTodoList.updateTodo(listIds[0], 0, title, { from: user3 }), 'you are not allowed to do that.');
  });


});
