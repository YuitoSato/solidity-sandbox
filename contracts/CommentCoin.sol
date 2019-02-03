pragma solidity ^0.5.0;

import 'openzeppelin-solidity/contracts/token/ERC721/ERC721Mintable.sol';

contract CommentCoin {

    string public constant name = 'CommentCoin';

    string public constant symbol = 'COMME';

    // same as ether. (1ether=1wei * (10 ** 18))
    uint public constant decimals = 18;

}
