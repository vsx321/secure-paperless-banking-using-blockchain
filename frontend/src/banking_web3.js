import Web3 from "web3";
import Banking from "./Banking.json";

const web3 = new Web3(window.ethereum); 

const contractABI = Banking.abi;
const contractAddress = '0x4F49E479eF35C049Bee1933D807fb6109384aBb6'; // contract address


const contract = new web3.eth.Contract(contractABI, contractAddress);

export async function createAccount(accountType, name) {
    try {
        const accounts = await web3.eth.getAccounts();
        const sender = accounts[0]; 
        const receipt = await contract.methods.createAccount(accountType, name).send({ from: sender });
        console.log(sender);
        console.log('Account created successfully:', receipt);
    } catch (error) {
        console.error('Error creating account:', error);
        throw Error('You didnt pay fee');
    }
}

export async function deposit(amount) {
    try {
        const accounts = await web3.eth.getAccounts();
        const sender = accounts[0]; 
        const receipt = await contract.methods.deposit(amount).send({ from: sender });
        console.log('Deposit successful:', receipt);
    } catch (error) {
        console.error('Error depositing:', error);
        throw Error("Error Depositing");
    }
}


export async function withdraw(amount) {
    try {
        const accounts = await web3.eth.getAccounts();
        const sender = accounts[0]; 
        const receipt = await contract.methods.withdraw(amount).send({ from: sender });
        console.log('Withdrawal successful:', receipt);
    } catch (error) {
        console.error('Error withdrawing:', error);
        throw Error("Error Withdrawing");
    }
}

export async function transfer(toAddress, amount) {
    try {
        const accounts = await web3.eth.getAccounts();
        const sender = accounts[0]; 
        const receipt = await contract.methods.transfer(amount).send({ from: sender });
        console.log('Transfer successful:', receipt);
    } catch (error) {
        console.error('Error transferring:', error);
        throw Error("Error Transferring");
    }
}

export async function getBalance() {
    try {
        const accounts = await web3.eth.getAccounts();
        const sender = accounts[0]; 
        const balance = await contract.methods.getBalance().call({ from: sender });
        console.log('Balance:', balance);
    } catch (error) {
        console.error('Error fetching balance:', error);
        throw Error("Error fetching balance");
    }
}

export async function getAccountDetails() {
    try {
        const accounts = await web3.eth.getAccounts();
        const sender = accounts[0]; 
        const accountDetails = await contract.methods.getAccount().call({ from: sender });
        console.log('Account Details:', accountDetails);
    } catch (error) {
        console.error('Error fetching account details:', error);
        throw Error("Error Fetching account details");
    }
}
