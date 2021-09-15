import styled from "styled-components/macro";
import React from "react";
import { Formik, Form } from "formik";

import bus from "shared/Forms/Dropzone/bus";

import FormRow from "shared/Forms/Row";
import UploadImageButton from "Modals/buttons/UploadImageButton";

const ImagePreview = styled(({ className, src }) => (
  <div className={className}>
    <img alt="" width="100%" src={src} />
  </div>
))`
  position: relative;

  img {
    min-height: 100px;
  }

  img:before {
    content: " ";
    display: block;
    position: absolute;
    top: -0px;
    left: 0;
    height: 30px;
    width: 100%;
    background: white;
  }

  img:after {
    content: "\f127";
    display: block;
    font-size: 16px;
    font-style: normal;
    font-family: FontAwesome;
    color: rgb(100, 100, 100);
    position: absolute;
    top: 50px;
    left: 0;
    width: 100%;
    text-align: center;
  }
`;

class ImageUploadSuccessWatcher extends React.Component {
  componentDidMount() {
    const { setFieldTouched, setFieldValue } = this.props;
    bus.take("IMAGE_UPLOAD_SUCCESS", ({ payload }) =>
      setFieldValue("imageSrc", payload.url)
    );
    setFieldTouched("imageSrc");
  }

  render() {
    return null;
  }
}

const Basic = ({ product, onSubmit }) => {
  if (!product) return null;

  return (
    <Formik
      enableReinitialize
      initialValues={{
        title: product.title || "",
        description: product.description || "",
        imageSrc: product.imageSrc || "",
      }}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        await onSubmit(values);
        setSubmitting(false);
        resetForm();
      }}
      validate={(values) => {
        let errors = {};
        if (!values.imageSrc) errors.imageSrc = "Required";
        return errors;
      }}
    >
      {({
        dirty,
        isSubmitting,
        isValid,
        resetForm,
        setFieldTouched,
        setFieldValue,
        values,
      }) => (
        <Form>
          <ImageUploadSuccessWatcher
            setFieldTouched={setFieldTouched}
            setFieldValue={setFieldValue}
          />

          <div className="row justify-content-between no-gutters">
            <button
              className="btn btn-primary"
              disabled={!dirty || isSubmitting || !isValid}
              type="submit"
            >
              Save
            </button>

            <button
              className="btn btn-link link-gray pr-0"
              disabled={!dirty || isSubmitting}
              onClick={() => resetForm()}
            >
              Reset
            </button>
          </div>

          <br />

          <FormRow autoComplete={false} name="title" />

          <FormRow component="textarea" name="description" />

          <FormRow
            label={
              <>
                Image src{" "}
                <UploadImageButton className="btn btn-link btn-light btn-sm link-gray ml-3" />
              </>
            }
            name="imageSrc"
            placeholder="https://..."
          />

          <ImagePreview src={values.imageSrc} />
        </Form>
      )}
    </Formik>
  );
};

export default Basic;
