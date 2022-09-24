const parseReplies = (replies) => {
  if (!replies) {return "";}
  else { // if a comment does not have any response
  const replyData = replies.data.children;
  return replyData.map((reply) => {
     return {
      type: reply.data.kind,
      id: reply.data.id,
      author: reply.data.author,
      bodyHtml: reply.data.body_html,
      body: reply.data.body,
      voteScore: reply.data.ups,
      replies: parseReplies(reply.data.replies)
     };
 });
}}; 

export const parseComments = (commentObject) => {
  
  /** 
   * @param commentObject: passed by `commentRouter`
   * return: an object with api to be parsed by the client
   */
  const allComments = commentObject[1].data.children; 

  const parsedComments = allComments.map((comment) => {
    const commentData = comment.data;
    return {
      type: comment.kind,
      postId:commentData.parent_id,
      id: commentData.id,
      author: commentData.author,
      bodyHtml: commentData.body_html,
      body: commentData.body,
      voteScore: commentData.ups,
      replies: parseReplies(commentData.replies),
    };
  });
  return parsedComments;
};
