pragma solidity ^0.5.0;

import "openzeppelin-solidity/contracts/ownership/Ownable.sol";
import "openzeppelin-solidity/contracts/token/ERC20/ERC20Mintable.sol";

contract CommentCoinRecipientInterface {

    function receiveApproval(address _sender, uint256 _value, CommentCoin _tokenContract) external;

}

contract CommentCoin is ERC20Mintable, Ownable {

    string public constant name = 'CommentCoin';

    string public constant symbol = 'COMME';

    uint public constant decimals = 18;

    function approveAndCall(address _recipient, uint256 _value) external {
        approve(_recipient, _value);

        CommentCoinRecipientInterface(_recipient).receiveApproval(msg.sender, _value, this);
    }

}
