// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

// Uncomment the line to use openzeppelin/ERC721
// You can use this dependency directly because it has been installed by TA already
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

// Uncomment this line to use console.log
import "hardhat/console.sol";
import "./MyERC20.sol";

contract BorrowYourCar is ERC721 {

    // use a event if you want
    // to represent time you can choose block.timestamp
    event CarBorrowed(uint32 carTokenId, address borrower, uint256 startTime, uint256 duration);

    // maybe you need a struct to store car information
    struct Car {
        address owner;
        address borrower;
        uint256 borrowUntil;
    }

    address public manager;
    uint256 carCount = 0;
    MyERC20 public payFee;

    mapping(uint256 => Car) public cars; // A map from car index to its information
    mapping(address => uint256[]) public ownedCars;

    modifier onlyOwner() {
    require(msg.sender == manager, "Only the contract owner can call this function");
    _;
}

    constructor(string memory _name, string memory _symbol) ERC721(_name, _symbol) {
        manager = msg.sender;
        payFee = new MyERC20(_name, _symbol);
    }

    // mint cars
    function issueCar() external {
        uint256 tokenId = carCount;
        _mint(msg.sender, tokenId);
        cars[tokenId] = Car(msg.sender, address(0), 0);
        carCount++;
        ownedCars[msg.sender].push(tokenId);
    }

    function canBorrow(uint256 _tokenId) public view returns (bool) {
        return (cars[_tokenId].borrowUntil < block.timestamp && cars[_tokenId].borrower == address(0));
    }

    function borrowCar(uint256 _tokenId, uint256 borrowDuration) public {
        require(canBorrow(_tokenId), "Car cannot be borrowed at this time");
        cars[_tokenId].borrower = msg.sender;
        cars[_tokenId].borrowUntil = block.timestamp + borrowDuration;

        uint256 borrowFee = borrowDuration / 10000;
        require(payFee.balanceOf(msg.sender) >= borrowFee, "Insufficient balance");
        payFee.transferFrom(msg.sender, cars[_tokenId].owner, borrowFee);
    }

    // not be used yet
    function returnCar(uint256 _tokenId) public {
        require(cars[_tokenId].borrower == msg.sender, "Only the borrower can return the car");
        cars[_tokenId].borrower = address(0);
        cars[_tokenId].borrowUntil = 0;
    }

    function getOwnedCars() public view returns (uint256[] memory) {
        return ownedCars[msg.sender];
    }

    function getAvailableCars() public view returns (uint256[] memory) {
        uint256[] memory availableTokens = new uint256[](carCount);
        uint256 index = 0;
        for (uint256 carNum = 0; carNum < carCount; carNum++) {
            if (canBorrow(carNum)) {
                availableTokens[index] = carNum;
                index++;
            }
        }
        uint256[] memory returnTokens = new uint256[](index);
        for (uint256 i = 0; i < index; i++) {
            returnTokens[i] = availableTokens[i];
        }
        return returnTokens;
    }

    function getOwner(uint256 carId) public view returns(address){
        Car storage car =  cars[carId];
        return car.owner;
    }

    function getBorrower(uint256 carId) public view returns(address){
        //检查车辆是否已经超过借用时间
        if( uint256(cars[carId].borrowUntil) >=  block.timestamp){
            return  cars[carId].borrower;
        }
        else{
            return address(0);
        }
    }
}