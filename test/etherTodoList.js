const { expect } = require('chai');
const _ = require('lodash');

const { accounts, contract } = require('@openzeppelin/test-environment');

const { BN, constants, expectEvent, expectRevert } = require('openzeppelin-test-helpers');

const EtherTodoList = contract.fromArtifact('EtherTodoList');

describe('etherTodoList', function() {
  const [owner, user1, user2, user3] = accounts;
  let etherTodoList;

  beforeEach(async () => {
    etherTodoList = await EtherTodoList.new({ from: owner });
    await etherTodoList.initialize(owner, { from: owner });
  });

  it('deployer is owner', async () => {
    expect(await etherTodoList.owner()).to.equal(owner);
  });

  it('should have 0 lists after deploy', async () => {
    expect(await etherTodoList.totalLists()).to.bignumber.equal(new BN(0));
  });

  it('should not be able to create list without name', async () => {
    await expectRevert(etherTodoList.createList(''), 'name is not valid');
  });

  it('should be able to create and update list as listowner', async () => {
    await etherTodoList.createList('myList1', { from: user1 });
    await etherTodoList.createList('myList2', { from: user1 });
    const totalLists = await etherTodoList.totalLists()
    expect(totalLists).to.bignumber.equal(new BN(2));
    const listIds = await Promise.all(_.times(totalLists, i => etherTodoList.listIds(i)))
    expect(await etherTodoList.getList(listIds[0])).to.have.property('name').with.equal('myList1');
    expect(await etherTodoList.getList(listIds[1])).to.have.property('name').with.equal('myList2');
    await etherTodoList.updateList(listIds[0], 'myNewList1', { from: user1 });
    expect(await etherTodoList.getList(listIds[0])).to.have.property('name').with.equal('myNewList1');
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
    expect(await etherTodoList.getTodo(listIds[0], 0)).to.have.property('body').to.equal('Bread');
    expect(await etherTodoList.getTodo(listIds[0], 1)).to.have.property('body').to.equal('Butter');
    expect(await etherTodoList.getTodo(listIds[0], 2)).to.have.property('body').to.equal('Chese');


    await etherTodoList.updateTodo(listIds[0], 2, 'Cheese', { from: user1 })
    expect(await etherTodoList.getTodo(listIds[0], 0)).to.have.property('body').to.equal('Bread');
    expect(await etherTodoList.getTodo(listIds[0], 1)).to.have.property('body').to.equal('Butter');
    expect(await etherTodoList.getTodo(listIds[0], 2)).to.have.property('body').to.equal('Cheese');
  });


  it('should not be able to update todo as foreigner', async () => {
    await etherTodoList.createList('myList1', { from: user2 });
    const totalLists = await etherTodoList.totalLists()
    const listIds = await Promise.all(_.times(totalLists, i => etherTodoList.listIds(i)))
    const msg = 'hello this is a todo!';
    await etherTodoList.createTodo(listIds[0], msg, { from: user1 });
    await expectRevert(etherTodoList.updateTodo(listIds[0], 0, msg, { from: user3 }), 'you are not allowed to do that.');
  });


});
