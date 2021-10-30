function pagination(page, limit, count) {
  page = parseInt(page) || 0;
  limit = parseInt(limit) || 0;

  // handle if page is missing
  if (!page) page = 0;
  if (!limit) limit = 10;
  else if (limit > 30) limit = 30;

  const startIndex = page * limit;

  const results = {};

  // next and prev page info
  if (startIndex + limit < count) results.nextPage = page + 1;
  if (startIndex > 0) results.prevPage = page - 1;
  const lastPage = Math.ceil(count / limit) - 1;
  results.lastPage = lastPage <= 0 ? 0 : lastPage;
  results.currentPage = page;
  results.skip = startIndex;

  return results;
}

module.exports = pagination;
