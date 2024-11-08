// Banking.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Banking {
    struct Account {
        uint256 balance;
        bool exists;
        string accountType;
        uint256 createdAt;
        mapping(address => bool) authorizedUsers;
    }
    
    mapping(address => Account) public accounts;
    mapping(address => bool) public blacklistedAddresses;
    
    event AccountCreated(address indexed owner, string accountType, uint256 timestamp);
    event DepositMade(address indexed to, uint256 amount, uint256 timestamp);
    event WithdrawalMade(address indexed from, uint256 amount, uint256 timestamp);
    event TransferMade(address indexed from, address indexed to, uint256 amount, uint256 timestamp);
    
    modifier accountExists() {
        require(accounts[msg.sender].exists, "Account does not exist");
        _;
    }
    
    modifier notBlacklisted(address _address) {
        require(!blacklistedAddresses[_address], "Address is blacklisted");
        _;
    }
    
    function createAccount(string memory _accountType) external notBlacklisted(msg.sender) {
        require(!accounts[msg.sender].exists, "Account already exists");
        
        Account storage newAccount = accounts[msg.sender];
        newAccount.exists = true;
        newAccount.balance = 0;
        newAccount.accountType = _accountType;
        newAccount.createdAt = block.timestamp;
        newAccount.authorizedUsers[msg.sender] = true;
        
        emit AccountCreated(msg.sender, _accountType, block.timestamp);
    }
    
    function deposit() external payable accountExists notBlacklisted(msg.sender) {
        require(msg.value > 0, "Deposit amount must be greater than 0");
        accounts[msg.sender].balance += msg.value;
        emit DepositMade(msg.sender, msg.value, block.timestamp);
    }
    
    function withdraw(uint256 _amount) external accountExists notBlacklisted(msg.sender) {
        require(_amount > 0, "Withdrawal amount must be greater than 0");
        require(accounts[msg.sender].balance >= _amount, "Insufficient balance");
        
        accounts[msg.sender].balance -= _amount;
        payable(msg.sender).transfer(_amount);
        emit WithdrawalMade(msg.sender, _amount, block.timestamp);
    }
    
    function transfer(address _to, uint256 _amount) external accountExists notBlacklisted(msg.sender) notBlacklisted(_to) {
        require(_to != address(0), "Invalid recipient address");
        require(accounts[_to].exists, "Recipient account does not exist");
        require(_amount > 0, "Transfer amount must be greater than 0");
        require(accounts[msg.sender].balance >= _amount, "Insufficient balance");
        
        accounts[msg.sender].balance -= _amount;
        accounts[_to].balance += _amount;
        emit TransferMade(msg.sender, _to, _amount, block.timestamp);
    }
    
    function getBalance() external view accountExists returns (uint256) {
        return accounts[msg.sender].balance;
    }
}