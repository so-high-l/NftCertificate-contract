// SPDX-License-Identifier: MIT

pragma solidity 0.8.21;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./ERC4671.sol";

contract Nftcert is ERC4671, Ownable {
    constructor(string memory _courseName, string memory _tokenName) ERC4671(_courseName, _tokenName) Ownable(msg.sender){}

    mapping(address => uint256) public studentToid;


    // Event
    event TokenMinted(address indexed _owner, uint256 indexed _tokenId);

    // Mint a token for a specific address
    function createCertificate(address _student, string memory _tokenUri) public onlyOwner {
        _mint(_student);
        studentToid[_student] = emittedCount() - 1;
        setTokenURI(studentToid[_student], _tokenUri);
        emit TokenMinted(_student, studentToid[_student]);
    }

     // Revoke a token using tokenId
    function revokeToken(uint256 tokenId) external onlyOwner {
        _revoke(tokenId);
    }
}
