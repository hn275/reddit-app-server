/**
 * heads up, the json that is returned from Reddit is hella convoluted
 * you may see something like `thing.data.children`
 * and sometimes `thing` is indexed.
 * this is because depending on the type of request, Reddit
 * also provides some meta data that does not concern the
 * functionality of the app
 *
 * If you think that you may need them, feel free to either fork,
 * or let me know which data you want to include.
 */

const parseReplies = (comments) => {
  /**
   * helper function, parse replies from each comment and return needed data
   * param comments: an object passed by `parseComment`
   * return: an array of reply id's that can be used to fetch more response
   */
  if (!comments) return []; // in case there are no comment

  // Don't worry about these next two lines, Reddit api for comments is just deeply nested like this :/
  const replies = comments.data.children;
  const repliesIds = replies[0].data.children;

  if (!repliesIds) return []; // in case there is no response of the `selected` comment
  return repliesIds; // returns all replies in an array
};

export const parseComments = (commentObject) => {
  /**
   * @param commentObject: passed by `commentRouter`
   * return: an object with api to be parsed by the client
   */
  const allComments = commentObject[1].data.children; // Again, don't worry about this line either :/

  const parsedComments = allComments.map((comment) => {
    const commentData = comment.data;
    return {
      type: comment.kind,
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
