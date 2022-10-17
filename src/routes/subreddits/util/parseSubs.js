/* parseSubs(response)
 * @params {json} response: a collection of api sent back from reddit server
 * @return {{ id, display_name, subscribers }}: data extracted for client
 */
export const parseSubs = (response) => {
  const api = response.data.children;

  return api.map((entry) => {
    const data = entry.data;

    return {
      id: data.name,
      display_name: data.display_name_prefixed,
      subscribers: data.subscribers,
    };
  });
};
