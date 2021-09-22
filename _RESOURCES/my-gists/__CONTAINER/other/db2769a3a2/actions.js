export const useDeletePortfolio = () =>
  useMutation(DELETE_PORTFOLIO, {
    update(cache, { data: { deletePortfolio } }) {
      try {
        const { userPortfolios } = cache.readQuery({
          query: GET_USER_PORTFOLIOS,
        });
        const newPortfolios = userPortfolios.filter(
          (p) => p._id !== deletePortfolio
        );
        cache.writeQuery({
          query: GET_USER_PORTFOLIOS,
          data: { userPortfolios: newPortfolios },
        });

        const { portfolios } = cache.readQuery({ query: GET_PORTFOLIOS });
        const allPortfolios = portfolios.filter(
          (p) => p._id !== deletePortfolio
        );
        cache.writeQuery({
          query: GET_PORTFOLIOS,
          data: { portfolios: allPortfolios },
        });
      } catch (e) {
        console.log(e);
      }
    },
  });

export const useCreatePortfolio = () =>
  useMutation(CREATE_PORTFOLIO, {
    update(cache, { data: { createPortfolio } }) {
      try {
        const { portfolios } = cache.readQuery({ query: GET_PORTFOLIOS });

        cache.writeQuery({
          query: GET_PORTFOLIOS,
          data: { portfolios: [...portfolios, createPortfolio] },
        });

        const { userPortfolios } = cache.readQuery({
          query: GET_USER_PORTFOLIOS,
        });

        cache.writeQuery({
          query: GET_USER_PORTFOLIOS,
          data: { userPortfolios: [...userPortfolios, createPortfolio] },
        });
      } catch (e) {
        console.log(e);
      }
    },
  });
