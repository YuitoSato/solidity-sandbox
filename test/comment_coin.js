const CommentCoin = artifacts.require('./CommentCoin.sol');
const CommentBase = artifacts.require('./CommentBase.sol');

contract('CommentCoin', (accounts) => {
  let commentCoin;
  let commentBase;

  beforeEach(async () => {
    commentCoin = await CommentCoin.new();
    commentBase = await CommentBase.new();
    await commentCoin.mint(accounts[0], 10000);
    await commentBase.setCommentCoinInterface(commentCoin.address);
  });

  describe('approveAndCall', () => {
    it('should approve and call', async () => {
      await commentCoin.approveAndCall(commentBase.address, 100);
      const actual = (await commentCoin.balanceOf(commentBase.address)).toNumber();
      const expected = 100;
      assert.equal(actual, expected, 'could not approve and call.');
    });
  });
});
