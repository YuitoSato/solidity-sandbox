const CommentBase = artifacts.require('./CommentBase.sol');

function parseComment(commentAbiResult) {
  return {
    commentHash: commentAbiResult[0].toNumber(),
    ownerAddress: commentAbiResult[1],
    likeCount: commentAbiResult[2].toNumber(),
    likeFroms: commentAbiResult[3]
  }
}

contract('CommentBase', async (accounts) => {
  let commentBase;

  beforeEach(async () => {
    commentBase = await CommentBase.new();
    // const commentBase = await CommentBase.deployed();
    await commentBase.createComment(1);
  });

  describe('getComments', async () => {
    it('should get comments', async () => {
      // const commentBase = await CommentBase.deployed();
      const comments = await commentBase.getComments();
      assert.equal(comments.length, 1, 'could not get comments');
    });
  });

  describe('commentIndexToOwner', async () => {
    it('should get owner by comment index', async () => {
      // const commentBase = await CommentBase.deployed();
      const owner = await commentBase.getOwnerByCommentIndex(0);
      assert.equal(owner, accounts[0], 'could not get owner by comment index')
    });
  });

  describe('likeComment', async () => {
    it('should like a comment and increment likeCount', async () => {
      // const commentBase = await CommentBase.deployed();
      const commentIndex = 0;
      await commentBase.likeComment(commentIndex);
      const result = await commentBase.getComment(commentIndex);
      const comment = parseComment(result);
      assert.equal(comment.likeCount, 1, 'could not increment likeCount');
    });

    it('sould like a comment and push address to likeFroms', async () => {
      const commentIndex = 0;
      await commentBase.likeComment(commentIndex);
      const result = await commentBase.getComment(commentIndex);
      const comment = parseComment(result);
      assert.equal(comment.likeFroms[0], accounts[0], 'could not push address to likeFroms');
    });
  });

});
