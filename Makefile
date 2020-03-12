init:
	npx oz init EtherTodoList 0.0.1
	npx oz link @openzeppelin/contracts-ethereum-package
	npx oz create

t:
	npx oz upgrade && npm test
