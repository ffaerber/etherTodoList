init:
	npx oz init EtherTodoList 0.0.1
	npx oz link @openzeppelin/contracts-ethereum-package
	npx oz create

t:
	npx oz upgrade --all --network development && npm test

# https://swarm-gateways.net/bzz:/1b9556d7e399fc93d8b5f8ac9248ff1fde1003357a2df83874095ef0a3c5e556/
# https://swarm-gateways.net/bzz://ethertodolist.eth
deploy:
	docker run -it -v $(PWD)/client/build:/build \
		ethersphere/swarm \
			--bzzapi https://swarm-gateways.net \
			--defaultpath /build/index.html \
			--recursive up /build
