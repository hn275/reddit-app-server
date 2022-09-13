const parsedReplies = (replies) => {
  if (!replies) return []; // if a comment does not have any response
  console.log(replies.data.children); // TODO: dynamic search for all depths :/
  // return replies.map((reply) => {
  //   const replyData = reply.data;
  //   return {
  //     id: replyData.id,
  //     count: replyData.count,
  //     depth: replyData.depth,
  //     children: replyData.children,
  //   };
  // });
};

const parseComments = (commentObject) => {
  const allComments = commentObject[1].data.children;
  // console.log(allComments);
  const parsedComments = allComments.map((comment) => {
    const commentData = comment.data;
    return {
      type: comment.kind,
      id: commentData.id,
      author: commentData.author,
      bodyHtml: commentData.body_html,
      body: commentData.body,
      voteScore: commentData.ups,
      replies: parsedReplies(commentData.replies),
    };
  });
  // return {};
  return parsedComments;
};

module.exports = {
  parseComments: parseComments,
};
