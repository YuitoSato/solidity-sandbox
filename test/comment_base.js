const CommentBase = artifacts.require('./CommentBase.sol');
const CommentCoin = artifacts.require('./CommentCoin.sol');

function parseComment(commentAbiResult) {
  return {
    commentHash: commentAbiResult[0].toString(),
    ownerAddress: commentAbiResult[1],
    likeCount: commentAbiResult[2].toNumber(),
    likeFroms: commentAbiResult[3]
  }
}

contract('CommentBase', (accounts) => {
  let commentBase;
  let commentCoin;

  beforeEach(async () => {
    commentBase = await CommentBase.new();
    commentCoin = await CommentCoin.new();
    await commentBase.createComment(1);
    await commentBase.setCommentCoinInterface(commentCoin.address);
    await commentCoin.mint(accounts[0], 10000);
    await commentCoin.approveAndCall(commentBase.address, 10000);
  });

  describe('getComments', () => {
    it('should get comments', async () => {
      const comments = await commentBase.getComments();
      expect(comments.length).to.equal(1);
    });
  });

  describe('commentIndexToOwner', () => {
    it('should get owner by comment index', async () => {
      const owner = await commentBase.getOwnerByCommentIndex(0);
      expect(owner).to.equal(accounts[0]);
    });
  });

  describe('likeComment', () => {
    it('should like a comment and increment likeCount', async () => {
      const commentIndex = 0;
      await commentBase.likeComment(commentIndex, { from: accounts[0] });
      const result = await commentBase.getComment(commentIndex);
      const comment = parseComment(result);
      expect(comment.likeCount).to.equal(1);
    });

    it('should like a comment and push address to likeFroms', async () => {
      const commentIndex = 0;
      await commentBase.likeComment(commentIndex, { from: accounts[1] });
      const result = await commentBase.getComment(commentIndex);
      const comment = parseComment(result);
      expect(comment.likeFroms[0]).to.equal(accounts[1]);
    });

    it('should not like a comment more than twice', async () => {
      const commentIndex = 0;
      await commentBase.likeComment(commentIndex);
      
      commentBase.likeComment(commentIndex)
        .then(() => assert.failed)
        .catch(() => assert.ok);
    });

    it('should receive reward', async() => {
      const beforeBalance = (await commentCoin.balanceOf(accounts[0])).toNumber();
      const commentIndex = 0;
      await commentBase.likeComment(commentIndex);
      const afterBalance = (await commentCoin.balanceOf(accounts[0])).toNumber();
      const actual = afterBalance - beforeBalance;
      const expected = 10;
      expect(actual).to.equal(expected);
    });
  });

});
