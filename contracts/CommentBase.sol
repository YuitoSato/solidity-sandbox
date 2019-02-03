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

    function getComment(uint _commentIndex) external view returns (
        uint, address , uint, address[] memory
    ) {
        Comment memory comment = comments[_commentIndex];
        uint commentHash = comment.commentHash;
        address ownerAddress = commentIndexToOwner[_commentIndex];
        uint likeCount = comment.likeCount;
        address[] memory likeFroms = comment.likeFroms;
        return (commentHash, ownerAddress, likeCount, likeFroms);
    }

    modifier canLikeOnlyOnce(uint _commentIndex) {
        Comment memory comment = comments[_commentIndex];
        address[] memory likeFroms = comment.likeFroms;
        require(!_containAddress(likeFroms, msg.sender));
        _;
    }

    function _containAddress(address[] memory addresses, address targetAddress) internal pure returns (bool){
        uint i;
        for (i = 0; i < addresses.length; i ++) {
            if (addresses[i] == targetAddress) {
                return true;
            }
        }
        return false;
    }

    function likeComment(uint _commentIndex) external canLikeOnlyOnce(_commentIndex) {
        Comment storage comment = comments[_commentIndex];


        comment.likeCount ++;
        comment.likeFroms.push(msg.sender);
    }

    function getOwnerByCommentIndex(uint _commentIndex) external view returns (address) {
        return commentIndexToOwner[_commentIndex];
    }

}
