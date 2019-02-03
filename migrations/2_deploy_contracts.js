const CommentBase = artifacts.require("./CommentBase.sol");
const CommentCoin = artifacts.require("./CommentCoin.sol");

module.exports = function(deployer) {
    const initialSupply = 1000e18;
    deployer.deploy(CommentCoin, initialSupply, {
        gas: 2000000
    });
    deployer.deploy(CommentBase, {
        gas: 2000000
    });
};
