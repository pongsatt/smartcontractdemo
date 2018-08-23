const fs = require('fs');
const solc = require('solc');
const content = fs.readFileSync('./smartcontracts/simplesm.sol');
const input = {'simplesm.sol': content.toString()};
const output = solc.compile({sources: input}, 1);

// use output from previous step
// Connect to local server
const Web3 = require('Web3');
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

// Get contract interface
const contractKey = 'simplesm.sol:MyCurrency';
const bytecode = output.contracts[contractKey].bytecode;
const data = '0x' + bytecode;
const abiJson = output.contracts[contractKey].interface;
const abi = JSON.parse(abiJson);
// Deploy
const Contract = new web3.eth.Contract(abi);
const tokenName = 'MyToken';
const initialTokens = 100;
Contract.deploy({data, arguments: [tokenName, initialTokens]})
.send({
    from: '0x954c8e10ed7eab4e467085f876b9d4534a488737',
    gas: 4700000
})
.on('error', function (error) { console.log('error: ', error) })
.then(function (newContract) {
    const address = newContract.options.address;  
    console.log('address:', address)
});

const abidir = 'src/abi/';

if (!fs.existsSync(abidir)){
    fs.mkdirSync(abidir);
}
fs.writeFileSync(abidir + 'MyCurrency.js', 'export default ' + abiJson);