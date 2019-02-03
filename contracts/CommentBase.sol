pragma solidity ^0.5.0;

contract CommentBase {

    struct Comment {
        uint commentHash;
        uint likeCount;
        address[] likeFroms;
    }

    Comment[] internal comments;

    mapping (uint256 => address) internal commentIndexToOwner;
    mapping (address => uint256) internal ownershipCommentCount;

    function createComment(uint _commentHash) external {
        address[] memory likeFroms;
        Comment memory comment = Comment(_commentHash, 0, likeFroms);
        uint256 commentIndex = comments.push(comment) - 1;
        commentIndexToOwner[commentIndex] = msg.sender;
        ownershipCommentCount[msg.sender]++;
    }

    function getComments() external view returns (uint[] memory) {
        uint[] memory results = new uint[](comments.length);
        uint i;
        for (i = 0; i < comments.length; i++) {
            results[i] = comments[i].commentHash;
        }
        return results;
    }

    function getComment(uint commentIndex) external view returns (
        uint, address , uint, address[] memory
    ) {
        Comment memory comment = comments[commentIndex];
        uint commentHash = comment.commentHash;
        address ownerAddress = commentIndexToOwner[commentIndex];
        uint likeCount = comment.likeCount;
        address[] memory likeFroms = comment.likeFroms;
        return (commentHash, ownerAddress, likeCount, likeFroms);
    }

    function likeComment(uint commentIndex) external {
        Comment storage comment = comments[commentIndex];
        comment.likeCount ++;
        comment.likeFroms.push(msg.sender);
    }

    function getOwnerByCommentIndex(uint commentIndex) external view returns (address) {
        return commentIndexToOwner[commentIndex];
    }

}
