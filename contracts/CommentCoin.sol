pragma solidity ^0.5.0;

import 'openzeppelin-solidity/contracts/token/ERC20/ERC20.sol';

contract CommentCoin is ERC20 {

    string public constant name = 'CommentCoin';

    string public constant symbol = 'COMME';

    uint public constant decimals = 18;

}
