import React, { useEffect } from "react";
import withAuth from "@/hoc/withAuth";
import { useGetPortfolio } from "@/actions/portfolios";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useUpdatePortfolio } from "@/actions/portfolios";

const PortfolioEdit = () => {
  const router = useRouter();
  const { register, reset, handleSubmit } = useForm({
    defaultValues: initialData,
  });
  const [updatePortfolio, { data }] = useUpdatePortfolio();

  const { data: initialData } = useGetPortfolio(router.query.id);

  const _updatePortfolio = async (data) => {
    await updatePortfolio(router.query.id, data);
  };

  useEffect(() => {
    reset(initialData);
  }, [initialData]);

  return (
    <React.Fragment>
      {initialData && (
        <form onSubmit={handleSubmit(_updatePortfolio)}>
          <label htmlFor="title">Title</label>
          <input ref={register} name="title" type="text" id="title" />
          <p></p>

          <label htmlFor="city">Company</label>
          <input ref={register} name="company" type="text" id="company" />
          <p></p>
          <label htmlFor="city">Company Website</label>
          <input
            ref={register}
            name="companyWebsite"
            type="text"
            id="companyWebsite"
          />
          <p></p>
          <label htmlFor="street">Location</label>
          <input ref={register} name="location" type="text" id="location" />
          <p></p>
          <label htmlFor="street">Job Title</label>
          <input ref={register} name="jobTitle" type="text" id="jobTitle" />
          <p></p>
          <label htmlFor="description">Description</label>
          <textarea
            ref={register}
            name="description"
            rows="5"
            type="text"
            id="description"
          ></textarea>
          <p></p>
          <button type="submit">Create</button>
        </form>
      )}
    </React.Fragment>
  );
};

export default withAuth(PortfolioEdit)("guest");
